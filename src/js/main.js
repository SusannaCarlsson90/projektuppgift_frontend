"use strict";

/* hamburgermeny */
const hamburger = document.getElementById("hamburger");
const navMeny = document.getElementById("nav-meny");

if (hamburger && navMeny) {
  hamburger.addEventListener("click", () => {
    navMeny.classList.toggle("active");
  });
}

/** @type {Array} En lista som lagrar alla hämtade recept från API:et */

let allDesserts = []; //Skapar variabel för att lagra alla desserter från API i. Tar emot som en tom Array.

/**
 * Hämtar receptdata från Spoonacular API baserat på ett sökord.
 * @param {string} query - Ordet som användaren söker efter
 */

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

/** @type {HTMLElement} - Knappen som användaren klickar på för att söka */
const searchBtn = document.getElementById("searchBtn");

/** @type {HTMLElement} - Textfältet där användaren skriver in sitt sökord */
const inputText = document.getElementById("recipeSearch");

/** @type {HTMLElement} - "Behållaren" där receptkorten ska skrivas ut */
const recipeHome = document.getElementById("recipeHome");

/**
 * Hämtar recept från API:et och sparar dem i listan
 * @param {Array} recipes - Listan med alla recept som ska visas
 */

function displayDesserts(recipes) {
  //Funktion som skriver ut recepten till min index.html
  recipeHome.innerHTML = ""; //Tömmer sidan på gamla recept innan nya ritas ut
  recipes.forEach((recipe) => {
    //för varje recept gör detta:
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
  //eventlyssnare vid klick på sökknappen
  const query = inputText.value;

  if (query !== "") {
    //Om sökfältet inte är tomt kör loadData
    loadData(query);
  } else {
    alert("Du måste skriva något att söka efter"); //Annars kör popupruta med denna text
  }
});

inputText.addEventListener("keydown", (event) => {
  //eventlyssnare vid tryck på enter
  if (event.key === "Enter") {
    const query = inputText.value;
    if (query !== "") {
      loadData(query); //Om inputvärdet från användaren inte är tomt kör loadData
    } else {
      alert("Du måste skriva något att söka efter"); //Annars popupruta med texten
    }
  }
});
