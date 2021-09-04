import ApiService from "../api-service/api-service";
import pageInit from "./page-init";
import renderContent from "./render-content";
import { setBtnState, setBtnDefaultState } from "./set-btn-state";
const contentCardsRef = document.querySelector(".content__cards");
const contentBtnListRef = document.querySelector(".content__btn__list");
const apiService = new ApiService();
const contentBtnActiveSelector = "content__btn--active";
const contentBtnDefDataTag = "data-tag";
const contentBtnDefDataTagValue = "trend";
// export { onLoadPage };
//set default state for content button
setBtnDefaultState(
  contentBtnListRef,
  contentBtnDefDataTag,
  contentBtnDefDataTagValue,
  contentBtnActiveSelector
);
//function to render page on load
pageInit(apiService, contentCardsRef);
//

contentBtnListRef.addEventListener("click", onContentBtnClick);

async function onContentBtnClick(e) {
  e.preventDefault();
  if (e.target.dataset.tag === "trend") {
    renderContent(apiService.fetchTrend({}), contentCardsRef);
    setBtnState(contentBtnListRef, contentBtnActiveSelector);
  } else if (e.target.dataset.tag === "popular") {
    renderContent(apiService.fetchPopular({}), contentCardsRef);
    setBtnState(contentBtnListRef, contentBtnActiveSelector);
  }
}
