/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */

import { addLogOutHandler } from './logOut';
import { activeUser } from '../authorization/authorization'

const createHeader = () => {
  const userName = activeUser.userName[0];
  const headerLayout = `
        <header class="header">
            <div class="title">english puzzle</div>
            <div class="log-out"><button class='button btn-log-out'>Log Out</button><button class='button btn-statistic'>Statistic</button><span class="name-letter">${userName}</span></div>
        </header>`;
  document.querySelector('.app-container').insertAdjacentHTML('afterbegin', headerLayout);
  addLogOutHandler();
}

export { createHeader };
