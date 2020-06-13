const addHandlersOnOptionMenu = () => {
  const optionList = document.querySelectorAll(".option-container__option");


  document.querySelector('.options-form').onclick = (event) => {
    event.stopPropagation();

    if (event.target.closest('.selectbox')) {
      if (event.target.closest('.selectbox').classList.contains('selectbox--active')) {
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
  optionList.forEach((option) => {
    option.addEventListener("click", (e) => {
      try {
        e.stopPropagation();
        const label = option.querySelector("label");
        document.querySelector('.selectbox__display--active').innerHTML = label.innerHTML;
        document.querySelector('.selectbox--active').setAttribute("data-option", label.getAttribute("data-value"));
        document.querySelector('.selectbox--active').classList.remove("selectbox--active", "selectbox--unselect");
        document.querySelector('.selectbox__display--active').classList.remove("selectbox__display--active");
      } catch (error) {
        return;
      }
    });
  });

  window.addEventListener("click", () => {
    document.querySelectorAll(".selectbox").forEach((item) => {
      item.classList.remove("selectbox--active");
    });
  });
}

export { addHandlersOnOptionMenu };
