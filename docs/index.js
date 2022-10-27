const pokeBench = document.querySelector('.poke-bench');
const pokeSearch = document.querySelector('input');
const pokeButton = document.querySelector('button');

pokeButton.addEventListener('click', () => {
    while (pokeBench.firstChild) {
        pokeBench.removeChild(pokeBench.firstChild);
    }
    let pokeName = pokeSearch.value.toLowerCase();
    getPokeData(pokeName);
})

function pokeCardMaker( { name, imgURL, type} ) {
    const pokeCard = document.createElement('div');
    const pokeName = document.createElement('h2');
    const pokePic = document.createElement('img');
    const pokeType = document.createElement('p');

    pokeCard.classList.add('poke-card');
    pokeName.classList.add('poke-name');
    pokeName.textContent = name;
    pokePic.classList.add('poke-pic');
    pokePic.src = imgURL;
    pokeType.classList.add('poke-type');
    pokeType.textContent = type;

    pokeCard.appendChild(pokeName);
    pokeCard.appendChild(pokePic);
    pokeCard.appendChild(pokeType);

    pokeCard.addEventListener('mouseenter', () => {
        pokeCard.classList.add('focused');
    })

    pokeCard.addEventListener('mouseleave', () => {
        pokeCard.classList.remove('focused');
    })

    return pokeCard;
}

function getPokeData(pokeName) {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
        .then(res => {
            console.log(res.data);
            const pokeCard = pokeCardMaker({name: pokeName, imgURL: res.data.sprites.other["dream_world"].front_default, type: res.data.types[0].type.name});
            pokeBench.appendChild(pokeCard);
        })
        .catch(err => {
            console.error(err);
        })
}
