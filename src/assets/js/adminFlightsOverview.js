"use strict";

onApiUrlLoaded(adminFlightOverviewInit);

function adminFlightOverviewInit() {
    showOverview();
    document.querySelector("#viewMoreEarth").addEventListener("click", goToPlanetOverview);
    document.querySelector("#viewMoreMars").addEventListener("click", goToPlanetOverview);

}

function goToPlanetOverview(e) {
    const ID = e.target.getAttribute("id");
    let planet;
    if(ID==="viewMoreMars"){
        planet = "Mars";
    }else if(ID==="viewMoreEarth"){
        planet = "Earth";
    }
    setDestinationPlanet(planet);
    window.location.href = "adminFlightsOverviewPlanet.html";

}

function showOverview() {
    const containerEarth = document.querySelector("#flightsToEarthContent");
    const containerMars = document.querySelector("#flightsToMarsContent");
    let earthFlights = "";
    let marsFlights = "";

    getRockets().then(function(rockets){
        for (let i = 0; i < rockets.length; i++) {
            const rocket = rockets[i];
            if(rocket.departLocation === "Mars"){
                earthFlights += fillTableWithContent(rocket);
            }else if(rocket.departLocation === "Earth"){
                marsFlights += fillTableWithContent(rocket);
            }
        }
        containerEarth.innerHTML = getTableHeader() + earthFlights;
        containerMars.innerHTML = getTableHeader() + marsFlights;
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

function goToFlightDetail(id) {
    setflightId(id);
    window.location.href = "adminFlightDetails.html";
}
