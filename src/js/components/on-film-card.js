import filmCardsTmp from "../../templates/film-card.hbs";
import ApiService from "../api-service/api-service";

const insert = document.querySelector(".insert");
const apiService = new ApiService();

async function onCardClick(event, element) {
  apiService.movieId = event.target.dataset.id;
  const data = await apiService.fetchById();
  insert.innerHTML = filmCardsTmp(data);
}
export { onCardClick, insert };
