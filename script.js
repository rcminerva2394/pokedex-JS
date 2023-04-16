import fetchPokemonList from './api/fetchPokemonList.js';
import capitalizeFirstLetter from './utils/capitalizeFirstLetter.js';
import * as convert from './utils/weightHeightConverter.js';
import { paginate } from './utils/pagination.js';

const loader = document.querySelector('.loader-wrapper');
const pokemonCardsEl = document.querySelector('.pokemon-cards');
const pokemonPagination = document.querySelector('.pokemon-pages');

let pokemonList;
let currentPage = 1;

const toggle = (el) => {
  el.classList.toggle('hidden');
};

const displayPokeCards = () => {
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

/* FUNCTION TO FETCH POKEMONS */
const fetchPokemons = async () => {
  toggle(pokemonPagination);
  toggle(loader);
  // Delete the previous innerHTML of the pokemonCardsEl
  pokemonCardsEl.innerHTML = '';
  const list = fetchPokemonList(currentPage);
  try {
    pokemonList = await list;
    console.log(pokemonList);
  } catch (err) {
    console.log(err);
  } finally {
    displayPokeCards();
    toggle(loader);
    toggle(pokemonPagination);
    window.location.href = '#pokemons';
  }
  console.log(currentPage);
};

/* PAGINATE */

const prevPageEl = document.querySelector('.prev-page');
const nextPageEl = document.querySelector('.next-page');

const updatePagination = () => {
  pokemonPagination.innerHTML = '';
  const pagination = paginate(currentPage, 100);
  console.log(currentPage);
  pagination.forEach((page) => {
    let pageEl;

    if (typeof page === 'number') {
      // Attach the necessary DOM
      pageEl = document.createElement('button');
      pageEl.classList.add(
        'page',
        `page-${page}`,
        `${page === currentPage && 'active-pg'}`
      );
      // Attach event listener
      pageEl.addEventListener('click', () => {
        currentPage = page;
        console.log(currentPage);
        fetchPokemons();
        updatePagination();
        window.location.href = '#pokemons';
      });
    } else {
      pageEl = document.createElement('p');
      pageEl.classList.add('ellipsis');
    }
    pageEl.innerText = page;
    pokemonPagination.append(pageEl);
  });
  console.log(currentPage);
};
const updatePage = () => {
  fetchPokemons();
  updatePagination();
};
// Next and Prev Pagination
nextPageEl.addEventListener('click', () => {
  currentPage += 1;
  updatePage();
});

prevPageEl.addEventListener('click', () => {
  currentPage -= 1;
  updatePage();
});

window.onload = () => {
  updatePage();
};

/* POKEMON FILTER BY TYPE */
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
