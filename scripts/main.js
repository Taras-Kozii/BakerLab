"use strict";

const page = document.querySelector('.page');
const menu = document.querySelector('.header__menu');
const burger = document.querySelector('.burger');
const navLinks = document.querySelectorAll('[data-goto]');
const header = document.querySelector('.header');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  lockPage();
});
[...navLinks].forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    burger.classList.remove('active');
    menu.classList.remove('active');

    if (page.classList.contains('lock')) {
      lockPage();
    }
    window.scrollTo({
      top: getScrollToBlockValue(e.target),
      behavior: "smooth",
    });
  })
})


function lockPage() {
  const paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
  setFixPadding(paddingRight);
  page.classList.toggle('lock');
}
function setFixPadding(paddingRight) {
  const fixItems = document.querySelectorAll('.right-fix-padding');
  [...fixItems].forEach(item => {
    item.style.paddingRight = paddingRight;
  });
}
function getScrollToBlockValue(link) {
  const blockName = link.dataset.goto;
  const block = document.querySelector(blockName);
  const value = block.getBoundingClientRect().top + window.scrollY - header.offsetHeight;
  return value || 0;
}