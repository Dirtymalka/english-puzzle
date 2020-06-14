import '../css/style.scss';

import { createAuthorizationLayout, createStartPage } from '../modules/authorization/createAuthorizationLayout';
import { USERS } from '../modules/constants';
import { users, notLogin } from '../modules/authorization/authorization';

const init = () => {
  if (notLogin()) {
    createStartPage();
    return;
  }
  createAuthorizationLayout();
}

init();

window.addEventListener("unload", () => {
  localStorage.setItem(USERS ,JSON.stringify(users));
});
