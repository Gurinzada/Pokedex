const nomePokemon = document.querySelector('.nome_pokemon');
const pokemon_num = document.querySelector('.pokemon_num');
const pokemon_imagens = document.querySelector('.pokemon_imagens');

const form = document.querySelector('.form');
const pesquisa = document.querySelector('.pesquisa');
const btnprev = document.querySelector('.btn-prev');
const btnnext = document.querySelector('.btn-next');

let procurarPokemon = 1;

const fetchPokemon = async   (pokemon) => {

    const APIAnswer = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIAnswer.status == 200 ){
        const data = await APIAnswer.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {
    nomePokemon.innerHTML = 'Procurando...';
    pokemon_num.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemon_imagens.style.display = 'block';
    nomePokemon.innerHTML = data.name;
    pokemon_num.innerHTML = data.id;
    pokemon_imagens.src =  data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pesquisa.value = "";
    procurarPokemon = data.id;
    } else{
        pokemon_imagens.style.display = 'none';
        nomePokemon.innerHTML = 'BAD LUCKY :c'; 
    }
}

form.addEventListener('submit', (event) => {

    event.preventDefault();
    renderPokemon(pesquisa.value.toLowerCase());
    console.log(pesquisa.value);
});

btnprev.addEventListener('click', () => {
    if(procurarPokemon > 1){
    procurarPokemon -= 1;
    renderPokemon(procurarPokemon);
    }
});

btnnext.addEventListener('click', () => {
    procurarPokemon += 1;
    renderPokemon(procurarPokemon);
});

renderPokemon(procurarPokemon);

