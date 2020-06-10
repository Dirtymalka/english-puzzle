const speakerHandler = (audio) => {
  const url = `https://raw.githubusercontent.com/Dirtymalka/rslang-data/master/${audio}`;
  const newAudio = new Audio(url);
  newAudio.play();
}

export { speakerHandler };
