import { LEVEL, PAGE, PRONUNCIATION_CLASS, TRANSLATION_CLASS, AUTO_PRONUNCIATION_CLASS, PICTURE_CLASS, ICON_CLASS_ACTIVE } from '../constants';
import { addButtonSelectHandler } from './buttonOptionsHandlers';
import { addTooltipHandler } from './tooltip';
import { createHeader } from './createHeader';
import { addLogOutHandler } from './logOut';

const createSettingsLayout = () => {
  // localStorage.setItem(PRONUNCIATION_CLASS, ICON_CLASS_ACTIVE);
  // localStorage.setItem(TRANSLATION_CLASS, ICON_CLASS_ACTIVE);
  // localStorage.setItem(AUTO_PRONUNCIATION_CLASS, ICON_CLASS_ACTIVE);


  const appContainer = document.querySelector('.app-container');
  document.querySelector('.app-container').innerHTML = '';
  const level = localStorage.getItem(LEVEL) || 1;
  const page = localStorage.getItem(PAGE) || 1;

  createHeader();
  const content = `<div id="mainPage">
  <div class="settings">
    <div class="settings__options">
      <div class="settings__options_container">
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
    <div class="settings__hints">
      <img class="settings__hints-icon pronunciation-icon" data-tooltip="pronunciation" src="./img/dynamic-icon.svg" alt="">
      <img class="settings__hints-icon translation-icon" data-tooltip="translation" src="./img/translation-icon.svg" alt="">
      <img class="settings__hints-icon auto-pronunciation-icon" data-tooltip="auto-pronunciation" src="./img/note-icon.svg" alt="">
      <img class="settings__hints-icon picture-icon" data-tooltip="show image" src="./img/image-icon.svg" alt="">
    </div>
  </div>
  <main class="main">
  </main>
</div>`;
  appContainer.insertAdjacentHTML('beforeend', content);
  createLevels();
  createPages();
  addButtonSelectHandler();
  addTooltipHandler();
  addStartOptions();
  addLogOutHandler();
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

const addStartOptions = () => {
  if (!localStorage.getItem(PRONUNCIATION_CLASS)) {
    localStorage.setItem(PRONUNCIATION_CLASS, ICON_CLASS_ACTIVE);
    document.querySelector('.pronunciation-icon').classList.add('active-icon');
  }
  if (!localStorage.getItem(TRANSLATION_CLASS)) {
    localStorage.setItem(TRANSLATION_CLASS, ICON_CLASS_ACTIVE);
    document.querySelector('.translation-icon').classList.add('active-icon');
  }
  if (!localStorage.getItem(AUTO_PRONUNCIATION_CLASS)) {
    localStorage.setItem(AUTO_PRONUNCIATION_CLASS, ICON_CLASS_ACTIVE);
    document.querySelector('.auto-pronunciation-icon').classList.add('active-icon');
  }
}

export { createSettingsLayout };
