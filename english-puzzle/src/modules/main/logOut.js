import { createAuthorizationLayout } from '../autorization/createAuthorizationLayout';

const addLogOutHandler = () => {
  document.querySelector('.log-out').onclick = (event) => {
    console.log(event.target)
    if (event.target.closest('.name-letter')) {
      document.querySelector('.btn-log-out').classList.toggle('show');
    }
    if (event.target.closest('.btn-log-out')) {
      document.querySelector('.app-container').innerHTML = '';
      createAuthorizationLayout();
    }
  }
}


export { addLogOutHandler };
