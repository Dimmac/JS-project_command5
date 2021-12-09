import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import ApiService from './api-service';
import modalCard from '../templates/modal-card.hbs';
import { STORAGE_KEY_HOME, STORAGE_KEY_MAIN } from './keys-local-storage';

let detaleMovie;
let instance;
let modal;
let closeBtn;
let movieId;
const main = localStorage.getItem(STORAGE_KEY_MAIN);
const home = localStorage.getItem(STORAGE_KEY_HOME);

export default function onOpenModalFilmCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  movieId = +e.target.parentNode.parentNode.id;

  createMovieById(movieId);

  instance = basicLightbox.create(modalCard(detaleMovie));
  instance.show();

  closeBtn = document.querySelector('.js-modal__close-btn');
  closeBtn.addEventListener('click', onCloseModalFilmCard);

  window.addEventListener('keydown', onCloseModalFilmCard);
}

function createMovieById(id) {
  try {
    if (main !== null) {
      detaleMovie = JSON.parse(main).find(arr => arr.id === id);
    } else {
      detaleMovie = JSON.parse(home).find(arr => arr.id === id);
    }

    console.log(detaleMovie);
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
