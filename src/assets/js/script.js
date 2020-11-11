"use strict";

document.addEventListener("DOMContentLoaded", init)


function init(){
    document.querySelector("main").addEventListener("click", goToFlights);
}

function goToFlights(e) {
    let id = e.target.closest("div").getAttribute("id");

    addPlanetToLocalStorage(id);

    window.location.href = "flights.html";
}

function addPlanetToLocalStorage(id) {
    if (id === "toMars"){
        setDestinationPlanet("mars")
    }else if (id === "toEarth"){
        setDestinationPlanet("earth")
    }
}
