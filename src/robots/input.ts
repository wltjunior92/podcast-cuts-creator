import readline from 'readline-sync';
import query from 'synchronous-user-input';
import * as state from '../state';

import defaultData from '../defaultConfigurationContent.json';

import { Content } from "../types/content";

export function inputRobot() {
  const content: Content = {};

  let confirmation;

  while (!confirmation) {
    content.youtubeVideoUrl = askAndReturnyoutubeVideoUrl();
    content.clickbait = askAndReturnClickbait();
    confirmation = confirmInputData();
  }
  state.save(content);

  function askAndReturnyoutubeVideoUrl() {
    return readline.question('Paste an youtube podcast cut url: ')
  }

  function confirmInputData() {
    const confirmation = readline.keyInYN('Confirm selections?');
    return confirmation;
  }

  function askAndReturnClickbait() {
    return query('Write the video clickbait: ')
  }
}