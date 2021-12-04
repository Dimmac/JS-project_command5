import ApiService from './api-service.js';

const NewApiService = new ApiService();

const galleryEl = document.querySelector('.container-movie');

NewApiService.resetPage();
NewApiService.fetchTrendingMovies().then(results => console.log(results));
NewApiService.fetchGenre().then(results => console.log(results));
//uncomment when will be in work
//need pass NewApiService.query;
// NewApiService.fetchMovieForQuery().then(results => console.log(results));
NewApiService.galleryEl.insertAdjacentHTML = '';
