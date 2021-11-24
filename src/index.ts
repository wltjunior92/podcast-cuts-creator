import { inputRobot } from './robots/input';
import { videoEditor } from './robots/videoEditor';
import { videoRenderer } from './robots/videoRenderer';
import { youtubeDownloader } from './robots/youtubeDownloader';
import { videoDescriptionRobot } from './robots/videoDescriptionRobot';
import { thumbnailCreator } from './robots/thumbnailCreator';
import { changeGeneratedContentFolderName } from './robots/changeGeneratedContentFolderName';

async function start() {
  inputRobot();
  await youtubeDownloader();
  await videoEditor();
  await videoRenderer();
  await videoDescriptionRobot();
  await thumbnailCreator();
  await changeGeneratedContentFolderName();
};

start();