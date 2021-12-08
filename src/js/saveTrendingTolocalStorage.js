import ApiService from './api-service.js';

const newApiService = new ApiService();

export async function saveDataToLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
