"use strict";
var burger = document.querySelector('.page-nav__collapse');
var popup = document.querySelector('.page-nav__list');
var close = popup.querySelector('.page-nav__close');
 var form = document.querySelector('.search');
var mapOpen = document.querySelector(".btn--search-collapse");
var adult = document.querySelector('.search__data-adult-inner');
var adultPlus = adult.querySelector('.btn--plus');
var adultInput = adult.querySelector('.search__input-number');
var adultMinus = adult.querySelector('.btn--minus');
var children = document.querySelector('.search__data-children-inner');
var childrenPlus = children.querySelector('.btn--plus');
var childrenInput = children.querySelector('.search__input-number');
var childrenMinus = children.querySelector('.btn--minus');

var map = document.querySelector('.map');
var frame = document.querySelector('.map__iframe');

//menu and form hide on load page
window.onload = function () {
    popup.classList.add('page-nav__list--close-js');
    // form.classList.add('search--hide-js');
};
//show menu on tap to burger
burger.addEventListener('tap', function (event) {
    event.preventDefault();
    popup.classList.toggle('page-nav__list--close-js');
});
//hide menu on tap to close button
close.addEventListener('tap', function (event) {
    event.preventDefault();
    popup.classList.add('page-nav__list--close-js');
});
//Open map on tap to button
mapOpen.addEventListener('tap', function (event) {
   event.preventDefault();
    form.classList.toggle('search--hide-js');
});
//plus, minus buttons adult
adultPlus.addEventListener('tap', function (event) {
   event.preventDefault();
     adultInput.value = parseInt(adultInput.value) + 1;
});
adultMinus.addEventListener('tap', function (event) {
    event.preventDefault();
    if (adultInput.value > 0) {
        adultInput.value = parseInt(adultInput.value) - 1;
    }
});
//plus, minus buttons children
childrenPlus.addEventListener('tap', function (event) {
    event.preventDefault();
    childrenInput.value = parseInt(childrenInput.value) + 1;
});
childrenMinus.addEventListener('tap', function (event) {
    event.preventDefault();
    if (childrenInput.value > 0) {
        childrenInput.value = parseInt(childrenInput.value) - 1;
    }
});

//to prevent accidentally move  on a map
map.addEventListener('tap', function (event) {
    event.preventDefault();
    frame.classList.add('map__iframe-js');
});
//when mouse leaves a map it will switch off
map.addEventListener('mouseleave', function (event) {
    event.preventDefault();
    frame.classList.remove('map__iframe-js');
});
