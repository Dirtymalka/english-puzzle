const addPuzzlesClickHandler = () => {
  const puzzles = document.querySelectorAll('.word');
  let currentWord = null;
  document.querySelectorAll('.word').forEach((puzzle) => {
    puzzle.addEventListener('mousedown', (event) => {
      const movingWord = puzzle;
      const coordinateMovingWord = movingWord.getBoundingClientRect();
      const itemWidth = movingWord.getBoundingClientRect().width;
      const itemHeight = movingWord.getBoundingClientRect().height;




      const containerForPuzzles = document.querySelector('.puzzle-container_sentence');
      console.log(coordinateMovingWord);
      console.log(itemWidth);
      console.log(itemHeight);

      const shiftX = event.clientX - puzzle.getBoundingClientRect().left;
      const shiftY = event.clientY - puzzle.getBoundingClientRect().top;

      const clone = movingWord.cloneNode();
      clone.className = 'clone';
      clone.style.width = itemWidth;
      clone.style.height = itemHeight;
      puzzle.replaceWith(clone);

      puzzle.style.position = 'absolute';
      puzzle.style.width = itemWidth + 'px';
      puzzle.style.height = itemHeight + 'px';
      puzzle.style.zIndex = 90;
      document.body.append(puzzle);

      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        puzzle.style.left = pageX - shiftX + 'px';
        puzzle.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);

        puzzle.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        puzzle.hidden = false;

        // событие mousemove может произойти и когда указатель за пределами окна
        // (мяч перетащили за пределы экрана)

        // если clientX/clientY за пределами окна, elementFromPoint вернёт null
        if (!elemBelow) return;

        // потенциальные цели переноса помечены классом droppable (может быть и другая логика)
        let droppablePazzle = elemBelow.closest('.word');
        let drop = document.querySelector('.clone');

        if (currentWord != droppablePazzle) {
          // мы либо залетаем на цель, либо улетаем из неё
          // внимание: оба значения могут быть null
          //   currentDroppable=null,
          //     если мы были не над droppable до этого события (например, над пустым пространством)
          //   droppableBelow=null,
          //     если мы не над droppable именно сейчас, во время этого события

          if (currentWord) {
            // логика обработки процесса "вылета" из droppable (удаляем подсветку)
            console.log('1');
            // if (document.querySelector('.clone')) {
              document.querySelector('.clone').outerHTML = '';
            // }
            // droppablePazzle.style.paddingLeft = 0 + 'px';
          }
          currentWord = droppablePazzle;
          if (currentWord || drop) {
            // логика обработки процесса, когда мы "влетаем" в элемент droppable
            console.log('2')
            // if (droppablePazzle) {
              droppablePazzle.before(clone);
            // }
            currentWord = drop;
            // droppablePazzle.style.paddingLeft = puzzle.getBoundingClientRect().width + 'px';
          }
        }
      }

      document.addEventListener('mousemove', onMouseMove);

      console.log(pageYOffset);
      console.log('cont.left: ' + containerForPuzzles.getBoundingClientRect().left);
      console.log('cont.top: ' + (containerForPuzzles.getBoundingClientRect().top + pageYOffset));
      console.log('cont.height: ' + containerForPuzzles.getBoundingClientRect().height);
      console.log('cont.width: ' + containerForPuzzles.getBoundingClientRect().width);

      puzzle.onmouseup = (event) => {
        console.log('item.pageX' + event.pageX);
        console.log('item.pageY' + event.pageY);
        if (event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width
          && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + pageYOffset + document.querySelector('.clone').getBoundingClientRect().height) {
          console.log('tratata')
          puzzle.style.position = 'static';
          clone.replaceWith(puzzle);
          // containerForPuzzles.append(puzzle);
        } else if (event.pageX >= containerForPuzzles.getBoundingClientRect().left && event.pageX <= containerForPuzzles.getBoundingClientRect().left + containerForPuzzles.getBoundingClientRect().width && event.pageY >= containerForPuzzles.getBoundingClientRect().top && event.pageY <= containerForPuzzles.getBoundingClientRect().top + pageYOffset + containerForPuzzles.getBoundingClientRect().height) {
          console.log('done')
          puzzle.style.position = 'static';
          containerForPuzzles.append(puzzle);
          document.querySelector('.clone').outerHTML = '';
        } else {
          // document.querySelector('.puzzle-pieces').append(puzzle);
          clone.replaceWith(puzzle);
          puzzle.style.position = 'static';
        }
        document.removeEventListener('mousemove', onMouseMove);
        // puzzle.onmouseup = null;


        // if (event.pageX >= freeElement.getBoundingClientRect().left && event.pageX <= freeElement.getBoundingClientRect().left + freeElement.getBoundingClientRect().width
        //   && event.pageY >= freeElement.getBoundingClientRect().top && event.pageY <= freeElement.getBoundingClientRect().top + freeElement.getBoundingClientRect().height) {
        //   document.querySelector('.free').replaceWith(item);
        //   document.querySelector('.clone').replaceWith(freeElement);
        //   item.style.position = 'static';
        //   item.style.width = '';
        //   item.style.height = '';
        //   countSteps();
        // } else if (event.pageX >= document.querySelector('.clone').getBoundingClientRect().left && event.pageX <= document.querySelector('.clone').getBoundingClientRect().left + document.querySelector('.clone').getBoundingClientRect().width
        //   && event.pageY >= document.querySelector('.clone').getBoundingClientRect().top && event.pageY <= document.querySelector('.clone').getBoundingClientRect().top + document.querySelector('.clone').getBoundingClientRect().height) {
        //   document.querySelector('.free').replaceWith(item);
        //   document.querySelector('.clone').replaceWith(freeElement);
        //   item.style.position = 'static';
        //   item.style.width = '';
        //   item.style.height = '';
        //   countSteps();
        // } else {
        //   document.querySelector('.clone').replaceWith(item);
        //   item.style.position = 'static';
        //   item.style.width = '';
        //   item.style.height = '';
        // }
        // document.removeEventListener('mousemove', onMouseMove);
        // item.onmouseup = null;

        // function check(arr1, arr2) {
        //   let checking = true;
        //   for (let i = 0; i < arr1.length; i += 1) {
        //     if (arr1[i] != arr2[i]) {
        //       checking = false;
        //       break;
        //     }
        //   }
        //   return checking;
        // }
        // const finish = check(Array.from(defaultField), Array.from(document.querySelectorAll('.cub')));

        // if (finish === true) {
        //   const complited = document.createElement('div');
        //   complited.classList = 'complited';
        //   complited.textContent = `Congratulations\n You solved the puzzle\n ${document.querySelector('.steps-container').innerText}\n ${document.querySelector('.time-container').innerText}`;
        //   document.body.append(complited);
        //   document.querySelector('.resultsList').textContent += `\n ${document.querySelector('.steps-container').innerText}    ${document.querySelector('.time-container').innerText}`;
        //   localStorage.setItem('result', `${document.querySelector('.resultsList').textContent}`);
        //   document.querySelector('.complited').onclick = () => {
        //     document.querySelector('.complited').style.visibility = 'hidden';
        //   };
        // }
      };
    })
  })
}


export { addPuzzlesClickHandler };
