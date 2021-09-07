import pageInit from "./page-init";
import ApiService from "../api-service/api-service";
import { contentCardsRef } from "../content-grid.main";

let badSearchMsg = document.querySelector(".header__warning");
let body = document.querySelector("BODY");
const apiService = new ApiService();
let loaderTeg = document.getElementById("loader");

export default function createContentMarkup(element, collection, template) {
  if (collection.total_results === 0) {
    badSearchMsg.removeAttribute("style", "display: none");

    body.addEventListener("click", removeWarning);
    pageInit(apiService, contentCardsRef);
    return;
  } else if (collection.total_results < 20) {
    badSearchMsg.removeAttribute("style", "display: none");
  }
  element.innerHTML = template;
}

function removeWarning() {
  badSearchMsg.setAttribute("style", "display: none");
  body.removeEventListener("click", removeWarning);
}
