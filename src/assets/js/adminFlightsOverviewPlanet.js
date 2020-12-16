"use strict";
onApiUrlLoaded(adminFlightOverviewPlanetInit);

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
    const container = document.querySelector("#flights table");
    let flightsToChosenPlanet = "";

    getRockets().then(function(rockets){
        for (let i = 0; i < rockets.length; i++) {
            const rocket = rockets[i];
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
        container.innerHTML = getTableHeader() + flightsToChosenPlanet;
    });
}


function showTitle(planet) {
    const container = document.querySelector("#title");
    container.innerHTML = `<img src="assets/images/icons/${planet}.png" alt="planet icon"><h1>Flights to ${planet}</h1>`;

}

function goToFlightDetail(id) {
    setflightId(id);
    window.location.href = "adminFlightDetails.html";
}

