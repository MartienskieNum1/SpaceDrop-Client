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
        fillRocketPopup(response, CONTAINER);
    });
}


function fillRocketPopup(rocket, container) {
    if (container !== undefined){
        renderFormWithUserDetails(rocket, container);
    }

}

function renderFormWithUserDetails(rocket, container) {
    let formDetails = getFilterOptions();
    container.innerHTML = `
            <h5>Overview:</h5>
            <div id="addressReceiver">
                <p id="rocket" data-id="${rocket.id}" data-cost="${rocket.pricePerKilo}">You have selected rocket: ${rocket.name} departing from the launch site on Cape Canaveral for a cost of €${rocket.pricePerKilo*formDetails.mass}</p>
                <p><span>Address receiver:</span></p>
                <p>${formDetails.address.street} ${formDetails.address.number}</p>
                <p>${formDetails.address.cityOrDistrict} ${formDetails.address.countryOrColony}</p>
            </div>
            <a href="#" id="submit" class="popUpButtons">Select this rocket</a>`;
}


function showConfirmation(e) {
    //TODO
}

function closePopUp(e) {
    e.preventDefault();
    e.target.closest(".popup").classList.add("hidden");
}

function showPopUp(message){
    const CONTAINER = document.querySelector("#errorScreen h5");
    CONTAINER.innerHTML = message;

    const POPUP = document.querySelector("#errorScreen");
    POPUP.classList.remove("hidden");
}
