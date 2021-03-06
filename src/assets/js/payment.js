"use strict";

onApiUrlLoaded(paymentInit);

function paymentInit() {
    renderOrder();
    document.querySelector("#paymentMethods").addEventListener("click", renderChosenPaymentMethod);
    document.querySelector(".paymentScreen").addEventListener("click", createOrder);
}

function renderOrder() {

    const TEMP_ORDER = getTempOrder();
    const TOTAL_COST = TEMP_ORDER.cost * parseInt(TEMP_ORDER.mass);
    const CONTAINER = document.querySelector('tr[data-order="1"]');

    getRocketById(parseInt(TEMP_ORDER.rocketId)).then(rocket => {
        CONTAINER.innerHTML =
            `   <td><img src="assets/images/icons/${getDestinationPlanet()}.png" alt="planet icon"></td>
            <td>${rocket.departure}</td>
            <td>${rocket.arrival}</td>
            <td>${TEMP_ORDER.mass} kg</td>
            <td>${TEMP_ORDER.height} m</td>
            <td>${TEMP_ORDER.width} m</td>
            <td>${TEMP_ORDER.depth} m</td>
            <td>€ ${TOTAL_COST}</td>
            <td><a id="removeOrder" href="flights.html"><em class="fa fa-trash"></em></a></td>`;
    });
}

function createOrder(e){
    if (e.target.id === "createOrder"){
        const TEMP_ORDER = getTempOrder();
        addOrder(TEMP_ORDER).then(finalOrder => {
            setFinalOrder(finalOrder);
        }).then(() => {
            saveGuestCredentials();
            window.location.href = "confirmation.html";
        });
    }
}

function saveGuestCredentials(){
    const NAME = document.getElementById("name").value;
    const EMAIL = document.getElementById("email").value;

    if (getToken() === ""){
        setPaymentCredentials({
            "name": NAME,
            "email": EMAIL
        });
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
    const FORM = document.querySelector("#chosenPayment form");

    document.querySelector("#chosenPayment").classList.remove("hidden");

    HEADER.innerHTML = `${paymentMethod} payment service provider`;

    if (getToken() !== ""){
        getUser().then(user => {
            FORM.innerHTML = `
            <form action="#">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" value="${user.firstName}${user.lastName}" disabled>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="${user.email}" disabled>
            </form>`;
        });
    }
}
