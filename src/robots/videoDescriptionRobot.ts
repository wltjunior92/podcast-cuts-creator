import fs from 'fs';
import youtubedl from 'youtube-dl-exec';

import * as state from '../state';
import { Content } from '../types/content';

export async function videoDescriptionRobot() {
  const content = state.load();

  await generateDescription(content);
  await saveTxtContent(content);

  async function generateDescription(content: Content) {
    let stringArray: string[] = [];
    const originDescriptionLines = content.originDescription.split('\n');
    originDescriptionLines.map(line => {
      const lineItems = line.split(' ');
      stringArray = [...stringArray, ...lineItems]
    })

    let urlOrigin: string = ''
    const urlList = stringArray.filter(line => {
      if (line.match(/(https\:\/\/www\.youtube\.com\/watch+\?[a-zA-Z0-9._-])/gi) ||
        line.match(/(https\:\/\/youtu\.be\/[a-zA-Z0-9._-])/gi)) {
        return line;
      }
    })

    urlOrigin = urlList.length > 0 && urlList[0];

    const completeVideoData = await youtubedl(urlOrigin, {
      dumpSingleJson: true,
      noWarnings: true,
      // noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: urlOrigin,
    });

    const completeVideoName = completeVideoData.title

    const generatedDescription = `Assista esse episódio completo!\n${completeVideoName}\n${urlOrigin}`;
    content.generatedDescription = generatedDescription;
  }

  async function saveTxtContent(content: Content) {
    let stringTags = '';
    content.tags.map(tag => {
      const editTag = tag.replace(/ /g, '_')
      stringTags += `#${editTag} `
    });
    const descriptionTxtString = `${content.generatedDescription}\n\n---------------\n\n${stringTags}`;

    fs.writeFileSync(`./sourceContent/renderedContent/processingVideo/descriptionText.txt`, descriptionTxtString, 'utf-8');
  }
}