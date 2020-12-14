"use strict";

onApiUrlLoaded(loginInit);

function loginInit() {
    document.querySelector("#submit").addEventListener("submit", preventFormSubmit);
    document.querySelector("#submit").addEventListener("click", login);
    document.querySelector("#reg").addEventListener("click", goToReg);
    document.querySelector("#user").addEventListener("click", logInMockUser);
}

function preventFormSubmit(e){
    e.preventDefault();
}

function login(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        showPopUp("Please fill in all fields");
    }else{
        loginNormalUser(email, password);
    }
}

function logInMockUser(e){
    e.preventDefault();
    if (e.target.id === "user"){
        const email = "user@space.drop";
        const password = "mock";

        loginNormalUser(email, password);
    }
}

function loginNormalUser(email, password){
    loginUser(email, password).then(response => {
        if (response.message === undefined){
            setToken(response);
            window.location.href = "index.html"; // TODO: change this
        }else{
            showPopUp("User credentials invalid, try again or register first.");
        }
    });
}

function showPopUp(message){
    const CONTAINER = document.querySelector("#errorScreen h5");
    CONTAINER.innerHTML = message;

    const POPUP = document.querySelector("#errorScreen");
    POPUP.classList.remove("hidden");
}

function goToReg() {
    window.location.href = "register.html";
}


