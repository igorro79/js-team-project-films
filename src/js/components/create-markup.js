import pageInit from './page-init';
import ApiService from '../api-service/api-service';
import { contentCardsRef, contentBtnListRef } from '../content-grid.main';

let badSearchMsg = document.querySelector('.header__warning');
let body = document.querySelector('BODY');
const apiService = new ApiService();
let allWeFoundWarning = document.querySelector('.header__thats-all-msg');

export default function createContentMarkup(element, collection, template) {
  if (collection.total_results === 0 || collection.length === 0) {
    badSearchMsg.removeAttribute('style', 'display: none');
    body.addEventListener('click', removeWarning);
    pageInit(apiService, contentCardsRef);
    contentBtnListRef.removeAttribute('style', 'display: none');
  } else if (collection.total_results < 20 || collection.length < 20) {
    allWeFoundWarning.removeAttribute('style', 'display: none');
    body.addEventListener('click', removeWarning);
  }

  element.insertAdjacentHTML('beforeend', template);  
}

function removeWarning() {
  allWeFoundWarning.setAttribute('style', 'display: none');
  badSearchMsg.setAttribute('style', 'display: none');
  body.removeEventListener('click', removeWarning);
}
