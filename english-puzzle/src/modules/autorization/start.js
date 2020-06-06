import { createMainLayout } from '../main/createMainLayout';
import { addHandlersOnOptionMenu } from '../main/options';
import { getWords } from '../main/puzzle';

const btnStartHandler = async () => {
  createMainLayout();
  addHandlersOnOptionMenu();
  getWords();
}

export { btnStartHandler };
