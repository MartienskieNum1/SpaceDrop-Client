"use strict";

document.addEventListener("DOMContentLoaded", filterInit);

function filterInit(){
    renderCountryList();
    document.querySelectorAll(".buttons").forEach(button => {
        button.addEventListener("click", goToOptimizer);
    });
    document.querySelector("#urgency").addEventListener("change", displayUrgency)
}

function displayUrgency(){
    const CONTAINER = document.querySelector("#selectedUrgency");
    const VALUE = document.querySelector("#urgency").value;

    let valueAsString = "";

    if (VALUE > 660){
        CONTAINER.innerHTML = "Fast: departure within two days";
        valueAsString = "fast";
    }else if (VALUE < 330){
        CONTAINER.innerHTML = "Slow: departure from one week onward. Results past three months are omitted";
        valueAsString = "slow";
    }else{
        CONTAINER.innerHTML = "Normal: departure within two to five days";
        valueAsString = "normal";
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
    const width = parseInt(document.getElementById("width").value);
    const height = parseInt(document.getElementById("height").value);
    const depth = parseInt(document.getElementById("depth").value);

    const mass = parseInt(document.getElementById("mass").value);
    const volume = width * height * depth;

    let filterOptions = [mass, volume, width, height, depth];

    setFilterOptions(filterOptions);
}

function addFilterStep2(){
    let filterOptions = getFilterOptions();
    console.log("HEY")

    const planet = getDestinationPlanet();
    const country = document.getElementById("country").value;
    // const colony = document.getElementById("colony").value;
    const city = document.getElementById("city").value;
    // const district = document.getElementById("district").value;
    const street = document.getElementById("street").value;
    const number = document.getElementById("nr").value;
    // const urgency = document.getElementById("urgency").value;
    const urgency = displayUrgency();
    let notEmpty = [urgency, planet, country, city, street, number];

    filterOptions.push(...notEmpty);

    let filterAsJson = filterToJson(...filterOptions);

    setFilterOptions(filterAsJson);
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

    }
}


