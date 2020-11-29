"use strict";

onApiUrlLoaded(homeInit);


function homeInit(){
    document.querySelector("div#buttons").addEventListener("click", goToFlights);
}

function goToFlights(e) {
    const ID = e.target.closest("div").getAttribute("id");

    addPlanetToLocalStorage(ID);

    window.location.href = "flights.html";
}

function addPlanetToLocalStorage(id) {
    if (id === "toMars"){
        setDestinationPlanet("mars");
    }else if (id === "toEarth"){
        setDestinationPlanet("earth");
    }
}
