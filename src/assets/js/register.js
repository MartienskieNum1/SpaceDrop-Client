"use strict";

onApiUrlLoaded(registerInit);

function registerInit() {
    document.querySelector("#submit").addEventListener("click", makeAccount);
    document.querySelector(".close").addEventListener("click", closePopUp);
    changeVisible();
    renderCountryList();
}

function makeAccount() {
    const addEdit = "add";
    addOrEdit(addEdit);
}


function showPopUp(message){
    const CONTAINER = document.querySelector("#errorScreen h5");
    CONTAINER.innerHTML = message;

    const POPUP = document.querySelector("#errorScreen");
    POPUP.classList.remove("hidden");
}
