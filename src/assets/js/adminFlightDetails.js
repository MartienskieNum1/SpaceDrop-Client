"use strict";
const tableHeader = '<tr class="tableHeaders"><th scope="col">Flightname:</th><th scope="col">Flightstatus:</th>' +
    '<th scope="col">Departure:</th><th scope="col">Arrival:</th><th scope="col">Cargo:</th>' +
    '<th scope="col">Volume:</th><td></td></tr>';

onApiUrlLoaded(adminFlightOverviewInit);

function adminFlightOverviewInit() {
    const rockets = getRockets();
    const flightname = getFlightname();
    let rocket =null;
    getRockets().then(function(rockets){
        for (let i = 0; i < rockets.length; i++) {
            let selectedRocket = rockets[i];
            if(selectedRocket.name===flightname){
                rocket = selectedRocket;

            }
        }
        if(rocket!==null){
            showDetails(rocket);
        }
    });



}

function showDetails(rocket) {
    const containerDetails = document.querySelector("#flightsContent");
    console.log(rocket.name);
    containerDetails.innerHTML = tableHeader + `<tr data-row='${rocket.name}'>
                    <td>${rocket.name}</td>
                    <td>STATUS</td>
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${rocket.availableMass}/${rocket.maxMass} kg</td>
                    <td>${rocket.availableVolume}/${rocket.maxVolume} m3</td>
                </tr>`;
}

function getRocketByName(flightname) {
    const rockets = getRockets();
    console.log(rockets);
    console.log(rockets.PromiseResult);
    for (let i = 0; i < rockets.length; i++) {
            let rocket = rockets[i];
            console.log(rocket.name + flightname);
            if(rocket.name===flightname){
                console.log(rocket);
                return rocket;
            }
    }
    return getFlightMock();
}

