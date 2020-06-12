/* global event, fdescribe */
/* eslint no-restricted-globals: ["error", "event", "fdescribe"] */
/* eslint no-param-reassign: "error" */
/* eslint no-use-before-define: ["error", { "functions": false }] */

import { NUMBER_OF_SENTENCE, WIDTH_OF_GAME_BOARD } from '../constants';


const addPuzzlesClickHandler = (data) => {
  const numberOfSentence = localStorage.getItem(NUMBER_OF_SENTENCE);
  const puzzles = document.querySelectorAll('.word');

  document.querySelectorAll('.word').forEach((puzzle) => {
    puzzle.onmousedown = (event) => {
      const movingWord = puzzle;
      const coordinateMovingWord = movingWord.getBoundingClientRect();
      const itemWidth = puzzle.getBoundingClientRect().width;
      const itemHeight = puzzle.getBoundingClientRect().height;

      const containerForPuzzles = document.querySelector(`#part-${parseFloat(numberOfSentence) + 1}`);

      const shiftX = event.clientX - puzzle.getBoundingClientRect().left;
      const shiftY = event.clientY - puzzle.getBoundingClientRect().top;

      const startX = event.clientX;
      const startY = event.clientY;
      console.log(startX, startY)

      const clone = puzzle.cloneNode();
      clone.style.background = '';

      clone.className = 'clone';
      clone.style.width = `${itemWidth}px`;
      clone.style.height = `${itemHeight}px`;
      puzzle.replaceWith(clone);

      puzzle.style.position = 'absolute';
      // puzzle.style.width = `${itemWidth}px`;
      // puzzle.style.height = `${itemHeight}px`;
      puzzle.style.left = `${event.pageX - shiftX}px`;
        puzzle.style.top = `${event.pageY - shiftY}px`;
      puzzle.style.zIndex = 1000;
      document.body.append(puzzle);



      // moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        puzzle.style.left = `${pageX - shiftX}px`;
        puzzle.style.top = `${pageY - shiftY}px`;
      }

      let currentWord = null;

      function onMouseMove(event) {
        console.log('startttttttttt')
        moveAt(event.pageX, event.pageY);

        puzzle.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        puzzle.hidden = false;

        // console.log(elemBelow)

        if (!elemBelow) return;
        // if (!elemBelow.closest('.word')) return;

        // const droppablePazzle = elemBelow.closest('.word');
        // const drop = document.querySelector('.clone');

        // if (currentWord != droppablePazzle) {
        //   if (currentWord) {
        //     document.querySelector('.clone').outerHTML = '';
        //   }

        //   currentWord = droppablePazzle;

        //   if (currentWord) {
        //     if (event.pageX >= droppablePazzle.getBoundingClientRect().left && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width / 2) {
        //       droppablePazzle.before(clone);
        //       // currentWord = drop;
        //     }

        //     if (event.pageX >= droppablePazzle.getBoundingClientRect().left + (droppablePazzle.getBoundingClientRect().width / 2) && event.pageX <= droppablePazzle.getBoundingClientRect().left + droppablePazzle.getBoundingClientRect().width) {
        //       droppablePazzle.after(clone);
        //       // currentWord = drop;
        //     }
        //   }
        // }

        const droppablePazzle = elemBelow.closest('.word');
        const droppableClone = elemBelow.closest('.clone');

        if (currentWord != droppablePazzle || currentWord != droppableClone) {
console.log('aaaaaaaaaaaaaaaaaaa')

          if (droppableClone) {
            console.log('eeeeeeeeeeeeeeeeeeeeee')
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
              console.log('dddddddddddddddd', droppablePazzle.nextElementSibling)
              clone.remove();
              droppablePazzle.after(clone);
            }
            return;
          }

          console.log(currentWord, droppablePazzle, droppableClone)
          console.log('1')
          if (currentWord) {
            if (droppableClone) {
              console.log('not remove')
              return;
            }
            // document.querySelector('.clone').outerHTML = '';
            console.log('remove clone')
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
              console.log('dddddddddddddddd', droppablePazzle.nextElementSibling)
              droppablePazzle.after(clone);
            }
          }

          // if (currentWord != droppablePazzle && currentWord == droppableClone) {
          //   currentWord = droppableClone;
          // }


          // if (currentWord != droppablePazzle) {
          //   if (currentWord) {
          //     document.querySelector('.clone').outerHTML = '';
          //   }

          //   currentWord = droppablePazzle;


          //   }
        }

      }

      document.addEventListener('mousemove', onMouseMove);



      puzzle.onmouseup = (event) => {
        console.log(event.pageX, event.pageY, startX, startY)
        if (event.pageX === startX && event.pageY === startY) {
          containerForPuzzles.append(puzzle);
          puzzle.classList.add('completed');
          document.querySelector('.clone').outerHTML = '';
          puzzle.style.position = 'static';

        } else


        // console.log(event.pageX, '>=', document.querySelector('.clone').getBoundingClientRect().left)
        // console.log(event.pageX, '<=', document.querySelector('.clone').getBoundingClientRect().left, '+', document.querySelector('.clone').getBoundingClientRect().width)
        // console.log(event.pageY, '>=', document.querySelector('.clone').getBoundingClientRect().top, '+', window.pageYOffset)
        // console.log(event.pageY, '<=', document.querySelector('.clone').getBoundingClientRect().top, '+', window.pageYOffset, '+', document.querySelector('.clone').getBoundingClientRect().height)
        // console.log(event.pageX, '>=', document.querySelector('.puzzle-pieces').getBoundingClientRect().left)
        // console.log(event.pageX, '<=', document.querySelector('.puzzle-pieces').getBoundingClientRect().left, '+', document.querySelector('.puzzle-pieces').getBoundingClientRect().width)
        // console.log(event.pageY, '>=', document.querySelector('.puzzle-pieces').getBoundingClientRect().top, '+', window.pageYOffset)
        // console.log(event.pageY, '<=', document.querySelector('.puzzle-pieces').getBoundingClientRect().top, '+', window.pageYOffset, '+', document.querySelector('.puzzle-pieces').getBoundingClientRect().height)

        // if (document.querySelector('.clone') && event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top + window.pageYOffset && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + window.pageYOffset + document.querySelector('.clone').getBoundingClientRect().height
        //   && event.pageX >= document.querySelector('.puzzle-pieces').getBoundingClientRect().left && event.pageX <= document.querySelector('.puzzle-pieces').getBoundingClientRect().left + document.querySelector('.puzzle-pieces').getBoundingClientRect().width && event.pageY >= document.querySelector('.puzzle-pieces').getBoundingClientRect().top + window.pageYOffset && event.pageY <= document.querySelector('.puzzle-pieces').getBoundingClientRect().top + window.pageYOffset + document.querySelector('.puzzle-pieces').getBoundingClientRect().height) {
        //     console.log(1)

        //   containerForPuzzles.append(puzzle);
        //   puzzle.classList.add('completed');
        //   document.querySelector('.clone').outerHTML = '';
        //   puzzle.style.position = 'static';
        // }else
        if (document.querySelector('.clone') && event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset + document.querySelector('.clone').getBoundingClientRect().height) {
          console.log(2)
          puzzle.style.position = 'static';
          clone.replaceWith(puzzle);
          puzzle.classList.add('completed');
        } else if (event.pageX >= containerForPuzzles.getBoundingClientRect().left && event.pageX <= containerForPuzzles.getBoundingClientRect().left + containerForPuzzles.getBoundingClientRect().width && event.pageY >= containerForPuzzles.getBoundingClientRect().top && event.pageY <= containerForPuzzles.getBoundingClientRect().top + window.pageYOffset + containerForPuzzles.getBoundingClientRect().height) {
          console.log(3)
          puzzle.style.position = 'static';
          // console.log(containerForPuzzles.children)
          if (Array.from(containerForPuzzles.children).includes(clone)) {
            clone.replaceWith(puzzle);
          } else {
            containerForPuzzles.append(puzzle);
            if (clone) {
              clone.remove();
            }
            // document.querySelector('.clone').outerHTML = '';
          }

          puzzle.classList.add('completed');

        } else {
          console.log(4)
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

const checkSentence = (data) => {
  const puzzleField = document.querySelector('.puzzle-pieces');
  if (!puzzleField.innerHTML) {
    document.querySelector('.btn-check').classList.add('show');
    document.querySelector('.btn-not-know').classList.remove('show');
  }
}


export { addPuzzlesClickHandler };
