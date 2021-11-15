import fs from 'fs'
import path from 'path';

import * as state from '../state';
import { Content } from '../types/content';

const folderPath = path.resolve(__dirname, '../../sourceContent/renderedContent')

export async function changeGeneratedContentFolderName() {
  const content = state.load()

  await changeName(content);


  async function changeName(content: Content) {
    return new Promise<void>((resolve, reject) => {
      const oldFolderName = `${folderPath}\\processingVideo`;
      const newFolderName = `${folderPath}\\${content.originTitleSanityzed}`;

      fs.rename(oldFolderName, newFolderName, err => {
        if (err) console.log(err)
        else console.log(`Folder renamed - ${newFolderName}`)
      })

      while (!fs.existsSync(newFolderName)) { }

      resolve();
    })
  }
}