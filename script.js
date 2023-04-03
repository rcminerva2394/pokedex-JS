// To practice AJAX

/*
const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon/ivysaur';
let data;
const request = new XMLHttpRequest();
request.open('GET', pokemonAPI);
request.send();

request.addEventListener('load', function () {
  data = JSON.parse(this.responseText);
  console.log(data);
});
*/

/*
const request = fetch('https://pokeapi.co/api/v2/pokemon/ivysaur');
request
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
*/

// const request = fetch('https://pokeapi.co/api/v2/ability/?limit=10000');
// const request = fetch('https://pokeapi.co/api/v2/pokemon/?limit=150');
// const request = fetch('https://pokeapi.co/api/v2/type/?limit=150');
// request.then((response) => response.json()).then((data) => console.log(data));

// console.log(request);
