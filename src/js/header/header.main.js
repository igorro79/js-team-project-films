"use strickt";

// import debounce from "lodash.debounce";

refs = {
  contentCardsRef: document.querySelector(".content__cards"),
  homeBtn: document.querySelector(".js-home"),
  libBtn: document.querySelector(".js-lib"),
  searchField: document.querySelector(".js-input"),
  libPage: document.querySelector(".lib-container"),
  homePage: document.querySelector(".home-container"),
  watchedBtn: document.querySelector(".js-watched"),
  queueBtn: document.querySelector(".js-queue"),
  contentFilterBtn: document.querySelector(".content__btn__list"),
};

refs.libBtn.addEventListener("click", onLibBtn);
refs.homeBtn.addEventListener("click", onHomeBtn);
refs.searchField.addEventListener("input", onInput);

refs.watchedBtn.addEventListener("click", onWatched);
refs.queueBtn.addEventListener("click", onQueue);

function onLibBtn(event) {
  event.preventDefault();
  onWatched();
  refs.homePage.setAttribute("style", "display: none");
  refs.libPage.removeAttribute("style", "display: none");
  refs.contentFilterBtn.setAttribute("style", "display: none");
}

function onHomeBtn(event) {
  event.preventDefault();

  refs.libPage.setAttribute("style", "display: none");
  refs.homePage.removeAttribute("style", "display: none");
  refs.contentFilterBtn.removeAttribute("style", "display: none");
}

function onInput(event) {
  refs.contentFilterBtn.setAttribute("style", "display: none");
  const searchQuery = event.target.value;
  console.log(searchQuery);
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
