import { createSettingsLayout } from '../main/createSettings';
import { getWords } from '../main/puzzle';

const btnStartHandler = async () => {
  createSettingsLayout();
  getWords();
}

export { btnStartHandler };
