import ApiService from './api-service.js';
import { fetchPopularMovies } from './api-service';
import { renderGalleryTrendingMovie } from './renderTrendingMovies';
import { fetchrenderGalleryMovieForQuery } from './renderMovieForQuery';
import { formatData } from './formatted-data';
import { formEl } from './renderMovieForQuery';
import Pagination from 'tui-pagination';
import filmGallery from '../templates/film-card.hbs';
import { galleryEl } from './renderMovieForQuery';
import { STORAGE_KEY_MAIN } from './keys-local-storage';
import { saveDataToLocalStorage } from './saveTrendingTolocalStorage';
import { searchQueryApiService } from './renderMovieForQuery';
export const initPagination = ({ page, itemsPerPage, totalItems }) => {
  const options = {
    page,
    itemsPerPage,
    totalItems,
    visiblePages: 3,
    centerAlign: true,
    usageStatistics: false,
  };
  const newApiService = new ApiService();

  const pagination = new Pagination('pagination', options);

  pagination.on('afterMove', async ({ page }) => {
    newApiService.pageNum = page;

    if (ApiService.searchType === 'popular') {
      try {
        console.log(newApiService.pageNum);
        const response = await newApiService.fetchTrendingMovies();
        const formattedData = formatData(response.results);

        const markup = filmGallery(formattedData);
        galleryEl.innerHTML = '';
        galleryEl.insertAdjacentHTML('afterbegin', markup);

        for (page = 1; page < response.results.length; i += 1) {
          saveDataToLocalStorage(STORAGE_KEY_MAIN, formattedData);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (ApiService.searchType === 'search') {
      searchQueryApiService.pageNum = page;
      try {
        const response = await searchQueryApiService.fetchMovieForQuery();
        const formattedData = formatData(response.results);
        const markup = filmGallery(formattedData);
        galleryEl.innerHTML = '';
        galleryEl.insertAdjacentHTML('afterbegin', markup);
        saveDataToLocalStorage(STORAGE_KEY_MAIN, formattedData);
      } catch (error) {
        console.log(error);
      }
    }
  });
  return pagination;
};
