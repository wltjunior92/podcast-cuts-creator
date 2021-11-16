import readline from 'readline-sync';
import query from 'synchronous-user-input';
import * as state from '../state';

import defaultData from '../defaultConfigurationContent.json';

import { Content } from "../types/content";

export function inputRobot() {
  const content: Content = {};

  let confirmation;

  content.youtubeVideoUrl = askAndReturnyoutubeVideoUrl();
  while (!confirmation) {
    content.sourceChannel = askAndReturnSourceChannel();
    content.logoSide = askAndReturnLogoSide();
    content.clickbait = askAndReturnClickbait();
    confirmation = confirmInputData();
  }
  state.save(content);

  function askAndReturnyoutubeVideoUrl() {
    return readline.question('Paste an youtube podcast cut url: ')
  }

  function askAndReturnSourceChannel() {
    const optionsArray: string[] = []
    defaultData.map(item => {
      optionsArray.push(item.name);
    })

    const sourceChannels = optionsArray;
    const sourceChannelsIndex = readline.keyInSelect(sourceChannels, 'Source channel: ')
    const selectedSourceChannels = sourceChannels[sourceChannelsIndex];

    return selectedSourceChannels;
  }

  function askAndReturnLogoSide() {
    const logoSides = ['right', 'left'];
    const logoSideIndex = readline.keyInSelect(logoSides, 'Where is the logo? ')
    const selectedLogoSide = logoSides[logoSideIndex];

    return selectedLogoSide;
  }

  function confirmInputData() {
    const confirmation = readline.keyInYN('Confirm selections?');
    return confirmation;
  }

  function askAndReturnClickbait() {
    return query('Write the video clickbait: ')
  }
}