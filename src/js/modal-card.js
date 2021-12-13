import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import modalCard from '../templates/modal-card.hbs';
import {
  STORAGE_KEY_WATCHED,
  STORAGE_KEY_QUEUE,
  STORAGE_KEY_OPEN_MODAL,
  STORAGE_KEY_MAIN,
} from './keys-local-storage';
import { saveDataToLocalStorage } from './saveTrendingTolocalStorage';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

let detaleMovie;
let instance;
let modal;
let closeBtn;
let movieId;

export default function onOpenModalFilmCard(e) {
  NProgress.start();
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  movieId = +e.target.parentNode.parentNode.id;

  const parsedData = createMovieById(movieId);

  instance = basicLightbox.create(modalCard(parsedData), {
    onShow: instance => {
      document.body.classList.add('bg-scrolling-element-when-mobile-open');
    },
    onClose: instance => {
      document.body.classList.remove('bg-scrolling-element-when-mobile-open');
    },
  });
  instance.show();
  // ===============================================================================
  const refs = {
    addToWatchedBtn: document.querySelector('button[data-action="add-to-watched"]'),
    addToQueueBtn: document.querySelector('button[data-action="add-to-queue"]'),
  };

  let queueArray = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE)) || [];
  let watchedArray = JSON.parse(localStorage.getItem(STORAGE_KEY_WATCHED)) || [];

  function checkLocalStorage(id) {
    const queueFilm = queueArray.find(film => film.id === id);
    const watchedFilm = watchedArray.find(film => film.id === id);

    if (queueFilm && watchedFilm) {
      refs.addToQueueBtn.textContent = 'Remove from queue';
      refs.addToWatchedBtn.textContent = 'Remove from watched';
      refs.addToQueueBtn.classList.add('button-active');
      refs.addToWatchedBtn.classList.add('button-active');
    } else if (queueFilm) {
      refs.addToQueueBtn.textContent = 'Remove from queue';
      refs.addToQueueBtn.classList.add('button-active');
      refs.addToWatchedBtn.classList.remove('button-active');
    } else if (watchedFilm) {
      refs.addToWatchedBtn.textContent = 'Remove from watched';
      refs.addToWatchedBtn.classList.add('button-active');
      refs.addToQueueBtn.classList.remove('button-active');
    }
  }

  checkLocalStorage(movieId);

  refs.addToQueueBtn.addEventListener('click', onAddToQueueClick);
  refs.addToWatchedBtn.addEventListener('click', onAddToWatchedClick);

  function onAddToQueueClick() {
    if (refs.addToQueueBtn.textContent === 'Remove from queue') {
      removeCard(movieId, STORAGE_KEY_QUEUE);

      refs.addToQueueBtn.textContent = 'Add to queue';
      refs.addToQueueBtn.classList.remove('button-active');
      return;
    }
    addCard(parsedData, STORAGE_KEY_QUEUE);
    refs.addToQueueBtn.textContent = 'Remove from queue';
    refs.addToQueueBtn.classList.add('button-active');
  }
  function onAddToWatchedClick() {
    if (refs.addToWatchedBtn.textContent === 'Remove from watched') {
      removeCard(movieId, STORAGE_KEY_WATCHED);
      refs.addToWatchedBtn.textContent = 'Add to watched';
      refs.addToWatchedBtn.classList.remove('button-active');
      return;
    }
    addCard(parsedData, STORAGE_KEY_WATCHED);
    refs.addToWatchedBtn.textContent = 'Remove from watched';
    refs.addToWatchedBtn.classList.add('button-active');
  }
  // ====================================================================
  modal = document.querySelector('.modal');
  closeBtn = document.querySelector('.js-modal__close-btn');

  saveDataToLocalStorage(STORAGE_KEY_OPEN_MODAL, parsedData);
  closeBtn.addEventListener('click', onCloseModalFilmCard);

  window.addEventListener('keydown', onCloseModalFilmCard);
  // ==========================================================================
  function addCard(data, key) {
    let parsedArray = JSON.parse(localStorage.getItem(key));
    if (!parsedArray) {
      parsedArray = [data];
    } else {
      parsedArray.push(data);
    }

    saveDataToLocalStorage(key, parsedArray);
  }

  function removeCard(id, key) {
    const parsedArray = JSON.parse(localStorage.getItem(key));
    const newParsedArray = parsedArray.filter(film => film.id !== id);

    saveDataToLocalStorage(key, newParsedArray);
  }
  NProgress.done();

  // ==========================================================================
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
