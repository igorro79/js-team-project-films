const loader = document.getElementById("loader");
function loaderShow(contentblock) {
  loader.classList.add("is-active");
  contentblock.classList.remove("is-active");
}
function loaderHide(contentblock) {
  loader.classList.remove("is-active");
  contentblock.classList.add("is-active");
}

export default { loaderShow, loaderHide };
