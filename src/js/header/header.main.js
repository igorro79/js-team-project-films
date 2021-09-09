import ApiService from '../api-service/api-service';
import pageInit from '../components/page-init';
import { setBtnState, setBtnDefaultState } from '../components/set-btn-state';

import {
  contentCardsRef,
  contentBtnListRef,
  contentBtnDefDataTag,
  contentBtnDefDataTagValue,
  contentBtnActiveSelector,
} from '../content-grid.main';
import { onLibraryClick, onLibraryBtnClick } from '../components/render-library-list';
import pageOnSearch from '../components/on-search';
const debounce = require('lodash/debounce');
const apiService = new ApiService();

export const refs = {
  searchField: document.querySelector('.js-input'),
  libPage: document.querySelector('.lib-container'),
  homePage: document.querySelector('.home-container'),
  watchedBtn: document.querySelector('.js-watched'),
  queueBtn: document.querySelector('.js-queue'),
  contentFilterBtn: document.querySelector('.content__btn__list'),
  headerNav: document.querySelectorAll('.header__nav-wrapper'),
  badSearchMsg: document.querySelector('.header__warning'),
};

refs.headerNav[0].addEventListener('click', onNavButton);
refs.headerNav[1].addEventListener('click', onNavButton);
refs.searchField.addEventListener('input', debounce(onInput, 1000));

function onNavButton(event) {
  event.preventDefault;
  let value = event.target.dataset.name;
  if (value === 'home') {
    onHomeBtn(event);
  } else if (value === 'liba') {
    onLibBtn(event);
  }
}

function onHomeBtn() {
  refs.watchedBtn.removeEventListener('click', onWatched);
  refs.queueBtn.removeEventListener('click', onQueue);
  refs.homePage.removeAttribute('style', 'display: none');
  refs.libPage.setAttribute('style', 'display: none');
  refs.contentFilterBtn.removeAttribute('style', 'display: none');
  pageInit(apiService, contentCardsRef);
  setBtnDefaultState(
    contentBtnListRef,
    contentBtnDefDataTag,
    contentBtnDefDataTagValue,
    contentBtnActiveSelector,
  );
}

function onLibBtn(event) {
  refs.watchedBtn.addEventListener('click', onWatched);
  refs.queueBtn.addEventListener('click', onQueue);
  onLibraryBtnClick(event);
  refs.homePage.setAttribute('style', 'display: none');
  refs.libPage.removeAttribute('style', 'display: none');
  refs.contentFilterBtn.setAttribute('style', 'display: none');
  refs.watchedBtn.classList.add('modal-button--active');
  refs.queueBtn.classList.remove('modal-button--active');
}

function onInput(event) {
  if (!refs.badSearchMsg.hasAttribute('style')) {
    refs.badSearchMsg.setAttribute('style', 'display: none');
  }

  refs.contentFilterBtn.setAttribute('style', 'display: none');
  let searchQuery = event.target.value;
  if (searchQuery.trim() === '') {
    refs.badSearchMsg.removeAttribute('style', 'display: none');
    refs.searchField.value = '';
    return;
  }
  apiService.query = searchQuery;
  pageOnSearch(apiService, contentCardsRef);
  refs.searchField.value = '';
}

function onWatched(event) {
  onLibraryBtnClick(event);
  refs.watchedBtn.classList.add('modal-button--active');
  refs.queueBtn.classList.remove('modal-button--active');
}

function onQueue(event) {
  onLibraryBtnClick(event);
  // contentCardsRef.innerHTML = '<h2>List to watch</h2>';
  refs.watchedBtn.classList.remove('modal-button--active');
  refs.queueBtn.classList.add('modal-button--active');
}
