import { WIDTH_OF_GAME_BOARD } from '../constants';

const createGameBoard = (wordData) => {
  const layout = `
  <div class="game-board-container">
    <div class="speaker"></div>
    <div class="sentence-text">${wordData.textTranslate}</div>
    <div class="puzzle-container">
      <div data-id="1" class="puzzle-container_sentence"></div>
      <div data-id="2" class="puzzle-container_sentence"></div>
      <div data-id="3" class="puzzle-container_sentence"></div>
      <div data-id="4" class="puzzle-container_sentence"></div>
      <div data-id="5" class="puzzle-container_sentence"></div>
      <div data-id="6" class="puzzle-container_sentence"></div>
      <div data-id="7" class="puzzle-container_sentence"></div>
      <div data-id="8" class="puzzle-container_sentence"></div>
      <div data-id="9" class="puzzle-container_sentence"></div>
      <div data-id="10" class="puzzle-container_sentence"></div>
    </div>
    <div class="puzzle-pieces"></div>
    <div class="option-btn-game">
      <button class=" button">I don't know</button>
    </div>
  </div>`;
  document.querySelector('.main').insertAdjacentHTML('afterbegin', layout);
  createPuzzles(wordData.text);
}

const createPuzzles = (sentence) => {
  const puzzles = sentence.split(' ');
  const letterWidth = WIDTH_OF_GAME_BOARD / puzzles.join('').length;
  puzzles.forEach((word) => {
    const wordElement = document.createElement('div');
    wordElement.className = 'word';
    wordElement.textContent = word;
    wordElement.style.width = `${word.length * letterWidth}px`;
    document.querySelector('.puzzle-pieces').append(wordElement);
  });
}

export { createGameBoard };
