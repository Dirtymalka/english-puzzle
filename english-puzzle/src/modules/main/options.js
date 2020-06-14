/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */

import { activeUser } from '../authorization/authorization';

const addHandlersOnOptionMenu = () => {
  const optionList = document.querySelectorAll('.option-container__option');
  document.querySelector('.options-form').onclick = (event) => {
    event.stopPropagation();

    if (event.target.closest('.selectbox')) {
      if (event.target.closest('.selectbox').classList.contains('selectbox--active')) {
        event.target.closest('.selectbox').classList.remove('selectbox--active');
        event.target.closest('.selectbox__displayWord').classList.remove('selectbox__display--active');
        return;
      }
      document.querySelectorAll('.selectbox').forEach((item) => {
        item.classList.remove('selectbox--active');
      });
      document.querySelectorAll('.selectbox__displayWord').forEach((item) => {
        item.classList.remove('selectbox__display--active');
      });
      event.target.closest('.selectbox').classList.toggle('selectbox--active');
      event.target.closest('.selectbox__displayWord').classList.toggle('selectbox__display--active');

    }
  }
  optionList.forEach((option) => {
    option.addEventListener('click', (e) => {
      try {
        e.stopPropagation();
        const label = option.querySelector("label");
        document.querySelector('.selectbox__display--active').innerHTML = label.innerHTML;
        document.querySelector('.selectbox--active').setAttribute('data-option', label.getAttribute('data-value'));
        document.querySelector('.selectbox--active').classList.remove('selectbox--active', 'selectbox--unselect');
        document.querySelector('.selectbox__display--active').classList.remove('selectbox__display--active');
        choosePagesCompleted();
      } catch (error) {
        return;
      }
    });
  });

  window.addEventListener('click', () => {
    document.querySelectorAll('.selectbox').forEach((item) => {
      item.classList.remove('selectbox--active');
    });
  });
}

const choosePagesCompleted = () => {
  const level = document.querySelector('.selectbox-levels').textContent;
  const pages = document.querySelector('.option-container-pages').children;
  const levelPages = activeUser.complete.filter((item) => item.level === parseFloat(level));

  pages.forEach((page) => page.classList.remove('completed-page'))

  levelPages.forEach((page) => {
    const index = parseFloat(page.page) - 1;
    pages[index].classList.add('completed-page');
  });
}

export { addHandlersOnOptionMenu, choosePagesCompleted };
