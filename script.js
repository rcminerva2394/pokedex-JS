import fetchPokemonList from './api/fetchPokemonList.js';

// const list = fetchPokemonList(1);
// console.log(list);
// console.log(list);
// console.log(list);
// To practice AJAX

const types = document.querySelectorAll('.type');
const btnLeft = document.querySelector('.prev-type');
const btnRight = document.querySelector('.next-type');
const pokemonTypes = document.querySelector('.pokemon-types-btns');

const max = 160;
let curr = 0;

const goNextType = (current) => {
  pokemonTypes.style.transform = `translateX(${current}rem)`;
};

const nextType = () => {
  if (curr !== max) {
    curr -= 20;
  } else if (curr === max) {
    curr = 0;
  }

  goNextType(curr);
};

const prevType = () => {
  if (curr !== max) {
    curr += 20;
  } else if (curr === max) {
    curr = 0;
    btnLeft.disabled = true;
  }

  goNextType(curr);
};

btnLeft.addEventListener('click', prevType);
btnRight.addEventListener('click', nextType);

/*
const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon/ivysaur';
let data;
const request = new XMLHttpRequest();
request.open('GET', pokemonAPI);
request.send();

request.addEventListener('load', function () {
  data = JSON.parse(this.responseText);
  console.log(data);
});
*/

/*
const request = fetch('https://pokeapi.co/api/v2/pokemon/ivysaur');
request
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
*/

// const request = fetch('https://pokeapi.co/api/v2/ability/?limit=10000');
// const request = fetch('https://pokeapi.co/api/v2/pokemon/?limit=150');
// const request = fetch('https://pokeapi.co/api/v2/type/?limit=150');
// request.then((response) => response.json()).then((data) => console.log(data));

// console.log(request);
