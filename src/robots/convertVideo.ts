import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

import * as state from '../state';
import contentJson from '../content.json'

const rootPath = path.resolve(__dirname, `../../sourceContent/renderedContent/${contentJson.originTitleSanityzed}`)

export async function convertVideo() {
  const content = state.load()

  const sourceVideo = `${rootPath}\\${content.originTitleSanityzed}.mov`;
  const destinationVideo = `${rootPath}\\${content.originTitleSanityzed}.mp4`;

  await convertVideoToMp4(sourceVideo, destinationVideo);

  async function convertVideoToMp4(sourceVideo: string, destinationVideo: string) {
    return new Promise<void>(async (resolve, reject) => {
      console.log('Starting Video conversion');

      function convert(sourceVideo, destinationVideo, callback) {
        ffmpeg(sourceVideo)
          .output(destinationVideo)
          .on('end', () => {
            console.log('conversion ended');
            callback(null);
          }).on('progress', progress => {
            console.log(`Converting: ${Math.round(progress.percent)} %`);
          }).on('error', err => {
            console.log('error: ', err.code, err.msg);
            callback(err);
          }).run();
      }

      convert(sourceVideo, destinationVideo, err => {
        if (!err) {
          console.log('Conversion completed');
          resolve();
        }
      })
    })
  }

}