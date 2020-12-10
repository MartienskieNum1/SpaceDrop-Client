"use strict";

onApiUrlLoaded(popupInit);

function popupInit() {
    document.querySelector("div").addEventListener("click", openPopUp);
    document.querySelectorAll(".close").forEach(closeButton => {
        closeButton.addEventListener("click", closePopUp);
    });
}


function openPopUp(e) {
    e.preventDefault();
    if (e.target.tagName.toLowerCase() === "button"){
        document.querySelector(".popup").classList.remove("hidden");
        fillWithForm(e);
    }

    if (e.target.tagName.toLowerCase() === "em"){
        document.querySelector(".popup").classList.remove("hidden");
        showConfirmation(e);
    }

    if (e.target.getAttribute("id") === "submit"){
        document.querySelector(".popup").classList.remove("hidden");
        showConfirmation(e);
    }
}

function fillWithForm(e) {
    const CONTAINER = document.querySelector("div.contentwrapper");
    let rocketId = parseInt(e.target.closest("tr").getAttribute("data-row"));

    getRocketById(rocketId).then(response => {
        fillRocketPopup(response, CONTAINER)
    });
}

// yes yes code duplication I know
function fillRocketPopup(rocket, container) {
    if (container !== undefined){
        container.innerHTML = `
            <h5>Fill in your order details:</h5>
            <tr data-row="${rocket.id}">
                <td>${rocket.departure}</td>
                <td>${rocket.arrival}</td>
                <td>${rocket.availableVolume}³</td>
                <td>${rocket.availableMass}</td>
                <td>${rocket.pricePerKilo} Euro/kg</td>
            </tr>`;
    }

}


function showConfirmation(e) {
    //TODO
}

function closePopUp(e) {
    e.preventDefault();
    e.target.closest(".popup").classList.add("hidden");
}
