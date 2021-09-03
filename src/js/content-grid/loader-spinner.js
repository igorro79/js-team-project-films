const loader = document.getElementById("loader");
function loaderShow(contentblock) {
  loader.style = "display: block";
  contentblock.style = "display: none";
}
function loaderHide(contentblock) {
  loader.style = "display: none";
  contentblock.style = "display: grid";
}

export default { loaderShow, loaderHide };
