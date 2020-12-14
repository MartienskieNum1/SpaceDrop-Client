"use strict";

onApiUrlLoaded(homeInit);


function homeInit(){
    setTimeout(showNextPage,2000);
    document.querySelector("div#buttons").addEventListener("click", goToFlights);
}

function goToFlights(e) {
    const ID = e.target.closest("div").getAttribute("id");
    addPlanetToLocalStorage(ID);
    window.location.href = "flights.html";
}

function showNextPage(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("buttons").style.display = "flex";
}

function addPlanetToLocalStorage(id) {
    if (id === "toMars"){
        setDestinationPlanet("mars");
    }else if (id === "toEarth"){
        setDestinationPlanet("earth");
    }
}
