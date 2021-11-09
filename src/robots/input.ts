import readline from 'readline-sync';
import * as state from '../state';

import { Content } from "../types/content";

export function inputRobot() {
  const content: Content = {};

  let confirmation;

  content.youtubeVideoUrl = askAndReturnyoutubeVideoUrl();
  while (!confirmation) {
    content.sourceChannel = askAndReturnSourceChannel();
    content.logoSide = askAndReturnLogoSide();
    confirmation = confirmInputData();
  }
  state.save(content);

  function askAndReturnyoutubeVideoUrl() {
    return readline.question('Paste an youtube podcast cut url: ')
  }

  function askAndReturnSourceChannel() {
    const sourceChannels = ['Cortes do flow', 'Cortes do venus', 'Cortes do inteligencia'];
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
}