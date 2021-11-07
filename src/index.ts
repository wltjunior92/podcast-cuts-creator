import { inputRobot } from './robots/input';
import { youtubeDownloader } from './robots/youtubeDownloader';
import * as state from './state';

async function start() {
  // inputRobot();
  // await youtubeDownloader();
  await state.saveAfterEffectsScript();
};

start();