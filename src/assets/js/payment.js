"use strict";

document.addEventListener("DOMContentLoaded", paymentInit)

function paymentInit() {
    renderChosenPlanet();
}

function renderChosenPlanet() {
    const CONTAINER = document.querySelector('tr[data-order="1"] td img');

    CONTAINER.outerHTML =
        `<img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon">`;
}