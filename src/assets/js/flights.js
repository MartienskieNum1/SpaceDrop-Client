"use strict";

onApiUrlLoaded(flightsInit);

function flightsInit(){
    getRocketsForDestination();
    renderChosenPlanet();
    setTimeout(showOptimizedFlights,2000);
    document.querySelector("div#flights").addEventListener("click", openPopUp);
    document.querySelector("section#flightForm").addEventListener("click", setOrderInLocalStorage);

}

function showOptimizedFlights(){
    document.getElementById("loader").style.display = "none";
    document.getElementById("hiddenDiv").style.display = "flex";
    document.getElementById("optimizing").classList.add("hidden");
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
                    <td data-cost="${ROCKET.pricePerKilo}">€ ${ROCKET.pricePerKilo * filterData.mass}</td>
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
            <th scope="col">Your price:</th>
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

