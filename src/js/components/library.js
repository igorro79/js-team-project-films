

import localStorageApi from './localStorageApi';
import cardFilmsTpl from '../../templates/content-grid.hbs';


const CHOICE_STORAGE_BTN_NAME = 'content__btn';
const USER_POINT_STORAGE_NAME = 'user';

const getMovies = async idList => {
  const key = 'bb47124fe990b3a04ccb5a994cf49456';

  const promises = idList.map(id => {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
    return fetch(url)
      .then(r => r.json())
      .then(data => ({
        ...data,
        release_date: data.release_date.split('-')[0],
      }));
  });

  return await Promise.all(promises);
};

const refs = {
  storageList: document.querySelector('.button-wrapper'),
  cardLibrary: document.querySelector('.js-card-library'),
  };

getCurrentLibrary();
renderMovies();

refs.storageList.addEventListener('change', renderMovies);

function renderMovies() {
  const key = getCheckedLiblary();
  const idList = localStorageApi.getMovies(key);

  refs.cardLibrary.dataset.library = key;
  saveCurrentLibrary(key);

  if (idList.length) {
        getMovies(idList.slice(0, 20)).then(moviesArray => {
      renderMarkup(moviesArray);
            fetchDataOfLibFilms();
     
    });
  } else {
    refs.cardLibrary.innerHTML = `There is nothing here" />`;
    
  }
}
function getCheckedLiblary() {
  return document.querySelector(`[name=${CHOICE_STORAGE_BTN_NAME}]:checked`)
    .value;
}
function renderMarkup(moviesArray) {
  refs.cardLibrary.innerHTML = cardFilmsTpl(moviesArray);
  }

function getCurrentLibrary() {
  const userPoint = localStorageApi.load(USER_POINT_STORAGE_NAME);
  if (userPoint) {
    document.querySelector(
      `[value="${userPoint.currentLibrary}"]`,
    ).checked = true;
  }
}
function saveCurrentLibrary(currentLibrary) {
  localStorageApi.save(USER_POINT_STORAGE_NAME, { currentLibrary });
}


function displayLibList(wrapper, page) {
  wrapper.innerHTML = '';
  fetchLibFilmsByPage(page).catch(err => {
    console.log('error in function displayList');
  });
}


function fetchLibFilmsByPage(page) {
  const key = getCheckedLiblary();
  const idList = localStorageApi.getMovies(key);

  const requiredPageIdList = idList.slice(
    (page - 1) * 20,
    (page - 1) * 20 + 20,
  );

   return getMovies(requiredPageIdList).then(moviesArray => {
    renderMarkup(moviesArray);
    
  });
}