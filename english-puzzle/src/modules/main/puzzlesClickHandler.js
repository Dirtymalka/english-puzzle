/* global event, fdescribe */
/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint no-param-reassign: "error" */
/* eslint no-use-before-define: ["error", { "functions": false }] */

import { NUMBER_OF_SENTENCE, WIDTH_OF_GAME_BOARD } from '../constants';


const addPuzzlesClickHandler = (data) => {
  const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);
  const puzzles = document.querySelectorAll('.word');
  let currentWord = null;
  document.querySelectorAll('.word').forEach((puzzle) => {
    puzzle.addEventListener('mousedown', (event) => {
      const movingWord = puzzle;
      const coordinateMovingWord = movingWord.getBoundingClientRect();
      const itemWidth = movingWord.getBoundingClientRect().width;
      const itemHeight = movingWord.getBoundingClientRect().height;

      const containerForPuzzles = document.querySelector(`#part-${parseFloat(numberOfSentence) + 1}`);

      const shiftX = event.clientX - puzzle.getBoundingClientRect().left;
      const shiftY = event.clientY - puzzle.getBoundingClientRect().top;

      const clone = movingWord.cloneNode();
      clone.style.background = '';

      clone.className = 'clone';
      clone.style.width = itemWidth;
      clone.style.height = itemHeight;
      puzzle.replaceWith(clone);

      puzzle.style.position = 'absolute';
      puzzle.style.width = `${itemWidth}px`;
      puzzle.style.height = `${itemHeight}px`;
      puzzle.style.zIndex = 90;
      document.body.append(puzzle);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        puzzle.style.left = `${pageX - shiftX}px`;
        puzzle.style.top = `${pageY - shiftY}px`;
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        puzzle.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        puzzle.hidden = false;

        if (!elemBelow) return;
        if (!elemBelow.closest('.word')) return;

        let droppablePazzle = elemBelow.closest('.word');
        let drop = document.querySelector('.clone');

        if (currentWord != droppablePazzle) {
          if (currentWord) {
            document.querySelector('.clone').outerHTML = '';
          }

          currentWord = droppablePazzle;

          if (currentWord || drop) {
            if (event.pageX >= droppablePazzle.getBoundingClientRect().left && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width / 2) {
              droppablePazzle.before(clone);
              // currentWord = drop;
            }

            if (event.pageX >= droppablePazzle.getBoundingClientRect().left + (droppablePazzle.getBoundingClientRect().width / 2) && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width) {
              droppablePazzle.after(clone);
              // currentWord = drop;
            }
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      puzzle.onmouseup = (event) => {
        // if (event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset + document.querySelector('.clone').getBoundingClientRect().height
        //   && event.pageX >= document.querySelector('.puzzle-pieces').getBoundingClientRect().left && event.pageX <= document.querySelector('.puzzle-pieces').getBoundingClientRect().left + document.querySelector('.puzzle-pieces').getBoundingClientRect().width && event.pageY >= document.querySelector('.puzzle-pieces').getBoundingClientRect().top + pageYOffset && event.pageY <= document.querySelector('.puzzle-pieces').getBoundingClientRect().top + pageYOffset + document.querySelector('.puzzle-pieces').getBoundingClientRect().height) {
        //     console.log(1)
        //   puzzle.style.position = 'static';
        //   containerForPuzzles.append(puzzle);
        //   puzzle.classList.add('completed');
        //   document.querySelector('.clone').outerHTML = '';
        // }else
        if (event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset + document.querySelector('.clone').getBoundingClientRect().height) {
          console.log(2)
          puzzle.style.position = 'static';
          clone.replaceWith(puzzle);
          puzzle.classList.add('completed');
        } else if (event.pageX >= containerForPuzzles.getBoundingClientRect().left && event.pageX <= containerForPuzzles.getBoundingClientRect().left + containerForPuzzles.getBoundingClientRect().width && event.pageY >= containerForPuzzles.getBoundingClientRect().top && event.pageY <= containerForPuzzles.getBoundingClientRect().top + pageYOffset + containerForPuzzles.getBoundingClientRect().height) {
          console.log(3)
          puzzle.style.position = 'static';
          containerForPuzzles.append(puzzle);
          puzzle.classList.add('completed');
          document.querySelector('.clone').outerHTML = '';
        } else {
          console.log(4)
          clone.replaceWith(puzzle);
          puzzle.style.position = 'static';
        }

        document.removeEventListener('mousemove', onMouseMove);
        puzzle.onmouseup = null;

        checkSentence(data);

      };
    })
    puzzle.ondragstart = () => {
      return false;
    };
  })
}

const checkSentence = (data) => {
  const puzzleField = document.querySelector('.puzzle-pieces');
  if (!puzzleField.innerHTML) {
    document.querySelector('.btn-check').classList.add('show');
    document.querySelector('.btn-not-know').classList.remove('show');
  }
}


export { addPuzzlesClickHandler };
