// Cores
const typeColor = {
    bug: "#91A119",
    dark: "#181e31",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    steel: "#60A1B8",
};

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
    let pokeId = document.getElementById("pokeId").value.toLowerCase();
    let id = pokeId;
    let finalUrl = url + id;
    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            generateCard(data);
        })
};

let generateCard = (data) => {
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.home.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    // Usa apenas o tipo principal para o background
    const themeColor = typeColor[data.types[0].type.name];
    
    card.innerHTML = `
        <p class="hp">
            <span>HP</span>
                ${hp}
        </p>
        <img src=${imgSrc} alt="Imagem do Pokémon ${pokeName}" />
        <h2 class="poke-name">${pokeName}</h2>
        <div class="types">
        </div>
        <div class="stats">
            <div>
                <h3>${statAttack}</h3>
                <p>Ataque</p>
            </div>
            <div>
                <h3>${statDefense}</h3>
                <p>Defesa</p>
            </div>
            <div>
                <h3>${statSpeed}</h3>
                <p>Velocidade</p>
            </div>
        </div>
    `;
    appendTypes(data.types);
    styleCard(themeColor);
};

let appendTypes = (types) => {
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        // Define a cor do span baseada no tipo específico
        span.style.backgroundColor = typeColor[item.type.name];
        document.querySelector(".types").appendChild(span);
    });
};

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
};

addEventListener('keydown', (e) => { if (e.key === 'Enter') { getPokeData(); } });
btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
