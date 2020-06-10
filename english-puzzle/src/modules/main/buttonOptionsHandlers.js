import { NUMBER_OF_SENTENCE, WIDTH_OF_GAME_BOARD, ICON_CLASS, ICON_CLASS_ACTIVE, PRONUNCIATION_CLASS, TRANSLATION_CLASS, AUTO_PRONUNCIATION_CLASS, PICTURE_CLASS } from '../constants';
// import { createPuzzleElement, createPuzzles, mixWords, randomInteger } from './createGameBoard';
import { speakerHandler } from './speaker';
import { getWords } from './puzzle';

const btnPronunciationHandler = () => {
  document.querySelector('.pronunciation-icon').classList.toggle('active-icon');
  if (document.querySelector('.pronunciation-icon').classList.contains('active-icon')) {
    document.querySelector('.speaker').classList.add('visible');
  } else {
    document.querySelector('.speaker').classList.remove('visible');
  }
  setOptionsToLocalStorage('pronunciation');
}

const btnTranslationHandler = () => {
  document.querySelector('.translation-icon').classList.toggle('active-icon');
  if (document.querySelector('.translation-icon').classList.contains('active-icon')) {
    document.querySelector('.sentence-text').classList.add('visible');
  } else {
    document.querySelector('.sentence-text').classList.remove('visible');
  }

  setOptionsToLocalStorage('translation');
}

const btnAutoPronunciationHandler = () => {
  document.querySelector('.auto-pronunciation-icon').classList.toggle('active-icon');
  setOptionsToLocalStorage('auto-pronunciation');
}

const btnImageHandler = () => {
  document.querySelector('.picture-icon').classList.toggle('active-icon');
  setOptionsToLocalStorage('picture');
  document.querySelectorAll('.word').forEach((word) => {
    if (!word.classList.contains('done')) {
      word.classList.toggle('not-image');
    }
  })
}

const addButtonOptionHandlers = () => {
  document.querySelector('.settings__hints').onclick = (event) => {
    if (event.target.closest('.pronunciation-icon')) {
      btnPronunciationHandler();
    }
    if (event.target.closest('.translation-icon')) {
      btnTranslationHandler();
    }
    if (event.target.closest('.auto-pronunciation-icon')) {
      btnAutoPronunciationHandler();
    }
    if (event.target.closest('.picture-icon')) {
      btnImageHandler();
    }
  }
}

const addButtonSelectHandler = () => {
  document.querySelector('.btn-level-select').onclick = () => {
    getWords();
  }
}

const addButtonSpeakHandler = (data) => {
  document.querySelector('.speaker').onclick = () => {
    const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);
    const audio = data[numberOfSentence].audioText;
    speakerHandler(audio);
  }
}

const setOptionsToLocalStorage = (name) => {
  const icons = {
    'pronunciation': PRONUNCIATION_CLASS,
    'translation': TRANSLATION_CLASS,
    'auto-pronunciation': AUTO_PRONUNCIATION_CLASS,
    'picture': PICTURE_CLASS
  }

  switch (document.querySelector(`.${name}-icon`).classList.contains('active-icon')) {
    case true:
      localStorage.setItem(icons[name], ICON_CLASS_ACTIVE);
      break;
    case false:
      localStorage.setItem(icons[name], ' ');
      break;
    default:
      break;
  }
}

export { addButtonOptionHandlers, addButtonSelectHandler, addButtonSpeakHandler };
