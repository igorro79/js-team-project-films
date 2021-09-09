import createContentMarkup from './create-markup';
import contentCardsTmp from '../../templates/content-grid.hbs';
import { contentCardsRef } from '../content-grid.main';
import loaderSpinner from './loader-spinner';
import { onCardClick, insert } from './on-film-card';

function onLibraryClick() {
  if (JSON.parse(localStorage.watched).length === 0) {
    contentCardsRef.innerHTML = '<h2>My watched films</h2>';
  }
  renderLibContent(JSON.parse(localStorage.watched), contentCardsRef);
}

function onLibraryBtnClick(event) {
  if (event.target.dataset.name === 'Watched' || event.target.dataset.name === 'liba') {
    renderLibContent(JSON.parse(localStorage.Watched), contentCardsRef);
    console.log();
  } else if (event.target.dataset.name === 'Queue')
    renderLibContent(JSON.parse(localStorage.Queue), contentCardsRef);
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
