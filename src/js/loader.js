const mask = document.querySelector('.mask');

window.addEventListener('load', onLoad);

export function onLoad() {
  mask.classList.add('hide');
  setTimeout(() => {
    mask.remove();
  }, 500);
}
