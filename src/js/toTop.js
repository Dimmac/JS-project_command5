const toTop = document.querySelector('.to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 600) {
    toTop.classList.add('active');
  } else {
    toTop.classList.remove('active');
  }
});

toTop.addEventListener('click', onToTopClick);

function onToTopClick() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
