import '../css/style.css';
import '../css/style.scss';

import { Authorization } from '../modules/autorization/authorization';
import { btnSignUpHandler } from '../modules/autorization/registration';
import { createAuthorizationLayout, createStartPage } from '../modules/autorization/createAuthorizationLayout';
import { btnSignInHandler } from '../modules/autorization/authorization';

import { btnStartHandler } from '../modules/autorization/start';

import { USER_ID, TOKEN } from '../modules/constants';





const uSerId = localStorage.getItem(USER_ID);

const init = () => {
  if (uSerId) {
    createStartPage();
    return;
  }

  createAuthorizationLayout();

document.querySelector('.btn-sign-in').onclick = (e) => {
  e.preventDefault();
  btnSignInHandler();
}

document.querySelector('.btn-sign-up').onclick = (e) => {
  e.preventDefault();
  btnSignUpHandler();
}

}

init();












// btnStartHandler();

































// const app =  document.querySelector('.app-container');

// if (app.id === 'main') {
//   const selectbox = document.querySelector(".selectbox");
//   const selectboxDisplay = document.querySelector(".selectbox__displayWord");
//   const submitbtn = document.querySelector(".form__submit-button");

//   const optionList = document.querySelectorAll(".option-container__option");

//   document.querySelector('.options-form').addEventListener("click", (e) => {
//     e.stopPropagation();
//     if (e.target.classList.contains('selectbox__displayWord')) {
//       console.log(e.target)
//       e.target.closest('.selectbox').classList.toggle("selectbox--active");
//     }
//   });
// }

// if (app.id === 'autorization') {
//   document.querySelector('.btn-sign-in').onclick = () => {
//     location.href = '../main.html';
//   }
// }
