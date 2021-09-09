import { contentCardsRef } from '../content-grid.main';
import filmCardsTmp from '../../templates/film-card.hbs';
import ApiService from '../api-service/api-service';
import LocalStorageApi from './localStorageApi';
import { renderLibContent, onLibraryBtnClick } from './render-library-list';

export { onCardClick, insert };

const insert = document.querySelector('.insert');
const apiService = new ApiService();
const localStorageApi = new LocalStorageApi();
let currentMovieId = null;
let filmData = null;
let buttonW = null;
let buttonQ = null;
let lastClickedAddBtn = null;

const filterButtonSet = document.querySelector('.header__filter-button-wrapper');
// =========== при нажатии на карточку фильма ==========
async function onCardClick(event, element) {
  if (event.target.nodeName !== 'A') {
    return;
  }
  const movieId = event.target.dataset.id;
  localStorageApi.initStorage();
  apiService.movieId = event.target.dataset.id;
  filmData = await apiService.fetchById();

  insert.innerHTML = filmCardsTmp(filmData);
  insert.classList.add('is-open');
  document.body.classList.add('modal-open');

  currentMovieId = filmData.id;

  const buttonsList = document.querySelector('.buttons-content');
  buttonsList.addEventListener('click', onAddButton);

  buttonW = buttonsList.children[0];
  buttonQ = buttonsList.children[1];

  checkBtnStat(currentMovieId, buttonW);
  checkBtnStat(currentMovieId, buttonQ);

  onCloseButtonClick();
  onBackdropClick();
  onEscKeyPress();
}

// ========== проверяет localStorage, меняет название кнопок ==========
function checkBtnStat(filmId, button) {
  let filmList = button.value;
  // console.log(name);
  if (localStorageApi.checkMovie(filmList, filmId)) {
    button.innerHTML = `del from ${filmList}`;
  }
}
// ========== при нажатии добавляет в списки для  W/Q и меняет название кнопок ==========
function onAddButton(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  let button = e.target;
  let buttonKey = e.target.value;
  lastClickedAddBtn = buttonKey;
  if (localStorageApi.checkMovie(buttonKey, currentMovieId)) {
    button.innerHTML = `add to ${buttonKey}`;
    localStorageApi.removeMovie(buttonKey, filmData);
  } else {
    button.innerHTML = `del from ${buttonKey}`;
    console.log(filmData);
    console.log(buttonKey);
    localStorageApi.addMovie(buttonKey, filmData);
  }
}
// ========== обновляет контент на странице при удалении из списка в localStorage =====(не работает)=====
function updateLibContent(lastModifiedList, refToInput) {
  let key = lastModifiedList;
  const list = localStorageApi.getMovies(key);
  console.log(list);
  if (list.length > 0) {
    // console.log(localStorageApi.getMovies(key));
    renderLibContent(localStorageApi.getMovies(key), refToInput);
  } else {
    contentCardsRef.innerHTML = `<li><h2>${key} list is empty</h2></li>`;
  }
}
// // ========== проверяет какая кнопка активна / возвращает название списка (Q/W) ====(не работает)======
// function whatFilterIsActive(buttonSet) {
//   console.dir(buttonSet);
//   console.dir(buttonSet.childNodes);
//   if (buttonSet.firstElementChild.classList.contains('modal-button--active')) {
//     console.log(buttonSet.firstElementChild.dataset.name);
//     return buttonSet.firstElementChild.dataset.name;
//   } else {
//     console.log(buttonSet.firstElementChild.dataset.name);
//     return buttonSet.lastElementChild.dataset.name;
//   }
// }

function onCloseButtonClick() {
  const closeButton = document.querySelector('[data-action="close-lightbox"]');
  closeButton.addEventListener('click', closeModal);
}

function onBackdropClick() {
  const closeBackdrop = document.querySelector('.lightbox__overlay');
  closeBackdrop.addEventListener('click', closeModal);
}

function onEscKeyPress() {
  document.body.addEventListener('keyup', pressKey);
}

function pressKey(e) {
  const key = e.key;
  if (key === 'Escape') {
    closeModal();
  }
  false;
}

function closeModal() {
  // updateLibContent(lastClickedAddBtn, contentCardsRef);
  insert.classList.remove('is-open');

  const closeButton = document.querySelector('[data-action="close-lightbox"]');
  closeButton.removeEventListener('click', closeModal);

  const closeBackdrop = document.querySelector('.lightbox__overlay');
  closeBackdrop.removeEventListener('click', closeModal);

  document.body.removeEventListener('keyup', pressKey);
  document.body.classList.remove('modal-open');

  // // ======= снимает слуш. с кнопок на карточке фильма  ============
  // buttonsList.removeEventListener('click', onAddButton);
  // updateLibContent(localStorageApi.getMovies(whatFilterIsActive(filterButtonSet)), contentCardsRef);
}
