"use strict";


document.addEventListener("DOMContentLoaded", popupInit);


function popupInit() {
    document.querySelector("table").addEventListener("click", openPopUp);
    document.querySelector(".close").addEventListener("click", closePopUp);
}


function openPopUp(e) {
    e.preventDefault();

    if (e.target.tagName.toLowerCase() === "button"){
        document.querySelector("#popup").classList.remove("hidden");
        fillWithForm(e);
    }

    if (e.target.tagName.toLowerCase() === "em"){
        document.querySelector("#popup").classList.remove("hidden");
        showConfirmation(e);
    }
}

function fillWithForm(e) {
    //TODO
}

function showConfirmation(e) {
    //TODO
}

function closePopUp(e) {
    e.preventDefault();
    document.querySelector("#popup").classList.add("hidden");
}
