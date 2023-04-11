import fetchPokemonList from './api/fetchPokemonList.js';
import capitalizeFirstLetter from './utils/capitalizeFirstLetter.js';
import * as convert from './utils/weightHeightConverter.js';

const loader = document.querySelector('.loader-wrapper');
const pokemonCardsEl = document.querySelector('.pokemon-cards');
let pokemonList;
let currentPage = 1;

const displayPokeCards = () => {
  // Delete the previous innerHTML of the pokemonCardsEl
  pokemonCardsEl.innerHTML = '';
  // Iterate the list and start inserting the DOM
  pokemonList.forEach((item) => {
    const { id, name, types, sprites, height, weight } = item;
    const pokeName = capitalizeFirstLetter(name);
    const pokeTypes =
      types.length > 1
        ? types.map((type) => type.type.name)
        : [types[0].type.name];

    // Create the <li> and its classes
    const newPokemon = document.createElement('li');
    newPokemon.classList.add('card', `card-${pokeTypes[0]}`);

    // Pokemon types
    let innerPokeTypes = '';
    pokeTypes.forEach((type) => {
      innerPokeTypes += `<p class="pokemon-type ${type}">
                <img
                  src="assets/pokemonTypes/${type}.svg"
                  alt=""
                  class="pokemon-type-icon"
                />
                ${capitalizeFirstLetter(type)}
              </p>`;
    });

    // Create the innerhtml of the <li>
    const newPokemonContent = `
   <img
              src=${sprites.other.home.front_default}
              alt='The ${pokeName} photo'
              class="pokemon-card-img"
            />
            <div class="card-info">
              <p class="card-number">#${id}</p>
              <p class="card-name">${pokeName}</p>
               <div class="pokemon-types">${innerPokeTypes}</div>
              <div class="weight-height">
                <div class="weight-wrapper">
                  <p class="weight">${convert.convertWeightToKg(weight)} kg</p>
                  <p class="weight-text">Weight</p>
                </div>
                <div class="height-wrapper">
                  <p class="height">${convert.convertHeightToM(height)} m</p>
                  <p class="height-text">Height</p>
                </div>
              </div>
            </div>
            <button class="btn btn-card ${
              pokeTypes[0]
            }">More details...</button>
  `;

    newPokemon.innerHTML = newPokemonContent;
    pokemonCardsEl.append(newPokemon);
  });
};

// Function to fetch the pokemons
const fetchPokemons = async () => {
  const list = fetchPokemonList(currentPage);
  try {
    pokemonList = await list;
    console.log(pokemonList);
  } catch (err) {
    console.log(err);
  } finally {
    loader.setAttribute('id', 'hidden');
    displayPokeCards();
  }
};

window.onload = () => {
  fetchPokemons(1);
};

// POKEMON FILTER BY TYPE
const btnLeft = document.querySelector('.prev-type');
const btnRight = document.querySelector('.next-type');
const pokemonTypesBtns = document.querySelector('.pokemon-types-btns');

let curr = 0;

const goNextType = (current) => {
  pokemonTypesBtns.style.transform = `translateX(${current}rem)`;
};

const nextType = () => {
  if (curr !== -144) {
    curr += -18;
  } else if (curr === -144) {
    curr = 0;
  }

  goNextType(curr);
};

const prevType = () => {
  if (curr === 0) {
    curr = -144;
  } else {
    curr += 18;
  }

  goNextType(curr);
};

btnLeft.addEventListener('click', prevType);
btnRight.addEventListener('click', nextType);

// PAGINATION
const prevPageEl = document.querySelector('.prev-page');
const nextPageEl = document.querySelector('.next-page');
// let pokemonPagesEl = document.querySelector('.pokemon-pages');

const goNextPage = () => {
  if (currentPage <= 100) {
    currentPage += 1;
    fetchPokemons();
  }
};

const goPrevPage = () => {
  if (currentPage > 1) {
    currentPage -= 1;
    fetchPokemons();
  }
};

// Next and Prev Pagination
nextPageEl.addEventListener('click', goNextPage);
prevPageEl.addEventListener('click', goPrevPage);
