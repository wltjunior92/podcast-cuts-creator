import path from 'path';
import cmd from 'node-cmd';

const templateDir = path.resolve(__dirname, '../../sourceContent/templates/AfterEffects/1/template.aep')
const scriptDir = path.resolve(__dirname, '../../sourceContent/templates/AfterEffects/scripts/script.jsx')
const rootDir = path.resolve(__dirname, '../../')

export async function videoEditor() {

  await openAfterEffects();
  await executeScript();

  async function openAfterEffects() {
    return new Promise<void>((resolve, reject) => {
      console.log('Oppening template project...');
      cmd.run(`afterfx ${templateDir}`);

      let afterTaskDetails: string = '';
      while (!afterTaskDetails.includes(rootDir)) {
        const { data } = cmd.runSync(`tasklist /v /fi "IMAGENAME eq AfterFX.com"`);
        afterTaskDetails = data;
      }

      setTimeout(() => {
        resolve();
      }, 3000)
    })
  }

  async function executeScript() {
    return new Promise<void>((resolve, reject) => {
      console.log('Executing script...');
      cmd.run(`afterfx -r ${scriptDir}`);
      setTimeout(() => {
        resolve();
      }, 3000)
    })
  }


}