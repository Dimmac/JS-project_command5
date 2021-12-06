import { STORAGE_KEY_TRENDING } from './saveTrendingTolocalStorage';
import { renderGalleryTrendingMovie } from './renderTrendingMovies';

const refs = {
  homeEl: document.querySelector('.logo-home-js'),
  logoHomeEl: document.querySelector('.home-js'),
  myLibraryEl: document.querySelector('.library-js'),
  headerEl: document.querySelector('.header-container'),
  btns: document.querySelector('.btn-list '),
  watchedBtn: document.querySelector('button[data-action="watched"]'),
  queueBtn: document.querySelector('button[data-action="queue"]'),
  formEl: document.querySelector('.search-form'),
};

refs.homeEl.addEventListener('click', onHomeClick);
refs.logoHomeEl.addEventListener('click', onHomeClick);
refs.myLibraryEl.addEventListener('click', onLibraryClick);

function onHomeClick(e) {
  e.preventDefault();
  onHomeStateHeader();
  const savedTrending = localStorage.getItem(STORAGE_KEY_TRENDING);
  const parsedTrending = JSON.parse(savedTrending);
  renderGalleryTrendingMovie(parsedTrending);
}

function onLibraryClick(e) {
  e.preventDefault();
  onLibraryStateHeader();
  // refs.headerEl.classList.add('.header-container-library');
}

export default { onHomeClick, onLibraryClick };

function onLibraryStateHeader() {
  refs.headerEl.classList.remove('header-home');
  refs.headerEl.classList.add('header-library');
  refs.formEl.style.display = 'none';
  refs.btns.classList.add('btns-lib');
  refs.btns.classList.remove('btn-list__header');
  refs.homeEl.classList.remove('current');
  refs.myLibraryEl.classList.add('current');
}

function onHomeStateHeader() {
  refs.headerEl.classList.remove('header-library');
  refs.headerEl.classList.add('header-home');
  refs.formEl.style.display = 'block';
  refs.btns.classList.remove('btns-lib');
  refs.btns.classList.add('btn-list__header');
  refs.homeEl.classList.add('current');
  refs.myLibraryEl.classList.remove('current');
}