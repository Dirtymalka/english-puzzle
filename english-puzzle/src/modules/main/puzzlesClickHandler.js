/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */


import { NUMBER_OF_SENTENCE } from '../constants';


const addPuzzlesClickHandler = (data) => {
  const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);

  document.querySelectorAll('.word').forEach((puzzle) => {
    puzzle.onmousedown = (event) => {
      const itemWidth = puzzle.getBoundingClientRect().width;
      const itemHeight = puzzle.getBoundingClientRect().height;

      const containerForPuzzles = document.querySelector(`#part-${parseFloat(numberOfSentence) + 1}`);

      const shiftX = event.clientX - puzzle.getBoundingClientRect().left;
      const shiftY = event.clientY - puzzle.getBoundingClientRect().top;

      const startX = event.clientX + window.pageXOffset;
      const startY = event.clientY + window.pageYOffset;

      const clone = puzzle.cloneNode();
      clone.style.background = '';

      clone.className = 'clone';
      clone.style.width = `${itemWidth}px`;
      clone.style.height = `${itemHeight}px`;
      puzzle.replaceWith(clone);

      puzzle.style.position = 'absolute';
      puzzle.style.left = `${event.pageX - shiftX}px`;
        puzzle.style.top = `${event.pageY - shiftY}px`;
      puzzle.style.zIndex = 1000;
      document.body.append(puzzle);

      function moveAt(pageX, pageY) {
        puzzle.style.left = `${pageX - shiftX}px`;
        puzzle.style.top = `${pageY - shiftY}px`;
      }

      let currentWord = null;

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        puzzle.hidden = true;
        const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        puzzle.hidden = false;

        if (!elemBelow) return;

        const droppablePazzle = elemBelow.closest('.word');
        const droppableClone = elemBelow.closest('.clone');

        if (currentWord != droppablePazzle || currentWord != droppableClone) {

          if (droppableClone) {
            return;
          }


          if (droppablePazzle && currentWord == droppablePazzle && droppablePazzle.nextElementSibling && droppablePazzle.nextElementSibling.classList.contains('clone')) {
            if (event.pageX >= droppablePazzle.getBoundingClientRect().left && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width / 2) {
              clone.remove();
              droppablePazzle.before(clone);
            }
            return;
          }

          if (droppablePazzle && currentWord == droppablePazzle && droppablePazzle.previousElementSibling && droppablePazzle.previousElementSibling.classList.contains('clone')) {
            if (event.pageX >= droppablePazzle.getBoundingClientRect().left + (droppablePazzle.getBoundingClientRect().width / 2) && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width) {
              clone.remove();
              droppablePazzle.after(clone);
            }
            return;
          }

          if (currentWord) {
            if (droppableClone) {
              return;
            }
            clone.remove();
            currentWord = null;
            return;
          }
          currentWord = droppablePazzle;

          if (currentWord) {
            if (event.pageX >= droppablePazzle.getBoundingClientRect().left && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width / 2) {
              droppablePazzle.before(clone);
            }

            if (event.pageX >= droppablePazzle.getBoundingClientRect().left + (droppablePazzle.getBoundingClientRect().width / 2) && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width) {
              droppablePazzle.after(clone);
            }
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);



      puzzle.onmouseup = (event) => {
        if (event.pageX === startX && event.pageY === startY) {
          containerForPuzzles.append(puzzle);
          puzzle.classList.add('completed');
          document.querySelector('.clone').outerHTML = '';
          puzzle.style.position = 'static';

        } else if (document.querySelector('.clone') && event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset + document.querySelector('.clone').getBoundingClientRect().height) {
          puzzle.style.position = 'static';
          clone.replaceWith(puzzle);
          puzzle.classList.add('completed');
        } else if (event.pageX >= containerForPuzzles.getBoundingClientRect().left && event.pageX <= containerForPuzzles.getBoundingClientRect().left + containerForPuzzles.getBoundingClientRect().width && event.pageY >= containerForPuzzles.getBoundingClientRect().top && event.pageY <= containerForPuzzles.getBoundingClientRect().top + window.pageYOffset + containerForPuzzles.getBoundingClientRect().height) {
          puzzle.style.position = 'static';
          if (Array.from(containerForPuzzles.children).includes(clone)) {
            clone.replaceWith(puzzle);
          } else {
            containerForPuzzles.append(puzzle);
            if (clone) {
              clone.remove();
            }
          }

          puzzle.classList.add('completed');

        } else {
          if (document.querySelector('.clone')) {
            clone.replaceWith(puzzle);
          } else {
            document.querySelector('.puzzle-pieces').append(puzzle);
          }
          puzzle.style.position = 'static';
        }
        document.removeEventListener('mousemove', onMouseMove);
        puzzle.onmouseup = null;
        checkSentence(data);
      };
    }
    puzzle.ondragstart = () => {
      return false;
    };
  })
}

const checkSentence = () => {
  const puzzleField = document.querySelector('.puzzle-pieces');
  if (!puzzleField.innerHTML) {
    document.querySelector('.btn-check').classList.add('show');
    document.querySelector('.btn-not-know').classList.remove('show');
  }
}


export { addPuzzlesClickHandler };
