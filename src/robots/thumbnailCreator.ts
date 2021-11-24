import path from 'path';
import cmd from 'node-cmd';
import thumb from 'node-video-thumb';

import * as state from '../state';

import { Content } from '../types/content';

const targetPath = path.resolve(__dirname, '../../sourceContent/renderedContent/processingVideo/assets');
const photoshopScriptsPath = path.resolve(__dirname, '../../src/scripts');

export async function thumbnailCreator() {
  const content = state.load();
  const thumbnailQuantity = 6;

  await extractThumb(content);
  state.save(content);

  await openPhotoshopAndEnterArchive();
  await toMonitorPhotoshop();

  async function extractThumb(content: Content) {
    return new Promise<void>(async (resolve, reject) => {
      console.log('Extracting images thumbnail...');
      content.extractedThumbnails = [] as string[];

      let seconds = 15
      for (let count = 1; count <= thumbnailQuantity; count++) {
        const imageName = `\\thumbImageSource-${count}.jpg`
        await thumb({
          source: `${targetPath}\\sourceVideo.mp4`,
          target: `${targetPath}${imageName}`,
          width: 1920,
          height: 1080,
          seconds: seconds,
        })

        seconds += 15;
        content.extractedThumbnails.push(imageName)
        console.log(`Saved image [${count}]`);
      }
      console.log('Images extracted!');
      setTimeout(() => {
        resolve();
      }, 500)
    })
  }

  async function openPhotoshopAndEnterArchive() {
    return new Promise<void>((resolve, reject) => {
      console.log("Running photoshop robot...");
      cmd.runSync(`cscript "${photoshopScriptsPath}\\openPhotoshopScript.vbs"`);
      resolve()
    })
  }

  async function toMonitorPhotoshop() {
    return new Promise<void>((resolve, reject) => {
      let photoshopTaskDetails: string = '';

      while (!photoshopTaskDetails.includes('Photoshop.exe')) {
        const { data } = cmd.runSync(`tasklist /v /fi "IMAGENAME eq Photoshop.exe"`);
        photoshopTaskDetails = data;
      }

      while (photoshopTaskDetails.includes('Photoshop.exe')) {
        const { data } = cmd.runSync(`tasklist /v /fi "IMAGENAME eq Photoshop.exe"`);
        photoshopTaskDetails = data;
      }

      setTimeout(() => {
        console.log('Photoshop robot finished!');

        resolve()
      }, 2000)
    })
  }
}