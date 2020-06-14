/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */

import { createSettingsLayout } from '../main/createSettings';
import { getWords } from '../main/puzzle';

const btnStartHandler = async () => {
  createSettingsLayout();
  getWords();
}

export { btnStartHandler };
