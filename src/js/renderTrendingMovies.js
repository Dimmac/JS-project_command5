import ApiService from './api-service.js';
import filmGallery from '../templates/film-card.hbs';
import { formatData } from './formatted-data';
const NewApiService = new ApiService();

const galleryEl = document.querySelector('.film__list');

// NewApiService.fetchTrendingMovies().then(renderGalleryTrendingMovie);
// NewApiService.fetchGenre().then(results => console.log(results));
// NewApiService.fetchMovieById(2).then(results => console.log(results));
//uncomment when will be in work
//need pass NewApiService.query;
// NewApiService.fetchMovieForQuery().then(results => console.log(results));

export function renderGalleryTrendingMovie(data) {
  const markup = filmGallery(data);
  
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

NewApiService.fetchTrendingMovies().then(renderGalleryTrendingMovie);
