/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */

import { activeUser } from '../authorization/authorization';
import { getWords } from '../main/puzzle';
import { createSettingsLayout } from '../main/createSettings';

const createStatisticLayout = () => {
  const appContainer = document.querySelector('#mainPage');
  document.querySelector('#mainPage').innerHTML = '';
  const layout = `<div class="statistics">
            <div class="statistics-title">STATISTICS</div>
            <div class="statistics-results">
            </div>
            <div class="option-btn-results">
              <button class="button btn-continue">Continue</button>
            </div>
        </div>`;
  appContainer.insertAdjacentHTML('beforeend', layout);
  createStatistic();
  addButtonContinueHandler();
}


const createStatistic = () => {
  activeUser.statistics.forEach((result) => {
    const statisticResult = `<div class="statistic-result">${result}</div>`;
    document.querySelector('.statistics-results').insertAdjacentHTML('beforeend', statisticResult);
  })
}

const addButtonContinueHandler = () => {
  document.querySelector('.btn-continue').onclick = () => {
    createSettingsLayout();
    getWords();
  }
}


export { createStatisticLayout };
