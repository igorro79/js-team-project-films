import getGenres from './get-genres';
import renderContent from './render-content';

// require apiName and elemnt reference to render content
export default async function pageInit(api, elemtRef) {
  getGenres(api);
  renderContent(api.fetchTrend({}), elemtRef);
}
