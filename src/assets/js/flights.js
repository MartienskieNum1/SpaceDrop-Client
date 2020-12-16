"use strict";

onApiUrlLoaded(flightsInit);

let flightsToSort = [];

function flightsInit(){
    getRocketsForDestination();
    renderChosenPlanet();
    setTimeout(showNextPage,2000);
    document.querySelector("div#flights").addEventListener("click", openPopUp);
    document.querySelector("section#flightForm").addEventListener("click", setOrderInLocalStorage);

}

function showNextPage(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("hiddenDiv").style.display = "flex";
    document.getElementById("optimizing").classList.add("hidden");
}


function getRocketsForDestination(){

    getRockets().then(function(rockets){
        for (let i = 0; i < rockets.length; i++) {
            const ROCKET = rockets[i];

            if (ROCKET.departLocation !== toTitleCase(getDestinationPlanet())){
                flightsToSort.push(ROCKET);
            }
        }
        renderRockets(flightsToSort);
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
        const ROCKET = rockets[i];
        CONTAINER.innerHTML +=
            `<tr data-row="${ROCKET.id}">
                    <td>${ROCKET.departure}</td>
                    <td>${ROCKET.arrival}</td>
                    <td>${ROCKET.availableVolume}³</td>
                    <td>${ROCKET.availableMass}</td>
                    <td data-cost="${ROCKET.pricePerKilo}">${ROCKET.pricePerKilo} Euro/kg</td>
                    <td><button>View details</button></td>
                </tr>`
            ;
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

function setOrderInLocalStorage(e){
    e.preventDefault();

    if (document.querySelector("a#submit") !== null && e.target.id === "submit") {

        const filterData = getFilterOptions();

        const rocketId = parseInt(document.getElementById("rocketId").value);
        const mass = filterData.mass;
        const width = filterData.width;
        const height = filterData.height;
        const depth = filterData.depth;
        const cost = parseInt(document.getElementById("cost").value);
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

