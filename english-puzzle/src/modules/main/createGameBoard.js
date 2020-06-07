import { WIDTH_OF_GAME_BOARD, INDEX_FIRST_SENTENCE, NUMBER_OF_SENTENCE } from '../constants';
import { addPuzzlesClickHandler } from './puzzlesClickHandler';
import { addButtonOptionHandlers } from './buttonOptionsHandlers';

const createGameBoard = (wordData) => {
  const firstSentence = wordData[INDEX_FIRST_SENTENCE];
  // const sentenceText = document.querySelector('.translation-icon').classList.contains('active-icon') ? firstSentence.textTranslate : '';
  const sentenceText = firstSentence.textTranslate;
  const layout = `
  <div class="game-board-container">
    <div class="speaker visible"></div>
    <div class="sentence-text visible">${sentenceText}</div>
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
  createPuzzles(wordData, INDEX_FIRST_SENTENCE);
  addButtonOptionHandlers();
}

const createPuzzles = (data, index) => {
  localStorage.setItem(NUMBER_OF_SENTENCE, index);
  const puzzles = data[index].text.split(' ');
  const mixPuzzles = mixWords(puzzles);
  const letterWidth = WIDTH_OF_GAME_BOARD / puzzles.join('').length;
  mixPuzzles.forEach((word) => {
    const wordElement = createPuzzleElement(word, letterWidth);
    document.querySelector('.puzzle-pieces').append(wordElement);
  });
  addPuzzlesClickHandler(data);
}

const createPuzzleElement = (word, letterWidth) => {
  const wordElement = document.createElement('div');
  wordElement.className = 'word';
  wordElement.textContent = word;
  wordElement.style.width = `${word.length * letterWidth}px`;
  return wordElement;
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

export { createGameBoard, createPuzzleElement, createPuzzles, mixWords, randomInteger };
