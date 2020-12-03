"use strict";

onApiUrlLoaded(flightsInit);

let FLIGHTS_TO_SORT = [];

function flightsInit(){
    getRocketsForDestination();
    renderChosenPlanet();
    // renderOptions();
    document.querySelector("div#flights").addEventListener("click", openPopUp);
    document.querySelector("select#sort").addEventListener("change", sortTargetAscendingOrDescending);
    document.querySelector("select#sortBy").addEventListener("change", sortRocketsBySearchValue);
}

// function renderOptions(){
//     let container = document.querySelector("select#sortBy");
//
//     document.querySelectorAll("table tr#tableHeaders th").forEach(header => {
//         let str = header.innerHTML;
//
//         let value = str.substring(0, str.length - 1).toLowerCase();
//
//         container.innerHTML += `<option value="${value}">${value}</option>`;
//     });
// }

function sortRocketsBySearchValue(e){
    let sortValue = e.target.value;
    let sortedArray;

    sortedArray =
        FLIGHTS_TO_SORT.sort(function (a, b) {
            if (a[sortValue] < b[sortValue]) {
                return -1;
            } else if (a[sortValue] > b[sortValue]) {
                return 1;
            }
            return 0;
        });


    console.log(sortedArray)

    renderRockets(sortedArray);

}

function sortTargetAscendingOrDescending() {
    renderRockets(FLIGHTS_TO_SORT.reverse());
}

function getRocketsForDestination(){

    getRockets().then(function(rockets){
        for (let i = 0; i < rockets.length; i++) {
            let rocket = rockets[i];

            if (rocket.departLocation === toTitleCase(getDestinationPlanet())){
                FLIGHTS_TO_SORT.push(rocket);
            }
        }
        renderRockets(FLIGHTS_TO_SORT);
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
    renderFlightHead(CONTAINER);

    for (let i = 0; i < rockets.length; i++) {
        let rocket = rockets[i];
            CONTAINER.innerHTML +=
                `<tr data-row="${rocket.id}">
                    <td>${rocket.departure}</td>
                    <td>${rocket.arrival}</td>
                    <td>${rocket.availableVolume}³</td>
                    <td>${rocket.availableMass}</td>
                    <td>${rocket.pricePerKilo} Euro/kg</td>
                    <td><button>view more</button></td>
                </tr>`;
        }
}

function renderFlightHead(container){
    container.innerHTML = `<tr id="tableHeaders">
            <th scope="col">Departure:</th>
            <th scope="col">Arrival:</th>
            <th scope="col">Available volume:</th>
            <th scope="col">Available mass:</th>
            <th scope="col">Price:</th>
            <td></td>
          </tr>`;
}
