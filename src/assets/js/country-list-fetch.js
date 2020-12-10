"use strict";

function renderCountryList(){
    const CONTAINER = document.querySelector("#country-list");
    CONTAINER.innerHTML = "";

    fetch("https://restcountries.eu/rest/v2/all?fields=name")
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                CONTAINER.innerHTML += `<option value="${country.name}">${country.name}</option>`
            });
        });
}