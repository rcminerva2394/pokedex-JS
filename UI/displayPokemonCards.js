import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.js';
import * as convert from '../utils/weightHeightConverter.js';

const displayPokeCards = (pokemons, pokeElContainer) => {
  // Iterate the list and start inserting the DOM
  pokemons.forEach((item) => {
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
    pokeElContainer.append(newPokemon);
  });
};

export default displayPokeCards;
