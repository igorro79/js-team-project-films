import ApiService from "../api-service/api-service";
import contentCardsTmp from "../../templates/content-grid";
import getGenres from "./get-genres";
import createTrendsMarkup from "./create-markup";
import updateGenresInfo from "./update-genres-info";
import updateYearinfo from "./update-year-info";
import updateRating from "./update-rating";
const contentCardsRef = document.querySelector(".content__cards");
const apiService = new ApiService();

getGenres(apiService);
onload();

async function onload() {
  try {
    const collection = await apiService.fetchTrend({});

    createTrendsMarkup(
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
