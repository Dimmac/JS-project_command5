import { renderGalleryTrendingMovie } from './renderTrendingMovies';
import { formatData } from './formatted-data';
import ApiService from './api-service.js';
import filmGallery from '../templates/film-card.hbs';
import { galleryEl } from './renderMovieForQuery';
import { saveDataToLocalStorage } from './saveTrendingTolocalStorage';
import { searchQueryApiService } from './renderMovieForQuery';
const newApiService = new ApiService();
import { pagination } from './renderTrendingMovies';

const refs = {
  homeEl: document.querySelector('.logo-home-js'),
  logoHomeEl: document.querySelector('.home-js'),
  myLibraryEl: document.querySelector('.library-js'),
  headerEl: document.querySelector('.header-container'),
  btns: document.querySelector('.btn-list '),
  watchedBtn: document.querySelector('button[data-action="watched"]'),
  queueBtn: document.querySelector('button[data-action="queue"]'),
  formEl: document.querySelector('.search-form'),
  galleryEl: document.querySelector('.film__list'),
};

refs.homeEl.addEventListener('click', onHomeClick);
refs.logoHomeEl.addEventListener('click', onHomeClick);
refs.myLibraryEl.addEventListener('click', onLibraryClick);

function onHomeClick(e) {
  e.preventDefault();
  onHomeStateHeader();
  parseTrendingForLocalStorage();
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

export async function parseTrendingForLocalStorage() {
  try {
    const saveData = localStorage.getItem('home');
    const parseData = JSON.parse(saveData);
    // const formattedData = formatData(parseData);
    const markup = filmGallery(parseData);
    refs.galleryEl.innerHTML = '';
    refs.galleryEl.insertAdjacentHTML('afterbegin', markup);
    pagination.reset();
    newApiService.pageNum = 1;
  } catch (error) {
    console.log(error);
  }
}
