import { spawn } from 'child_process';
import path from 'path';
import cmd from 'node-cmd';
import fs from 'fs';

import * as state from '../state';

import { Content } from '../types/content';
import { createFolder } from '../utils/createFolder';

const aerenderFilePath = 'C:/Program Files/Adobe/Adobe After Effects 2022/Support Files/aerender.exe';
const rootDir = path.resolve(__dirname, '../../');

export async function videoRenderer() {

  const content = state.load();

  await renderVideo(content);
  await closeAfterEffects();

  state.save(content);

  async function renderVideo(content: Content) {
    return new Promise<void>(async (resolve, reject) => {
      await createFolder(`${rootDir}/sourceContent/renderedContent/processingVideo/render`)

      const videoName = `ShortCuts-${content.originTitleSanityzed}`
      const templateFilePath = `${rootDir}/sourceContent/templates/AfterEffects/1/template.aep`;
      const destinationFilePath = `${rootDir}/sourceContent/renderedContent/processingVideo/render/${videoName}.mp4`;

      console.log('Rendering vídeo:');

      const aerender = spawn(aerenderFilePath, [
        "-comp", "main",
        "-project", templateFilePath,
        "-output", destinationFilePath
      ]);

      aerender.stdout.on('data', data => {
        process.stdout.write(data);
      });

      aerender.on('close', () => {
        content.originTitleSanityzed = videoName;
        console.log('Renderer closed!');
        resolve();
      })
    })
  }

  async function closeAfterEffects() {
    return new Promise<void>((resolve, reject) => {
      cmd.run(`wmic process where "name='AfterFX.com'" delete`);
      console.log('Closing AfterEffects instance.');
      resolve();
    })
  }
}