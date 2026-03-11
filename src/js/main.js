"use strict";

/* hamburgermeny */
const hamburger = document.getElementById("hamburger");
const navMeny = document.getElementById("nav-meny");

if (hamburger && navMeny) {
  hamburger.addEventListener("click", () => {
    navMeny.classList.toggle("active");
  });
}

async function loadData() {
  const url = "https://api.spoonacular.com/recipes/complexSearch";
  //anropa och läs ut data

  try {
    const response = await fetch(url);
    allCourses = await response.json();

    //Lagra globalt
    console.table(allCourses);

    displayCourses(allCourses);
  } catch (error) {
    console.error("Fel: " + error);
  }
}
