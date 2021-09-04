import contentCardsTmp from "../../templates/content-grid";
import createContentMarkup from "./create-markup";
import updateGenresInfo from "./update-genres-info";
import updateYearinfo from "./update-year-info";
import updateRating from "./update-rating";
import loaderSpinner from "./loader-spinner";

// require method(apiname.fetchname({})) and element reference for render
export default async function renderContent(apiMethod, elemtRef) {
  loaderSpinner.loaderShow(elemtRef);
  try {
    const collection = await apiMethod;

    createContentMarkup(
      elemtRef,
      collection,
      contentCardsTmp(collection.results)
    );
    loaderSpinner.loaderHide(elemtRef);
    updateGenresInfo();
    updateYearinfo();
    updateRating();
  } catch (error) {
    console.log(error);
  }
}
