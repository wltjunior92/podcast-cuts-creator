import fs from 'fs';

const contentFilePath = './content.json';
const scriptFilePath = './content/after-effects-script.js';

import { Content } from './types/content';

export function save(content: Content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(contentFilePath, contentString);
}

export async function saveScript(content: Content) {
  const contentString = JSON.stringify(content);
  const scriptString = `var content = ${contentString}`
  return fs.writeFileSync(scriptFilePath, scriptString);
}

export function load(): Content {
  const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
}