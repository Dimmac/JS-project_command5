import * as basicLightbox from 'basiclightbox';
import { developers } from './object-developers';
import sprite from '../images/sprite.svg';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const linkEl = document.querySelector('.js-team-modal');
linkEl.addEventListener('click', openModalTeam);

const arrayDev = developers.reduce(
  (acc, { name, image, position, github }) =>
    acc +
    `<li class="team-item">
    <div class="team-img-wrapper"><img src="${image}" alt="${name}" class="team-image" loading="lazy"></div>
   <div class="team-info-wrapper">
    <p class="team-name">${name}</p>
    <p class="team-position">${position}</p>
    <a href="${github}" target="_blank" class="team-git"><svg class="github-icon" width="24" height="24">
      <use href="${sprite}#icon-github"></use>
    </svg></a>
   </div>
</li>`,
  '',
);

const modalTeam = basicLightbox.create(
  `
   <div class="team-container">
  <div class="title-wrapper">

    <h2 class="team-title">Team "Input and click"</h2>
  </div>
  <div class="team-content">
    <ul class="team-list">${arrayDev}</ul>
  </div>
</div>
`,
  {
    onClose: modalTeam => {
      document.body.classList.remove('bg-scrolling-element-when-mobile-open');
    },
  },
);

function openModalTeam(event) {
  event.preventDefault();
  NProgress.start();
  modalTeam.show();
  document.body.classList.add('bg-scrolling-element-when-mobile-open');
  NProgress.done();
}

window.addEventListener('keydown', closeModalTeam);

function closeModalTeam(event) {
  if (event.code === 'Escape') {
    modalTeam.close();
    window.removeEventListener('keydown', closeModalTeam);
  }
}
