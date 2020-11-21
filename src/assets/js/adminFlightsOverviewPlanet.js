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
    const flights = MOCK_FLIGHTS;
    const container = document.querySelector("#flightsContent");

    let flightsToChosenPlanet = "";

    for (let i = 0; i < flights.length; i++){
        const FLIGHT = flights[i];

        if(FLIGHT.destination === planet){
            flightsToChosenPlanet = fillTableWithContent(flightsToChosenPlanet, FLIGHT);
        }
    }

    container.innerHTML = tableHeader + flightsToChosenPlanet;
}

function fillTableWithContent(container, flight){
    let orders = container;
    orders +=`<tr data-row='${flight.rocketId}'>
                    <td>${flight.rocketId}</td>
                    <td>STATUS</td>
                    <td>${flight.departure}</td>
                    <td>${flight.arrival}</td>
                    <td>${flight.maxMass-flight.availableMass}/${flight.maxMass} kg</td>
                    <td>${flight.maxVolume-flight.availableVolume}/${flight.maxVolume} m3</td>
                    <td><button>more info</button></td>
                 </tr>`;
    return orders;

}
