// import { NUMBER_OF_SENTENCE, WIDTH_OF_GAME_BOARD } from '../constants';
// import { createPuzzleElement, createPuzzles, mixWords, randomInteger } from './createGameBoard';

import { getWords } from './puzzle';

const btnPronunciationHandler = () => {
  document.querySelector('.pronunciation-icon').classList.toggle('active-icon');
  document.querySelector('.speaker').classList.toggle('visible');
}

const btnTranslationHandler = () => {
  document.querySelector('.translation-icon').classList.toggle('active-icon');
  document.querySelector('.sentence-text').classList.toggle('visible');
}

const btnAutoPronunciationHandler = () => {
  document.querySelector('.auto-pronunciation-icon').classList.toggle('active-icon');
}

const btnImageHandler = () => {
  document.querySelector('.image-icon').classList.toggle('active-icon');
}

const addButtonOptionHandlers = () => {
  document.querySelector('.header__hints').onclick = (event) => {
    if (event.target.closest('.pronunciation-icon')) {
      btnPronunciationHandler();
    }
    if (event.target.closest('.translation-icon')) {
      btnTranslationHandler();
    }
    if (event.target.closest('.auto-pronunciation-icon')) {
      btnAutoPronunciationHandler();
    }
    if (event.target.closest('.image-icon')) {
      btnImageHandler();
    }
  }
}

const addButtonSelectHandler = () => {
  document.querySelector('.btn-level-select').onclick = () => {
    getWords();
  }
}

export { addButtonOptionHandlers, addButtonSelectHandler };
