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
    //displayDesserts(allDesserts);
  } catch (error) {
    console.error("Fel: " + error);
  }
}

loadData("brownies"); //Testsökord
