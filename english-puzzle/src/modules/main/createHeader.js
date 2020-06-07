import { LEVEL, PAGE } from '../constants';
import { addButtonSelectHandler } from './buttonOptionsHandlers';

const createHeaderLayout = () => {
  const appContainer = document.querySelector('.app-container');
  appContainer.innerHTML = '';
  const level = localStorage.getItem(LEVEL) || 1;
  const page = localStorage.getItem(PAGE) || 1;
  const content = `<div id="mainPage">
  <header class="header">
    <div class="header__options">
      <div class="header__options_container">
        <form class="options-form">
        <span>Levels:</span>
          <div class="selectbox selectbox--unselect" data-option="">
            <div class="selectbox__displayWord selectbox-levels">${level}</div>
            <div class="option-container option-container-levels">
            </div>
          </div>
          <span>Pages:</span>
          <div class="selectbox selectbox--unselect" data-option="">
            <div class="selectbox__displayWord selectbox-pages">${page}</div>
            <div class="option-container option-container-pages">
            </div>
          </div>
          <button class="btn-level-select" type="button">Select</button>
        </form>
      </div>
    </div>
    <div class="header__hints">
      <img class="header__hints-icon pronunciation-icon active-icon" src="./img/dynamic-icon.svg" alt="">
      <img class="header__hints-icon translation-icon active-icon" src="./img/translation-icon.svg" alt="">
      <img class="header__hints-icon auto-pronunciation-icon active-icon" src="./img/note-icon.svg" alt="">
      <img class="header__hints-icon image-icon" src="./img/image-icon.svg" alt="">
    </div>
  </header>
  <main class="main">
  </main>
</div>`;
  appContainer.insertAdjacentHTML('afterbegin', content);
  createLevels();
  createPages();
  addButtonSelectHandler();
}

const createLevels = () => {
  const opinionContainer = document.querySelector('.option-container-levels');

  for (let i = 1; i <= 6; i += 1) {
    const option = `
              <div class="option-container__option">
                <input type="radio" class="option__radio" id="${i}" name="category">
                <label class="option__label" for="${i}">${i}</label>
              </div>`;
    opinionContainer.insertAdjacentHTML('beforeend', option);
  }
}

const createPages = () => {
  const opinionContainer = document.querySelector('.option-container-pages');

  for (let i = 1; i <= 60; i += 1) {
    const option = `
              <div class="option-container__option">
                <input type="radio" class="option__radio" id="${i}" name="category">
                <label class="option__label" for="${i}">${i}</label>
              </div>`;
    opinionContainer.insertAdjacentHTML('beforeend', option);
  }
}

export { createHeaderLayout };
