import { inputRobot } from './robots/input';
import { videoEditor } from './robots/videoEditor';
import { videoRenderer } from './robots/videoRenderer';
import { youtubeDownloader } from './robots/youtubeDownloader';
import { videoDescriptionRobot } from './robots/videoDescriptionRobot';
import * as state from './state';
import { thumbnailCreator } from './robots/thumbnailCreator';

async function start() {
  // inputRobot();
  // await youtubeDownloader();
  // await state.saveAfterEffectsScript();
  // await videoEditor();
  // await videoRenderer();
  // await videoDescriptionRobot();
  await thumbnailCreator();
};

start();