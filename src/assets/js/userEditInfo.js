"use strict";

onApiUrlLoaded(editInfoInit);

function editInfoInit() {
    document.querySelector("#submit").addEventListener("click", editAccount);
    document.querySelector(".close").addEventListener("click", closePopUp);
    changeVisible();
    renderCountryList();
}

function editAccount() {

}
