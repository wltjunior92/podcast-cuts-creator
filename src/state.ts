import fs from 'fs';
import contentJson from './content.json';

const contentFilePath = './src/content.json';
const scriptFilePath = './src/contentScript.js';
const afterEffectsNewScriptFilePath = 'C:/DevProjects/podcast-cuts-creator/sourceContent/script.js';
const afterEffectsTemplateScriptFilePath = 'C:/DevProjects/podcast-cuts-creator/sourceContent/templateScript.js';

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
  const loadedScript = fs.readFileSync(afterEffectsTemplateScriptFilePath, 'utf-8');
  const importantData = {
    videoDuration: contentJson.originVideoDuration,
    logoSide: contentJson.logoSide,
  }

  const newAfterScript = loadedScript.replace('$toSwap$', JSON.stringify(importantData));

  return fs.writeFileSync(afterEffectsNewScriptFilePath, newAfterScript);
}

export function load(): Content {
  const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
}