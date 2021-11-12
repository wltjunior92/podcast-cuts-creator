import path from 'path';
import cmd from 'node-cmd';
import { spawn } from 'child_process';
import thumb from 'node-video-thumb';

import * as state from '../state';

import { Content } from '../types/content';

const sourcePath = path.resolve(__dirname, '../../sourceContent/sourceVideo.mp4');
const targetPath = path.resolve(__dirname, '../../sourceContent/thumbImageSource');
const inputFilePath = path.resolve(__dirname, '../../sourceContent');
const outputFilePath = path.resolve(__dirname, '../../sourceContent/renderedContent');

export async function thumbnailCreator() {
  const content = state.load();
  const thumbnailQuantity = 1;

  // await extractThumb();
  // await editAllThumbnail(content);
  await testOpenPhotoshopAndEnterArchive();

  async function extractThumb() {
    return new Promise<void>(async (resolve, reject) => {
      console.log('Extracting images thumbnail...');

      let seconds = 30
      for (let count = 1; count <= thumbnailQuantity; count++) {
        await thumb({
          source: sourcePath,
          target: `${targetPath}-${count}.jpg`,
          width: 1920,
          height: 1080,
          seconds: seconds,
        })

        seconds += 5;
        console.log(`Saved image [${count}]`);
      }
      console.log('Images extracted!');
      setTimeout(() => {
        resolve();
      }, 2000)
    })
  }

  async function editAllThumbnail(content: Content) {
    for (let imageIndex = 1; imageIndex <= thumbnailQuantity; imageIndex++) {
      const originVideoTitle = content.originTitle.replace(/\ /g, '-').replace(/\|/g, '_').replace(/\./, '');
      await editThumbnail(`thumbImageSource-${imageIndex}.jpg`, originVideoTitle, imageIndex);
    }
  }

  async function editThumbnail(imageName: string, channelTitle: string, imageIndex: number) {
    return new Promise<void>((resolve, reject) => {
      const thumbnailName = `ShotCutsThumb-${channelTitle}-${imageIndex}.png`
      const inputFile = `${inputFilePath}/${imageName}`
      const outputFile = `${outputFilePath}/${thumbnailName}`;
      const height = 1080;

      const args = [
        inputFile,
        '(', '-clone', '0', '-background', 'white', '-blur', '50x200', ')',
        '(', '-clone', '0', '-background', 'white', '-roll', '-400-0', '-crop', `1000x${height}`, '-geometry', '+300-0', ')',
        '-delete', '0',
        '-delete', '2',
        '-gravity', 'center',
        '-compose', 'over',
        '-composite',
        outputFile
      ]

      const composite = spawn('magick', args);
      composite.on('close', () => {
        console.log(`Create image - ${thumbnailName}`);
        resolve();
      })
    })
  }

  async function testOpenPhotoshopAndEnterArchive() {
    return new Promise<void>((resolve, reject) => {
      // console.log('Oppening photoshop');
      // cmd.run('start "" "C:\\projetos\\podcast-cuts-creator\\sourceContent\\templates\\photoshop\\logo.psd"');

      // let afterTaskDetails: string = '';
      // while (!afterTaskDetails.includes('Adobe Photoshop 2022')) {
      //   const { data } = cmd.runSync(`tasklist /v /fi "IMAGENAME eq Photoshop.exe"`);
      //   afterTaskDetails = data;
      // }

      cmd.run('start "" "C:\\projetos\\podcast-cuts-creator\\src\\scripts\\teste.vbs"');
    })
  }
}