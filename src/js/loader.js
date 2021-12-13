const mask = document.querySelector('.mask');
const link = document.querySelectorAll('a');

window.addEventListener('load', onLoad);

export function onLoad() {
  mask.classList.add('hide');
  setTimeout(() => {
    mask.remove();
  }, 500);
}
