const fetchPokemon = async (name) => {
  const pokemonURL = `https://pokeapi.co/api/v2/pokemon/${name}`;

  try {
    const response = await fetch(pokemonURL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export default fetchPokemon;
