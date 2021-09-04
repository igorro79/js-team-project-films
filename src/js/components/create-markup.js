export default function createContentMarkup(element, collection, template) {
  if (collection.total_results === 0) {
    alert("По вашему запросу ничего ненайдено. Введите другой запрос");
    return;
  } else if (collection.total_results < 20) {
    alert("Это всё, что было найдено по вашему запросу");
  }
  element.innerHTML = template;
}
