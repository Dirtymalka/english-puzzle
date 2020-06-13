import '../css/style.css';
import '../css/style.scss';

import { createAuthorizationLayout, createStartPage } from '../modules/authorization/createAuthorizationLayout';

import { USER_ID, TOKEN, USERS } from '../modules/constants';
import { users, activeUser, loginUser, notLogin } from '../modules/authorization/authorization';


// users = [];
// const checking = users[users.length - 1];
// console.log(activeUser)
// activeUser = users[users.length - 1];

// const userId = activeUser.id;
// console.log(users[users.length - 1])

const init = () => {
  if (notLogin()) {
    // notLogin();
    createStartPage();
    return;
  }
  createAuthorizationLayout();
}

init();

window.addEventListener("unload", () => {
  localStorage.setItem(USERS ,JSON.stringify(users));
});








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
