"use strict";

onApiUrlLoaded(adminFlightOverviewInit);

function adminFlightOverviewInit() {
    showOverview();
    document.querySelector("#viewMoreEarth").addEventListener("click", goToPlanetOverview);
    document.querySelector("#viewMoreMars").addEventListener("click", goToPlanetOverview);
    document.querySelector("#AccountLogoutButton").addEventListener("click", logout);

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
    const CONTAINER_EARTH = document.querySelector("#flightsToEarthContent");
    const CONTAINER_MARS = document.querySelector("#flightsToMarsContent");
    let earthFlights = "";
    let marsFlights = "";

    const TODAY = new Date();
    const DATE = TODAY.getFullYear()+35+'-'+(TODAY.getMonth()+1)+'-'+TODAY.getDate();
    let earthCount=1;
    let marsCount=1;
    getRockets().then(rockets => {
        rockets.sort(function(a,b){
            return new Date(a.departure) - new Date(b.departure);
        });
        for (let i = 0; i < rockets.length; i++) {
            const ROCKET = rockets[i];
            if(ROCKET.departLocation === "Mars" && ROCKET.departure >= DATE && earthCount<=10){
                earthFlights += fillTableWithContent(ROCKET);
                earthCount += 1;
            }else if(ROCKET.departLocation === "Earth"&&ROCKET.departure >= DATE && marsCount<=10){
                marsFlights += fillTableWithContent(ROCKET);
                marsCount += 1;
            }

        }
        CONTAINER_EARTH.innerHTML = getTableHeader() + earthFlights;
        CONTAINER_MARS.innerHTML = getTableHeader() + marsFlights;
    });
}

function goToFlightDetail(id) {
    setflightId(id);
    window.location.href = "adminFlightDetails.html";
}
