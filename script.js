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

/* FUNCTION TO FETCH POKEMONS */
const fetchPokemons = async () => {
  loader.classList.remove('hidden');
  const list = fetchPokemonList(currentPage);
  try {
    pokemonList = await list;
    console.log(pokemonList);
  } catch (err) {
    console.log(err);
  } finally {
    loader.classList.add('hidden');
    displayPokeCards();
  }
};

window.onload = () => {
  fetchPokemons();
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

/* PAGINATION */
const prevPageEl = document.querySelector('.prev-page');
const nextPageEl = document.querySelector('.next-page');
const page1 = document.getElementsByClassName('page page-1 active-pg')[0];
const page2 = document.getElementsByClassName('page page-2')[0];
const page3 = document.getElementsByClassName('page page-3')[0];
const page98 = document.getElementsByClassName('page page-98')[0];
const page99 = document.getElementsByClassName('page page-99')[0];
const page100 = document.getElementsByClassName('page page-100')[0];
const pageTwos = document.querySelector('.page-1-2');
const page9899 = document.querySelector('.page-98-99');
const middlePageDiv = document.querySelector('.middle-page');
const pages = {
  1: page1,
  2: page2,
  3: page3,
  98: page98,
  99: page99,
  100: page100,
};

const removePrevActive = () => {
  document.getElementsByClassName('active-pg')[0].classList.remove('active-pg');
};

const jumpToPage = (pageNumber) => {
  removePrevActive();
  currentPage = pageNumber;
  fetchPokemons();
  const activePage = document.getElementsByClassName(
    `page page-${pageNumber}`
  )[0];
  activePage.classList.add('active-pg');
  window.location.href = '#pokemons';
};

// Function to show the right UI
const checkPage = () => {
  if (currentPage >= 1 && currentPage < 4) {
    pageTwos.classList.remove('hidden');
    middlePageDiv.innerHTML = '';
    pages[currentPage].classList.add('active-pg');
  } else if (currentPage > 3 && currentPage < 98) {
    middlePageDiv.innerHTML = '';
    pageTwos.classList.add('hidden');
    page9899.classList.add('hidden');
    middlePageDiv.innerHTML = `<button class="page page-${currentPage} active-pg">${currentPage}</button>
      <p class="ellipsis">...</p>`;
    const midPage = document.getElementsByClassName(
      `page page-${currentPage}`
    )[0];
    midPage.addEventListener('click', () => jumpToPage(currentPage));
  } else if (currentPage > 97 && currentPage < 100) {
    middlePageDiv.innerHTML = '';
    pageTwos.classList.add('hidden');
    pages[currentPage].classList.add('active-pg');
    page9899.classList.remove('hidden');
  }
};

const goNextPage = () => {
  if (currentPage < 100) {
    currentPage += 1;
    removePrevActive();
    fetchPokemons();
    checkPage();
    window.location.href = '#pokemons';
  }
};

const goPrevPage = () => {
  if (currentPage > 1) {
    currentPage -= 1;
    removePrevActive();
    fetchPokemons();
    checkPage();
    window.location.href = '#pokemons';
  }
};

const showFirstPages = () => {
  pageTwos.classList.remove('hidden');
  page9899.classList.add('hidden');
  middlePageDiv.innerHTML = '';
  jumpToPage(1);
};

const showLastPages = () => {
  middlePageDiv.innerHTML = '';
  pageTwos.classList.add('hidden');
  page9899.classList.remove('hidden');
  jumpToPage(100);
};

// Page 1-3, 98-100
page1.addEventListener('click', showFirstPages);
page2.addEventListener('click', () => jumpToPage(2));
page3.addEventListener('click', () => jumpToPage(3));
page98.addEventListener('click', () => jumpToPage(98));
page99.addEventListener('click', () => jumpToPage(99));
page100.addEventListener('click', showLastPages);

// Next and Prev Pagination
nextPageEl.addEventListener('click', goNextPage);
prevPageEl.addEventListener('click', goPrevPage);
