import ApiService from './api-service.js';
export const STORAGE_KEY_GENRES = 'genres';
const newApiService = new ApiService();

async function getGenresData() {
  try {
    const data = await newApiService.fetchGenre();

    localStorage.setItem(STORAGE_KEY_GENRES, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
getGenresData();
