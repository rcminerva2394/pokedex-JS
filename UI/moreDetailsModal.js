import pokemonCard from './pokemonCard.js';
import toggleEl from './toggleEl.js';
import showProgressBar from './statProgressBar.js';
import capitalizeFirstLetter from '../utils/capitalizeFirstLetter.js';

const showMoreDetails = (item, btn) => {
  const { types, stats } = item;
  const pokeTypes =
    types.length > 1
      ? types.map((type) => type.type.name)
      : [types[0].type.name];

  // More Details Modal or Pokemon Stats
  btn.addEventListener('click', () => {
    const pokemonModalEl = document.querySelector('.pokemon-modal');
    const pokemonMainEl = document.querySelector('.pokemon-main-info');
    const pokeStatsDetailsEl = document.querySelector('.pokemon-stats-details');

    pokemonMainEl.innerHTML = '';
    pokeStatsDetailsEl.innerHTML = '';

    // The card or the main infor on the left
    const pokemon = pokemonCard(item);
    pokemon.classList.remove(`card-${pokeTypes[0]}`);
    pokemon.style.animation = 'none';

    toggleEl(pokemonModalEl);

    document.body.style.overflow = 'hidden';

    pokemonMainEl.append(pokemon);

    // THE STATS
    // The close btn
    const closeBtnEl = document.querySelector('.close-modal');
    closeBtnEl.addEventListener('click', () => {
      pokemonModalEl.classList.add('hidden');
      document.body.style.overflow = 'scroll';
    });

    // The actual stats
    console.log(stats);
    const mainStatsEl = document.createElement('div');
    const titleEl = document.createElement('p');
    titleEl.innerText = 'Stats';
    titleEl.style.fontSize = '3rem';
    titleEl.style.marginBottom = '2rem';
    mainStatsEl.append(titleEl);

    const statsEl = document.createElement('div');

    stats.forEach((stat) => {
      const statEl = document.createElement('div');
      statEl.classList.add('stat');
      // Stat Title
      const statTitle = document.createElement('p');
      let statName;
      if (stat.stat.name === 'special-attack') {
        statName = 'SP Atk';
      } else if (stat.stat.name === 'special-defense') {
        statName = 'SP Def';
      } else if (stat.stat.name === 'hp') {
        statName = 'HP';
      } else {
        statName = `${capitalizeFirstLetter(stat.stat.name)}`;
      }

      statTitle.innerText = statName;
      statTitle.style.fontWeight = '300';
      statEl.append(statTitle);
      // Stat Number
      const statNumEl = document.createElement('p');
      statNumEl.innerText = `${stat.base_stat}`;
      statEl.append(statNumEl);

      // And the stat progress bar
      const statBarEl = document.createElement('div');
      statBarEl.classList.add('stat-bar');
      const statProgressBar = document.createElement('div');
      statProgressBar.classList.add('stat-bar-progress');
      statBarEl.append(statProgressBar);
      statEl.append(statBarEl);
      showProgressBar(stat.base_stat, statProgressBar);

      statsEl.append(statEl);
      mainStatsEl.append(statsEl);
      pokeStatsDetailsEl.append(mainStatsEl);
    });
  });
};

export default showMoreDetails;
