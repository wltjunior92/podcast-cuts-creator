import fs from 'fs'

export async function createFolder(path: string) {
  return new Promise<void>((resolve, reject) => {
    while (!fs.existsSync(`${path}/`)) {
      fs.mkdirSync(`${path}/`, { recursive: true })
    }

    resolve();
  })
}