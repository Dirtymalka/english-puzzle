/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */

import { NUMBER_OF_SENTENCE, ICON_CLASS_ACTIVE } from '../constants';
import { speakerHandler } from './speaker';
import { getWords } from './puzzle';
import { activeUser } from '../authorization/authorization';

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
    const level = document.querySelector('.selectbox-levels').textContent;
    const page = document.querySelector('.selectbox-pages').textContent;
    activeUser.lastLevel = level;
    activeUser.lastPage = page;
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
    'pronunciation': 'pronunciation',
    'translation': 'translation',
    'auto-pronunciation': 'autoPronunciation',
    'picture': 'picture'
  }

  switch (document.querySelector(`.${name}-icon`).classList.contains('active-icon')) {
    case true:
      activeUser.settings[icons[name]] = ICON_CLASS_ACTIVE;
      break;
    case false:
      activeUser.settings[icons[name]] = null;
      break;
    default:
      break;
  }
}

export { addButtonOptionHandlers, addButtonSelectHandler, addButtonSpeakHandler };
