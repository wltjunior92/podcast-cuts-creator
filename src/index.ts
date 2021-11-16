import { inputRobot } from './robots/input';
import { videoEditor } from './robots/videoEditor';
import { videoRenderer } from './robots/videoRenderer';
import { youtubeDownloader } from './robots/youtubeDownloader';
import { videoDescriptionRobot } from './robots/videoDescriptionRobot';
import { thumbnailCreator } from './robots/thumbnailCreator';
import { changeGeneratedContentFolderName } from './robots/changeGeneratedContentFolderName';
import { convertVideo } from './robots/convertVideo';

async function start() {
  inputRobot();
  await youtubeDownloader();
  await videoEditor();
  await videoRenderer();
  await videoDescriptionRobot();
  await thumbnailCreator();
  // await convertVideo();
  await changeGeneratedContentFolderName();

  console.log('Press CTRL + C ti finish 👍');
};

start();