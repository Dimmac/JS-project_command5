import ApiService from './api-service.js';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import filmGallery from '../templates/film-card.hbs';
import { formatData } from './formatted-data';
import { pagination } from './renderTrendingMovies';

export const searchQueryApiService = new ApiService();
export const galleryEl = document.querySelector('.film__list');
export const formEL = document.querySelector('.search-form');

formEL.addEventListener('submit', renderGalleryMovieForQuery);

function renderGalleryMovieForQuery(e) {
  e.preventDefault();

  searchQueryApiService.query = e.currentTarget.elements.searchQuery.value.trim();
  console.log(searchQueryApiService.query);
  searchQueryApiService
    .fetchMovieForQuery(searchQueryApiService.query)
    .then(({ results, total_results: totalResults }) => {
      pagination.reset(totalResults);
      ApiService.searchType = 'search';
      searchQueryApiService.pageNum = 1;
      showMovie(results);
    })
    .catch(console.log);

  if (searchQueryApiService.query === '') {
    Notiflix.Notify.failure('Please enter a movie name.');
    return;
  }
  formEL.reset();
}

function showMovie(data) {
  if (data.length < 1) {
    Notiflix.Notify.failure('Sorry, there are movie not finding. Please try again.');
    formEL.reset();
    return;
  }
  const formattedData = formatData(data);
  const markup = filmGallery(formattedData);
  galleryEl.innerHTML = markup;
}
