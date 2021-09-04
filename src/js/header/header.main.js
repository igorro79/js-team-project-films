import ApiService from "../api-service/api-service";
import pageInit from "../components/page-init";
import { setBtnState, setBtnDefaultState } from "../components/set-btn-state";
import {
  contentBtnListRef,
  contentBtnDefDataTag,
  contentBtnDefDataTagValue,
  contentBtnActiveSelector,
} from "../content-grid.main";

import pageOnSearch from "../components/on-search";
const debounce = require("lodash/debounce");
const apiService = new ApiService();

export const refs = {
  contentCardsRef: document.querySelector(".content__cards"),
  homeBtn: document.querySelector(".js-home"),
  libBtn: document.querySelector(".js-lib"),
  searchField: document.querySelector(".js-input"),
  libPage: document.querySelector(".lib-container"),
  homePage: document.querySelector(".home-container"),
  watchedBtn: document.querySelector(".js-watched"),
  queueBtn: document.querySelector(".js-queue"),
  contentFilterBtn: document.querySelector(".content__btn__list"),
  logo: document.querySelector(".js-homepage"),
};

refs.logo.addEventListener("click", onHomeBtn);
refs.libBtn.addEventListener("click", onLibBtn);
refs.homeBtn.addEventListener("click", onHomeBtn);
refs.searchField.addEventListener("input", debounce(onInput, 500));

refs.watchedBtn.addEventListener("click", onWatched);
refs.queueBtn.addEventListener("click", onQueue);

function onHomeBtn(event) {
  event.preventDefault();
  refs.libPage.setAttribute("style", "display: none");
  refs.homePage.removeAttribute("style", "display: none");
  refs.contentFilterBtn.removeAttribute("style", "display: none");
  pageInit(apiService, refs.contentCardsRef);
  setBtnDefaultState(
    contentBtnListRef,
    contentBtnDefDataTag,
    contentBtnDefDataTagValue,
    contentBtnActiveSelector
  );
}

function onLibBtn(event) {
  event.preventDefault();
  onWatched();
  refs.homePage.setAttribute("style", "display: none");
  refs.libPage.removeAttribute("style", "display: none");
  refs.contentFilterBtn.setAttribute("style", "display: none");
}

function onInput(event) {
  refs.contentFilterBtn.setAttribute("style", "display: none");
  let searchQuery = event.target.value;
  apiService.query = searchQuery;
  pageOnSearch(apiService, refs.contentCardsRef);
  //  refs.searchField.value = "";
  const resetSearchField = () => {
    refs.searchField.value = "";
  };
  setTimeout(resetSearchField, 200);
}

function onWatched(event) {
  refs.contentCardsRef.innerHTML = "<h2>My watched films</h2>";
  refs.watchedBtn.classList.add("modal-button--active");
  refs.queueBtn.classList.remove("modal-button--active");
}

function onQueue(event) {
  refs.contentCardsRef.innerHTML = "<h2>List to watch</h2>";
  refs.watchedBtn.classList.remove("modal-button--active");
  refs.queueBtn.classList.add("modal-button--active");
}
