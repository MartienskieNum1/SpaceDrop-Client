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


function fillRocketPopup(rocket, container) {
    if (container !== undefined){
        renderFormWithUserDetails(rocket, container);
    }

}

function renderFormWithUserDetails(rocket, container) {
    container.innerHTML = `
            <h5>Fill in your order details:</h5>

            <form id="tempOrder" action="#" method="post">
                <label for="rocketId">Rocket ${rocket.id}:</label>
                <input type="text" id="rocketId" value="${rocket.id}" disabled>
                
                <label for="pricePerKilo">Fixed cost: €/kg</label>
                <input type="text" id="pricePerKilo" value="${rocket.pricePerKilo}" disabled>
                
                <label for="mass">Mass:</label>
                <input type="text" id="mass">
                
                <label for="width">Width:</label>
                <input type="text" id="width">
                
                <label for="height">Height:</label>
                <input type="text" id="height">
                
                <label for="depth">Depth:</label>
                <input type="text" id="depth">
                
            </form>
            <br>
            <a href="#" id="submit" class="popUpButtons">Next</a>`;
}


function showConfirmation(e) {
    //TODO
}

function closePopUp(e) {
    e.preventDefault();
    e.target.closest(".popup").classList.add("hidden");
}
