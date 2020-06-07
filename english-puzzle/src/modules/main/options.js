

const addHandlersOnOptionMenu = () => {
  const selectbox = document.querySelector(".selectbox");
  const selectboxDisplay = document.querySelectorAll(".selectbox__displayWord");
  const submitbtn = document.querySelector(".form__submit-button")
  const optionList = document.querySelectorAll(".option-container__option");


  document.querySelector('.options-form').onclick = (event) => {
    event.stopPropagation();
    // console.log(event.target.closest('.selectbox'))

    if (event.target.closest('.selectbox')) {
      console.log('total')
      if (event.target.closest('.selectbox').classList.contains('selectbox--active')) {
        console.log('first');
        event.target.closest('.selectbox').classList.remove('selectbox--active');
        event.target.closest('.selectbox__displayWord').classList.remove("selectbox__display--active");
        return;
      }
      document.querySelectorAll(".selectbox").forEach((item) => {
        item.classList.remove("selectbox--active");
      });
      document.querySelectorAll(".selectbox__displayWord").forEach((item) => {
        item.classList.remove('selectbox__display--active');
      });
      event.target.closest('.selectbox').classList.toggle("selectbox--active");
      event.target.closest('.selectbox__displayWord').classList.toggle("selectbox__display--active");
    }
  }


  // selectboxDisplay.forEach((item) => {
  //   item.addEventListener("click", (e) => {
  //     e.stopPropagation();

  //     e.target.closest('.selectbox').classList.toggle("selectbox--active");
  //     e.target.closest('.selectbox__displayWord').classList.toggle("selectbox__display--active");
  //   });
  // })

  optionList.forEach((option, index) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      // console.log(document.querySelector('.selectbox__display--active').innerHTML)
      const label = option.querySelector("label");
      document.querySelector('.selectbox__display--active').innerHTML = label.innerHTML;
      document.querySelector('.selectbox--active').setAttribute("data-option", label.getAttribute("data-value"));
      document.querySelector('.selectbox--active').classList.remove("selectbox--active", "selectbox--unselect");
      document.querySelector('.selectbox__display--active').classList.remove("selectbox__display--active");
    });
  });




  // function shakeBox() {
  //   selectbox.classList.add("selectbox--shake");
  //   setTimeout(() => {
  //     selectbox.classList.remove("selectbox--shake");
  //   }, 300);
  // }

  // submitbtn.addEventListener("click", () => {
  //   if (selectbox.classList.contains("selectbox--unselect")) {
  //     shakeBox();
  //   }
  // });

  window.addEventListener("click", () => {
    document.querySelectorAll(".selectbox").forEach((item) => {
      item.classList.remove("selectbox--active");
    });
  });
}

export { addHandlersOnOptionMenu };
