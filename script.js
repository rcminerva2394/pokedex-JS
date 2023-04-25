import fetchPokemonList from './api/fetchPokemonList.js';
import fetchPokemonByType from './api/fetchPokemonByType.js';
import fetchPokemon from './api/fetchPokemon.js';
import displayPokeCards from './UI/displayPokemonCards.js';
import { paginate } from './utils/pagination.js';
import toggleEl from './UI/toggleEl.js';
import showMoreDetails from './UI/moreDetailsModal.js';

const loader = document.querySelector('.loader-wrapper');
const pokemonCardsEl = document.querySelector('.pokemon-cards');
const pokemonPaginationWrapper = document.querySelector('.pokemon-pagination');
const pokemonPagination = document.querySelector('.pokemon-pages');
const moreCardTypeBtn = document.querySelector('.more-cards-btn-wrapper');

let pokemonList;
let currentPage = 1;

/* FUNCTION TO FETCH POKEMONS */
const fetchPokemons = async (fetchFunc, fetchParam, pokemonVar) => {
  toggleEl(pokemonPaginationWrapper);
  toggleEl(loader);
  // Delete the previous innerHTML of the pokemonCardsEl
  pokemonCardsEl.innerHTML = '';
  const list = fetchFunc(fetchParam);
  try {
    pokemonVar = await list;
  } catch (err) {
    console.log(err);
  } finally {
    displayPokeCards(pokemonVar, pokemonCardsEl);
    toggleEl(loader);
    toggleEl(pokemonPaginationWrapper);
    window.location.href = '#pokemons';
  }
};

/** PAGINATE *****/
const prevPageEl = document.querySelector('.prev-page');
const nextPageEl = document.querySelector('.next-page');

const updatePagination = () => {
  pokemonPagination.innerHTML = '';
  const pagination = paginate(currentPage, 100);
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
        fetchPokemons(fetchPokemonList, currentPage, pokemonList);
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
};

const updatePage = () => {
  fetchPokemons(fetchPokemonList, currentPage, pokemonList);
  updatePagination();
};

// Next and Prev Pagination (Just regular cards)
nextPageEl.addEventListener('click', () => {
  if (currentPage <= 99) currentPage += 1;
  updatePage();
});

prevPageEl.addEventListener('click', () => {
  if (currentPage > 1) currentPage -= 1;
  updatePage();
});

/*** POKEMON FILTER BY TYPE ***/
let startIndex = 0;
let endIndex = 9;

const updateIndeces = () => {
  startIndex += 9;
  endIndex += 9;
};

let pokemonType;
const btnLeft = document.querySelector('.prev-type');
const btnRight = document.querySelector('.next-type');
const pokemonTypesBtns = document.querySelector('.pokemon-types-btns');

const fetchPokemonType = async (pokeType) => {
  pokemonPaginationWrapper.style.display = 'none';
  moreCardTypeBtn.classList.add('hidden');

  toggleEl(loader);
  // Delete the previous innerHTML of the pokemonCardsEl
  pokemonCardsEl.innerHTML = '';
  moreCardTypeBtn.innerHTML = '';
  const list = fetchPokemonByType(pokeType);
  try {
    pokemonType = await list;
    console.log(pokemonType);
  } catch (err) {
    console.log(err);
  } finally {
    displayPokeCards(pokemonType.slice(startIndex, endIndex), pokemonCardsEl);
    toggleEl(loader);
    moreCardTypeBtn.classList.remove('hidden');
  }
};

// Attach event listener to the type btns
const types = document.querySelectorAll('.type');
types.forEach((type) => {
  const pokeType = type.getAttribute('data-pokemon-type');
  type.addEventListener('click', () => {
    fetchPokemonType(pokeType);

    // More Cards Btn
    const moreCardsBtn = document.createElement('button');
    moreCardsBtn.classList.add('btn', 'secondary-btn');
    moreCardsBtn.addEventListener('click', () => {
      updateIndeces();
      if (startIndex < pokemonType.length && endIndex < pokemonType.length) {
        toggleEl(loader);
        displayPokeCards(
          pokemonType.slice(startIndex, endIndex),
          pokemonCardsEl
        );
        toggleEl(loader);
      }
    });
    moreCardsBtn.innerText = 'More Pokemons...';
    moreCardTypeBtn.append(moreCardsBtn);

    // Go upward btn
    const goUpwardBtn = document.createElement('button');
    goUpwardBtn.classList.add('btn', 'secondary-btn');
    goUpwardBtn.addEventListener('click', () => {
      window.location.href = '#pokemons';
    });
    goUpwardBtn.innerHTML = '&#8593;';
    moreCardTypeBtn.append(goUpwardBtn);
  });
});

// Pokemon Filter By type dynamic styling
let curr = 0;

const goNextType = (current) => {
  pokemonTypesBtns.style.transform = `translateX(${current}rem)`;
};

const nextType = () => {
  if (curr !== -154) {
    curr += -14;
  } else if (curr === -154) {
    curr = 0;
  }

  goNextType(curr);
};

const prevType = () => {
  if (curr === 0) {
    curr = -154;
  } else {
    curr += 14;
  }

  goNextType(curr);
};

btnLeft.addEventListener('click', prevType);
btnRight.addEventListener('click', nextType);

/*** ON LOAD ***/
window.onload = () => {
  updatePage();
};

/** SEARCH A POKEMON **/
const formEl = document.querySelector('#form');
const formInput = document.querySelector('#input-pokemon');
formEl.addEventListener('submit', async (e) => {
  window.location.href = '#pokemons';
  e.preventDefault();
  pokemonPaginationWrapper.style.display = 'none';
  pokemonCardsEl.innerHTML = '';
  moreCardTypeBtn.classList.add('hidden');
  toggleEl(loader);
  console.log(formInput.valuEle);
  const getPokemon = await fetchPokemon(formInput.value.toLowerCase());
  toggleEl(loader);
  if (getPokemon.response.ok) {
    displayPokeCards([getPokemon.data], pokemonCardsEl);
  } else {
    const errorEl = document.createElement('p');
    errorEl.innerText = 'Oops! Sorry no pokemon found';
    errorEl.classList.add('poke-error');
    pokemonCardsEl.append(errorEl);
  }
});

// Toggling modal when backdrop is clicked
const pokemonModalEl = document.querySelector('.pokemon-modal');
const pokeBackdropEl = document.querySelector('.pokemon-stats-backdrop');
pokeBackdropEl.addEventListener('click', () => {
  toggleEl(pokemonModalEl);
  document.body.style.overflow = 'scroll';
});

// More details hero btn
const heroBtn = document.querySelector('.btn-hero');
const heroPoke = await fetchPokemon('pikachu');

if (heroPoke.response.ok) {
  showMoreDetails(heroPoke.data, heroBtn);
}
