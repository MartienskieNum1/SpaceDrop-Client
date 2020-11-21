"use strict";
const tableHeader = '<tr class=\"tableHeaders\"><tr class="tableHeaders"><th scope="col">Flightnr:</th><th scope="col">Orderstatus:</th><th scope="col">Departure:</th><th scope="col">Arrival:</th><th scope="col">Cargo:</th><th scope="col">Volume:</th><td></td></tr>';
document.addEventListener("DOMContentLoaded", adminFlightOverviewInit);

function adminFlightOverviewInit() {
    showOverview();
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
    window.location.href = "adminFlightsOverviewPlanet.html";

}

function showOverview() {
    const flights = MOCK_FLIGHTS;
    const containerEarth = document.querySelector("#flightsToEarthContent");
    const containerMars = document.querySelector("#flightsToMarsContent");

    let earthFlights = "";
    let marsFlights = "";

    for (let i = 0; i < flights.length; i++){
        const FLIGHT = flights[i];

        if(FLIGHT.destination === "earth"){
            earthFlights = fillTableWithContent(earthFlights, FLIGHT);
        }else if(FLIGHT.destination === "mars"){
            marsFlights = fillTableWithContent(marsFlights, FLIGHT);
        }
    }

    containerEarth.innerHTML = tableHeader + earthFlights;
    containerMars.innerHTML = tableHeader + marsFlights;
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