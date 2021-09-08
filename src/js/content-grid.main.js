import ApiService from './api-service/api-service';
import pageInit from './components/page-init';
import renderContent from './components/render-content';
import { setBtnState, setBtnDefaultState } from './components/set-btn-state';

const apiService = new ApiService();
const contentCardsRef = document.querySelector('.content__cards');
const contentBtnListRef = document.querySelector('.content__btn__list');
console.dir(contentBtnListRef);

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
    paginationHide();
  } else {
    renderContent(apiService.fetchPopular({}), contentCardsRef);
    setBtnState(contentBtnListRef, contentBtnActiveSelector);
    paginationInit();
  }
}
// ------------------------------------------------------------------

const paginationContainerRef = document.querySelector('.pagination');
const pagElContainerRef = paginationContainerRef.querySelector('.pagination-container');
let currentPage = 1;

paginationContainerRef.addEventListener('click', onPaginationClick);

async function onPaginationClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  if (e.target.dataset.action === 'page') {
    currentPage = +e.target.innerText;
    setPageState(e);
    console.log(currentPage);
    apiService.pageNumber = currentPage;
    renderContent(apiService.fetchPopular({}), contentCardsRef);
  }
}

async function paginationInit() {
  let start = 1;
  let totalPages = 20;
  let end = totalPages;
  paginationContainerRef.style.display = 'flex';
  pagElContainerRef.innerHTML = '';
  renderPagPages(totalPages);
  pagShowStartInterval(start, 10);
}

function renderPagPages(totalPages) {
  for (let i = 1; i <= totalPages; i += 1) {
    pagElContainerRef.insertAdjacentHTML(
      'beforeend',
      `<button class="pagination__btn" type="button" data-action="page">${i}</button>`,
    );
  }
}

function pagShowStartInterval(start, inteval) {
  for (const child of pagElContainerRef.children) {
    if (+child.innerText > start + inteval - start) {
      child.style.display = 'none';
      setDefCurrentPage();
    }
  }
}

function setDefCurrentPage() {
  for (const child of pagElContainerRef.children) {
    if (+child.innerText === currentPage) {
      child.classList.add('is-active');
      child.disabled = true;
    }
  }
}

function setPageState(e) {
  for (const child of pagElContainerRef.children) {
    if (child.classList.contains('is-active')) {
      child.classList.remove('is-active');
      child.disabled = false;
    } else if (!child.classList.contains('is-active') && +e.target.innerText === +child.innerText) {
      child.classList.add('is-active');
      child.disabled = true;
    }
  }
}

function paginationHide() {
  paginationContainerRef.style.display = 'none';
}
