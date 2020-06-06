/* eslint no-param-reassign: 'error' */
/* eslint class-methods-use-this: ['error', { 'exceptMethods': ['render'] }] */

class Game {
  constructor() {
    this.appContainer = document.querySelector('.app-container');
  }

  render() {
    this.appContainer.innerHTML = '';
    const layout = `<div id="mainPage">
    <header class="header">
      <div class="header__options">
        <div class="header__options_container">
          <form class="options-form">
            <div class="selectbox selectbox--unselect" data-option="">
              <div class="selectbox__displayWord">
                --Level--
              </div>
              <div class="option-container">
                <div class="option-container__option">
                  <input type="radio" class="option__radio" id="1100" name="category">
                  <label class="option__label" for="1100" data-value="11:00">11:00</label>
                </div>
                <div class="option-container__option">
                  <input type="radio" class="option__radio" id="1200" name="category">
                  <label class="option__label" for="1200" data-value="12:00">12:00</label>
                </div>
                <div class="option-container__option">
                  <input type="radio" class="option__radio" id="1300" name="category">
                  <label class="option__label" for="1300" data-value="13:00">13:00</label>
                </div>
              </div>
            </div>
            <div class="selectbox selectbox--unselect" data-option="">
              <div class="selectbox__displayWord">
                --Page--
              </div>
              <div class="option-container">
                <div class="option-container__option">
                  <input type="radio" class="option__radio" id="1100" name="category">
                  <label class="option__label" for="1100" data-value="11:00">11:00</label>
                </div>
                <div class="option-container__option">
                  <input type="radio" class="option__radio" id="1200" name="category">
                  <label class="option__label" for="1200" data-value="12:00">12:00</label>
                </div>
                <div class="option-container__option">
                  <input type="radio" class="option__radio" id="1300" name="category">
                  <label class="option__label" for="1300" data-value="13:00">13:00</label>
                </div>
              </div>
            </div>
            <button class="form__submit-button" type="button">Submit</button>
          </form>
        </div>
      </div>
      <div class="header__hints">
        <img class="header__hints-icon dynamic-icon" src="./img/dynamic-icon.svg" alt="">
        <img class="header__hints-icon translation-icon" src="./img/translation-icon.svg" alt="">
        <img class="header__hints-icon note-icon" src="./img/note-icon.svg" alt="">
        <img class="header__hints-icon image-icon" src="./img/image-icon.svg" alt="">
      </div>
    </header>
    <main class="main">
      <div class="dynamic-layout"></div>
      <div class="translation-layout"></div>
      <div class="main-content"></div>
      <button></button>
    </main>
  </div>`;
    this.appContainer.insertAdjacentHTML('afterbegin', layout);
  }
}


export { Game };
