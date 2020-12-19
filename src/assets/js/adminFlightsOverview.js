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
    const containerEarth = document.querySelector("#flightsToEarthContent");
    const containerMars = document.querySelector("#flightsToMarsContent");
    let earthFlights = "";
    let marsFlights = "";

    const today = new Date();
    const date = today.getFullYear()+35+'-'+(today.getMonth()+1)+'-'+today.getDate();//added 30 years because we are in 2055/2056
    let earthCount=1;
    let marsCount=1;
    getRockets().then(rockets => {
        rockets.sort(function(a,b){
            return new Date(a.departure) - new Date(b.departure);
        });
        for (let i = 0; i < rockets.length; i++) {
            const ROCKET = rockets[i];
            console.log(ROCKET.departure);
            if(ROCKET.departLocation === "Mars" && ROCKET.departure >= date && earthCount<=10){
                earthFlights += fillTableWithContent(ROCKET);
                earthCount += 1;
                console.log(earthCount);
            }else if(ROCKET.departLocation === "Earth"&&ROCKET.departure >= date && marsCount<=10){
                marsFlights += fillTableWithContent(ROCKET);
                marsCount += 1;
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
