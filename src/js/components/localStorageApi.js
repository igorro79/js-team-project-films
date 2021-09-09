const localStorageApi = {
  getMovies(key) {
    const keyStorage = this.load(key);

    if (Array.isArray(keyStorage)) return keyStorage;

    this.save(key, []);
    return [];
  },

  addMovie(key, value) {
    const dataFromLocalStorage = this.load(key);
    this.save(key, [value, ...dataFromLocalStorage]);
  },

  removeMovie(key, value) {
    const dataFromLocalStorage = this.load(key);

    const valueIndex = dataFromLocalStorage.indexOf(value);

    if (0 <= valueIndex) {
      dataFromLocalStorage.splice(valueIndex, 1);

      this.save(key, dataFromLocalStorage);
    }
  },

  init(key) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, '[]');
    }
  },

  load(key) {
    try {
      const serializedState = localStorage.getItem(key);

      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  },

  save(key, value) {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (err) {
      console.error('Set state error: ', err);
    }
  },
  checkMovie(list, id) {
    return localStorage.getItem(list).includes(id);
  },
};
export default localStorageApi;
