import modalCard from '../templates/modal-card.hbs';

let spinnerw
let spinnerq
let spinnerButQueve
let spinnerButWatched
let labelw
let labelq

export default function mainSpinner() {
  spinnerw = document.querySelector('.loading-w')
      spinnerq = document.querySelector('.loading-q')
      spinnerButWatched = document.querySelector('.js-btn__watched')
      spinnerButQueve = document.querySelector('.js-btn__queue')
  labelw = document.querySelector('.label-w')
  labelq = document.querySelector('.label-q')
      
  
      spinnerButWatched.addEventListener('click', addSpinnerAfterClickW)
      spinnerButQueve.addEventListener('click', addSpinnerAfterClickQ)
}

function addSpinnerAfterClickW() {
  labelw.textContent = 'Loading...'
  spinnerw.classList.add('loader')
  
}

function addSpinnerAfterClickQ() {
  labelq.textContent = 'Loading...'
  spinnerq.classList.add('loader')
  
}