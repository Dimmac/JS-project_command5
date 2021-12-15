import { STORAGE_KEY_GENRES } from './keys-local-storage';
import onOpenModalFilmCard from './modal-card.js';
export function formatData(data) {
  const savedGenres = localStorage.getItem(STORAGE_KEY_GENRES);
  const parsedGenres = JSON.parse(savedGenres);

  data.forEach(item => {
    const arrayGenres = item.genre_ids.reduce((acc, id) => {
      const genreToFind = parsedGenres.genres.find(genre => genre.id === id);
      if (genreToFind) {
        acc.push(genreToFind.name);
      }

      return acc;
    }, []);
    item.fullGenres = arrayGenres.map(genre => genre);
    if (item.fullGenres.length === 0) {
      item.fullGenres[0] = 'Unknown';
    }
    if (arrayGenres.length === 0) {
      arrayGenres[0] = 'Unknown';
    } else if (arrayGenres.length >= 3) {
      arrayGenres.splice(3);
      arrayGenres[2] = 'Other';
    }

    item.genres = arrayGenres;

    if (item.name) {
      item.title = item.name;
    }

    if (item.original_name) {
      item.original_title = item.original_name;
    }

    if (item.release_date) {
      item.release_date = item.release_date.slice(0, 4);
    } else if (item.first_air_date) {
      item.release_date = item.first_air_date.slice(0, 4);
    }

    item.popularity = Number(item.popularity).toFixed(1);
  });
  // console.log(data);
  return data;
}

const filmList = document.querySelector('.js-film-list');
filmList.addEventListener('click', onOpenModalFilmCard);
