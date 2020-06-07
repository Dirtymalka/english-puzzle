import book1 from '../data/book1';
import book2 from '../data/book2';
import book3 from '../data/book3';
import book4 from '../data/book4';
import book5 from '../data/book5';
import book6 from '../data/book6';
import { createGameBoard } from './createGameBoard';
// import { addPuzzlesClickHandler } from './puzzlesClickHandler';
import { INDEX_FIRST_SENTENCE, LEVEL, PAGE } from '../constants';
import { addButtonGameHandlers } from './buttonGamesHandlers';

const getWords = () => {
  document.querySelector('.main').innerHTML = '';
  const level = document.querySelector('.selectbox-levels').textContent;
  const page = document.querySelector('.selectbox-pages').textContent;
  localStorage.setItem(LEVEL, level);
  localStorage.setItem(PAGE, page);

  const levelData = {
    '1': book1,
    '2': book2,
    '3': book3,
    '4': book4,
    '5': book5,
    '6': book6,
  }

  // const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;
  // const idWord = (levelData[level].length * (parseFloat(level) - 1) + parseFloat(page) * 10) - 10;

  const idWord = (parseFloat(page) * 10) - 10;

  const dataForOneGame = levelData[level].slice(idWord, idWord + 10);
  const filterDataForOneGame = dataForOneGame.map(dataFilter);
  console.log(filterDataForOneGame)
  createGameBoard(filterDataForOneGame);
  // const filterDataForOneGame = dataFilter(dataForOneGame);
  // addPuzzlesClickHandler(filterDataForOneGame);

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
