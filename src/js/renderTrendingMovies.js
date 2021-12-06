import ApiService from './api-service.js';
import filmGallery from '../templates/film-card.hbs';
import { formatData } from './formatted-data';
import { saveTrendingToLocalStorage, STORAGE_KEY_TRENDING } from './saveTrendingTolocalStorage';
const NewApiService = new ApiService();

const galleryEl = document.querySelector('.film__list');

// NewApiService.fetchTrendingMovies().then(renderGalleryTrendingMovie);
// NewApiService.fetchGenre().then(results => console.log(results));
// NewApiService.fetchMovieById(2).then(results => console.log(results));
//uncomment when will be in work
//need pass NewApiService.query;
// NewApiService.fetchMovieForQuery().then(results => console.log(results));

export function renderGalleryTrendingMovie(data) {
  const formattedData = formatData(data.results);
  const markup = filmGallery(formattedData);
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

NewApiService.fetchTrendingMovies()
  .then(renderGalleryTrendingMovie)
  .then(saveTrendingToLocalStorage);
