import { spawn } from 'child_process';
import path from 'path';

import * as state from '../state';

import { Content } from '../types/content';

const aerenderFilePath = 'C:/Program Files/Adobe/Adobe After Effects 2022/Support Files/aerender.exe';
const rootDir = path.resolve(__dirname, '../../');

export async function videoRenderer() {

  const content = state.load();

  await renderVideo(content);

  async function renderVideo(content: Content) {
    return new Promise<void>((resolve, reject) => {
      const templateFilePath = `${rootDir}/sourceContent/templates/AfterEffects/1/template.aep`;
      const destinationFilePath = `${rootDir}/sourceContent/renderedContent/ShortCuts${content.originTitle}.mov`;

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
        console.log('Renderer closed!');
        resolve();
      })
    })
  }
}