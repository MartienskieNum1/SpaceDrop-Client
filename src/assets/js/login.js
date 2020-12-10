"use strict";

onApiUrlLoaded(loginInit);


function loginInit() {
    document.querySelector("#submit").addEventListener("submit", preventFormSubmit);
    document.querySelector("#submit").addEventListener("click", login);
    document.querySelector("#reg").addEventListener("click", goToReg);
    document.querySelector("a.AccountLoginButton").addEventListener("click", signOut);
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
        loginUser(email, password).then(response => {
            if (response.message === undefined){
                setToken(response);
                window.location.href = "userInfo.html"; // TODO: change this
            }else{
                showPopUp("User credentials invalid, try again or register first.");
            }
        });
    }

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

function onSignIn(googleUser) {
    // let profile = googleUser.getBasicProfile();
    // console.log(profile)
    // console.log("ID: " + profile.getId());
    // console.log('Name: ' + profile.getName());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    let accessToken = googleUser.xc.access_token;
    document.querySelector("a.AccountLoginButton").innerHTML = "Logout";

    getLoggedInUserFetch(accessToken);
}

function getLoggedInUserFetch(token){
    fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="+token)
        .then(response => response.json())
        .then(user => {
            console.log(user)
        })
}

function signOut() {

    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        document.querySelector("#googleSignOut").innerHTML = "Signed out";
    });

}



