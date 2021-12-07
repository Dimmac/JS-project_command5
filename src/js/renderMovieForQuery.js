import ApiService from './api-service.js';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.2.min.css';
import filmGallery from '../templates/film-card.hbs';
import { formatData } from './formatted-data';
import { renderGalleryTrendingMovie } from './renderTrendingMovies';

const newApiService = new ApiService();
export const galleryEl = document.querySelector('.film__list');
export const formEL = document.querySelector('.search-form');

formEL.addEventListener('submit', renderGalleryMovieForQuery);

function renderGalleryMovieForQuery(e) {
  e.preventDefault();
  try {
    newApiService.query = e.currentTarget.elements.searchQuery.value.trim();
    newApiService.fetchMovieForQuery(newApiService.query).then(showMovie).catch(console.log);

    if (newApiService.query === '') {
      Notiflix.Notify.failure('Sorry, there are movie not finding. Please try again.');
      return;
    }

    formEL.reset();
  } catch (error) {
    console.log(error);
  }
}

function showMovie(data) {
  const formattedData = formatData(data.results);
  const markup = filmGallery(formattedData);
  galleryEl.innerHTML = markup;
  if (data.results.length < 1) {
    renderGalleryTrendingMovie();
    Notiflix.Notify.failure('Sorry, there are movie not finding. Please try again.');
    formEL.reset();
    return;
  }
}
