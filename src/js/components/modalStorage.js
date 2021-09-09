import localStorageApi from './localStorageApi';
import ApiService from '../api-service/api-service';

export default async function initStorage() {
  try {
    localStorageApi.init('Watched', []);
    localStorageApi.init('Queue', []);
  } catch (err) {}
}

export const initStorageBtns = () => {
  const refs = {
    modalWatchedBtn: document.querySelector('.js-modal-watched'),
    modalQueueBtn: document.querySelector('.js-modal-queue'),
  };
  const apiService = new ApiService();
  const storageEl = document.querySelector('.lightbox .buttons-content');
  const movieId = document.querySelector('.lightbox').dataset.action;
  const movieStr = getMovie();
  activateBtns();
  changeBtnName(refs.modalWatchedBtn, movieId);
  changeBtnName(refs.modalQueueBtn, movieId);

  function changeBtnName(button, id) {
    let listName = button.value;
    console.dir(listName);
    id = id.toString();
    if (localStorageApi.checkMovie(listName, id)) {
      button.innerText = `DEL FROM ${listName}`;
    } else if (localStorageApi.checkMovie(listName, id)) {
      button.innerText(`DEL FROM ${listName}`);
    }
  }

  storageEl.addEventListener('click', onStorageBtnClick);

  function activateBtns() {
    movieStr.then(function (result) {
      const watchedMovies = JSON.parse(localStorage.getItem('Watched'));
      const queueMovies = JSON.parse(localStorage.getItem('Queue'));
      console.log(watchedMovies.indexOf(result) !== -1);
      if (watchedMovies.indexOf(result) !== -1) {
        console.log('teste');
        console.log(refs.modalWatchedBtn.classList);
        refs.modalWatchedBtn.classList.add('content__btn--active');
      }
      if (queueMovies.indexOf(result) !== -1) {
        refs.modalQueueBtn.classList.add('content__btn--active');
      }
    });
  }

  async function getMovie() {
    apiService.movieId = movieId;
    const movieData = await apiService.fetchById();
    const str = JSON.stringify(movieData);
    return str;
  }

  async function onStorageBtnClick(e) {
    const storageKey = e.target.value;
    console.log(movieStr);
    // console.log(localStorageApi.checkMovie(storageKey, movieId.toString()));
    let isActive = e.target.classList.contains('content__btn--active');

    if (isActive) {
      e.target.classList.remove('content__btn--active');
    } else {
      e.target.classList.add('content__btn--active');
    }

    const action = !isActive ? 'add' : 'remove';

    localStorageApi.getMovies(storageKey);
    makeActionInStorage(storageKey, action);
  }

  async function makeActionInStorage(storageKey, action) {
    movieStr.then(function (result) {
      if (action === 'add') {
        localStorageApi.addMovie(storageKey, result);
      } else if (action === 'remove') {
        localStorageApi.removeMovie(storageKey, result);
      }
    });
  }
};
