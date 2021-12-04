import axios from 'axios';
const API_KEY = 'd16c53a3a4d5eb154f379745597d6181';
axios.defaults.baseURL = 'https://api.themoviedb.org';

export default class ApiService {
  constructor() {
    this.pageNum = 1;
    this.searchValue = '';
  }

  fetchTrendingMovies() {
    try {
      return axios
        .get(`/3/trending/movie/day?api_key=${API_KEY}&page=${this.pageNum}`)
        .then(response => {
          return response.data;
        });
    } catch (error) {
      console.log(`ERROR: fetchMovie ${error}`);
    }
  }

  fetchMovieForQuery() {
    try {
      return axios
        .get(`/3/search/movie?api_key=${API_KEY}&page=${this.pageNum}&query=${searchValue}`)
        .then(response => {
          return response.data;
        });
    } catch (error) {
      console.log(`ERROR: fetchMovieForQuery ${error}`);
    }
  }

  fetchGenre() {
    try {
      return axios.get(`/genre/movie/list?api_key=${API_KEY}`).then(response => {
        return response.data.genres;
      });
    } catch (error) {
      console.log(`ERROR: fetchGenre ${error}`);
    }
  }

  pageAdd() {
    this.pageNum += 1;
  }

  resetPage() {
    this.pageNum = 1;
  }

  removePage() {
    this.pageNum -= 1;
  }

  get query() {
    return this.searchValue;
  }

  set query(newValue) {
    this.searchValue = newValue;
  }
}
