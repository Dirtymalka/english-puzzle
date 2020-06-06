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
  const userId = content.userId.id;

  localStorage.setItem(TOKEN, token);
  localStorage.setItem(USER_ID, userId);


  // const createUserWord = async ({ userI, wordId, word }) => {
  //   const raw = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userI}/words/${wordId}`, {
  //     method: 'POST',
  //     withCredentials: true,
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(word)
  //   });
  //   const conten = await raw.json();

  //   console.log(conten);
  // };

  // await createUserWord({
  //   userId: userId,
  //   wordId: "5e9f5ee35eb9e72bc21af716",
  //   word: { "difficulty": "weak", "optional": { testFieldString: 'test', testFieldBoolean: true } }
  // });
};

export { btnSignInHandler };


// const token = localStorage.getItem(TOKEN);
// const createUserWord = async ({ userId, wordId, word }) => {
//   const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/users/${userId}/words/${wordId}`, {
//     method: 'POST',
//     withCredentials: true,
//     headers: {
//       'Authorization': `Bearer ${token}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(word)
//   });
//   const content = await rawResponse.json();

//   console.log(content);
// };

// createUserWord({
//   userId: "5edb739f299adb0017fae91f",
//   wordId: "5e9f5ee35eb9e72bc21af716",
//   word: { "difficulty": "weak", "optional": { testFieldString: 'test', testFieldBoolean: true } }
// });
