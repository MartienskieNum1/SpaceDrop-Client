"use strict";

document.addEventListener("DOMContentLoaded", adminFlightOverviewInit);

function adminFlightOverviewInit() {
    document.querySelector("#viewMoreEarth").addEventListener("click", goToPlanetOverview);
    document.querySelector("#viewMoreMars").addEventListener("click", goToPlanetOverview);

}

function goToPlanetOverview(e) {
    const ID = e.target.getAttribute("id");
    let planet;
    if(ID==="viewMoreMars"){
        planet = "mars";
    }else if(ID==="viewMoreEarth"){
        planet = "earth";
    }
    setDestinationPlanet(planet);
    console.log(planet);

}
