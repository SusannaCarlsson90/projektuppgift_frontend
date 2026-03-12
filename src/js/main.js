"use strict";

/* hamburgermeny */
const hamburger = document.getElementById("hamburger");
const navMeny = document.getElementById("nav-meny");

if (hamburger && navMeny) {
  hamburger.addEventListener("click", () => {
    navMeny.classList.toggle("active");
  });
}

let allDesserts = []; //Skapar variabel för att lagra alla desserter från API i. Tar emot som en tom Array.

async function loadData(query) {
  //Funktion som heter data i ett JSON-format som görs om till ett JavaScript objekt
  const apiKey = "39499d580b344dc5bafd2e88b22e6afb";
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=50`; //Min URL där jag vill ha sökord från användaren och hämta 50 resultat i taget.

  try {
    const response = await fetch(url);
    const data = await response.json(); //Packar upp "paketet" från servern
    allDesserts = data.results; //Sparar receptlistan i min globala variabel

    //Lagra globalt
    console.table(allDesserts);

    displayDesserts(allDesserts);
  } catch (error) {
    console.error("Fel: " + error);
  }
}

const searchBtn = document.getElementById("searchBtn");
const inputText = document.getElementById("recipeSearch");
const recipeHome = document.getElementById("recipeHome");

function displayDesserts(recipes) {
  //Funktion som skriver ut recepten till min index.html
  recipeHome.innerHTML = ""; //Tömmer sidan på gamla recept innan nya ritas ut;
  recipes.forEach((recipe) => {
    const recipeCard = `
    <div class="recipeCard">
      <h3>${recipe.title}</h3>
      <img src="${recipe.image}" alt="${recipe.title}">

    </div>
    `;
    recipeHome.innerHTML += recipeCard;
  });
}

searchBtn.addEventListener("click", () => {
  const query = inputText.value;

  if (query !== "") {
    loadData(query);
  } else {
    alert("Du måste skriva något att söka efter");
  }
});

inputText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = inputText.value;
    if (query !== "") {
      loadData(query);
    } else {
      alert("Du måste skriva något att söka efter");
    }
  }
});
