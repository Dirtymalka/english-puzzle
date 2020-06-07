import { createHeaderLayout } from '../main/createHeader';
import { addHandlersOnOptionMenu } from '../main/options';
import { getWords } from '../main/puzzle';

const btnStartHandler = async () => {
  createHeaderLayout();
  addHandlersOnOptionMenu();
  getWords();
}

export { btnStartHandler };
