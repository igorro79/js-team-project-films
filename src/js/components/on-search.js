import getGenres from './get-genres';
import renderContent from './render-content';

export default async function pageOnSearch(api, elemtRef) {
  elemtRef.innerHTML = '';
  renderContent(api.fetchByKeyWord(), elemtRef);
}
