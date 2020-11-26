"use strict";

onApiUrlLoaded(paymentInit);

function paymentInit() {
    renderChosenPlanet();
    document.querySelector("#paymentMethods").addEventListener("click", renderChosenPaymentMethod);
}

function renderChosenPlanet() {
    const CONTAINER = document.querySelector('tr[data-order="1"] td img');

    CONTAINER.outerHTML =
        `<img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon">`;
}

function renderChosenPaymentMethod(e){
    if (e.target.tagName === "P"){
        const METHOD = e.target.closest("div").getAttribute("id");
        handlePaymentPopup(METHOD);
    }
}

function handlePaymentPopup(method){
    const CONTAINER = document.querySelector("#chosenPayment h5");
    document.querySelector("#chosenPayment").classList.remove("hidden");
    CONTAINER.innerHTML = `${method} payment service provider`;
}
