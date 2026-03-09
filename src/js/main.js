"use strict";

/* hamburgermeny */
const hamburger = document.getElementById("hamburger");
const navMeny = document.getElementById("nav-meny");

if (hamburger && navMeny) {
  hamburger.addEventListener("click", () => {
    navMeny.classList.toggle("active");
  });
}

//Konfettiknapp från youtube, har modifierat och förenklat koden till min nybörjarnivå: https://www.youtube.com/watch?v=H3CqghZkHm8

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".btn-fun").forEach((button) => {
    button.addEventListener("click", function () {
      if (typeof confetti === "function") {
        //Aktiverar confetti genom att hämta instruktionerna från länken i html
        confetti({
          particleCount: 300, //Antal konfetti "bitar"
          spread: 70, //hur brett ska konfettin spridas
          origin: { y: 0.6 }, //Startpunkt = 60% från webbläsarfönstret
          colors: ["#f093fb", "#f5576c", "#ffffff"], //Färgerna på konfettin
        });
      }
    });
  });
});

//LABORATION 5:
/**
 * Hämtar statistik (kurser och program) från en extern JSON-fil
 * @returns {Array} en lista med data
 */
async function fetchData() {
  const response = await fetch(
    "https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json"
  );
  const data = await response.json();
  return data;
}

/**
 * Funktion som ritar ut statistiken i ett stapeldiagram och cirkeldiagram
 */
async function displayData() {
  let data = await fetchData();

  // Filtrera ut kurser
  const courses = data.filter((item) => item.type === "Kurs");

  // Sortera kurser (flest sökande först)
  courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

  //Ta de 6 mest sökta kurserna
  const topSixCourses = courses.slice(0, 6);

  //Upprepar för program
  const programs = data.filter((item) => item.type === "Program");
  programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
  const topFivePrograms = programs.slice(0, 5);

  // Kolla i konsolen !
  console.log("Topp 6 Kurser:", topSixCourses);
  console.log("Topp 5 Program:", topFivePrograms);

  // Ta fram en lista med bara namnen
  const courseNames = topSixCourses.map((course) => course.name);

  // Ta fram en lista med bara siffrorna
  const courseApplicants = topSixCourses.map(
    (course) => course.applicantsTotal
  );

  //Inställningar för stapeldiagram
  const config = {
    type: "bar", // Berättar att det ska vara staplar
    data: {
      labels: courseNames, // Namnen på kurserna under staplarna
      datasets: [
        {
          label: "Antal sökande",
          data: courseApplicants, // Hur höga staplarna ska vara

          //Färger
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    },

    options: {
      scales: {
        y: {
          beginAtZero: true, // Starta alltid skalan på noll
        },
      },
    },
  };

  // Rita ut diagrammet
  new Chart(document.getElementById("barChart"), config);

  //CIRKEL DIAGRAM

  //Packa upp namnen och siffrorna för programmen
  const programNames = topFivePrograms.map((p) => p.name);
  const programApplicants = topFivePrograms.map((p) => p.applicantsTotal);

  //Skriver hur diagrammet ska "se ut"
  const pieConfig = {
    type: "pie", // Cirkeldiagram
    data: {
      labels: programNames,
      datasets: [
        {
          data: programApplicants,
          // Färger:
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
          ],
        },
      ],
    },
  };

  //Skriv ut:
  new Chart(document.getElementById("pieChart"), pieConfig);
}

// Kör funktionen
displayData();

/**
 * Hämtar koordinater för en specifik plats via Nominatim API.
 * @async
 * @param {string} query - Platsen användaren sökt efter.
 * @returns {array} En array med platsdata
 */

async function fetchMap(query) {
  //argumentet query = sökordet från användaren
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}` //söker efter sökordet på nominatim
  );
  const data = await response.json(); //tar emot datan
  return data; //returnerar datan/svaret från nominatim
}

/**
 * Kopplar ihop sökfältet med kartan
 */
async function displayMap() {
  const searchWord = document.getElementById("searchInput").value; // Hämtar sökordet från användaren
  const data = await fetchMap(searchWord); // skickar sökordet till min funktion fetchMap och får tillbaka koordinaterna från nominatim

  if (data.length > 0) {
    // Hämtar latitud och longitud från det första objektet i listan
    const lat = data[0].lat;
    const lon = data[0].lon; // Plockar ut koordinaterna
    const map = document.getElementById("mapIframe");
    // Uppdaterar kartan
    map.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon},${lat},${lon},${lat}&layer=mapnik&marker=${lat},${lon}`;
  }
}

const searchBtn = document.getElementById("searchBtn");

if (searchBtn) {
  searchBtn.addEventListener("click", displayMap); //Lägger på eventlyssnare på knappen. Om någon klickar på knappen kör display map
}
