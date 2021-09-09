import createContentMarkup from './create-markup';
import contentCardsTmp from '../../templates/content-grid.hbs';
import { contentCardsRef } from '../content-grid.main';
import loaderSpinner from './loader-spinner';
import { onCardClick, insert } from './on-film-card';
import localStorageApi from './localStorageApi';

function onLibraryClick() {
  if (JSON.parse(localStorage.watched).length === 0) {
    contentCardsRef.innerHTML = '<h2>My watched films</h2>';
  }
  renderLibContent(JSON.parse(localStorage.watched), contentCardsRef);
}

function onLibraryBtnClick(event) {
  let key = event.target.dataset.name;
  if (key === 'Watched' || key === 'liba') {
    console.log(localStorageApi.getMovies(key));
    renderLibContent(localStorageApi.getMovies(key), contentCardsRef);
  } else if (key === 'Queue') {
    console.log(localStorageApi.getMovies(key));
    renderLibContent(localStorageApi.getMovies(key), contentCardsRef);
  }
}

async function renderLibContent(array, elemtRef) {
  loaderSpinner.loaderShow(elemtRef);
  try {
    const collection = array;
    createContentMarkup(elemtRef, collection, contentCardsTmp(collection));
    loaderSpinner.loaderHide(elemtRef);
  } catch (error) {
    console.log(error);
  }
}

export { onLibraryClick, onLibraryBtnClick };
