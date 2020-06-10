import { createSettingsLayout } from '../main/createSettings';
import { addHandlersOnOptionMenu } from '../main/options';
import { getWords } from '../main/puzzle';
import { createHeader } from '../main/createHeader';

const btnStartHandler = async () => {
  createSettingsLayout();
  addHandlersOnOptionMenu();
  getWords();
}

export { btnStartHandler };
