"use strict";

onApiUrlLoaded(confirmationInit);


function confirmationInit() {
    const ORDER = getFinalOrder();
    const TRACKING_URL = "https://project-ii.ti.howest.be/mars-03/?uuid=" + ORDER.uuid;

    renderConfirmationMessage(ORDER);
    renderOrderConfirmation(ORDER);
    renderQrCode(JSON.stringify(TRACKING_URL));
}

function renderOrderConfirmation(ORDER) { //TODO: remove code duplication

    const TOTAL_COST = ORDER.cost * parseInt(ORDER.mass);
    const CONTAINER = document.querySelector('tr[data-order="1"]');

    getRocketById(parseInt(ORDER.rocketId)).then(rocket => {
        CONTAINER.innerHTML =
            `   <td><img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon"></td>
            <td>${rocket.departure}</td>
            <td>${rocket.arrival}</td>
            <td>${ORDER.mass} kg</td>
            <td>${ORDER.height} cm</td>
            <td>${ORDER.width} cm</td>
            <td>${ORDER.depth} cm</td>
            <td>€ ${TOTAL_COST}</td>`;
    });
}

function renderConfirmationMessage(ORDER){
    const CONTAINER = document.querySelector("main p");

    if (getToken() === ""){
        getOrderById(ORDER.orderId).then(response => {
            console.log(response)
            CONTAINER.outerHTML = `<p>A confirmation mail containing the tracking ID of your order no. ${response.orderId}
                                   has been sent to your email </p>`
        });

    }else {
        getUser().then(user => {
            const EMAIL = user.email;

            getOrderById(ORDER.orderId).then(response => {
                CONTAINER.outerHTML = `<p>A confirmation mail containing the tracking ID of your order no. ${response.orderId}
                               has been sent to: ${EMAIL} </p>`
            });
        });
    }
}
