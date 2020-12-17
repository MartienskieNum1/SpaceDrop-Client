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

function goToFlightDetail(id) {
    setflightId(id);
    window.location.href = "adminFlightDetails.html";
}
