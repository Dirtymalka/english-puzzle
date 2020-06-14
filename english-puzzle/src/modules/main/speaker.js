/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */

const speakerHandler = (audio) => {
  const url = `https://raw.githubusercontent.com/Dirtymalka/rslang-data/master/${audio}`;
  const newAudio = new Audio(url);
  newAudio.play();
}

export { speakerHandler };
