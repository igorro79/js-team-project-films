import getGenres from "./get-genres";
import renderContent from "./render-content";

// require apiName and elemnt reference to render content
export default async function pageInit(api, elemtRef) {
  try {
    await getGenres(api);
    renderContent(api.fetchTrend({}), elemtRef);
  } catch (error) {}
}
