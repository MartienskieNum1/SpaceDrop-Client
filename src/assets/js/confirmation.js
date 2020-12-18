"use strict";

onApiUrlLoaded(confirmationInit);


function confirmationInit() {
    const ORDER = getFinalOrder();
    const TRACKING_URL = "https://project-ii.ti.howest.be/mars-03/uuidOrderTracking.html?uuid=" + ORDER.uuid;
    setTimeout(showNextPage,2000);
    renderConfirmationMessage(ORDER);
    renderOrderConfirmation(ORDER);
    renderQrCode(JSON.stringify(TRACKING_URL));
}

function showNextPage(){
    document.getElementById("loader").style.display = "none";
    document.querySelector("div.animate-bottom").classList.remove("hidden");
    document.querySelector("footer.animate-bottom").classList.remove("hidden");
}

function renderOrderConfirmation(ORDER) {

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
    const USER_NOT_LOGGED_IN = getPaymentCredentials();

    if (getToken() === ""){
        getOrderById(ORDER.orderId).then(response => {
            CONTAINER.outerHTML = `<p>Payment successful, ${USER_NOT_LOGGED_IN.name} ! A confirmation mail containing the tracking ID of your order no. ${response.orderId} has been sent to ${USER_NOT_LOGGED_IN.email} </p>`;
        });

        setPaymentCredentials(null);

    }else {
        getUser().then(user => {
            const EMAIL = user.email;

            getOrderById(ORDER.orderId).then(response => {
                CONTAINER.outerHTML = `<p>Payment successful, ${user.firstName} ! A confirmation mail containing the tracking ID of your order no. ${response.orderId} has been sent to: ${EMAIL} </p>`;
            });
        });
    }
}
