import ApiService from './api-service.js';
import filmGallery from '../templates/film-card.hbs';
import { formatData } from './formatted-data';

import { saveTrendingToLocalStorage, STORAGE_KEY_TRENDING } from './saveTrendingTolocalStorage';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const newApiService = new ApiService();

const galleryEl = document.querySelector('.film__list');

const container = document.getElementById('pagination');

const options = {
  page: 1,
  visiblePages: 9,
  template: {
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
  },
  // currentPage: 'page',
};

const pagination = new Pagination(container, options);
const page = pagination.getCurrentPage();

pagination.on('afterMove', ({ page }) => {
  renderGalleryTrendingMovie(page);
});

export async function renderGalleryTrendingMovie(page) {
  try {
    const response = await newApiService.fetchTrendingMovies(page);
    const formattedData = formatData(response.results);
    const markup = filmGallery(formattedData);
    galleryEl.insertAdjacentHTML('beforeend', markup);
    // galleryEl.innerHTML = markup;

    pagination.reset(response.total_pages);
    saveTrendingToLocalStorage(formattedData);
  } catch (error) {
    console.log(error);
  }
}

renderGalleryTrendingMovie(page);
