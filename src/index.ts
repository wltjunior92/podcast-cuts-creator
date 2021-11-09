import { inputRobot } from './robots/input';
import { videoEditor } from './robots/videoEditor';
import { videoRenderer } from './robots/videoRenderer';
import { youtubeDownloader } from './robots/youtubeDownloader';
import * as state from './state';

async function start() {
  // inputRobot();
  // await youtubeDownloader();
  // await state.saveAfterEffectsScript();
  await videoEditor();
  await videoRenderer();
};

start();