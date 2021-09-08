let toTop = document.querySelector('.goup__btn');

window.addEventListener('scroll', scroll1);
function scroll1() {
  if (window.scrollY > 0) {
    toTop.removeAttribute('style', 'display: none');
  } else {
    toTop.setAttribute('style', 'display: none');
  }
}
