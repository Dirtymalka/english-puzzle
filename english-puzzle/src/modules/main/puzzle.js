/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */

import book1 from '../data/book1';
import book2 from '../data/book2';
import book3 from '../data/book3';
import book4 from '../data/book4';
import book5 from '../data/book5';
import book6 from '../data/book6';
import { createGameBoard } from './createGameBoard';
import { addButtonGameHandlers } from './buttonGamesHandlers';
import { activeUser } from '../authorization/authorization';

const getWords = () => {
  document.querySelector('.main').innerHTML = '';

  document.querySelector('.selectbox-levels').textContent = activeUser.lastLevel;
  document.querySelector('.selectbox-pages').textContent = activeUser.lastPage;
  const level = activeUser.lastLevel;
  const page = activeUser.lastPage;


  const levelData = {
    '1': book1,
    '2': book2,
    '3': book3,
    '4': book4,
    '5': book5,
    '6': book6,
  }

  const idWord = (parseFloat(page) * 10) - 10;

  const dataForOneGame = levelData[level].slice(idWord, idWord + 10);
  const filterDataForOneGame = dataForOneGame.map(dataFilter);
  createGameBoard(filterDataForOneGame);
  addButtonGameHandlers(filterDataForOneGame);
}


const dataFilter = (dataWord) => {
  const dataWithMeaning = {
    "word": dataWord.word,
    "image": dataWord.image,
    "audio": dataWord.audio,
    "audioMeaning": dataWord.audioMeaning,
    "textMeaning": dataWord.textMeaning,
    "transcription": dataWord.textMeaning,
    "wordTranslate": dataWord.wordTranslate,
    "textMeaningTranslate": dataWord.textMeaningTranslate,
    "id": dataWord.id
  };

  const dataWithExample = {
    "word": dataWord.word,
    "image": dataWord.image,
    "audio": dataWord.audio,
    "audioExample": dataWord.audioExample,
    "textExample": dataWord.textExample,
    "transcription": dataWord.transcription,
    "wordTranslate": dataWord.wordTranslate,
    "textExampleTranslate": dataWord.textExampleTranslate,
    "id": dataWord.id
  }

  const wordDataWithShortSentence = dataWithMeaning.textMeaning.length <= dataWithExample.textExample.length ? dataWithMeaning : dataWithExample;

  const totalWordData = {
    "word": wordDataWithShortSentence.word,
    "image": wordDataWithShortSentence.image,
    "audio": wordDataWithShortSentence.audio,
    "audioText": wordDataWithShortSentence.audioExample || wordDataWithShortSentence.audioMeaning,
    "text": wordDataWithShortSentence.textExample || wordDataWithShortSentence.textMeaning,
    "transcription": wordDataWithShortSentence.transcription,
    "wordTranslate": wordDataWithShortSentence.wordTranslate,
    "textTranslate": wordDataWithShortSentence.textExampleTranslate || wordDataWithShortSentence.textMeaningTranslate,
    "id": dataWord.id
  }

  return totalWordData;
}



export { getWords };
