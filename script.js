// import fetchPokemonList from './api/fetchPokemonList.js';

const loader = document.querySelector('.loader-wrapper');

// Fetch the first 9 pokemons (page 1)
const list = fetchPokemonList(1);
let pokemonList;
try {
  pokemonList = await list;
  console.log(pokemonList);
} catch (err) {
  console.log(err);
} finally {
  loader.setAttribute('id', 'hidden');
}

const pokemonCardsEl = document.querySelector('.pokemon-cards');

list.forEach((item) => {
  const { id, name, types, sprites, height, weight } = item;
  let pokeName = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;
  let pokeTypes = types.length > 1 ? types.map((type) => type) : types;

  // Create the <li> and its classes
  let newPokemon = document.createElement('li');
  newPokemon.classList.add('card', `card-${types[0]}`);

  // Create the innerhtml of the <li>
  let newPokemonContent = `
   <img
              src=${sprites.other.home.front_default}
              alt='The ${pokeName} photo'
              class="pokemon-card-img"
            />
            <div class="card-info">
              <p class="card-number">${id}</p>
              <p class="card-name">${pokeName}</p>
              
              <p class="pokemon-type electric">
                <img
                  src="assets/pokemonTypes/electric.svg"
                  alt=""
                  class="pokemon-type-icon"
                />
                Electric
              </p>
              <div class="weight-height">
                <div class="weight-wrapper">
                  <p class="weight">6kg</p>
                  <p class="weight-text">Weight</p>
                </div>
                <div class="height-wrapper">
                  <p class="height">0.4m</p>
                  <p class="height-text">Height</p>
                </div>
              </div>
            </div>
            <button class="btn btn-card electric">More details...</button>
  
  
  `;
});

// const pokemonCardsSection = document.querySelector('.pokemon-cards-wrapper');

/* 
PAGINATION 
1) If 1 or 10, change the styling and show 2, 3... 10
and for 10, show 1...8 9 10
2) 4, 5, 6, 7 .... middle number of 1, 10
3) Create three html look/position for 1-3, 4-7, 8-10
 */

/**
const currentPage = 1;

const prevPageEl = document.querySelector('.prev-page');
const nextPage = document.querySelector('.next-page');
let pokemonePaginationEl = document.querySelector('.pokemon-pages');

const pokemons = [];

const page = 9 * (pageNumber - 1);
**/

/** pokemon filter by type */
const btnLeft = document.querySelector('.prev-type');
const btnRight = document.querySelector('.next-type');
const pokemonTypes = document.querySelector('.pokemon-types-btns');

let curr = 0;

const goNextType = (current) => {
  pokemonTypes.style.transform = `translateX(${current}rem)`;
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
