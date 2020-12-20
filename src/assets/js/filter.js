"use strict";

document.addEventListener("DOMContentLoaded", filterInit);

function filterInit(){
    renderCountryList();
    renderFlightImages();
    document.querySelectorAll(".buttons").forEach(button => {
        button.addEventListener("click", goToOptimizer);
    });
    document.querySelector("#urgency").addEventListener("input", displayUrgency);
}

function renderFlightImages(){
    if (getDestinationPlanet() === "earth"){
        document.querySelector("#mars-to-earth").classList.remove("hidden");
    }else if (getDestinationPlanet() === "mars"){
        document.querySelector("#earth-to-mars").classList.remove("hidden");
        displayMartianAddressForm();
    }
}

function displayMartianAddressForm(){
    document.getElementById("country").setAttribute("disabled",null);
    document.getElementById("country").setAttribute("value","N/A");

    document.getElementById("city").setAttribute("disabled",null);
    document.getElementById("city").setAttribute("value","N/A");

    document.getElementById("colony").removeAttribute("disabled");
    document.getElementById("colony").setAttribute("value","Surface");

    document.getElementById("district").removeAttribute("disabled");
    document.getElementById("district").setAttribute("value","E-56");
}

function displayUrgency(){
    const CONTAINER = document.querySelector("#selectedUrgency");
    const PRICE = document.querySelector("#estimatedPrice");
    const WEIGHT = parseInt(document.querySelector("#mass").value);
    const URGENCY = document.querySelector("#urgency").value;

    if (isNaN(WEIGHT)){
        showPopUp("Error: failed to calculate price. Please enter a valid number for your order's weight");
    }

    let valueAsString;

    if (URGENCY > 660){
        CONTAINER.innerHTML = "Fast: departure within two days";
        PRICE.innerHTML = `Estimated cost: € ${WEIGHT*120}`;
        valueAsString = "fast";
    }else if (URGENCY < 330){
        CONTAINER.innerHTML = "Slow: departure from one week onward. Results past three months are omitted";
        valueAsString = "slow";
        PRICE.innerHTML = `Estimated cost: € ${WEIGHT*95}`;
    }else{
        CONTAINER.innerHTML = "Normal: departure within two to five days";
        valueAsString = "normal";
        PRICE.innerHTML = `Estimated cost: € ${WEIGHT*100}`;
    }

    return valueAsString;

}

function goToOptimizer(e){
    if (e.target.id === "nextStep"){
        document.querySelector(".filterStep1").classList.add("hidden");
        document.querySelector(".filterStep2").classList.remove("hidden");
        addFilterStep1();
    } else if (e.target.id === "previous"){
        document.querySelector(".filterStep1").classList.remove("hidden");
        document.querySelector(".filterStep2").classList.add("hidden");
    } else if (e.target.id === "finalize"){
        addFilterStep2();
    }

}

function addFilterStep1(){
    const WIDTH = parseInt(document.getElementById("width").value);
    const HEIGHT = parseInt(document.getElementById("height").value);
    const DEPTH = parseInt(document.getElementById("depth").value);

    const MASS = parseInt(document.getElementById("mass").value);
    const VOLUME = WIDTH * HEIGHT * DEPTH;

    const FILTERED_OPTIONS = [MASS, VOLUME, WIDTH, HEIGHT, DEPTH];

    setFilterOptions(FILTERED_OPTIONS);
}

function addFilterStep2(){
    const FILTER_OPTIONS = getFilterOptions();

    const PLANET = getDestinationPlanet();
    const COUNTRY = document.getElementById("country").value;
    const CITY = document.getElementById("city").value;
    const STREET = document.getElementById("street").value;
    const NUMBER = document.getElementById("nr").value;
    const URGENCY = displayUrgency();
    const NOT_EMPTY = [URGENCY, PLANET, COUNTRY, CITY, STREET, NUMBER];

    FILTER_OPTIONS.push(...NOT_EMPTY);

    const FILTER_AS_JSON = filterToJson(...FILTER_OPTIONS);

    setFilterOptions(FILTER_AS_JSON);
}

function filterToJson(...filterOptions){
    return {
        "mass": filterOptions[0],
        "volume": filterOptions[1],
        "width": filterOptions[2],
        "height": filterOptions[3],
        "depth": filterOptions[4],
        "urgency" : filterOptions[5],
        "address": {
            "planet": filterOptions[6],
            "countryOrColony": filterOptions[7],
            "cityOrDistrict": filterOptions[8],
            "street": filterOptions[9],
            "number": filterOptions[10]
        }
    };
}


