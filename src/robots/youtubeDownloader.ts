import youtubedl from 'youtube-dl-exec';
import path from 'path';
import { DownloaderHelper } from 'node-downloader-helper';

import * as state from '../state';
import { Content } from '../types/content';

const rootPath = path.resolve(__dirname, '../../');

export async function youtubeDownloader() {
  const content = state.load();

  await fetchVideoData(content);
  await downloadSelectedVideo(content.generatedDownloadUrl);

  state.save(content)

  async function fetchVideoData(content: Content) {
    const videoData = await youtubedl(content.youtubeVideoUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: content.youtubeVideoUrl,
    });

    content.originTitle = videoData.title;
    content.originDescription = videoData.description;
    content.originVideoDuration = videoData.duration;
    await downloadOriginThumbnail(content, videoData.thumbnail);
    selectBestQualityVideo(content);

    function selectBestQualityVideo(content: Content) {
      let urlVideo: string = '';

      const mp4Videos = videoData.formats.filter(format => {
        return format.ext === 'mp4' && format.acodec === 'mp4a.40.2';
      });

      let selectedFormat: any;
      mp4Videos.forEach(format => {
        if (urlVideo === '') {
          urlVideo = format.url;
          selectedFormat = format;
        } else if (format.height > selectedFormat.height) {
          urlVideo = format.url;
          selectedFormat = format;
        }
      });

      content.generatedDownloadUrl = urlVideo;
    }

    async function downloadOriginThumbnail(content: Content, thumbnailUrl: string) {
      try {
        const downloader = new DownloaderHelper(thumbnailUrl, `${rootPath}/sourceContent/`, {
          fileName: 'originThumbnail.jpg',
        });

        downloader.on('start', () => console.log(`Starting download origin thumbnail: ${thumbnailUrl}`));
        downloader.on('end', () => console.log('Download completed!'));
        await downloader.start();

        content.originThumbnail = thumbnailUrl;
      } catch (error) {
        console.log(`Thumbnail download failed: ${error.message}`);
      }
    }
  }

  async function downloadSelectedVideo(videoUrl: string) {
    const downloader = new DownloaderHelper(videoUrl, `${rootPath}/sourceContent/`, {
      fileName: 'sourceVideo.mp4',
    });

    downloader.on('start', () => console.log(`Starting download: ${videoUrl}`));
    downloader.on('progress.throttled', stats => console.log(`Downloading... ${Math.round(stats.progress)}%`));
    downloader.on('end', () => console.log('Download completed!'));
    await downloader.start();
  }
}