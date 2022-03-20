const btnNav = document.querySelector('.btn-toggle-nav');
const mobileNav = document.querySelector('.mobile-nav-container');
const btnCloseNav = document.querySelector('.btn-close-nav');
const mobileNavLink = document.querySelectorAll('.mobile-nav a');

btnNav.addEventListener('click', onBtnNavClick);
btnCloseNav.addEventListener('click', onBtnCloseNav);
mobileNavLink.forEach((link) => link.addEventListener('click', onBtnCloseNav));

function onBtnNavClick() {
  mobileNav.classList.add('show');
}

function onBtnCloseNav() {
  mobileNav.classList.remove('show');
}
