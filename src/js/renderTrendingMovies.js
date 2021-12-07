import ApiService from './api-service.js';
import filmGallery from '../templates/film-card.hbs';
import { formatData } from './formatted-data';
import { initPagination } from './pagination.js';

import { saveTrendingToLocalStorage, STORAGE_KEY_TRENDING } from './saveTrendingTolocalStorage';

const newApiService = new ApiService();

const galleryEl = document.querySelector('.film__list');

export async function renderGalleryTrendingMovie() {
  try {
    const {
      page,
      results,
      total_results: totalResults,
    } = await newApiService.fetchTrendingMovies();
    const formattedData = formatData(results);
    const markup = filmGallery(formattedData);
    initPagination({ page, itemsPerPage: results.length, totalItems: totalResults });
    ApiService.searchType = 'popular';
    galleryEl.insertAdjacentHTML('beforeend', markup);

    saveTrendingToLocalStorage(formattedData);
  } catch (error) {
    console.log(error);
  }
}

renderGalleryTrendingMovie();
