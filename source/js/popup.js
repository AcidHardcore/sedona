"use strict";
var burger = document.querySelector('.page-nav__collapse');
var popup = document.querySelector('.page-nav__list');
var close = popup.querySelector('.page-nav__close');
 var form = document.querySelector('.search');
var mapOpen = document.querySelector(".btn--search-collapse");
var adult = document.querySelector('.search__data-adult-inner');
var adultPlus = adult.querySelector('.search__plus');
var adultInput = adult.querySelector('.search__input-number');
var adultMinus = adult.querySelector('.search__minus');

//menu and form hide on load page
window.onload = function () {
    popup.classList.add('page-nav__list--close-js');
    // form.classList.add('search--hide-js');
};
//show menu on click to burger
burger.addEventListener('click', function (event) {
    event.preventDefault();
    popup.classList.toggle('page-nav__list--close-js');
});
//hide menu on click to close button
close.addEventListener('click', function (event) {
    event.preventDefault();
    popup.classList.add('page-nav__list--close-js');
});
//Open map on click to button
mapOpen.addEventListener('click', function (event) {
   event.preventDefault();
    form.classList.toggle('search--hide-js');
});
//plus, minus buttons
// adultPlus.addEventListener('click', function (event) {
//    event.preventDefault();
//      adultInput.value = parseInt(adultInput.value) + 1;
// });
// adultMinus.addEventListener('click', function (event) {
//     event.preventDefault();
//     adultInput.value = parseInt(adultInput.value) - 1;
// });
