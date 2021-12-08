import { Theme } from './keys-local-storage';

const toggleRef = document.querySelector('#theme-switch-toggle');
const footerRef = document.querySelector('.footer');

toggleRef.addEventListener('change', onThemeChange);
// checking theme on page load:
function themeCheck() {
  if (localStorage.theme === 'dark-theme') {
    document.body.classList.add(Theme.DARK);
    footerRef.classList.add(Theme.DARK);
    toggleRef.checked = true;
  } else {
    document.body.classList.add(Theme.LIGHT);
    footerRef.classList.add(Theme.LIGHT);
  }
}
themeCheck();

// toggling theme callback-function:
function onThemeChange(event) {
  document.body.classList.toggle(Theme.LIGHT);
  document.body.classList.toggle(Theme.DARK);
  footerRef.classList.toggle(Theme.LIGHT);
  footerRef.classList.toggle(Theme.DARK);

  if (event.target.checked) {
    localStorage.setItem('theme', Theme.DARK);
  } else {
    localStorage.setItem('theme', Theme.LIGHT);
  }
}
