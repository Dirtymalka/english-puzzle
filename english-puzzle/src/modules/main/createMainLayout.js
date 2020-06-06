const createMainLayout = () => {
  const appContainer = document.querySelector('.app-container');
  appContainer.innerHTML = '';
  const content = `<div id="mainPage">
  <header class="header">
    <div class="header__options">
      <div class="header__options_container">
        <form class="options-form">
          <div class="selectbox selectbox--unselect" data-option="">
            <div class="selectbox__displayWord selectbox-levels">
              1
            </div>
            <div class="option-container option-container-levels">
            </div>
          </div>
          <div class="selectbox selectbox--unselect" data-option="">
            <div class="selectbox__displayWord selectbox-pages">
              1
            </div>
            <div class="option-container option-container-pages">
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
  </main>
</div>`;
  appContainer.insertAdjacentHTML('afterbegin', content);
  createLevels();
  createPages();
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

export { createMainLayout };
