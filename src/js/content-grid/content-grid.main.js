import ApiService from "../api-service/api-service";
import contentCardsTmp from "../../templates/content-grid";
import getGenres from "./get-genres";
import createContentMarkup from "./create-markup";
import updateGenresInfo from "./update-genres-info";
import updateYearinfo from "./update-year-info";
import updateRating from "./update-rating";
const contentCardsRef = document.querySelector(".content__cards");
const contentBtnListRef = document.querySelector(".content__btn__list");
const apiService = new ApiService();

getGenres(apiService);
renderContent(apiService.fetchTrend({}));
contentBtnListRef.addEventListener("click", onContentBtnClick);

async function renderContent(api) {
  try {
    const collection = await api;

    createContentMarkup(
      contentCardsRef,
      collection,
      contentCardsTmp(collection.results)
    );
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
  } else if (e.target.dataset.action === "popular") {
    renderContent(apiService.fetchPopular({}));
  }
}
