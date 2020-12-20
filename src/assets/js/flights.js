"use strict";

onApiUrlLoaded(flightsInit);
let flightsToSort = [];

function flightsInit(){
    getRocketsForDestination();
    renderChosenPlanet();
    setTimeout(showOptimizedFlights,2000);
    document.querySelector("div#flights").addEventListener("click", openPopUp);
    document.querySelector("section#flightForm").addEventListener("click", setOrderInLocalStorage);
    document.querySelector("table").addEventListener("click", getTableColumn);
}

function showOptimizedFlights(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("hiddenDiv").style.display = "flex";
    document.getElementById("optimizing").classList.add("hidden");
}

function getTableColumn(e){
    if (e.target.classList.contains("sortable")){
        markSortedColumn(e.target);
        sortTable(e.target.getAttribute("data-col"));
    }
}

function markSortedColumn(header){
    document.querySelectorAll("#tableHeaders th").forEach(tableHeader => {
        if(tableHeader === header){
            header.style = "color: #65C55E";
        }else {
            tableHeader.style = "color: white";
        }
    });
}

function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
    table = document.querySelector("div#flights table");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) { //compare row 1 and 2 (4th column of every table row
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) { //insert the row with value greater than or lower above the next row
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchCount ++;
        } else {
            if (switchCount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


function getRocketsForDestination(){
    const FILTER = getFilterOptions();
    let rocketsForDestination = [];

    getRocketsByFilter(FILTER.mass, FILTER.volume, FILTER.urgency).then(rockets => {

        for (let i = 0; i < rockets.length; i++) {
            const ROCKET = rockets[i];

            if (ROCKET.departLocation !== toTitleCase(getDestinationPlanet())){
                rocketsForDestination.push(ROCKET);
            }
        }
        flightsToSort = rocketsForDestination;
        renderRockets(rocketsForDestination);
    });
}

function renderChosenPlanet() {
    const CONTAINER = document.querySelector("div#filterFlights div");
    CONTAINER.innerHTML =
        `<img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon">
         <h1>Select flight to ${toTitleCase(getDestinationPlanet())}</h1>`;
}

function toTitleCase(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}


function renderRockets(rockets) {
    const CONTAINER = document.querySelector("#flights table tbody");
    const FILTER_DATA = getFilterOptions();
    renderFlightHead(CONTAINER);

    for (let i = 0; i < rockets.length; i++) {
        const ROCKET = rockets[i];
        CONTAINER.innerHTML +=
            `<tr data-row="${ROCKET.id}">
                    <td>${ROCKET.departure}</td>
                    <td>${ROCKET.arrival}</td>
                    <td>${ROCKET.availableVolume} m³</td>
                    <td>${ROCKET.availableMass} kg</td>
                    <td data-urgency="${getDateDifference(ROCKET.departure, ROCKET.arrival)}">${getDateDifference(ROCKET.departure, ROCKET.arrival)} days</td>
                    <td data-cost="${ROCKET.pricePerKilo}">€ ${ROCKET.pricePerKilo * FILTER_DATA.mass}</td>
                    <td><button>View details</button></td>
                </tr>`;
    }
}

function getDateDifference(departure, arrival){
    const END = new Date(arrival);
    const START = new Date(departure);

    return Math.floor((Date.UTC(END.getFullYear(), END.getMonth(), END.getDate()) - Date.UTC(START.getFullYear(), START.getMonth(), START.getDate()) ) /(1000 * 60 * 60 * 24));
}

function renderFlightHead(container){
    container.innerHTML = `<tr id="tableHeaders">
            <th scope="col" class="sortable" data-col="0">Departure: <i class="fa fa-sort" aria-hidden="true"></i></th>
            <th scope="col" class="sortable" data-col="1">Arrival: <i class="fa fa-sort" aria-hidden="true"></i></th>
            <th scope="col"  data-col="2">Available volume:</th>
            <th scope="col"  data-col="3">Available mass:</th>
            <th scope="col" class="sortable" data-col="4">Days in transit: <i class="fa fa-sort" aria-hidden="true"></i></th>
            <th scope="col" class="sortable" data-col="5">Your price: <i class="fa fa-sort" aria-hidden="true"></i></th>
            <td></td>
          </tr>`;
}

function setOrderInLocalStorage(e){
    e.preventDefault();

    if (document.querySelector("a#submit") !== null && e.target.id === "submit") {

        const FILTER_DATA = getFilterOptions();

        const ROCKET_ID = parseInt(document.querySelector("#rocket").getAttribute("data-id"));
        const MASS = FILTER_DATA.mass;
        const WIDTH = FILTER_DATA.width;
        const HEIGHT = FILTER_DATA.height;
        const DEPTH = FILTER_DATA.depth;
        const COST = parseInt(document.querySelector("#rocket").getAttribute("data-cost"));
        const PLANET = FILTER_DATA.address.planet;
        const COUNTRY_OR_COLONY = FILTER_DATA.address.countryOrColony;
        const CITY_OR_DISTRICT = FILTER_DATA.address.cityOrDistrict;
        const STREET = FILTER_DATA.address.street;
        const NUMBER = parseInt(FILTER_DATA.address.number);

        const PARAMETER_LIST = [ROCKET_ID, 1, MASS, WIDTH, HEIGHT, DEPTH, COST, PLANET, COUNTRY_OR_COLONY, CITY_OR_DISTRICT, STREET, NUMBER];

        if (hasNoEmptyField(...PARAMETER_LIST)) {
            setTempOrder(orderToJson(...PARAMETER_LIST));
            window.location.href = "payment.html";
        } else {
            showPopUp("Please fill in all the fields");
        }
    }

}

function hasNoEmptyField(...parameterList){
    return !parameterList.includes("") || parameterList.includes(" ");
}

