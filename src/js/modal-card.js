import ApiService from './api-service';
import modalCard from '../templates/modal-card.hbs';
const NewApiService = new ApiService();

const galleryEl = document.querySelector('.film__list');
function renderModal(data) {
  galleryEl.insertAdjacentHTML('beforeend', modalCard(data));
}
NewApiService.fetchMovieById(10770).then(renderModal);
