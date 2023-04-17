import fetchPokemon from './fetchPokemon.js';

const fetchPokemonByType = async (type) => {
  const pokemonTypeURL = `https://pokeapi.co/api/v2/type/${type}`;

  try {
    const response = await fetch(pokemonTypeURL);
    const data = await response.json();
    console.log(data);
    const promises = data.pokemon.map(async (pokemon) =>
      fetchPokemon(pokemon.pokemon.name)
    );
    const pokemonType = Promise.all(promises);
    return pokemonType;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default fetchPokemonByType;
