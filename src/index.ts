import { inputRobot } from './robots/input';
import { youtubeDownloader } from './robots/youtubeDownloader';
async function start() {
  inputRobot();
  await youtubeDownloader();
};

start();