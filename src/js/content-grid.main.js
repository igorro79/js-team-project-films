import ApiService from './api-service/api-service';
import pageInit from './components/page-init';
import renderContent from './components/render-content';
import { setBtnState, setBtnDefaultState } from './components/set-btn-state';

const apiService = new ApiService();
const contentCardsRef = document.querySelector('.content__cards');
const contentBtnListRef = document.querySelector('.content__btn__list');

const contentBtnActiveSelector = 'content__btn--active';
const contentBtnDefDataTag = 'data-tag';
const contentBtnDefDataTagValue = 'trend';
export {
  contentCardsRef,
  contentBtnListRef,
  contentBtnDefDataTag,
  contentBtnDefDataTagValue,
  contentBtnActiveSelector,
};

//function to render page on load
pageInit(apiService, contentCardsRef);

//set default state for content button
setBtnDefaultState(
  contentBtnListRef,
  contentBtnDefDataTag,
  contentBtnDefDataTagValue,
  contentBtnActiveSelector,
);

contentBtnListRef.addEventListener('click', onContentBtnClick);

async function onContentBtnClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (e.target.dataset.tag === contentBtnDefDataTagValue) {
    renderContent(apiService.fetchTrend({}), contentCardsRef);
    setBtnState(contentBtnListRef, contentBtnActiveSelector);
  } else {
    renderContent(apiService.fetchPopular({}), contentCardsRef);
    setBtnState(contentBtnListRef, contentBtnActiveSelector);
  }
}
