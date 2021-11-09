import fs from 'fs';

const contentFilePath = './src/content.json';
const scriptFilePath = './src/contentScript.js';
const afterEffectsNewScriptFilePath = './sourceContent/script.js';
const afterEffectsTemplateScriptFilePath = './sourceContent/templateScript.js';

import { Content } from './types/content';

export function save(content: Content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(contentFilePath, contentString);
}

export async function saveScriptData(content: Content) {
  const contentString = JSON.stringify(content);
  const scriptString = `var content = ${contentString}`
  return fs.writeFileSync(scriptFilePath, scriptString);
}

export async function saveAfterEffectsScript() {
  return new Promise<void>((resolve, reject) => {
    const content = load();
    const loadedScript = fs.readFileSync(afterEffectsTemplateScriptFilePath, 'utf-8');
    const importantData = {
      videoDuration: content.originVideoDuration,
      logoSide: content.logoSide,
      sourceChannel: content.sourceChannel,
    }

    const newAfterScript = loadedScript.replace('$toSwap$', JSON.stringify(importantData));

    fs.writeFileSync(afterEffectsNewScriptFilePath, newAfterScript);
    resolve();
  })
}

export function load(): Content {
  const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
}