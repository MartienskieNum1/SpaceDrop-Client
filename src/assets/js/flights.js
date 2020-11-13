"use strict";

document.addEventListener("DOMContentLoaded", flightsInit);

function flightsInit(){
    renderChosenPlanet();
}


function renderChosenPlanet() {
    const CONTAINER = document.querySelector("div#filterFlights div");
    CONTAINER.innerHTML =
        `<img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon">
         <h1>Select flight to ${toTitleCase(getDestinationPlanet())}</h1>`;
}

function toTitleCase(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}


function renderFlightlist() {
    getFlights().then(function(flights){
        for (let i = 0; i < flights.length; i++) {
            console.log(flight[i]);
        }
    });
}
