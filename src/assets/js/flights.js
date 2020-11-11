"use strict";

document.addEventListener("DOMContentLoaded", flightsInit);

function flightsInit(){
    renderChosenPlanet();
}


function renderChosenPlanet() {
    const CONTAINER = document.querySelector("div#filterFlights div img");
    CONTAINER.outerHTML = `<img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon">`
}