import ApiService from "../api-service/api-service";
import contentCardsTmp from "../../templates/content-grid";
import getGenres from "./get-genres";
import createContentMarkup from "./create-markup";
import updateGenresInfo from "./update-genres-info";
import updateYearinfo from "./update-year-info";
import updateRating from "./update-rating";
import loaderSpinner from "./loader-spinner";
const contentCardsRef = document.querySelector(".content__cards");
const contentBtnListRef = document.querySelector(".content__btn__list");
const apiService = new ApiService();
// export { onLoadPage };
onLoadPage();

contentBtnListRef.addEventListener("click", onContentBtnClick);

async function onLoadPage() {
  getGenres(apiService);
  renderContent(apiService.fetchTrend({}));
}

async function renderContent(api) {
  loaderSpinner.loaderShow(contentCardsRef);
  try {
    const collection = await api;

    createContentMarkup(
      contentCardsRef,
      collection,
      contentCardsTmp(collection.results)
    );
    loaderSpinner.loaderHide(contentCardsRef);
    updateGenresInfo();
    updateYearinfo();
    updateRating();
  } catch (error) {
    console.log(error);
  }
}

async function onContentBtnClick(e) {
  e.preventDefault();
  if (e.target.dataset.action === "trend") {
    renderContent(apiService.fetchTrend({}));
    setBtnState();
  } else if (e.target.dataset.action === "popular") {
    renderContent(apiService.fetchPopular({}));
    setBtnState();
  }
}

async function setBtnState() {
  for (const buttonEl of contentBtnListRef.children) {
    if (
      buttonEl.classList.contains("content__btn--active") &&
      buttonEl.disabled === true
    ) {
      buttonEl.classList.remove("content__btn--active");
      buttonEl.disabled = false;
    } else {
      buttonEl.classList.add("content__btn--active");
      buttonEl.disabled = true;
    }
  }
}
