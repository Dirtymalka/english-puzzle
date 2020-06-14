/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */

import resultSentences from './dataStatistics';
import { getWords } from '../main/puzzle';
import { createSettingsLayout } from '../main/createSettings';
import { activeUser } from '../authorization/authorization';
import { createStatisticLayout } from './mainStatistic';

const createRoundStatisticLayout = () => {
  const appContainer = document.querySelector('#mainPage');
  document.querySelector('#mainPage').innerHTML = '';
  const layout = `<div class="statistics-round">
            <div class="picture"><img src="/img/pictures/${activeUser.imageIndex}.jpg"></img></div>
            <div class="round-results">
              <div class="dont-know result">
                <div class="dont-know__title result-title">I don't know</div>
              </div>
              <div class="know result">
                <div class="know-title result-title">I know</div>
              </div>
            </div>
            <div class="option-btn-results">
              <button class="button btn-continue">Continue</button>
              <button class="button btn-statistic">Statistic</button>
            </div>
        </div>`;
  appContainer.insertAdjacentHTML('beforeend', layout);
  createRoundStatistic(resultSentences);
  addButtonResultsHandlers();
  btnSpeakerHandler();
}

const createRoundStatistic = (roundData) => {
  roundData.dontKnow.forEach((item, index) => {
    const fragment = `
      <div class="dont-know__content result-content">
        <div class="dont-know__speaker speaker" data-index="${index}"></div>
        <div class="dont-know__sentence">${item.sentence}</div>
      </div>`;
    document.querySelector('.dont-know').insertAdjacentHTML('beforeend', fragment);
  });

  roundData.know.forEach((item, index) => {
    const fragment = `
      <div class="know__content result-content">
        <div class="know__speaker speaker" data-index="${index}"></div>
        <div class="know__sentence">${item.sentence}</div>
      </div>`;
    document.querySelector('.know').insertAdjacentHTML('beforeend', fragment);
  });
}

const addButtonResultsHandlers = () => {
  document.querySelector('.option-btn-results').onclick = (event) => {
    resultSentences.dontKnow = [];
    resultSentences.know = [];
    if (event.target.closest('.btn-continue')) {
      btnContinueHandler();
    }
    if (event.target.closest('.btn-statistic')) {
      createStatisticLayout();
    }
  }
}

const btnContinueHandler = () => {
  createSettingsLayout();
  getWords();
}

const btnSpeakerHandler = () => {
  document.querySelectorAll('.speaker').forEach((speaker) => {
    speaker.onclick = () => {
      const dataIndex = speaker.dataset.index;
      if (speaker.classList.contains('dont-know__speaker')) {
        const url = `https://raw.githubusercontent.com/Dirtymalka/rslang-data/master/${resultSentences.dontKnow[dataIndex].speaker}`;
        const newAudio = new Audio(url);
        newAudio.play();
      }
      if (speaker.classList.contains('know__speaker')) {
        const url = `https://raw.githubusercontent.com/Dirtymalka/rslang-data/master/${resultSentences.know[dataIndex].speaker}`;
        const newAudio = new Audio(url);
        newAudio.play();
      }
    }
  })
}


export { createRoundStatisticLayout };
