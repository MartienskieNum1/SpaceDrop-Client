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


