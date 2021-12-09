import { renderGalleryTrendingMovie } from './renderTrendingMovies';
import filmGallery from '../templates/film-card.hbs';
import { galleryEl } from './renderMovieForQuery';
import { formatData } from './formatted-data';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import { saveDataToLocalStorage } from './saveTrendingTolocalStorage';
import { STORAGE_KEY_HOME } from './keys-local-storage';
import { STORAGE_KEY_MAIN } from './keys-local-storage';
import { searchQueryApiService } from './renderMovieForQuery';
import ApiService from './api-service.js';
import { pagination } from './renderTrendingMovies';
import swal from 'sweetalert';
import 'animate.css';

const refs = {
  homeEl: document.querySelector('.logo-home-js'),
  logoHomeEl: document.querySelector('.home-js'),
  myLibraryEl: document.querySelector('.library-js'),
  headerEl: document.querySelector('.header-container'),
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

const newApiService = new ApiService();

function onHomeClick(e) {
  e.preventDefault();
  onHomeStateHeader();
  parseTrendingForLocalStorage();
  refs.annotation.classList.add('visually-hidden');
}

function onLibraryClick(e) {
  e.preventDefault();
  onLibraryStateHeader();
  galleryEl.innerHTML = '';
  refs.paginationDiv.classList.add('visually-hidden');
  refs.annotation.classList.remove('visually-hidden');
  refs.annotation.classList.add('animate__zoomIn');
  // swal('Attention', 'Sorry, you have not added anything yet', 'info');
  // Notiflix.Notify.info('Sorry, sorry you have not added anything yet');
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
  refs.paginationDiv.classList.remove('visually-hidden');
}

export async function parseTrendingForLocalStorage() {
  try {
    const saveData = localStorage.getItem(STORAGE_KEY_HOME);
    const parseData = JSON.parse(saveData);
    const formattedData = formatData(parseData);
    const markup = filmGallery(parseData);
    refs.galleryEl.innerHTML = '';
    refs.galleryEl.insertAdjacentHTML('afterbegin', markup);
    pagination.reset();
    newApiService.pageNum = 1;
    saveDataToLocalStorage(STORAGE_KEY_MAIN, formattedData);
  } catch (error) {
    console.log(error);
  }
}
