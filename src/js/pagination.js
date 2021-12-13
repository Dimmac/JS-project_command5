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
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
export const initPagination = ({ page, itemsPerPage, totalItems }) => {
  // NProgress.start();
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
        NProgress.start();
        const response = await newApiService.fetchTrendingMovies();
        const formattedData = formatData(response.results);

        const markup = filmGallery(formattedData);
        galleryEl.innerHTML = '';
        galleryEl.insertAdjacentHTML('afterbegin', markup);
        saveDataToLocalStorage(STORAGE_KEY_MAIN, formattedData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        NProgress.done();
      } catch (error) {
        console.log(error);
      }
    } else if (ApiService.searchType === 'search') {
      searchQueryApiService.pageNum = page;
      try {
        NProgress.start();
        const response = await searchQueryApiService.fetchMovieForQuery();
        const formattedData = formatData(response.results);
        const markup = filmGallery(formattedData);
        galleryEl.innerHTML = '';
        galleryEl.insertAdjacentHTML('afterbegin', markup);
        saveDataToLocalStorage(STORAGE_KEY_MAIN, formattedData);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        NProgress.done();
      } catch (error) {
        console.log(error);
      }
    }
  });
  // NProgress.done();
  return pagination;
};
