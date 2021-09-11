import { contentCardsRef } from '../content-grid.main';
import filmCardsTmp from '../../templates/film-card.hbs';
import ApiService from '../api-service/api-service';
import LocalStorageApi from './localStorageApi';
import { renderLibContent, onLibraryBtnClick } from './render-library-list';
import { refs } from '../header/header.main';
export { onCardClick, insert };

const insert = document.querySelector('.insert');
const apiService = new ApiService();
const localStorageApi = new LocalStorageApi();
let currentMovieId = null;
let filmData = null;
let buttonW = null;
let buttonQ = null;

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
  currentMovieId = filmData.id;

  insert.innerHTML = filmCardsTmp(filmData);

  updateInfo();

  insert.classList.add('is-open');
  document.body.classList.add('modal-open');

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

  if (localStorageApi.checkMovie(buttonKey, currentMovieId)) {
    button.innerHTML = `add to ${buttonKey}`;
    localStorageApi.removeMovie(buttonKey, filmData);
    renewPageContent(refs.lastClickedFilterBtn, contentCardsRef);
  } else {
    button.innerHTML = `del from ${buttonKey}`;
    localStorageApi.addMovie(buttonKey, filmData);
    renewPageContent(refs.lastClickedFilterBtn, contentCardsRef);
  }
}
// ========== обновляет контент на странице при удалении из списка в localStorage ==========
function renewPageContent(key, refToInput) {
  if (!refs.libPage.hasAttribute('style')) {
    const list = localStorageApi.getMovies(key);
    if (list.length > 0) {
      renderLibContent(localStorageApi.getMovies(key), refToInput);
    } else {
      contentCardsRef.innerHTML = `<li class='empty-list'><h2>${key} list is empty</h2></li>`;
    }
  }
}

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

// ==========перевіряє інфу карті фільма в модальному вікні та оновлює її до дизайну========
function updateInfo() {
  const genreInfoRef = insert.querySelector('.item-info-gen');
  const ratingInfoRef = insert.querySelector('.content__rating');
  const populInfoRef = insert.querySelector('.item-info-popul');
  const updatedPopulInfo = populInfoRef.innerText.slice(0, populInfoRef.innerText.length - 2);
  if (genreInfoRef.innerHTML.trim() === '') {
    genreInfoRef.innerHTML = 'Other';
  }
  if (!ratingInfoRef.textContent.includes('.')) {
    ratingInfoRef.textContent += '.0';
  }
  populInfoRef.innerText = ` ${updatedPopulInfo}`;
}
