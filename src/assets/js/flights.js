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
    const filter = getFilterOptions();
    let rocketsForDestination = [];

    getRocketsByFilter(filter.mass, filter.volume, filter.urgency).then(rockets => {

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
    const filterData = getFilterOptions();
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
                    <td data-cost="${ROCKET.pricePerKilo}">€ ${ROCKET.pricePerKilo * filterData.mass}</td>
                    <td><button>View details</button></td>
                </tr>`
            ;
    }
}

function getDateDifference(departure, arrival){
    const end = new Date(arrival);
    const start = new Date(departure);

    return Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) ) /(1000 * 60 * 60 * 24));
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

        const filterData = getFilterOptions();

        const rocketId = parseInt(document.querySelector("#rocket").getAttribute("data-id"));
        const mass = filterData.mass;
        const width = filterData.width;
        const height = filterData.height;
        const depth = filterData.depth;
        const cost = parseInt(document.querySelector("#rocket").getAttribute("data-cost"));
        const planet = filterData.address.planet;
        const countryOrColony = filterData.address.countryOrColony;
        const cityOrDistrict = filterData.address.cityOrDistrict;
        const street = filterData.address.street;
        const number = parseInt(filterData.address.number);

        const parameterList = [rocketId, 1, mass, width, height, depth, cost, planet, countryOrColony, cityOrDistrict, street, number];

        if (hasNoEmptyField(...parameterList)) {
            setTempOrder(orderToJson(...parameterList));
            window.location.href = "payment.html";
        } else {
            showPopUp("Please fill in all the fields");
        }
    }

}

function hasNoEmptyField(...parameterList){
    return !parameterList.includes("") || parameterList.includes(" ");
}

