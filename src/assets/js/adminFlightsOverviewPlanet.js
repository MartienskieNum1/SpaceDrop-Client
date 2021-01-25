"use strict";
onApiUrlLoaded(adminFlightOverviewPlanetInit);

const FLIGHTS_TO_SORT = [];
let SORTED_FLIGHTS = [];

function adminFlightOverviewPlanetInit() {
    const PLANET = getDestinationPlanet();
    if(PLANET!=="Mars"&&PLANET!=="Earth"){
        window.location.href = "adminFlightsOverview.html";
    }else{
        showTitle(PLANET);
        showOverview();
        document.querySelector("select#sort").addEventListener("change", sortTargetAscendingOrDescending);
        document.querySelector("select#sortBy").addEventListener("change", sortRocketsBySearchValue);
        document.querySelector("form").addEventListener("keyup", sortFlightsByWeightOrVolume);
        document.querySelector("#AccountLogoutButton").addEventListener("click", logout);
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
                FLIGHTS_TO_SORT.push(ROCKET);
            }
        }
        renderRockets(FLIGHTS_TO_SORT);
    });
}

function renderRockets(rockets) {
    const CONTAINER = document.querySelector("#flights table tbody");
    renderFlightHead(CONTAINER);
    const TODAY = new Date();
    const DATE = TODAY.getFullYear()+35+'-'+(TODAY.getMonth()+1)+'-'+TODAY.getDate();//added 30 years because we are in 2055/2056

    for (let i = 0; i < rockets.length; i++) {
        const ROCKET = rockets[i];
        if(Date.parse(ROCKET.arrival) < Date.parse(DATE)){
            CONTAINER.innerHTML +=
                `<tr data-row="${ROCKET.id}">
                    <td class="green"><strong>${ROCKET.name}</strong></td>
                    <td class="green"><strong>${ROCKET.departure}</strong></td>
                    <td class="green"><strong>${ROCKET.arrival}</strong></td>
                    <td class="green"><strong>${ROCKET.availableVolume}³</strong></td>
                    <td class="green"><strong>${ROCKET.availableMass}</strong></td>
                    <td class="green"><strong>${ROCKET.pricePerKilo} Euro/kg</strong></td>
                    <td><button onclick="goToFlightDetail('${ROCKET.id}')">view more</button></td>
                </tr>`;
        }else if(Date.parse(ROCKET.arrival) > Date.parse(DATE) && Date.parse(ROCKET.departure) < Date.parse(DATE)){
            CONTAINER.innerHTML +=
            `<tr data-row="${ROCKET.id}">
                    <td class="blue"><strong>${ROCKET.name}</strong></td>
                    <td class="blue"><strong>${ROCKET.departure}</strong></td>
                    <td class="blue"><strong>${ROCKET.arrival}</strong></td>
                    <td class="blue"><strong>${ROCKET.availableVolume}³</strong></td>
                    <td class="blue"><strong>${ROCKET.availableMass}</strong></td>
                    <td class="blue"><strong>${ROCKET.pricePerKilo} Euro/kg</strong></td>
                    <td><button onclick="goToFlightDetail('${ROCKET.id}')">view more</button></td>
                </tr>`;
        }
        else{
            CONTAINER.innerHTML +=
                `<tr data-row="${ROCKET.id}">
                    <td>${ROCKET.name}</td>
                    <td>${ROCKET.departure}</td>
                    <td>${ROCKET.arrival}</td>
                    <td>${ROCKET.availableVolume}³</td>
                    <td>${ROCKET.availableMass}</td>
                    <td>${ROCKET.pricePerKilo} Euro/kg</td>
                    <td><button onclick="goToFlightDetail('${ROCKET.id}')">view more</button></td>
                </tr>`;
        }
    }
}

function renderFlightHead(container){
    container.innerHTML = `<tr id="tableHeaders">
<th scope="col">name:</th>
            <th scope="col">Departure:</th>
            <th scope="col">Arrival:</th>
            <th scope="col">Available volume:</th>
            <th scope="col">Available mass:</th>
            <th scope="col">Price:</th>
            <td></td>
          </tr>`;
}



function showTitle(planet) {
    const CONTAINER = document.querySelector("#title");
    CONTAINER.innerHTML = `<img src="assets/images/icons/${planet.toLowerCase()}.png" alt="planet icon"><h1>Flights to ${planet}</h1>`;

}

function goToFlightDetail(id) {
    setflightId(id);
    window.location.href = "adminFlightDetails.html";
}

function sortFlightsByWeightOrVolume(){
    const SELECTED_WEIGHT = document.querySelector("#weight").value;
    const SELECTED_VOLUME = document.querySelector("#volume").value;
    SORTED_FLIGHTS = [];

    FLIGHTS_TO_SORT.forEach((flight) => {
        if (flight.availableMass >= SELECTED_WEIGHT && flight.availableVolume >= SELECTED_VOLUME){
            SORTED_FLIGHTS.push(flight);
        }
    });

    selectDefaultSorting("sort",  "Asc");
    renderRockets(SORTED_FLIGHTS);
}

function sortRocketsBySearchValue(e){
    const SORT_VALUE = e.target.value;

    let flightsToUse = SORTED_FLIGHTS;

    if(SORTED_FLIGHTS.length === 0){
        flightsToUse = FLIGHTS_TO_SORT;
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

    let flightsToUse = SORTED_FLIGHTS;

    if(SORTED_FLIGHTS.length === 0){
        flightsToUse = FLIGHTS_TO_SORT;
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

