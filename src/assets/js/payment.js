"use strict";

onApiUrlLoaded(paymentInit);

function paymentInit() {
    renderOrder();
    document.querySelector("#paymentMethods").addEventListener("click", renderChosenPaymentMethod);
    document.querySelector(".paymentScreen").addEventListener("click", createOrder);
}

function renderOrder() {

    const tempOrder = getTempOrder();
    const totalCost = tempOrder.cost * parseInt(tempOrder.mass);
    const CONTAINER = document.querySelector('tr[data-order="1"]');

    getRocketById(parseInt(tempOrder.rocketId)).then(rocket => {
        CONTAINER.innerHTML =
            `   <td><img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon"></td>
            <td>${rocket.departure}</td>
            <td>${rocket.arrival}</td>
            <td>${tempOrder.mass} kg</td>
            <td>${tempOrder.height} m</td>
            <td>${tempOrder.width} m</td>
            <td>${tempOrder.depth} m</td>
            <td>€ ${totalCost}</td>
            <td><a id="removeOrder" href="flights.html"><em class="fa fa-trash"></em></a></td>`;
    });
}

function createOrder(e){

    if (e.target.id === "createOrder"){
        let tempOrder = getTempOrder();
        addOrder(tempOrder).then(r => console.log(r.orderId));
        window.location.href = "confirmation.html";
    }

}

function renderChosenPaymentMethod(e){
    if (e.target.tagName === "P"){
        const PAYMENT_METHOD = e.target.closest("div").getAttribute("id");
        handlePaymentPopup(PAYMENT_METHOD);
    }
}

function handlePaymentPopup(paymentMethod){
    const HEADER = document.querySelector("#chosenPayment h5");
    const BODY = document.querySelector("#chosenPayment p");

    document.querySelector("#chosenPayment").classList.remove("hidden");

    HEADER.innerHTML = `${paymentMethod} payment service provider`;
    BODY.innerHTML = `By clicking continue, you confirm that your order details are correct.`;
}
