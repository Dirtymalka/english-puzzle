import { createStartPage } from './createAuthorizationLayout';
import { loginUser } from './authorization';
import { USER_NAME } from '../constants';

const btnSignUpHandler = () => {
  const eMail = document.querySelector('#e-mail-for-sign-up').value;
  const password = document.querySelector('#pass-for-sign-up').value;
  const userName = document.querySelector('#user-name').value;
  localStorage.setItem(USER_NAME, userName);


  if (!eMail.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9-]+.+.[A-Za-z]{2,4}$/)) {
    console.log('bad e-mail')
    return;
  }
  if (!password.match(/^[A-Za-z+-_@$!%*?&#.,;:[\]{}]{8,16}$/)) {
    console.log('bad pass');
    return;
  }
  const user = {
    "email": eMail,
    "password": password
  }
  createUser(user, userName);
}



const createUser = async (user, userName) => {
  const url = 'https://afternoon-falls-25894.herokuapp.com/users';
  try {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const content = await rawResponse.json();

    await loginUser(user, userName);

    console.log(content);
  } catch (error) {
    console.log(error);
  }

};

export { btnSignUpHandler };
