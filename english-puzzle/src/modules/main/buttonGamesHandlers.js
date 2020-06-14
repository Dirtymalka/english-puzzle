/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */

import { NUMBER_OF_SENTENCE } from '../constants';
import { createPuzzles, mixPuzzlesAndAppend } from './createGameBoard';
import { getWords } from './puzzle';
import { speakerHandler } from './speaker';
import resultSentences from '../statistics/dataStatistics'
import { createRoundStatisticLayout } from '../statistics/roundStatistic';
import { activeUser } from '../authorization/authorization';


const btnCheckHandler = (data) => {
  const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);
  const checkSentence = data[numberOfSentence].text.split(' ');
  document.querySelectorAll('.completed').forEach((word) => {
    word.classList.remove('correct-word');
    word.classList.remove('un-correct-word');
  });
  const sentenceContainer = document.querySelector(`#part-${parseFloat(numberOfSentence) + 1}`);
  sentenceContainer.querySelectorAll('.completed').forEach((word, index) => {
    if (word.textContent === checkSentence[index]) {
      word.classList.add('correct-word');
      return;
    }
    word.classList.add('un-correct-word');
  })

  if (document.querySelectorAll('.correct-word').length === checkSentence.length) {
    document.querySelector('.btn-check').classList.remove('show');
    document.querySelector('.btn-continue').classList.add('show');

    if (!document.querySelector('.sentence-text').classList.contains('visible')) {
      document.querySelector('.sentence-text').classList.add('visible');
    }

    if (!document.querySelector('.speaker').classList.contains('visible')) {
      document.querySelector('.speaker').classList.add('visible');
    }

    speakerHandler(data[numberOfSentence].audioText);

    document.querySelectorAll('.correct-word').forEach((word) => {
      word.style.zIndex = '-1';
      word.classList.remove('not-image');
    });

    resultSentences.know.push({ sentence: Array.from(document.querySelectorAll('.correct-word')).map((word) => word.textContent).join(' '), speaker: data[numberOfSentence].audioText });
  } else {
    document.querySelector('.btn-not-know').classList.add('show');
  }
}

const btnDontKnowHandler = (data) => {
  const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);
  document.querySelector(`#part-${parseFloat(numberOfSentence) + 1}`).innerHTML = '';

  const puzzles = createPuzzles(data, numberOfSentence);
  puzzles.forEach((word) => {
    word.classList.add('correct-word');
    word.classList.remove('not-image');
    word.classList.add('done');
    document.querySelector(`#part-${parseFloat(numberOfSentence) + 1}`).append(word);
  });

  resultSentences.dontKnow.push({ sentence: Array.from(document.querySelectorAll('.correct-word')).map((word) => word.textContent).join(' '), speaker: data[numberOfSentence].audioText });

  if (!document.querySelector('.sentence-text').classList.contains('visible')) {
    document.querySelector('.sentence-text').classList.add('visible');
  }

  if (!document.querySelector('.speaker').classList.contains('visible')) {
    document.querySelector('.speaker').classList.add('visible');
  }

  if (!document.querySelector('.auto-pronunciation-icon').classList.contains('active-icon')) {
    speakerHandler(data[numberOfSentence].audioText);
  }

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
      word.classList.add('done');
    });

    document.querySelectorAll('.puzzle-container_sentence').forEach((string) => {
      string.classList.remove('active-string');
    });

    document.querySelector(`#part-${parseFloat(numberOfSentence) + 2}`).classList.add('active-string');

    const puzzles = createPuzzles(data, parseFloat(numberOfSentence) + 1);
    mixPuzzlesAndAppend(puzzles)

    document.querySelector('.btn-continue').classList.remove('show');
    document.querySelector('.btn-not-know').classList.add('show');
    return;
  }

  const pageNow = parseFloat(activeUser.lastPage);
  const levelNow = parseFloat(activeUser.lastLevel);

  if (document.querySelector('.puzzle-container').classList.contains('complited-puzzle')) {

    document.querySelector('.puzzle-container').classList.remove('complited-puzzle');
    document.querySelector('.btn-result').classList.remove('show');

    if (levelNow === 6 && pageNow === 60) {
      return;
    }

    if (pageNow < 60) {
      document.querySelector('.selectbox-pages').textContent = pageNow + 1;
      activeUser.lastPage = pageNow + 1;
    } else {
      document.querySelector('.selectbox-levels').textContent = levelNow + 1;
      document.querySelector('.selectbox-pages').textContent = 1;
      activeUser.lastPage = 1;
      activeUser.lastLevel = levelNow + 1;
    }

    activeUser.imageIndex = activeUser.imageIndex < 150 ? activeUser.imageIndex + 1 : 1;
    getWords();
    return;
  }

  if (parseFloat(numberOfSentence) + 1 === 10) {
    document.querySelectorAll('.word').forEach((word) => {
      word.style.border = '0px';
      word.textContent = '';
      word.classList.remove('correct-word');
    });
    document.querySelector('.puzzle-container').classList.add('complited-puzzle');
    document.querySelector('.btn-result').classList.add('show');
    addStatisticsData(pageNow, levelNow);
  }
}

const addStatisticsData = (page, level) => {
  const options = {
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  const date = new Date();
  const dateString = date.toLocaleString('en', options);

  const statisticsField = `${dateString}:  Level: ${level}, Page: ${page} - I don't know: ${resultSentences.dontKnow.length}; I know: ${resultSentences.know.length}`;
  activeUser.complete.push( { level, page } );
  document.querySelector('.option-container-pages').children[page-1].classList.add('completed-page');
  activeUser.statistics.push(statisticsField);
}

const btnResultHandler = () => {
  const pageNow = parseFloat(activeUser.lastPage);
  const levelNow = parseFloat(activeUser.lastLevel);
  if (levelNow === 6 && pageNow === 60) {
    return;
  }

  if (pageNow < 60) {
    activeUser.lastPage = pageNow + 1;
  } else {
    activeUser.lastPage = 1;
    activeUser.lastLevel = levelNow + 1;
  }

  document.querySelector('.puzzle-container').classList.remove('complited-puzzle');
  document.querySelector('.btn-result').classList.remove('show');
  createRoundStatisticLayout();
  activeUser.imageIndex = activeUser.imageIndex < 150 ? activeUser.imageIndex + 1 : 1;
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
    if (event.target.closest('.btn-result')) {
      btnResultHandler();
    }
  }
}


export { addButtonGameHandlers };
