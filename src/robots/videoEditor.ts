import path from 'path';
import cmd from 'node-cmd';

const templateDir = path.resolve(__dirname, '../../sourceContent/templates/AfterEffects/1/template.aep')
const scriptDir = path.resolve(__dirname, '../../sourceContent/script.js')

export async function videoEditor() {

  await openAfterEffects();
  await executeScript();

  async function openAfterEffects() {
    return new Promise<void>((resolve, reject) => {
      console.log('Etapa 1');
      console.log('Oppening template project...');
      cmd.run(`afterfx ${templateDir}`);

      setTimeout(() => {
        resolve();
      }, 15000);
    })
  }

  async function executeScript() {
    return new Promise<void>((resolve, reject) => {
      console.log('Executing script...');
      cmd.run(`afterfx -r ${scriptDir}`);
      resolve();
    })
  }
}