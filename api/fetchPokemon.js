const fetchPokemon = async (name) => {
  const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${name}`;

  let response;
  let data;
  let error;

  try {
    response = await fetch(pokemonURL);
    data = await response.json();
  } catch (err) {
    data = null;
    error = err.message;
  }

  return {
    response,
    data,
    error,
  };
};

export default fetchPokemon;
