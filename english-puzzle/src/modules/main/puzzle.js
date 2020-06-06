import book1 from '../data';
import { createGameBoard } from './createGameBoard';
import { addPuzzlesClickHandler } from './puzzlesClickHandler';

const getWords = () => {
  const level = document.querySelector('.selectbox-levels').textContent;
  const page = document.querySelector('.selectbox-pages').textContent;

  // const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;
  const idWord = (book1.length * (parseFloat(level) - 1) + parseFloat(page) * 10) - 10;

  const dataForOneGame = book1.slice(idWord, idWord + 10);
  const filterDataForOneGame = dataForOneGame.map(dataFilter);
  createGameBoard(filterDataForOneGame[0]);
  // const filterDataForOneGame = dataFilter(dataForOneGame);
  addPuzzlesClickHandler();
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
