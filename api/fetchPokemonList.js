import fetchPokemon from './fetchPokemon.js';

const fetchPokemonList = async (pageNumber) => {
  const offset = 9 * (pageNumber - 1);
  const pokemonListURL = `https://pokeapi.co/api/v2/pokemon/?limit=9&offset=${offset}`;

  try {
    const response = await fetch(pokemonListURL);
    const data = await response.json();
    console.log(data);
    const promises = data.results.map(
      async (pokemon) => (await fetchPokemon(pokemon.name)).data
    );
    const pokemonList = Promise.all(promises);
    return pokemonList;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default fetchPokemonList;
