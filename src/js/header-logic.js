import { renderGalleryTrendingMovie } from './renderTrendingMovies';
import filmGallery from '../templates/film-card.hbs';
import { galleryEl } from './renderMovieForQuery';
import { formatData } from './formatted-data';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import { saveDataToLocalStorage } from './saveTrendingTolocalStorage';
import { STORAGE_KEY_HOME } from './keys-local-storage';
import { STORAGE_KEY_MAIN, STORAGE_KEY_QUEUE, STORAGE_KEY_WATCHED } from './keys-local-storage';
import { searchQueryApiService } from './renderMovieForQuery';
import ApiService from './api-service.js';
import { pagination } from './renderTrendingMovies';
import swal from 'sweetalert';
import 'animate.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const refs = {
  homeEl: document.querySelector('.logo-home-js'),
  logoHomeEl: document.querySelector('.home-js'),
  myLibraryEl: document.querySelector('.library-js'),
  headerEl: document.querySelector('.header'),
  btns: document.querySelector('.btn-list '),
  watchedBtn: document.querySelector('button[data-action="watched"]'),
  queueBtn: document.querySelector('button[data-action="queue"]'),
  formEl: document.querySelector('.search-form'),
  paginationDiv: document.querySelector('#pagination'),
  galleryEl: document.querySelector('.film__list'),
  annotation: document.querySelector('#annotation'),
};

refs.homeEl.addEventListener('click', onHomeClick);
refs.logoHomeEl.addEventListener('click', onHomeClick);
refs.myLibraryEl.addEventListener('click', onLibraryClick);
refs.queueBtn.addEventListener('click', onQueueClick);
refs.watchedBtn.addEventListener('click', onWatchedClick);

const newApiService = new ApiService();

function onHomeClick(e) {
  e.preventDefault();
  NProgress.start();
  onHomeStateHeader();
  parseTrendingForLocalStorage();
  refs.annotation.classList.add('visually-hidden');
  NProgress.done();
}

function onLibraryClick(e) {
  e.preventDefault();
  NProgress.start();
  onLibraryStateHeader();
  refs.paginationDiv.classList.add('visually-hidden');
  refs.watchedBtn.classList.add('button-active');
  refs.queueBtn.classList.remove('button-active');
  ApiService.searchType = 'watched';
  onWatchedClick();
  NProgress.done();
}

export default { onHomeClick, onLibraryClick };

function onLibraryStateHeader() {
  NProgress.start();
  refs.headerEl.classList.remove('header-home');
  refs.headerEl.classList.add('header-library');
  refs.formEl.style.display = 'none';
  refs.btns.classList.add('btns-lib');
  refs.btns.classList.remove('btn-list__header');
  refs.homeEl.classList.remove('current');
  refs.myLibraryEl.classList.add('current');
  NProgress.done();
}

function onHomeStateHeader() {
  NProgress.start();
  refs.headerEl.classList.remove('header-library');
  refs.headerEl.classList.add('header');
  refs.formEl.style.display = 'block';
  refs.btns.classList.remove('btns-lib');
  refs.btns.classList.add('btn-list__header');
  refs.homeEl.classList.add('current');
  refs.myLibraryEl.classList.remove('current');
  refs.paginationDiv.classList.remove('visually-hidden');
  NProgress.done();
}

export function parseTrendingForLocalStorage() {
  NProgress.start();
  const saveData = localStorage.getItem(STORAGE_KEY_HOME);
  const parseData = JSON.parse(saveData);
  const formattedData = formatData(parseData);
  const markup = filmGallery(parseData);
  refs.galleryEl.innerHTML = '';
  refs.galleryEl.insertAdjacentHTML('afterbegin', markup);
  pagination.reset();
  newApiService.pageNum = 1;
  saveDataToLocalStorage(STORAGE_KEY_MAIN, formattedData);
  NProgress.done();
}

export function onQueueClick() {
  NProgress.start();
  refs.watchedBtn.classList.remove('button-active');
  refs.queueBtn.classList.add('button-active');
  ApiService.searchType = 'queue';
  const saveData = localStorage.getItem(STORAGE_KEY_QUEUE);
  const parseData = JSON.parse(saveData) || [];
  saveDataToLocalStorage(STORAGE_KEY_MAIN, parseData);

  if (parseData.length !== 0) {
    const markup = filmGallery(parseData);
    refs.galleryEl.innerHTML = '';
    refs.galleryEl.insertAdjacentHTML('afterbegin', markup);

    refs.annotation.classList.add('visually-hidden');
  } else {
    refs.galleryEl.innerHTML = '';
    refs.annotation.classList.remove('visually-hidden');
    refs.annotation.classList.add('animate__zoomIn');
  }

  NProgress.done();
}

export function onWatchedClick() {
  NProgress.start();
  refs.queueBtn.classList.remove('button-active');
  refs.watchedBtn.classList.add('button-active');

  const saveData = localStorage.getItem(STORAGE_KEY_WATCHED);
  const parseData = JSON.parse(saveData) || [];
  saveDataToLocalStorage(STORAGE_KEY_MAIN, parseData);

  if (parseData.length !== 0) {
    const markup = filmGallery(parseData);
    refs.galleryEl.innerHTML = '';
    refs.galleryEl.insertAdjacentHTML('afterbegin', markup);

    refs.annotation.classList.add('visually-hidden');
  } else {
    refs.galleryEl.innerHTML = '';
    refs.annotation.classList.remove('visually-hidden');
    refs.annotation.classList.add('animate__zoomIn');
  }
  NProgress.done();
}
