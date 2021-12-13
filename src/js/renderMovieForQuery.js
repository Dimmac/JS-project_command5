import ApiService from './api-service.js';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import filmGallery from '../templates/film-card.hbs';
import { formatData } from './formatted-data';
import { pagination } from './renderTrendingMovies';
import { saveDataToLocalStorage } from './saveTrendingTolocalStorage';
import { STORAGE_KEY_MAIN } from './keys-local-storage';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
export const searchQueryApiService = new ApiService();
export const galleryEl = document.querySelector('.film__list');
export const formEL = document.querySelector('.search-form');

formEL.addEventListener('submit', renderGalleryMovieForQuery);

function renderGalleryMovieForQuery(e) {
  e.preventDefault();
  searchQueryApiService.pageNum = 1;
  NProgress.start();
  searchQueryApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  searchQueryApiService
    .fetchMovieForQuery(searchQueryApiService.query)
    .then(({ results, total_results: totalResults }) => {
      if (totalResults < 1) {
        Notiflix.Notify.failure('Sorry, there are movie not finding. Please try again.');
        formEL.reset();
        return;
      }
      showMovie(results);
      pagination.reset(totalResults);
      ApiService.searchType = 'search';
      searchQueryApiService.pageNum = 1;
    })
    .catch(console.log);

  if (searchQueryApiService.query === '') {
    Notiflix.Notify.failure('Please enter a movie name.');
    NProgress.done();
    return;
  }
  formEL.reset();
  NProgress.done();
}

function showMovie(data) {
  const formattedData = formatData(data);
  const markup = filmGallery(formattedData);
  galleryEl.innerHTML = markup;
  saveDataToLocalStorage(STORAGE_KEY_MAIN, formattedData);
}
