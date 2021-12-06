// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

// import ApiService from './api-service.js';

// import { renderGalleryTrendingMovie } from './renderTrendingMovies.js';

// const NewApiService = new ApiService();
// const container = document.getElementById('pagination');

// const options = {
//   //   totalItems: 20000,
//   //   itemsPerPage: 10,
//   visiblePages: 9,
//   page: 1,
// };

// const pagination = new Pagination(container, options);

// const page = pagination.getCurrentPage();

// NewApiService.fetchTrendingMovies(page).then(({ results, total_results }) => {
//   renderGalleryTrendingMovie(results);
//   pagination.reset(total_results);
// });

// pagination.on('afterMove', ({ page }) => {
//   console.log(page);
//   NewApiService.fetchTrendingMovies(page).then(({ results }) => {
//     console.log(results);
//     renderGalleryTrendingMovie(results);
//   });
// });
