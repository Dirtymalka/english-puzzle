import { createStartPage } from './createAuthorizationLayout';
import { TOKEN, USER_ID, USERS } from '../constants';

import { USER_DEFAULT, USERS_DEFAULT } from '../dataUser';

const users = JSON.parse(localStorage.getItem(USERS)) || USERS_DEFAULT.slice();
let activeUser = {};

const btnSignInHandler = () => {
  const eMail = document.querySelector('#e-mail-for-sign-in').value;
  const password = document.querySelector('#pass-for-sign-in').value;

  const user = {
    "email": eMail,
    "password": password
  }
  loginUser(user);
}



const loginUser = async (user, userName) => {
  const url = 'https://afternoon-falls-25894.herokuapp.com/signin';
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const content = await rawResponse.json();

  const token = content.token;
  const userId = content.userId;

  localStorage.setItem(TOKEN, token);
  localStorage.setItem(USER_ID, userId);

  const registeredUser = checkUser(userId);

  if (registeredUser) {
    activeUser = registeredUser;
    users.push(activeUser);
  } else {
    activeUser = Object.assign(USER_DEFAULT);
    activeUser.id = userId;
    activeUser.userName = userName || 'U';
    users.push(activeUser);
  }

  createStartPage();

};

const checkUser = (userId) => {
  let checkedUser = null;
  users.forEach((user, index) => {
    if (user.id === userId) {
      [checkedUser] = users.splice(index, 1);
    }
  });
  return checkedUser;
}

const notLogin = () => {
  activeUser = users[users.length - 1];
  return activeUser;
}

export { btnSignInHandler, loginUser, activeUser, users, notLogin };
