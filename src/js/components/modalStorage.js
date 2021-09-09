// import localStorageApi from './localStorageApi';
// import ApiService from '../api-service/api-service';
// import oneFilmTpl from '../../templates/film-card.hbs';

// async function initStorage() {
//   try {
//     localStorageApi.init('Watched', []);
//     localStorageApi.init('Queue', []);
//   } catch (err) {}
// }

// async function getStorageListArray(listname) {
//   try {
//     let list =
//   } catch (error) {

//   }

// }
// async function setStorageListArray(listname) {

// }

// // export const initStorageBtns = () => {
// //   const refs = {
// //     insert: document.querySelector('.insert'),
// //     modalWatchedBtn: document.querySelector('.js-modal-watched'),
// //     modalQueueBtn: document.querySelector('.js-modal-queue'),
// //   };
// //   const apiService = new ApiService();
// //   const storageEl = document.querySelector('.lightbox .buttons-content');
// //   const movieId = document.querySelector('.lightbox').dataset.action;
// //   refs.insert.innerHTML = oneFilmTpl(getMovie());

// //   // activateBtns();
// //   changeBtnName(refs.modalWatchedBtn, movieId);
// //   changeBtnName(refs.modalQueueBtn, movieId);

// //   function changeBtnName(button, id) {
// //     let listName = button.value;

// //     id = id.toString();
// //     if (localStorageApi.checkMovie(listName, id)) {
// //       button.innerText = `DEL FROM ${listName}`;
// //     } else {
// //       button.innerText = `ADD TO ${listName}`;
// //     }
// //   }

// //   storageEl.addEventListener('click', onStorageBtnClick);

// //   // function activateBtns() {
// //   //   movieStr.then(function (result) {
// //   //     const watchedMovies = JSON.parse(localStorage.getItem('Watched'));
// //   //     const queueMovies = JSON.parse(localStorage.getItem('Queue'));
// //   //     console.log(watchedMovies.indexOf(result) !== -1);
// //   //     if (watchedMovies.indexOf(result) !== -1) {
// //   //       console.log('teste');
// //   //       console.log(refs.modalWatchedBtn.classList);
// //   //       refs.modalWatchedBtn.classList.add('content__btn--active');
// //   //     }
// //   //     if (queueMovies.indexOf(result) !== -1) {
// //   //       refs.modalQueueBtn.classList.add('content__btn--active');
// //   //     }
// //   //   });
// //   // }

// //   async function getMovie() {
// //     apiService.movieId = movieId;
// //     const movieData = await apiService.fetchById();
// //     // const str = JSON.stringify(movieData);
// //     // return str;
// //     return movieData;
// //   }

// //   async function onStorageBtnClick(e) {
// //     if (e.target.nodeName !== 'BUTTON') {
// //       return;
// //     }
// //     const storageKey = e.target.value;

// //     let present = await localStorageApi.checkMovie(storageKey, movieId);

// //     // let isActive = e.target.classList.contains('content__btn--active');
// //     if (present) {
// //       e.target.classList.add('content__btn--active');
// //     } else {
// //       e.target.classList.remove('content__btn--active');
// //     }

// //     const action = !present ? 'add' : 'remove';
// //     localStorageApi.getMovies(storageKey);
// //     makeActionInStorage(storageKey, action);
// //     changeBtnName(e.target, movieId);
// //   }

// //   async function makeActionInStorage(storageKey, action) {
// //     movieStr.then(function (result) {
// //       if (action === 'add') {
// //         localStorageApi.addMovie(storageKey, result);
// //       } else if (action === 'remove') {
// //         localStorageApi.removeMovie(storageKey, result);
// //       }
// //     });
// //   }
// // };
// export {initStorage, getStorageListArray, setStorageListArray}
