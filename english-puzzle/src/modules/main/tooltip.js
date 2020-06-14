/* eslint import/no-cycle: [0 ,{ maxDepth: 4 }] */
/* eslint no-use-before-define: 0 */
/* eslint-disable import/prefer-default-export */
/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: false}}] */

const addTooltipHandler = () => {
  let tooltipElem;

    document.onmouseover = (event) => {
      const {target} = event;

      const tooltipHtml = target.dataset.tooltip;
      if (!tooltipHtml) return;


      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);

      const coords = target.getBoundingClientRect();

      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0;

      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) {
        top = coords.top + target.offsetHeight + 5;
      }

      tooltipElem.style.left = `${left}px`;
      tooltipElem.style.top = `${top}px`;
    };

    document.onmouseout = () => {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    };
}

export { addTooltipHandler };
