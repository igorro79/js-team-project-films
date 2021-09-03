import getSavedGenres from "./get-saved-genres";
export default function updateGenresInfo() {
  let info = getSavedGenres();

  const genresIdRefs = document.querySelectorAll(".content__genres");

  genresIdRefs.forEach((genreIdRef) => {
    let result = [];
    let genreName = "";
    let genreIDArr = genreIdRef.textContent.split(",");

    info.forEach((savedGenre) => {
      genreIDArr.filter((genreId) => {
        if (Number(savedGenre.id) === Number(genreId)) {
          return result.push(savedGenre.name);
        }
      });
    });

    if (result.length > 2) {
      genreName = result.slice(0, 2).join(", ");
      genreIdRef.textContent = `${genreName}, Other`;
    } else {
      genreName = result.join(", ");
      genreIdRef.textContent = `${genreName}`;
    }
  });
}