"use strict";
document.addEventListener("DOMContentLoaded", adminFlightOverviewPlanetInit);
const tableHeader = '<tr class=\"tableHeaders\"><tr class="tableHeaders"><th scope="col">Flightnr:</th><th scope="col">Orderstatus:</th><th scope="col">Departure:</th><th scope="col">Arrival:</th><th scope="col">Cargo:</th><th scope="col">Volume:</th><td></td></tr>';

function adminFlightOverviewPlanetInit() {
    let planet = getDestinationPlanet();
    if(planet!=="mars"&&planet!=="earth"){
        window.location.href = "adminFlightsOverview.html";
    }else{
        showOverview(planet);
    }
}

function showOverview(planet) {
}
