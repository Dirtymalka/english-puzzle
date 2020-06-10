import { createStartPage } from './createAuthorizationLayout';
import { TOKEN, USER_ID } from '../constants';

const btnSignInHandler = () => {
  const eMail = document.querySelector('#e-mail-for-sign-in').value;
  const password = document.querySelector('#pass-for-sign-in').value;

  const user = {
    "email": eMail,
    "password": password
  }
  loginUser(user);
}



const loginUser = async user => {
  const url = 'https://afternoon-falls-25894.herokuapp.com/signin';
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  console.log(user);
  const content = await rawResponse.json();

  createStartPage();

  console.log(content);
  const token = content.token;
  const userId = content.userId;

  localStorage.setItem(TOKEN, token);
  localStorage.setItem(USER_ID, userId);
};

export { btnSignInHandler, loginUser };
