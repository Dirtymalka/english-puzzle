import { NUMBER_OF_SENTENCE, WIDTH_OF_GAME_BOARD, LEVEL, PAGE } from '../constants';
import { createPuzzleElement, createPuzzles, mixWords, randomInteger } from './createGameBoard';
import { getWords } from './puzzle';

const btnCheckHandler = (data) => {
  const completedSentence = Array.from(document.querySelectorAll('.completed')).map((word) => word.textContent);
  const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);
  const checkSentence = data[numberOfSentence].text.split(' ');
  document.querySelectorAll('.completed').forEach((word) => {
    word.classList.remove('correct-word');
    word.classList.remove('un-correct-word');
  });
  document.querySelectorAll('.completed').forEach((word, index) => {
    if (word.textContent === checkSentence[index]) {
      word.classList.add('correct-word');
      return;
    }
    word.classList.add('un-correct-word');
  })
  if (document.querySelectorAll('.correct-word').length === checkSentence.length) {
    document.querySelector('.btn-check').classList.remove('show');
    document.querySelector('.btn-continue').classList.add('show');
    document.querySelectorAll('.correct-word').forEach((word) => {
      word.style.zIndex = '-1';
    });
  } else {
    document.querySelector('.btn-not-know').classList.add('show');
  }
}

const btnDontKnowHandler = (data) => {
  const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);
  const checkSentence = data[numberOfSentence].text.split(' ');
  const letterWidth = WIDTH_OF_GAME_BOARD / checkSentence.join('').length;
  document.querySelector(`#part-${parseFloat(numberOfSentence) + 1}`).innerHTML = '';
  checkSentence.forEach((word) => {
    const wordElement = createPuzzleElement(word, letterWidth);
    wordElement.classList.add('correct-word');
    document.querySelector(`#part-${parseFloat(numberOfSentence) + 1}`).append(wordElement);
  });
  document.querySelector('.puzzle-pieces').innerHTML = '';
  document.querySelector('.btn-check').classList.remove('show');
  document.querySelector('.btn-not-know').classList.remove('show');
  document.querySelector('.btn-continue').classList.add('show');
}

const btnContinueHandler = (data) => {
  const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);

  if (parseFloat(numberOfSentence) + 1 < 10) {
    document.querySelectorAll('.correct-word').forEach((word) => {
      word.classList.remove('correct-word');
      word.style.zIndex = '-1';
    });

    document.querySelectorAll('.puzzle-container_sentence').forEach((string) => {
      string.classList.remove('active-string');
    });

    document.querySelector(`#part-${parseFloat(numberOfSentence) + 2}`).classList.add('active-string');

    createPuzzles(data, parseFloat(numberOfSentence) + 1);
    document.querySelector('.btn-continue').classList.remove('show');
    document.querySelector('.btn-not-know').classList.add('show');

    return;
  }

  const pageNow = parseFloat(localStorage.getItem(PAGE));
  const levelNow = parseFloat(localStorage.getItem(LEVEL));

  if (levelNow === 6 && pageNow === 60) {
    return;
  }

  if (pageNow < 60) {
    document.querySelector('.selectbox-pages').textContent = pageNow + 1;
  } else {
    document.querySelector('.selectbox-levels').textContent = levelNow + 1;
    document.querySelector('.selectbox-pages').textContent = 1;
  }
  getWords();
}



const addButtonGameHandlers = (data) => {
  document.querySelector('.option-btn-game').onclick = (event) => {
    if (event.target.closest('.btn-check')) {
      btnCheckHandler(data);
    }
    if (event.target.closest('.btn-not-know')) {
      btnDontKnowHandler(data);
    }
    if (event.target.closest('.btn-continue')) {
      btnContinueHandler(data);
    }
  }
}


export { addButtonGameHandlers };
