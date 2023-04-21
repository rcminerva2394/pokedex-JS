import pokemonCard from './pokemonCard.js';

const displayPokeCards = (pokemons, pokeElContainer) => {
  // Iterate the list and start inserting the DOM
  pokemons.forEach((item) => {
    const { types } = item;
    const pokeTypes =
      types.length > 1
        ? types.map((type) => type.type.name)
        : [types[0].type.name];

    const pokemonItem = pokemonCard(item);
    const moreDetailsBtn = document.createElement('button');
    moreDetailsBtn.classList.add('btn', 'btn-card', `${pokeTypes[0]}`);
    moreDetailsBtn.innerText = 'More details...';

    pokemonItem.append(moreDetailsBtn);
    pokeElContainer.append(pokemonItem);
  });
};

export default displayPokeCards;
