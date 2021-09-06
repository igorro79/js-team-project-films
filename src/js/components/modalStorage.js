import localStorageApi from "./localStorageApi";
export const initStorageBtns = () => {
  const storageEl = document.querySelector('.js-lightbox .content__btn');
  const movieId = document.querySelector('.js-lightbox').dataset.action;

  checkStorage(storageEl);

  storageEl.addEventListener('change', onStorageBtnClick);

  function onStorageBtnClick(e) { 
  
    const storageKey = e.target.value;
    
    const action = (e.target.checked) ? 'add' : 'remove';

    localStorageApi.getMovies(storageKey);
    makeActionInStorage({ storageKey, movieId, action });
  }

  function checkStorage(storageEl) { 

  const btnsEl = storageEl.querySelectorAll('[type=button]');
  
    btnsEl.forEach(element => {
      const storageKey = element.value;

      const arr = localStorageApi.load(storageKey);
            if (0 <= arr.indexOf(movieId)) element.checked = "true";
      
    });

  } 

}

function makeActionInStorage({storageKey, movieId, action}) { 
  if (action === 'add') {
    localStorageApi.addMovie(storageKey, movieId);
    changeLibraryCardDisplay('initial');
  }
  if (action === 'remove') {
    localStorageApi.removeMovie(storageKey, movieId);
    changeLibraryCardDisplay('none');
  }

  function changeLibraryCardDisplay(value) { 
    const LibraryCard = document.querySelector(`[data-library="${storageKey}"] [data-action="${movieId}"]`);
    if (LibraryCard) LibraryCard.style.display = value;
  }
}