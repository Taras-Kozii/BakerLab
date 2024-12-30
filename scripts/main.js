"use strict";

const page = document.querySelector('.page');
const menu = document.querySelector('.header__menu');
const burger = document.querySelector('.burger');

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  page.classList.toggle('lock');
});