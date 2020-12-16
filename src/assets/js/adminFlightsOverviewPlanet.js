"use strict";
onApiUrlLoaded(adminFlightOverviewPlanetInit);

let flightsToSort = [];
let sortedFlights = [];

function adminFlightOverviewPlanetInit() {
    const planet = getDestinationPlanet();
    if(planet!=="Mars"&&planet!=="Earth"){
        window.location.href = "adminFlightsOverview.html";
    }else{
        showTitle(planet);
        showOverview();
        document.querySelector("select#sort").addEventListener("change", sortTargetAscendingOrDescending);
        document.querySelector("select#sortBy").addEventListener("change", sortRocketsBySearchValue);
        document.querySelector("form").addEventListener("keyup", sortFlightsByWeightOrVolume);
    }
}

function showOverview(){
    getRockets().then(function(rockets){
        for (let i = 0; i < rockets.length; i++) {
            const ROCKET = rockets[i];
            if (ROCKET.departLocation === toTitleCase(getDestinationPlanet())){
                flightsToSort.push(ROCKET);
            }
        }
        renderRockets(flightsToSort);
    });
}

function renderRockets(rockets) {
    const CONTAINER = document.querySelector("#flights table tbody");
    renderFlightHead(CONTAINER);

    for (let i = 0; i < rockets.length; i++) {
        const ROCKET = rockets[i];
        CONTAINER.innerHTML +=
            `<tr data-row="${ROCKET.id}">
                    <td>${ROCKET.name}</td>
                    <td>${ROCKET.statusId}</td>
                    <td>${ROCKET.departure}</td>
                    <td>${ROCKET.arrival}</td>
                    <td>${ROCKET.availableVolume}³</td>
                    <td>${ROCKET.availableMass}</td>
                    <td>${ROCKET.pricePerKilo} Euro/kg</td>
                    <td><button>view more</button></td>
                </tr>`
        ;
    }
}

function renderFlightHead(container){
    container.innerHTML = `<tr id="tableHeaders">
<th scope="col">name:</th>
<th scope="col">status:</th>
            <th scope="col">Departure:</th>
            <th scope="col">Arrival:</th>
            <th scope="col">Available volume:</th>
            <th scope="col">Available mass:</th>
            <th scope="col">Price:</th>
            <td></td>
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

function sortFlightsByWeightOrVolume(){
    const SELECTED_WEIGHT = document.querySelector("#weight").value;
    const SELECTED_VOLUME = document.querySelector("#volume").value;
    sortedFlights = [];

    flightsToSort.forEach((flight) => {
        if (flight.availableMass >= SELECTED_WEIGHT && flight.availableVolume >= SELECTED_VOLUME){
            sortedFlights.push(flight);
        }
    });

    selectDefaultSorting("sort",  "Asc");
    renderRockets(sortedFlights);
}

function sortRocketsBySearchValue(e){
    const SORT_VALUE = e.target.value;

    let flightsToUse = sortedFlights;

    if(sortedFlights.length === 0){
        flightsToUse = flightsToSort;
    }

    flightsToUse.sort(function (a, b) {
        if (a[SORT_VALUE] < b[SORT_VALUE]) {
            return -1;
        } else if (a[SORT_VALUE] > b[SORT_VALUE]) {
            return 1;
        }
        return 0;
    });
    renderRockets(flightsToUse);
}

function sortTargetAscendingOrDescending() {

    let flightsToUse = sortedFlights;

    if(sortedFlights.length === 0){
        flightsToUse = flightsToSort;
    }

    renderRockets(flightsToUse.reverse());
}

function selectDefaultSorting(id, valueToSelect) {
    const ELEMENT_CONTAINER = document.getElementById(id);
    ELEMENT_CONTAINER.value = valueToSelect;
}

function toTitleCase(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}

