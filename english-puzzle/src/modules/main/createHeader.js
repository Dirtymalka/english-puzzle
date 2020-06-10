import { USER_NAME } from '../constants';

const createHeader = () => {
  const userName = localStorage.getItem(USER_NAME)[0];
  const headerLayout = `
        <header class="header">
            <div class="title">english puzzle</div>
            <div class="log-out"><button class='button btn-log-out'>Log Out</button><span class="name-letter">${userName}</span></div>
        </header>`;
  document.querySelector('.app-container').insertAdjacentHTML('afterbegin', headerLayout);
}

export { createHeader };
