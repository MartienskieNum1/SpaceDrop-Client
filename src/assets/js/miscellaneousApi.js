"use strict";

function renderCountryList(){
    const CONTAINER = document.querySelector("#country-list");
    CONTAINER.innerHTML = "";

    fetch("https://restcountries.eu/rest/v2/all?fields=name")
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                CONTAINER.innerHTML += `<option value="${country.name}">${country.name}</option>`;
            });
        });
}

function renderQrCode(string){
    const QR_IMAGE = document.querySelector("#qrCode");
    let url = "https://api.qrserver.com/v1/create-qr-code/?qzone=1&data=" + string;
    QR_IMAGE.src = url.split("\"")[0] + url.split("\"")[1];
}
