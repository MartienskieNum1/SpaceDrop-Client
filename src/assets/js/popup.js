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
            <form id="tempOrder" action="#" method="post">
                <label for="rocketId">Rocket ${rocket.id}:</label>
                <input type="number" id="rocketId" value="${rocket.id}" disabled>
                <label for="cost">Fixed cost: €/kg</label>
                <input type="number" id="cost" value="${rocket.pricePerKilo}" disabled>
                
                <label for="country">Country:</label>
                <input id="country" name="country"  required list="country-list" value="${formDetails.address.countryOrColony}"/>
                <datalist id="country-list"></datalist>

                <label for="colony">Colony:</label>
                <input class="wide" type="text" id="colony" name="colony" disabled>

                <label for="city">City:</label>
                <input type="text" id="city" name="city" value="${formDetails.address.cityOrDistrict}">

                <label for="district">District:</label>
                <input type="text" id="district" name="district" disabled>


                <label for="street">Street:</label>
                <input type="text" id="street" name="street" value="${formDetails.address.street}">

                <label for="nr">Nr:</label>
                <input type="text" id="nr" name="nr" value="${formDetails.address.number}">
                
            </form>
            <a href="#" id="submit" class="popUpButtons">Next</a>`;
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
