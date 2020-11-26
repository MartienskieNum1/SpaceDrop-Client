"use strict";

onApiUrlLoaded(flightsInit);

function flightsInit(){
    document.querySelector("div#flights").addEventListener("click", openPopUp);
    renderChosenPlanet();
}


function renderChosenPlanet() {
    const CONTAINER = document.querySelector("div#filterFlights div");
    CONTAINER.innerHTML =
        `<img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon">
         <h1>Select flight to ${toTitleCase(getDestinationPlanet())}</h1>`;
    renderRockets();
}

function toTitleCase(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
}


function renderRockets() {
    const CONTAINER = document.querySelector("#flights table");
    renderFlightHead(CONTAINER);

    getRockets().then(function(rockets){
        for (let i = 0; i < rockets.length; i++) {
            let rocket = rockets[i];

            if (rocket.departLocation === toTitleCase(getDestinationPlanet())){
                CONTAINER.innerHTML +=
                    `<tr data-row="${rocket.id}">
                        <td>${rocket.departure}</td>
                        <td>${rocket.arrival}</td>
                        <td>${rocket.availableVolume}</td>
                        <td>${rocket.availableMass}³</td>
                        <td>${rocket.pricePerKg} Euro/kg</td>
                        <td><button>view more</button></td>
                    </tr>`;
            }
        }
    });
}


function renderFlightHead(container){
    container.innerHTML = `<tr id="tableHeaders">
            <th scope="col">Departure:</th>
            <th scope="col">Arrival:</th>
            <th scope="col">Available cargo:</th>
            <th scope="col">Available volume:</th>
            <th scope="col">Price:</th>
            <td></td>
          </tr>`;
}
