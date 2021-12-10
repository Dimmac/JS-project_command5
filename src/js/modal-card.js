import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import modalCard from '../templates/modal-card.hbs';
import spinnerLoad from '../js/spinner';
import mainSpinner from '../js/spinner';
import { STORAGE_KEY_OPEN_MODAL, STORAGE_KEY_MAIN } from './keys-local-storage';

let detaleMovie;
let instance;
let modal;
let closeBtn;
let movieId;

export default function onOpenModalFilmCard(e) {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  movieId = +e.target.parentNode.parentNode.id;

  const parsedData = createMovieById(movieId);

  instance = basicLightbox.create(modalCard(parsedData));
  instance.show();

  modal = document.querySelector('.modal');
  closeBtn = document.querySelector('.js-modal__close-btn');

  mainSpinner();

  closeBtn.addEventListener('click', onCloseModalFilmCard);

  window.addEventListener('keydown', onCloseModalFilmCard);
}

function createMovieById(id) {
  try {
    const main = localStorage.getItem(STORAGE_KEY_MAIN);
    detaleMovie = JSON.parse(main).find(arr => arr.id === id);

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
