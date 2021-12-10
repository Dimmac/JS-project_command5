import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import ApiService from './api-service';
import modalCard from '../templates/modal-card.hbs';
import spinnerLoad from '../js/spinner';
import mainSpinner from '../js/spinner';

const apiService = new ApiService();

const watchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds')) || [];
const queueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds')) || [];
const arrWatchedFilmsIds = JSON.parse(localStorage.getItem('arrWatchedFilmsIds')) || [];
const arrQueueFilmsIds = JSON.parse(localStorage.getItem('arrQueueFilmsIds')) || [];

let detaleMovie;
let instance;
let modal;

let closeBtn;

export default function onOpenModalFilmCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  apiService.movieId = e.target.parentNode.parentNode.id;

  (async () => {
    try {
      await createMovieById();

      instance = basicLightbox.create(modalCard(detaleMovie));
      instance.show();

      modal = document.querySelector('.modal');
      closeBtn = document.querySelector('.js-modal__close-btn');

      mainSpinner();

      closeBtn.addEventListener('click', onCloseModalFilmCard);
    } catch (error) {
      console.log(error);
    }
  })();

  window.addEventListener('keydown', onCloseModalFilmCard);
}

async function createMovieById() {
  try {
    detaleMovie = await apiService.fetchMovieById();

    detaleMovie.year = detaleMovie.release_date ? detaleMovie.release_date.split('-')[0] : 'n/a';
    if (detaleMovie.genres.length > 3) {
      detaleMovie.genres = detaleMovie.genres.slice(0, 2).flat().concat({ name: 'Other' });
    }
    return detaleMovie;
  } catch (error) {
    console.log(error);
  }
}

function onCloseModalFilmCard(e) {
  if (e.code !== 'Escape' && !e.target?.classList.contains('close')) {
    return;
  }
  instance.close();
  window.removeEventListener('keydown', onCloseModalFilmCard);
}
