import ApiService from './api-service.js';
export const STORAGE_KEY_TRENDING = 'trending';
const newApiService = new ApiService();

export async function saveTrendingToLocalStorage() {
  try {
    const data = await newApiService.fetchTrendingMovies();

    localStorage.setItem(STORAGE_KEY_TRENDING, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
