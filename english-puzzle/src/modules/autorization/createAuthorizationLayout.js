import { btnStartHandler } from './start';
import { btnSignInHandler } from './authorization';
import { btnSignUpHandler } from './registration';

const createAuthorizationLayout = () => {
    const appContainer = document.querySelector('.app-container');
    const content = `<div id="autorization">
  <div class="login-wrap">
      <div class="login-html">
          <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1"
              class="tab">Sign
              In</label>
          <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign
              Up</label>
          <div class="login-form">
              <div class="sign-in-htm">
                  <div class="group">
                      <label for="e-mail-for-sign-in" class="label">Email Address</label>
                      <input id="e-mail-for-sign-in" type="email" class="input" placeholder="E-mail" required>
                  </div>
                  <div class="group">
                      <label for="pass-for-sign-in" class="label">Password</label>
                      <input id="pass-for-sign-in" type="password" class="input" data-type="password" placeholder="Your password" required>
                  </div>
                  <div class="group">
                      <input type="submit" class="button btn-sign-in" value="Sign In">
                  </div>
                  <div class="hr"></div>
              </div>
              <div class="sign-up-htm">
                  <div class="group">
					<label for="user-name" class="label">Username</label>
					<input id="user-name" type="text" class="input" required>
				</div>
                  <div class="group">
                      <label for="e-mail-for-sign-up" class="label">Email Address</label>
                      <input id="e-mail-for-sign-up" type="email" class="input" placeholder="E-mail" required>
                  </div>
                  <div class="group">
                      <label for="pass-for-sign-up" class="label">Password</label>
                      <input id="pass-for-sign-up" type="password" class="input" data-type="password" placeholder="Your password" required>
                  </div>
                  <div class="group">
                      <input type="submit" class="button btn-sign-up" value="Sign Up">
                  </div>
                  <div class="hr"></div>
              </div>
          </div>
      </div>
  </div>
</div>`;
    appContainer.insertAdjacentHTML('afterbegin', content);

    document.querySelector('.btn-sign-in').onclick = (e) => {
        e.preventDefault();
        btnSignInHandler();
      }

      document.querySelector('.btn-sign-up').onclick = (e) => {
        e.preventDefault();
        btnSignUpHandler();
      }

}

const createStartPage = () => {
    const appContainer = document.querySelector('.app-container');
    appContainer.innerHTML = '';
    const layout = `<div id="start-page">
        <div class="title">english puzzle</div>
        <div class="description"><p>Click on words, collect phrases.<p><br><p>Words can be drag and drop. Select tooltips in the menu</p></div>
        <div class="start">
            <button class="button btn-start">START</button>
        </div>
    </div>`;
    appContainer.insertAdjacentHTML('afterbegin', layout);
    document.querySelector('.btn-start').onclick = (e) => {
        e.preventDefault();
        btnStartHandler();
    }
}

export { createAuthorizationLayout, createStartPage };
