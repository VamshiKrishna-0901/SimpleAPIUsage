const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const hp = document.getElementById('hp');
const image = document.getElementById('sprite');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const types = document.getElementById('types');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const speed = document.getElementById('speed');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');

const pokemonUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/';

const displayTypes = (PokemonTypes) => {
    types.innerHTML = ``;
    PokemonTypes.forEach(element => {
        types.innerHTML += `<p class='cover'> ${element.type.name.toUpperCase()} </p>`
    });
}

const resetStats = () => {
    hp.innerHTML = '';
    attack.innerHTML = '';
    defense.innerHTML = '';
    speed.innerHTML = '';
    specialAttack.innerHTML = '';
    specialDefense.innerHTML = '';
}

const displayStats = (pokemonStats) => {
    resetStats()
    hp.innerHTML = pokemonStats[0].base_stat;
    attack.innerHTML = pokemonStats[1].base_stat;
    defense.innerHTML = pokemonStats[2].base_stat;
    speed.innerHTML = pokemonStats[5].base_stat;
    specialAttack.innerHTML = pokemonStats[3].base_stat;
    specialDefense.innerHTML = pokemonStats[4].base_stat;

}

const displayContainer = (data) => {
    image.src = data.sprites.front_default;
    pokemonName.innerHTML = data.name.toUpperCase();
    pokemonId.innerText = '#' + data.id;
    height.innerText = 'Height: ' + data.height;
    weight.innerText = 'Weight: ' + data.weight;

    displayTypes(data.types);
    displayStats(data.stats);
}

const fetchData = async (input) => {
    try {
        const res = await fetch(pokemonUrl + input);
        const data = await res.json();
        const pokemons = data.results;

        displayContainer(data);
    } catch (error) {
        alert('Pokémon not found');
    }
    
};

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (searchInput == '') return;
    const input = searchInput.value.toLowerCase();
    fetchData(input);
});

fetchData(25);