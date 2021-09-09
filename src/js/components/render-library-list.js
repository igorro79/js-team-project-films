import createContentMarkup from './create-markup';
import contentCardsTmp from '../../templates/content-grid.hbs';
import { contentCardsRef } from '../content-grid.main';
import loaderSpinner from './loader-spinner';
// import { onCardClick, insert } from './on-film-card';
import LocalStorageApi from './localStorageApi';

const localStorageApi = new LocalStorageApi();

localStorageApi.initStorage();

function onLibraryClick() {
  const list = localStorageApi.getMovies('Watched');
  // console.log(list);
  if (list.length <= 0) {
    contentCardsRef.innerHTML = `<li><h2>Watched list is empty</h2></li>`;
  } else {
    renderLibContent(list, contentCardsRef);
  }
}

function onLibraryBtnClick(event) {
  let key = event.target.dataset.name;
  const list = localStorageApi.getMovies(key);
  console.log(list);
  if (list.length > 0) {
    // console.log(localStorageApi.getMovies(key));
    renderLibContent(localStorageApi.getMovies(key), contentCardsRef);
  } else {
    contentCardsRef.innerHTML = `<li><h2>${key} list is empty</h2></li>`;
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

export { onLibraryClick, onLibraryBtnClick, renderLibContent };
