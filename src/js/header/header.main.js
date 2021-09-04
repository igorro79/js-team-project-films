import ApiService from "../api-service/api-service";
import pageInit from "../components/page-init";
import { setBtnState, setBtnDefaultState } from "../components/set-btn-state";
import {
  contentCardsRef,
  contentBtnListRef,
  contentBtnDefDataTag,
  contentBtnDefDataTagValue,
  contentBtnActiveSelector,
} from "../content-grid.main";

import pageOnSearch from "../components/on-search";
const debounce = require("lodash/debounce");
const apiService = new ApiService();

export const refs = {
  searchField: document.querySelector(".js-input"),
  libPage: document.querySelector(".lib-container"),
  homePage: document.querySelector(".home-container"),
  watchedBtn: document.querySelector(".js-watched"),
  queueBtn: document.querySelector(".js-queue"),
  contentFilterBtn: document.querySelector(".content__btn__list"),
  headerNav: document.querySelectorAll(".header__nav-wrapper"),
};

refs.headerNav[0].addEventListener("click", onNavButton);
refs.headerNav[1].addEventListener("click", onNavButton);
refs.searchField.addEventListener("input", debounce(onInput, 500));
refs.watchedBtn.addEventListener("click", onWatched);
refs.queueBtn.addEventListener("click", onQueue);

function onNavButton(event) {
  event.preventDefault;
  let value = event.target.dataset.name;
  if (value === "home") {
    onHomeBtn();
  } else {
    onLibBtn();
  }
}

function onHomeBtn() {
  refs.homePage.removeAttribute("style", "display: none");
  refs.libPage.setAttribute("style", "display: none");
  refs.contentFilterBtn.removeAttribute("style", "display: none");
  pageInit(apiService, contentCardsRef);
  setBtnDefaultState(
    contentBtnListRef,
    contentBtnDefDataTag,
    contentBtnDefDataTagValue,
    contentBtnActiveSelector
  );
}

function onLibBtn() {
  onWatched();
  refs.homePage.setAttribute("style", "display: none");
  refs.libPage.removeAttribute("style", "display: none");
  refs.contentFilterBtn.setAttribute("style", "display: none");
}

function onInput(event) {
  refs.contentFilterBtn.setAttribute("style", "display: none");
  let searchQuery = event.target.value;
  if (searchQuery.trim() === "") {
    alert("вы ничего не ввели");
    refs.searchField.value = "";
    return;
  }
  apiService.query = searchQuery;
  pageOnSearch(apiService, contentCardsRef);
  refs.searchField.value = "";
}

function onWatched(event) {
  contentCardsRef.innerHTML = "<h2>My watched films</h2>";
  refs.watchedBtn.classList.add("modal-button--active");
  refs.queueBtn.classList.remove("modal-button--active");
}

function onQueue(event) {
  contentCardsRef.innerHTML = "<h2>List to watch</h2>";
  refs.watchedBtn.classList.remove("modal-button--active");
  refs.queueBtn.classList.add("modal-button--active");
}
