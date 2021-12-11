import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import modalCard from '../templates/modal-card.hbs';
import spinnerLoad from '../js/spinner';
import mainSpinner from '../js/spinner';
import { STORAGE_KEY_QUEUE, STORAGE_KEY_OPEN_MODAL, STORAGE_KEY_MAIN } from './keys-local-storage';
import { saveDataToLocalStorage } from './saveTrendingTolocalStorage';

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

  instance = basicLightbox.create(modalCard(parsedData), {
    onShow: instance => {
      document.body.classList.add('bg-scrolling-element-when-mobile-open');
    },
    onClose: instance => {
      document.body.classList.remove('bg-scrolling-element-when-mobile-open');
    },
  });
  instance.show();

  const refs = {
    addToWatchedBtn: document.querySelector('.js-btn__watched'),
    addToQueueBtn: document.querySelector('.js-btn__queue'),
  };

  modal = document.querySelector('.modal');
  closeBtn = document.querySelector('.js-modal__close-btn');

  // mainSpinner();
  refs.addToQueueBtn.addEventListener('click', onAddToQueueClick);
  saveDataToLocalStorage(STORAGE_KEY_OPEN_MODAL, parsedData);
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

let queueArray = [];
let newQueueArray = [];

function onAddToQueueClick(e) {
  // movieId = +e.target.parentNode.parentNode.id;
  // findMovieInArray(movieId);
  // if (openedMovie) {
  //   removeFromQueue(id);
  //   return;
  // }
  addToQueue();

  //   const parsedFilmFromModal = JSON.parse(localStorage.getItem(STORAGE_KEY_OPEN_MODAL));
  //   array.push(parsedFilmFromModal);
  //   refs.addToQueueBtn.textContent = 'Added to queue';
  //   saveDataToLocalStorage(STORAGE_KEY_WATCHED, array);
}

function addToQueue() {
  const refs = {
    addToWatchedBtn: document.querySelector('.js-btn__watched'),
    addToQueueBtn: document.querySelector('.js-btn__queue'),
  };
  const modalMovie = JSON.parse(localStorage.getItem(STORAGE_KEY_OPEN_MODAL));
  console.log('hi this is add to queue');
  queueArray = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE)) || [];
  // if (queueArray.includes(modalMovie)) {
  //   refs.addToQueueBtn.textContent = 'Add to queue';
  //   return;
  // }
  queueArray.push(modalMovie);
  saveDataToLocalStorage(STORAGE_KEY_QUEUE, queueArray);
  refs.addToQueueBtn.textContent = 'Remove';
}

// function removeFromQueue() {
//   const parsedFilmFromQueue = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));
//   for (let i = 0; i < parsedFilmFromQueue.length; i += 1)
//     if (parsedFilmFromQueue[i].id === openedMovie.id) {
//       newQueueArray -= parsedFilmFromQueue.splice(i, 1);
//       refs.addToQueueBtn.textContent = 'Add to queue';
//       saveDataToLocalStorage(STORAGE_KEY_QUEUE, newQueueArray);
//     }
// }

// function findMovieInArray(id) {
//   const moviesInQueue = JSON.parse(localStorage.getItem(STORAGE_KEY_QUEUE));

//   const openedMovie = moviesInQueue.find(arr => arr.id === id);
//   if (!openedMovie) {
//     return;
//   }
//   return openedMovie;
// }
