import filmCardsTmp from "../../templates/film-card.hbs";
import ApiService from "../api-service/api-service";
import { initStorageBtns } from "./modalStorage";



const insert = document.querySelector(".insert");
const apiService = new ApiService();

 async function onCardClick(event, element) {
  apiService.movieId = event.target.dataset.id;
  const data = await apiService.fetchById();
  insert.innerHTML = filmCardsTmp(data);
    insert.classList.add('is-open');
    onCloseButtonClick()
    onBackdropClick()
    onEscKeyPress()
    initStorageBtns()
}

export { onCardClick, insert };

function onCloseButtonClick() {
   const closeButton = document.querySelector('[data-action="close-lightbox"]')
    closeButton.addEventListener('click', closeModal)
}

function onBackdropClick() {
   const closeBackdrop = document.querySelector('.lightbox__overlay')
    closeBackdrop.addEventListener('click', closeModal)
}

function onEscKeyPress() {
   document.body.addEventListener('keyup', function (e) {
      const key = e.key;
    if (key === 'Escape') {
       closeModal()
    };
}, false);
}

function closeModal() {
   insert.classList.remove('is-open');
}


// if (check('watched')) {
//    btnWatched.classList.add('content__btn--active');
//     btnWatched.textContent = 'Remove';
//   } else if (!check('watched')) {
//     btnWatched.classList.remove('content__btn--active');
//     btnWatched.textContent = `ADD TO WATCHED`;
//   }
//   if (check('queue')) {
//     BtnQueue.classList.add('content__btn--active');
//     BtnQueue.textContent = 'Remove';
//   } else if (!check('queue')) {
//     BtnQueue.classList.remove('content__btn--active');
//     BtnQueue.textContent = `ADD TO QUEUE`;
//   }