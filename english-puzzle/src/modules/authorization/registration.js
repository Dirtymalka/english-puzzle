/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */

import { loginUser } from './authorization';

const btnSignUpHandler = () => {
  const eMail = document.querySelector('#e-mail-for-sign-up').value;
  const password = document.querySelector('#pass-for-sign-up').value;
  const userName = document.querySelector('#user-name').value;

  document.querySelector('#user-name').classList.remove('error');
  document.querySelector('#e-mail-for-sign-up').classList.remove('error');
  document.querySelector('#pass-for-sign-up').classList.remove('error');


  if (!userName.match(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/)) {
    console.log('bad name');
    document.querySelector('#user-name').classList.add('error');
    return;
  }

  if (!eMail.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9-]+.+.[A-Za-z]{2,4}$/)) {
    console.log('bad e-mail');
    document.querySelector('#e-mail-for-sign-up').classList.add('error');
    return;
  }

  if (!password.match(/^[A-Za-z+-_@$!%*?&#.,;:[\]{}]{8,16}$/)) {
    document.querySelector('#pass-for-sign-up').classList.add('error');
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
    errorHandler();
  }
};

const errorHandler = () => {
  document.querySelector('#e-mail-for-sign-up').classList.add('error');
  document.querySelector('#pass-for-sign-up').classList.add('error');
}

export { btnSignUpHandler };
