import fs from 'fs';

import * as state from '../state';
import { Content } from '../types/content';

export async function videoDescriptionRobot() {
  const content = state.load();

  await generateDescription(content);
  await saveTxtContent(content);

  async function generateDescription(content: Content) {
    const originDescriptionLines = content.originDescription.split('\n');

    let urlOrigin: string = ''
    const test = originDescriptionLines.filter(line => {
      if (line.match(/(https\:\/\/www\.youtube\.com\/watch+\?[a-zA-Z0-9._-])/gi) ||
        line.match(/(https\:\/\/youtu\.be\/[a-zA-Z0-9._-])/gi)) {
        return line;
      }
    })

    urlOrigin = test.length > 0 && test[0];

    const generatedDescription = `Assista esse episódio completo!\n${urlOrigin}`;
    content.generatedDescription = generatedDescription;
  }

  async function saveTxtContent(content: Content) {
    const stringTags = content.tags.join('# ');
    const descriptionTxtString = `${content.generatedDescription}\n\n---------------\n\n${stringTags}`;

    fs.writeFileSync('./src/descriptionText.txt', descriptionTxtString, 'utf-8');
  }
}