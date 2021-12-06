import axios from 'axios';
const API_KEY = 'd16c53a3a4d5eb154f379745597d6181';
axios.defaults.baseURL = 'https://api.themoviedb.org';

export default class ApiService {
  constructor() {
    this.pageNum = 1;
    this.searchValue = '';
    this.movieId;
  }

  async fetchTrendingMovies() {
    const response = await axios.get(
      `/3/trending/movie/day?api_key=${API_KEY}&page=${this.pageNum}`,
    );
    this.pageAdd();
    return response.data;
  }

  async fetchMovieForQuery() {
    const response = await axios.get(
      `/3/search/movie?api_key=${API_KEY}&page=${this.pageNum}&query=${this.searchValue}&language=en-US&include_adult=false`,
    );
    return response.data;
  }

  async fetchGenre() {
    const response = await axios.get(`/3/genre/movie/list?api_key=${API_KEY}`);
    return response.data;
  }

  async fetchMovieById() {
    const response = await axios.get(`/3/movie/${this.movieId}?api_key=${API_KEY}`);

    return response.data;
  }

  pageAdd() {
    this.pageNum += 1;
  }

  resetPage() {
    this.pageNum = 1;
  }

  removePage() {
    this.pageNum -= 1;
    if (this.pageNum <= 1) {
      this.pageNum = 1;
    }
  }

  get query() {
    return this.searchValue;
  }

  set query(newValue) {
    this.searchValue = newValue;
  }
}
