const searchInput = document.querySelector(".recherche__poke input");
let allPokemon = [];
let finPokemon = [];
const keyAPI = "https://pokeapi.co/api/v2/pokemon?limit=1126";
const cartes = document.querySelector(".liste__poke");

const types = {
  grass: "#78c850",
  ground: "#E2BF65",
  dragon: "#6F35FC",
  fire: "#F58271",
  electric: "#F7D02C",
  fairy: "#D685AD",
  poison: "#966DA3",
  bug: "#B3F594",
  water: "#6390F0",
  normal: "#D9D5D8",
  psychic: "#F95587",
  flying: "#A98FF3",
  fighting: "#C25956",
  rock: "#B6A136",
  ghost: "#735797",
  ice: "#96D9D6",
  steel: "#B7B7CE",
  dragon: "#6F35FC",
  dark: "#705746",
  fairy: "#D685AD",
};

function fetchPokemonBase() {
  fetch(keyAPI)
    .then((reponse) => reponse.json())
    .then((allPoke) => {
      //   console.log(allPoke);
      allPoke.results.forEach((pokemon) => {
        fetchPokemonComplet(pokemon);
      });
    });
}

fetchPokemonBase();

function fetchPokemonComplet(pokemon) {
  let objPokemonFull = {};
  let url = pokemon.url;

  fetch(url)
    .then((reponse) => reponse.json())
    .then((pokeData) => {
      // console.log(pokeData);
      objPokemonFull.pic = pokeData.sprites.front_default;
      objPokemonFull.type = pokeData.types[0].type.name;
      objPokemonFull.ID = pokeData.id;

      fetch(pokeData.species.url)
        .then((response) => response.json())
        .then((name) => {
          objPokemonFull.name = name.names[4].name;
          allPokemon.push(objPokemonFull);

          if (allPokemon.length === 151) {
            finPokemon = allPokemon
              .sort((a, b) => {
                return a.id - b.id;
              })
              .slice(0, 21);
            console.log();
            createCard(finPokemon);
          }

          //Loader

          const loader = document.querySelector(".loader");

          loader.classList.add("disabled");
        });
    });
}

//Creation des cartes

function createCard(arr) {
  for (let i = 0; i < arr.length; i++) {
    const carte = document.createElement("li");
    let couleur = types[arr[i].type];
    carte.style.background = couleur;
    const pokeImg = document.createElement("img");
    pokeImg.src = arr[i].pic;
    const pokeName = document.createElement("h5");
    pokeName.innerText = arr[i].name;
    const pokeId = document.createElement("p");
    pokeId.innerText = `ID#${arr[i].ID}`;

    carte.appendChild(pokeImg);
    carte.appendChild(pokeName);
    carte.appendChild(pokeId);
    cartes.appendChild(carte);
  }
}

// Scroll Infini

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //   scrollTop = scroll depuis le top
  //   scrollHeight = scroll total
  //   clientHeight = hauteur de ma fenetre, partie visible

  if (clientHeight + scrollTop >= scrollHeight - 50) {
    addPoke(6);
  }
});

let index = 21;

function addPoke(nb) {
  if (index < allPokemon.length) {
    createCard(allPokemon.slice(index, index + nb));
    index += nb;
    return index;
  } else {
    return;
  }
}

// Recherche

// searchInput.addEventListener("keyup", recherche);

const btn = document.querySelector("button");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  recherche();
});

function recherche() {
  if (index < allPokemon.length) {
    addPoke(130);
  }

  let filter, allLi, titleValue, allTitles;

  filter = searchInput.value.toUpperCase();
  allLi = document.querySelectorAll("li");
  allTitles = document.querySelectorAll("li > h5");

  for (let i = 0; i < allLi.length; i++) {
    titleValue = allTitles[i].innerText;

    if (titleValue.toUpperCase().indexOf(filter) > -1) {
      allLi[i].style.display = "flex";
    } else {
      allLi[i].style.display = "none";
    }
  }
}

// Animation Input

searchInput.addEventListener("input", (e) => {
  if (e.target.value !== "") {
    e.target.parentNode.classList.add("active__input");
  } else if (e.target.value === "") {
    e.target.parentNode.classList.remove("active__input");
  }
});
