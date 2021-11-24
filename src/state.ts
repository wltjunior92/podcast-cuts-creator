import fs from 'fs';

const contentFilePath = './src/content.json';

import { Content } from './types/content';

export function save(content: Content) {
  const contentString = JSON.stringify(content);
  return fs.writeFileSync(contentFilePath, contentString);
}

export function load(): Content {
  const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
  const contentJson = JSON.parse(fileBuffer);
  return contentJson;
}