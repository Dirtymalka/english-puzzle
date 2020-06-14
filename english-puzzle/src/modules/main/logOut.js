/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */

import { createAuthorizationLayout } from '../authorization/createAuthorizationLayout';
import { USERS } from '../constants';
import { users } from '../authorization/authorization';
import { createStatisticLayout } from '../statistics/mainStatistic';

const addLogOutHandler = () => {
  document.querySelector('.log-out').onclick = (event) => {
    if (event.target.closest('.log-out')) {
      document.querySelector('.btn-log-out').classList.toggle('show');
      document.querySelector('.btn-statistic').classList.toggle('show');
    }
    if (event.target.closest('.btn-log-out')) {
      document.querySelector('.app-container').innerHTML = '';
      localStorage.setItem(USERS ,JSON.stringify(users));
      createAuthorizationLayout();
    }
    if (event.target.closest('.btn-statistic')) {
      event.stopPropagation();
      createStatisticLayout();
    }
  }
}


export { addLogOutHandler };
