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
    const rocketId = parseInt(e.target.closest("tr").getAttribute("data-row"));

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
    const formDetails = getFilterOptions();
    const rocketRender = ["5d5bbd72b92c4e1fb57c0588851a4112", "16ff82609f7c49359c7c3f970bfc0524", "d80a780cadd84b2fb7dcd8e0aa1d16be"];
    const randomRocketRender = Math.floor(Math.random() * 3);
    container.innerHTML = `
            <h5>Overview:</h5>
            <div id="addressReceiver">
                <p id="rocket" data-id="${rocket.id}" data-cost="${rocket.pricePerKilo}">Selected: ${rocket.name}. Launch site: Cape Canaveral. Total cost: €${rocket.pricePerKilo*formDetails.mass}</p>
                <div class="sketchfab-embed-wrapper">
                     <iframe title="A 3D model" width="960" height="480" src="https://sketchfab.com/models/${rocketRender[randomRocketRender]}/embed?autospin=0.2&amp;autostart=1&amp;preload=1&amp;ui_controls=1&amp;ui_infos=1&amp;ui_inspector=1&amp;ui_stop=1&amp;ui_theme=dark&amp;ui_watermark=1&amp;ui_watermark_link=1" allow="autoplay; fullscreen; vr"></iframe>
                 </div>
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
