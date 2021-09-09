import filmCardsTmp from "../../templates/film-card.hbs";
import ApiService from "../api-service/api-service";

const insert = document.querySelector(".insert");
const apiService = new ApiService();

async function onCardClick(event, element) {
  if (event.target.nodeName !== "A") {
    return;
  }
  apiService.movieId = event.target.dataset.id;
  const data = await apiService.fetchById();
  insert.innerHTML = filmCardsTmp(data);
  insert.classList.add("is-open")
  document.body.classList.add('modal-open')

  onCloseButtonClick();
  onBackdropClick();
  onEscKeyPress();
}
export { onCardClick, insert };

function onCloseButtonClick() {
  const closeButton = document.querySelector('[data-action="close-lightbox"]');
  closeButton.addEventListener("click", closeModal);
}

function onBackdropClick() {
  const closeBackdrop = document.querySelector(".lightbox__overlay");
  closeBackdrop.addEventListener("click", closeModal);
}

function onEscKeyPress() {
  document.body.addEventListener("keyup", pressKey)
}
  
function pressKey(e) {
   const key = e.key;
      if (key === "Escape") {
        closeModal();
      }
    false;
}

function closeModal() {
  insert.classList.remove("is-open");

   const closeButton = document.querySelector('[data-action="close-lightbox"]');
  closeButton.removeEventListener("click", closeModal);

  const closeBackdrop = document.querySelector(".lightbox__overlay");
 closeBackdrop.removeEventListener("click", closeModal);
 
 document.body.removeEventListener("keyup", pressKey)
  document.body.classList.remove('modal-open')
}

