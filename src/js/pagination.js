// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

// import ApiService from './api-service.js';

// import { renderGalleryTrendingMovie } from './renderTrendingMovies.js';

// const newApiService = new ApiService();
// const container = document.getElementById('pagination');

// const options = {
//   //   totalItems: 20000,
//   //   itemsPerPage: 10,
//   visiblePages: 9,
//   page: 1,
// };

// const pagination = new Pagination(container, options);

// const page = pagination.getCurrentPage();

// newApiService.fetchTrendingMovies(page).then(({ results, total_results }) => {
//   renderGalleryTrendingMovie(results);
//   pagination.reset(total_results);
// });

// pagination.on('afterMove', ({ page }) => {
//   console.log(page);
//   newApiService.fetchTrendingMovies(page).then(({ results }) => {
//     console.log(results);
//     renderGalleryTrendingMovie(results);
//   });
// });
// //  ----------------------------------

// const options = {
//   page: 1,
//   visiblePages: 9,
//   template: {
//     currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//   },
//   // currentPage: 'page',
// };

// const pagination = new Pagination(container, options);
// const page = pagination.getCurrentPage();

// pagination.on('afterMove', ({ page }) => {
//   renderGalleryTrendingMovie(page);
// });
import ApiService from './api-service.js';
import { fetchPopularMovies } from './api-service';
import { renderGalleryTrendingMovie } from './renderTrendingMovies';
import { fetchrenderGalleryMovieForQuery } from './renderMovieForQuery';
import { formatData } from './formatted-data';
import { formEl } from './renderMovieForQuery';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import filmGallery from '../templates/film-card.hbs';
import { galleryEl } from './renderMovieForQuery';
import { saveTrendingToLocalStorage } from './saveTrendingTolocalStorage';

// export const paginationContainer = {
//   startPage: 1,
//   searchType: null,
//   pagination: null,
// };

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

        saveTrendingToLocalStorage(formattedData);
      } catch (error) {
        console.log(error);
      }
    } else if (ApiService.searchType === 'search') {
      try {
        const results = await newApiService.fetchMovieForQuery();
        const formattedData = formatData(results);
      } catch (error) {
        console.log(error);
      }
    }
  });
  return pagination;
};
