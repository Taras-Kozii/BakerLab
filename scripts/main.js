"use strict";

const page = document.querySelector('.page');
const menu = document.querySelector('.header__menu');
const burger = document.querySelector('.burger');
const navLinks = document.querySelectorAll('[data-goto]');
const header = document.querySelector('.header');
const heroImg = document.querySelector('.hero__img');
const title = document.querySelector('.hero__title');

window.addEventListener('load', showCountsAnim);

window.addEventListener('scroll', () => {
  const pageScrollValue = window.scrollY;
  scrollAnimProperty(heroImg, 0.1, 'transform', `translateX(-50%) scale(${1 + pageScrollValue / 2100})`);
  scrollAnimProperty(title, 0.1, 'transform', `scale(${1 - pageScrollValue / 2100})`);
  scrollAnim();
});

function scrollAnimProperty(item, percent, property, scrollValue) {
  if (isInView(item, percent)) {
    item.style[property] = scrollValue;
  }
}
function scrollAnim() {
  const animItems = document.querySelectorAll('.scroll-anim');
  for (const item of animItems) {
    if (isInView(item, 0.35)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  }
}

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
function isInView(elem, persent=0.35) {
  const rect = elem.getBoundingClientRect();
  const elemHeight = elem.offsetHeight;
  const visiblePart = elemHeight * persent;
  
  return rect.bottom > 0 && rect.top < (
    window.innerHeight - visiblePart || document.documentElement.clientHeight - visiblePart);
}
function showCountsAnim() {
  function initCounts(countsItems) {
    const counts = countsItems ? countsItems : document.querySelectorAll('[data-counter]');
    [...counts].forEach(item => countAnimate(item));
  }
  function countAnimate(count) {
    let startTimestamp = null;
    const duraction = parseInt(count.dataset.counter) ? parseInt(count.dataset.counter) : 1000;
    const startValue = parseInt(count.innerHTML);
    const startPosition = 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duraction, 1);
      count.innerHTML = Math.floor(progress * (startPosition + startValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  const options = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElem = entry.target;
        const countersIntems = targetElem.querySelectorAll('[data-counter]');
        if (countersIntems.length) {
          initCounts(countersIntems);
        }
        //вимикає відслідковування після спрацювання
        // observer.unobserve(targetElem);
      }
    });
  }, options);

  const countsSections = document.querySelectorAll('.digits');
  [...countsSections].forEach(section => observer.observe(section));
}