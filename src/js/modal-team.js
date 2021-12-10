import * as basicLightbox from 'basiclightbox';
import { developers } from './object-developers';
import githubUrl from '../images/github.svg';
const linkEl = document.querySelector('.js-team-modal');
linkEl.addEventListener('click', openModalTeam);

const arrayDev = developers.reduce(
  (acc, { name, image, position, github }) =>
    acc +
    `<li class="team-item">
    <img src="${image}" alt="${name}" class="team-image">
    <p class="team-name">${name}</p>
    <p class="team-position">${position}</p>
    <a href="${github}" target="_blank" class="team-git"><svg class="github-icon" width="20" height="20">
      <use href="${githubUrl}"></use>
    </svg></a>
</li>`,
  '',
);

const modalTeam = basicLightbox.create(`
   <div class="team-container visually-hidden">
  <div class="title-wrapper">

    <h2 class="team-title">Засунь и тыкай</h2>
  </div>
  <div class="team-content">
    <ul class="team-list">${arrayDev}</ul>
  </div>
</div>
`);

function openModalTeam(event) {
  event.preventDefault();
  modalTeam.show();
}

window.addEventListener('keydown', closeModalTeam);

function closeModalTeam(event) {
  if (event.code === 'Escape') {
    modalTeam.close();
    window.removeEventListener('keydown', closeModalTeam);
  }
}
