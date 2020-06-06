

const addHandlersOnOptionMenu = () => {
  const selectbox = document.querySelector(".selectbox");
  const selectboxDisplay = document.querySelectorAll(".selectbox__displayWord");
  const submitbtn = document.querySelector(".form__submit-button")
  const optionList = document.querySelectorAll(".option-container__option");


  selectboxDisplay.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      e.target.closest('.selectbox').classList.toggle("selectbox--active");
      item.classList.toggle("selectbox__display--active");
    });
  })



  function shakeBox() {
    selectbox.classList.add("selectbox--shake");
    setTimeout(() => {
      selectbox.classList.remove("selectbox--shake");
    }, 300);
  }

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

  submitbtn.addEventListener("click", () => {
    if (selectbox.classList.contains("selectbox--unselect")) {
      shakeBox();
    }
  });

  window.addEventListener("click", () => {
    selectbox.classList.remove("selectbox--active");
  });
}

export { addHandlersOnOptionMenu };
