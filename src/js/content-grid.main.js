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

let start = 1;
let totalPages = 15;
let currentPage = 1;
let interval = 5;
let end = totalPages;

paginationContainerRef.addEventListener('click', onPaginationClick);

async function onPaginationClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (e.target.dataset.action === 'page') {
    currentPage = +e.target.innerText;
    showInterval(currentPage, start, end);
    setPageState(currentPage);
  } else if (e.target.dataset.action === 'prev-btn') {
    pagPrevPage();
  } else if (e.target.dataset.action === 'next-btn') {
    pagNextPage();
  }

  apiService.pageNumber = currentPage;
  renderContent(apiService.fetchPopular({}), contentCardsRef);
}

async function paginationInit() {
  paginationContainerRef.style.display = 'flex';
  pagElContainerRef.innerHTML = '';
  renderPagPages(totalPages);
  pagShowStartInterval(currentPage, start, interval);
  return currentPage;
}

function renderPagPages(totalPages) {
  for (let i = 1; i <= totalPages; i += 1) {
    pagElContainerRef.insertAdjacentHTML(
      'beforeend',
      `<button class="pagination__btn" type="button" data-action="page">${i}</button>`,
    );
  }
}

function pagShowStartInterval(currentPage, start, interval) {
  for (const child of pagElContainerRef.children) {
    if (+child.innerText > start + interval - start) {
      child.style.display = 'none';
      setDefCurrentPage(currentPage);
    } else {
      child.style.display = 'flex';
      setDefCurrentPage(currentPage);
    }
  }
}

function pagShowEndInterval(currentPage, end, interval) {
  for (const child of pagElContainerRef.children) {
    if (+child.innerText > end - interval) {
      child.style.display = 'flex';
      setDefCurrentPage(currentPage);
    } else {
      child.style.display = 'none';
    }
  }
}

function setDefCurrentPage(currentPage) {
  for (const child of pagElContainerRef.children) {
    if (+child.innerText === currentPage) {
      child.classList.add('is-active');
      child.disabled = true;
    }
  }
}

function setPageState(currentPage) {
  for (const child of pagElContainerRef.children) {
    if (child.classList.contains('is-active')) {
      child.classList.remove('is-active');
      child.disabled = false;
    } else if (!child.classList.contains('is-active') && currentPage === +child.innerText) {
      child.classList.add('is-active');
      child.disabled = true;
    }
  }
}

function paginationHide() {
  paginationContainerRef.style.display = 'none';
}

function pagNextPage() {
  currentPage += 1;

  if (currentPage > totalPages) {
    currentPage = 1;
    pagShowStartInterval(currentPage, start, interval);
    setPageState(currentPage);
  }
  showInterval(currentPage, start, end);
  setPageState(currentPage);
}

function pagPrevPage() {
  currentPage -= 1;

  if (currentPage < 1) {
    currentPage = totalPages;
    pagShowEndInterval(currentPage, end, interval);
    setPageState(currentPage);
  }
  showInterval(currentPage, start, end);
  setPageState(currentPage);
}

function showInterval(currentPage) {
  if (currentPage <= start + 2) {
    pagShowStartInterval(currentPage, start, interval);
    setPageState(currentPage);
  } else if (currentPage > start + 2 && currentPage < end - 3) {
    for (const child of pagElContainerRef.children) {
      if (+child.innerText > currentPage - 3 && +child.innerText < currentPage + 3) {
        child.style.display = 'flex';
      } else {
        child.style.display = 'none';
      }
    }
  } else if (currentPage <= end - 2) {
    pagShowEndInterval(currentPage, end, interval);
    setPageState(currentPage);
  }
}
