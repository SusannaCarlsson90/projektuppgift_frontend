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
  const apiKey = "9d96e24944c74de4a2514d8f5049c38c"; //API nyckel spoonacular som hämtar recept
  const nutritionApiKey = "10NQQGJGqCi6AWshrxFL48Em1Si07Wb2K330gmv8"; //API nyckel för näringsvärde
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10&addRecipeInformation=true`; //Min URL där jag vill ha sökord från användaren och hämta 50 resultat i taget.

  try {
    const response = await fetch(url);
    const data = await response.json(); //Packar upp "paketet" från servern
    allDesserts = data.results; //Sparar receptlistan i min globala variabel
    if (allDesserts.length === 0) {
      recipeHome.innerHTML = `<p class="no-results">Tyvärr hittades inga recept på "${query}". Testa något annat!</p>`;
      return; // Avbryt funktionen här
    }

    // Sortering bokstavsordning a-ö
    allDesserts.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });

    for (let recipe of allDesserts) {
      const nutritionUrl = `https://api.api-ninjas.com/v1/nutrition?query=${recipe.title}`; //Skapar en länk med receptets titel för att söka efter näringsvärde

      const nutritionResponse = await fetch(nutritionUrl, {
        //Skickar frågan med min API-nyckel och väntar på svar
        headers: { "X-Api-Key": nutritionApiKey },
      });
      const nutritionData = await nutritionResponse.json(); //Konverterar svaret till JSON-format
      console.log(nutritionData); //Kollar vilka värden jag kan få ut eftersom jag ej fick ut kalorier och protein

      if (nutritionData && nutritionData.length > 0) {
        const n = nutritionData[0];
        // Kollar om vi får tillbaka ett svar
        recipe.fat = n.fat_total_g;
        recipe.carbs = n.carbohydrates_total_g;
        recipe.sugar = n.sugar_g;
      } else {
        recipe.fat = "0";
        recipe.carbs = "0";
        recipe.sugar = "0";
      }
    }

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
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="card-body">
        <h3>${recipe.title}</h3>
        <p>Fett: ${recipe.fat}g</p>
        <p>Kolhydrater: ${recipe.carbs}g</p>
        <p>Socker: ${recipe.sugar}g</p>
        <a href="${recipe.sourceUrl}" target="_blank" class="recipe-btn"> 
          Visa recept
        </a>
      </div>
    </div>
    `;
    recipeHome.innerHTML += recipeCard;
  });
}

////Konfettiknapp från youtube, har modifierat och förenklat koden till min nybörjarnivå: https://www.youtube.com/watch?v=H3CqghZkHm8
function skjutKonfetti() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 300,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f093fb", "#f5576c", "#ffffff"],
    });
  }
}

// Klick lyssnare
searchBtn.addEventListener("click", () => {
  const query = inputText.value;
  if (query !== "") {
    skjutKonfetti();
    loadData(query);
  } else {
    alert("Du måste skriva något att söka efter");
  }
});

// Enter lyssnare
inputText.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const query = inputText.value;
    if (query !== "") {
      skjutKonfetti();
      loadData(query);
    } else {
      alert("Du måste skriva något att söka efter");
    }
  }
});
