import path from 'path';
import thumb from 'node-video-thumb';
const gm = require('gm').subClass({ imageMagick: true });

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
  await editAllThumbnail(content);

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
      const inputFile = `${inputFilePath}/${imageName}`
      const outputFile = `${outputFilePath}/ShotCutsThumb${channelTitle}-${imageIndex}.jpg`;
      const width = 1920;
      const height = 1080;

      gm()
        .in(inputFile)
        .out('(')
        .out('-clone')
        .out('0')
        .out('-background', 'white')
        .out('-blur', '50x200')
        .out(')')
        .out('(')
        .out('-clone')
        .out('0')
        .out('-background', 'white')
        .out('-roll', '-500-0')
        .out('-crop', `800x${height}`)
        .out('-geometry', '+100-0')
        .out('-border', '20')
        .out(')')
        .out('-delete', '0')
        .out('-gravity', 'center')
        .out('-compose', 'over')
        .out('-composite')
        // .out('-extent', `${width}x${height}`)
        .write(outputFile, (error: Error) => {
          if (error) {
            return reject(error)
          }

          console.log(`> [video-robot] Image converted: ${outputFile}`)
          resolve()
        })

    })
  }
}