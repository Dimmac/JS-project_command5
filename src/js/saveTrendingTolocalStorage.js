import ApiService from './api-service.js';
export const STORAGE_KEY_TRENDING = 'trending';
const newApiService = new ApiService();

export async function saveTrendingToLocalStorage(formattedData) {
  try {
    localStorage.setItem(STORAGE_KEY_TRENDING, JSON.stringify(formattedData));
  } catch (error) {
    console.log(error);
  }
}
