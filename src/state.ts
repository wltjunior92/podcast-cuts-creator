import fs from 'fs';

const contentFilePath = './src/content.json';
const afterEffectsNewScriptFilePath = './sourceContent/templates/AfterEffects/scripts/script.jsx';
const afterEffectsTemplateScriptFilePath = './sourceContent/templateScript.jsx';

import { Content } from './types/content';

export function save(content: Content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(contentFilePath, contentString);
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