const {Menu} = require('electron');

const $list = document.querySelector('main > aside');
const $listItem = $list.querySelectorAll('ul > li');
const $listAdd = $list.querySelector('ul + a');

$listAdd.addEventListener('click', e => {
  e.preventDefault();

  alert('addition!');
}, false);
