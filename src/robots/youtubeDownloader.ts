import youtubedl, { YtResponse } from 'youtube-dl-exec';
import path from 'path';
import { DownloaderHelper } from 'node-downloader-helper';

import * as state from '../state';
import { Content } from '../types/content';
import { createFolder } from '../utils/createFolder';

const rootPath = path.resolve(__dirname, '../../');

export async function youtubeDownloader() {
  const content = state.load();

  await fetchVideoData(content);
  await downloadSelectedVideo(content.generatedDownloadUrl, content.originTitleSanityzed);

  state.save(content)

  async function fetchVideoData(content: Content) {
    const videoData = await youtubedl(content.youtubeVideoUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      // noCallHome: true,
      noCheckCertificate: true,
      preferFreeFormats: true,
      youtubeSkipDashManifest: true,
      referer: content.youtubeVideoUrl,
    });

    setSourceChannel(videoData.channel, content);

    content.originTitleSanityzed = videoData.title
      .replace(/\ /g, '-')
      .replace(/\|/g, '')
      .replace(/\./g, '')
      .replace(/\?/g, '')
      .replace(/\!/g, '')
      .replace(/\#/g, '')
      .replace(/\*/g, '')
    content.originDescription = videoData.description;
    content.originVideoDuration = videoData.duration;
    content.tags = videoData.tags;
    await downloadOriginThumbnail(content, videoData.thumbnail, content.originTitleSanityzed);
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

    async function downloadOriginThumbnail(content: Content, thumbnailUrl: string, title: string) {
      try {
        await createFolder(`${rootPath}/sourceContent/renderedContent/processingVideo/assets`)

        const downloader = new DownloaderHelper(thumbnailUrl, `${rootPath}/sourceContent/renderedContent/processingVideo/assets/`, {
          fileName: 'originThumbnail.jpg',
          override: true,
          retry: true,
        });

        downloader.on('start', () => console.log(`Starting download origin thumbnail: ${thumbnailUrl}`));
        downloader.on('end', () => console.log('Download completed!'));
        await downloader.start();

        content.originThumbnail = thumbnailUrl;
      } catch (error) {
        console.log(`Thumbnail download failed: ${error.message}`);
      }
    }

    function setSourceChannel(channel: string, content: Content) {
      switch (channel) {
        case ('Cortes do Flow [OFICIAL]'):
          content.sourceChannel = 'Cortes do flow'
          break;
        case ('Cortes do Venus [OFICIAL]'):
          content.sourceChannel = 'Cortes do venus'
          break;
        case ('Cortes do Intelig??ncia [OFICIAL]'):
          content.sourceChannel = 'Cortes do inteligencia'
          break;
        case ('Cortes do Ci??ncia Sem Fim [OFICIAL]'):
          content.sourceChannel = 'Cortes do ciencia'
          break;
        case ('TICARACATICAST Cortes[OFICIAL]'):
          content.sourceChannel = 'Cortes do ticaracaticast'
          break;
        case ('Cortes Podpah [OFICIAL]'):
          content.sourceChannel = 'Cortes podpah'
          break;
        default:
          break;
      }
    }
  }

  async function downloadSelectedVideo(videoUrl: string, title: string) {
    await createFolder(`${rootPath}/sourceContent/renderedContent/processingVideo/assets`)

    const downloader = new DownloaderHelper(videoUrl, `${rootPath}/sourceContent/renderedContent/processingVideo/assets/`, {
      fileName: 'sourceVideo.mp4',
      override: true,
      retry: true,
    });

    downloader.on('start', () => console.log(`Starting download: ${videoUrl}`));
    downloader.on('progress.throttled', stats => console.log(`Downloading... ${Math.round(stats.progress)}%`));
    downloader.on('end', () => console.log('Download completed!'));
    await downloader.start();
  }
}