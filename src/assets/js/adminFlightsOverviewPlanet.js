"use strict";
onApiUrlLoaded(adminFlightOverviewPlanetInit);

const flightsToSort = [];
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
            rockets.sort(function(a,b){
                return new Date(a.departure) - new Date(b.departure);
            });
            const ROCKET = rockets[i];
            if (ROCKET.departLocation !== toTitleCase(getDestinationPlanet())){
                flightsToSort.push(ROCKET);
            }
        }
        renderRockets(flightsToSort);
    });
}

function renderRockets(rockets) {
    const CONTAINER = document.querySelector("#flights table tbody");
    renderFlightHead(CONTAINER);
    var today = new Date();
    var date = today.getFullYear()+35+'-'+(today.getMonth()+1)+'-'+today.getDate();//added 30 years because we are in 2055/2056

    for (let i = 0; i < rockets.length; i++) {
        const ROCKET = rockets[i];
        if(ROCKET.arrival < date){
            CONTAINER.innerHTML +=
                `<tr data-row="${ROCKET.id}">
                    <td class="green"><strong>${ROCKET.name}</strong></td>
                    <td class="green"><strong>${ROCKET.statusId}</strong></td>
                    <td class="green"><strong>${ROCKET.departure}</strong></td>
                    <td class="green"><strong>${ROCKET.arrival}</strong></td>
                    <td class="green"><strong>${ROCKET.availableVolume}³</strong></td>
                    <td class="green"><strong>${ROCKET.availableMass}</strong></td>
                    <td class="green"><strong>${ROCKET.pricePerKilo} Euro/kg</strong></td>
                    <td><button onclick="goToFlightDetail('${ROCKET.id}')">view more</button></td>
                </tr>`
            ;
        }else if(ROCKET.arrival > date && ROCKET.departure < date){
            CONTAINER.innerHTML +=
            `<tr data-row="${ROCKET.id}">
                    <td class="blue"><strong>${ROCKET.name}</strong></td>
                    <td class="blue"><strong>${ROCKET.statusId}</strong></td>
                    <td class="blue"><strong>${ROCKET.departure}</strong></td>
                    <td class="blue"><strong>${ROCKET.arrival}</strong></td>
                    <td class="blue"><strong>${ROCKET.availableVolume}³</strong></td>
                    <td class="blue"><strong>${ROCKET.availableMass}</strong></td>
                    <td class="blue"><strong>${ROCKET.pricePerKilo} Euro/kg</strong></td>
                    <td><button onclick="goToFlightDetail('${ROCKET.id}')">view more</button></td>
                </tr>`
        }
        else{
            console.log("bbb");
            CONTAINER.innerHTML +=
                `<tr data-row="${ROCKET.id}">
                    <td>${ROCKET.name}</td>
                    <td>${ROCKET.statusId}</td>
                    <td>${ROCKET.departure}</td>
                    <td>${ROCKET.arrival}</td>
                    <td>${ROCKET.availableVolume}³</td>
                    <td>${ROCKET.availableMass}</td>
                    <td>${ROCKET.pricePerKilo} Euro/kg</td>
                    <td><button onclick="goToFlightDetail('${ROCKET.id}')">view more</button></td>
                </tr>`
            ;
        }
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

