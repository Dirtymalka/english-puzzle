import { WIDTH_OF_GAME_BOARD, INDEX_FIRST_SENTENCE, NUMBER_OF_SENTENCE, PRONUNCIATION_CLASS, TRANSLATION_CLASS, AUTO_PRONUNCIATION_CLASS, PICTURE_CLASS, ICON_CLASS_ACTIVE } from '../constants';
import { addPuzzlesClickHandler } from './puzzlesClickHandler';
import { addButtonOptionHandlers, addButtonSpeakHandler } from './buttonOptionsHandlers';
import { speakerHandler } from './speaker';

import { activeUser } from '../authorization/authorization';

const createGameBoard = (wordData) => {
  const firstSentence = wordData[INDEX_FIRST_SENTENCE];
  const sentenceText = firstSentence.textTranslate;
  const layout = `
  <div class="game-board-container">
    <div class="speaker"></div>
    <div class="sentence-text">${sentenceText}</div>
    <div class="puzzle-container">
      <div id="part-1" class="puzzle-container_sentence active-string"></div>
      <div id="part-2" class="puzzle-container_sentence"></div>
      <div id="part-3" class="puzzle-container_sentence"></div>
      <div id="part-4" class="puzzle-container_sentence"></div>
      <div id="part-5" class="puzzle-container_sentence"></div>
      <div id="part-6" class="puzzle-container_sentence"></div>
      <div id="part-7" class="puzzle-container_sentence"></div>
      <div id="part-8" class="puzzle-container_sentence"></div>
      <div id="part-9" class="puzzle-container_sentence"></div>
      <div id="part-10" class="puzzle-container_sentence"></div>
    </div>
    <div class="puzzle-pieces"></div>
    <div class="option-btn-game">
      <button class="button btn-game btn-not-know show">I don't know</button>
      <button class="button btn-game btn-check">Check</button>
      <button class="button btn-game btn-continue">Continue</button>
      <button class="button btn-game btn-result">Result</button>
    </div>
  </div>`;
  document.querySelector('.main').insertAdjacentHTML('afterbegin', layout);
  mixPuzzlesAndAppend(createPuzzles(wordData, INDEX_FIRST_SENTENCE));
  addButtonOptionHandlers();
  addButtonSpeakHandler(wordData);
}

const addHints = () => {
  if (activeUser.settings.pronunciation === ICON_CLASS_ACTIVE) {
    document.querySelector('.speaker').classList.add('visible');
    document.querySelector('.pronunciation-icon').classList.add('active-icon');
  } else {
    document.querySelector('.speaker').classList.remove('visible');
  }
  if (activeUser.settings.translation === ICON_CLASS_ACTIVE) {
    document.querySelector('.sentence-text').classList.add('visible');
    document.querySelector('.translation-icon').classList.add('active-icon');
  } else {
    document.querySelector('.sentence-text').classList.remove('visible');
  }
  if (activeUser.settings.picture === ICON_CLASS_ACTIVE) {
    document.querySelector('.picture-icon').classList.add(ICON_CLASS_ACTIVE);
    document.querySelectorAll('.word').forEach((word) => {
      word.classList.remove('not-image');
    })
  }





  // if (localStorage.getItem(PRONUNCIATION_CLASS) === ICON_CLASS_ACTIVE) {
  //   document.querySelector('.speaker').classList.add('visible');
  //   document.querySelector('.pronunciation-icon').classList.add('active-icon');
  // } else {
  //   document.querySelector('.speaker').classList.remove('visible');
  // }
  // if (localStorage.getItem(TRANSLATION_CLASS) === ICON_CLASS_ACTIVE) {
  //   document.querySelector('.sentence-text').classList.add('visible');
  //   document.querySelector('.translation-icon').classList.add('active-icon');
  // } else {
  //   document.querySelector('.sentence-text').classList.remove('visible');
  // }
  // if (localStorage.getItem(PICTURE_CLASS) === ICON_CLASS_ACTIVE) {
  //   document.querySelector('.picture-icon').classList.add(ICON_CLASS_ACTIVE);
  //   document.querySelectorAll('.word').forEach((word) => {
  //     word.classList.remove('not-image');
  //   })
  // }
}

const createPuzzles = (data, index) => {
  console.log('data for create:', data)
  localStorage.setItem(NUMBER_OF_SENTENCE, index);
  const { audioText } = data[index];
  const puzzles = data[index].text.split(' ');
  const letterWidth = WIDTH_OF_GAME_BOARD / puzzles.join('').length;
  const elementPuzzles = [];
  puzzles.forEach((word) => {
    const wordElement = createPuzzleElement(word, letterWidth, elementPuzzles);
    const wordElementWithBackground = addBackgroundForElements(wordElement, letterWidth, elementPuzzles)
    elementPuzzles.push(wordElementWithBackground);
  });
  console.log(elementPuzzles)
  document.querySelector('.sentence-text').textContent = data[index].textTranslate;

  // if (localStorage.getItem(AUTO_PRONUNCIATION_CLASS) === ICON_CLASS_ACTIVE) {
  //   document.querySelector('.auto-pronunciation-icon').classList.add('active-icon');
  //   setTimeout(() => speakerHandler(audioText), 500)
  // }

  if (activeUser.settings.autoPronunciation === ICON_CLASS_ACTIVE) {
    document.querySelector('.auto-pronunciation-icon').classList.add('active-icon');
    setTimeout(() => speakerHandler(audioText), 500)
  }

  return elementPuzzles;
}

const mixPuzzlesAndAppend = (puzzles) => {
  const mixPuzzles = mixWords(puzzles);
  document.querySelector('.puzzle-pieces').append(...mixPuzzles);
  addPuzzlesClickHandler();
  addHints();
}

const createPuzzleElement = (word, letterWidth) => {
  const wordElement = document.createElement('div');
  wordElement.className = 'word not-image';
  wordElement.textContent = word;
  wordElement.style.width = `${word.length * letterWidth}px`;

  return wordElement;
}

const addBackgroundForElements = (wordElement, letterWidth, elements) => {
  const url = addImageUrl();
  const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);
  const heightOfString = getComputedStyle(document.querySelector('.puzzle-pieces')).height;
  const coordY = `${parseFloat(heightOfString) * parseFloat(numberOfSentence)}px`;
  const coordX = elements.reduce((sum, item) => sum + parseFloat(item.style.width), 0);
  wordElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${url})`;
  wordElement.style.backgroundPosition = `-${coordX}px -${coordY}`;
  wordElement.style.backgroundSize = '860px 400px';
  wordElement.style.backgroundRepeat = 'no-repeat';
  return wordElement;
}

const addImageUrl = () => {
  const imageIndex = activeUser.imageIndex;
  // activeUser.imageIndex = activeUser.imageIndex < 150 ? activeUser.imageIndex + 1 : 1;

  const url = `/img/pictures/${imageIndex}.jpg`;
  return url;
}

const mixWords = (sentence) => {
  const newSentence = sentence.slice();
  const randomSentence = [];
  for (let i = newSentence.length - 1; i >= 0; i -= 1) {
    const randomIndex = randomInteger(0, i);
    randomSentence.push(newSentence[randomIndex]);
    newSentence.splice(randomIndex, 1);
  }
  return randomSentence;
}

const randomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export { createGameBoard, createPuzzleElement, createPuzzles, mixWords, randomInteger, mixPuzzlesAndAppend };
