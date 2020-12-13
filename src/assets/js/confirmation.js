"use strict";

onApiUrlLoaded(confirmationInit);


function confirmationInit() {
    const ORDER = getFinalOrder();

    renderConfirmationMessage(ORDER);
    renderOrderConfirmation(ORDER);
}

function renderOrderConfirmation(ORDER) { //TODO: remove code duplication

    const totalCost = ORDER.cost * parseInt(ORDER.mass);
    const CONTAINER = document.querySelector('tr[data-order="1"]');

    getRocketById(parseInt(ORDER.rocketId)).then(rocket => {
        CONTAINER.innerHTML =
            `   <td><img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon"></td>
            <td>${rocket.departure}</td>
            <td>${rocket.arrival}</td>
            <td>${ORDER.mass} kg</td>
            <td>${ORDER.height} m</td>
            <td>${ORDER.width} m</td>
            <td>${ORDER.depth} m</td>
            <td>€ ${totalCost}</td>`;
    });
}

function renderConfirmationMessage(ORDER){
    const CONTAINER = document.querySelector("main p");

    getUser().then(user => {
        let email = user.email;

        getOrderById(ORDER.orderId).then(response => {
            CONTAINER.outerHTML = `<p>A confirmation mail containing the tracking ID of your order no. ${response.orderId}
                                   has been sent to: ${email} </p>`
        });
    });
}
