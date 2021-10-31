import readline from 'readline-sync';
import * as state from '../state';

import { Content } from "../types/content";

export function inputRobot() {
  const content: Content = {};

  content.youtubeVideoUrl = askAndReturnyoutubeVideoUrl();
  // content.prefix = askAndReturnPrefix();
  state.save(content);

  function askAndReturnyoutubeVideoUrl() {
    return readline.question('Paste an youtube podcast cut url: ')
  }

  // function askAndReturnPrefix() {
  //   const prefixes = ['Who is', 'What is', 'The history of'];
  //   const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Choose one option: ')
  //   const selectedPrefix = prefixes[selectedPrefixIndex];

  //   return selectedPrefix;
  // }
}