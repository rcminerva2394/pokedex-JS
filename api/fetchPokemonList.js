import fetchPokemon from './fetchPokemon.js';

const fetchPokemonList = async (pageNumber) => {
  const offset = 9 * (pageNumber - 1);
  const pokemonListURL = `https://pokeapi.co/api/v2/pokemon/?limit=9&offset=${offset}`;

  try {
    const response = await fetch(pokemonListURL);
    const data = await response.json();
    const promises = data.results.map(async (pokemon) => {
      await fetchPokemon(pokemon.name);
    });

    const pokemonList = Promise.all(promises);
    console.log(pokemonList);
    return pokemonList;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default fetchPokemonList;
