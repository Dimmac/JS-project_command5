import ApiService from './api-service.js';
import filmGallery from '../templates/film-card.hbs';
import { formatData } from './formatted-data';
import { initPagination } from './pagination.js';
import { STORAGE_KEY_HOME, STORAGE_KEY_MAIN } from './keys-local-storage';
import { saveDataToLocalStorage } from './saveTrendingTolocalStorage';

const trendingApiService = new ApiService();
export let pagination = null;
const galleryEl = document.querySelector('.film__list');

export async function renderGalleryTrendingMovie() {
  try {
    const {
      page,
      results,
      total_results: totalResults,
    } = await trendingApiService.fetchTrendingMovies();
    const formattedData = formatData(results);
    const markup = filmGallery(formattedData);
    pagination = initPagination({ page, itemsPerPage: results.length, totalItems: totalResults });
    pagination.totalItemsHome = totalResults;
    ApiService.searchType = 'popular';
    galleryEl.insertAdjacentHTML('beforeend', markup);

    saveDataToLocalStorage(STORAGE_KEY_HOME, formattedData);
    saveDataToLocalStorage(STORAGE_KEY_MAIN, formattedData);
  } catch (error) {
    console.log(error);
  }
}

renderGalleryTrendingMovie();
