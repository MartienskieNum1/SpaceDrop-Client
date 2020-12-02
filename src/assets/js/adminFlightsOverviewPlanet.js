"use strict";
onApiUrlLoaded(adminFlightOverviewPlanetInit);
const tableHeader = '<tr class="tableHeaders"><th scope="col">Flightnr:</th><th scope="col">Orderstatus:</th>' +
    '<th scope="col">Departure:</th><th scope="col">Arrival:</th><th scope="col">Cargo:</th>' +
    '<th scope="col">Volume:</th><td></td></tr>';
function adminFlightOverviewPlanetInit() {
    const planet = getDestinationPlanet();
    if(planet!=="Mars"&&planet!=="Earth"){
        window.location.href = "adminFlightsOverview.html";
    }else{
        showTitle(planet);
        showOverview(planet);
    }
}

function showOverview(planet) {
    const container = document.querySelector("#flightsContent");
    let flightsToChosenPlanet = "";

    getRockets().then(function(rockets){
        for (let i = 0; i < rockets.length; i++) {
            let rocket = rockets[i];
            let toPlanet;
            if (rocket.departLocation === "Mars"){
                toPlanet = "Earth";
            }
            else if(rocket.departLocation === "Earth") {
                toPlanet = "Mars";
            }

            if(toPlanet===planet){
                flightsToChosenPlanet += fillTableWithContent(rocket);
            }
        }
        container.innerHTML = tableHeader + flightsToChosenPlanet;
    });


}

function fillTableWithContent(flight){
    return `<tr data-row='${flight.id}'>
                    <td>${flight.id}</td>
                    <td>STATUS</td>
                    <td>${flight.departure}</td>
                    <td>${flight.arrival}</td>
                    <td>${flight.maxMass-flight.availableMass}/${flight.maxMass} kg</td>
                    <td>${flight.maxVolume-flight.availableVolume}/${flight.maxVolume} m3</td>
                    <td><button onclick="goToFlightDetail('${flight.id}')">more info</button></td>
                </tr>`;
}


function showTitle(planet) {
    const container = document.querySelector("#title");
    container.innerHTML = `<img src="assets/images/icons/${planet}.png" alt="planet icon"><h1>Flights to ${planet}</h1>`;

}

function goToFlightDetail(id) {
    setflightId(id);
    window.location.href = "adminFlightDetails.html";
}

