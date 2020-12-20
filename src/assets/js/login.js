"use strict";

onApiUrlLoaded(loginInit);

function loginInit() {
    document.querySelector("#submit").addEventListener("submit", preventFormSubmit);
    document.querySelector("#submit").addEventListener("click", login);
    document.querySelector("#reg").addEventListener("click", goToReg);
    document.querySelector("a.loginLogoutButton").addEventListener("click", signOut);
    document.querySelector("#user").addEventListener("click", logInMockUser);
    document.querySelector("main").addEventListener("click", signOut);
}

function preventFormSubmit(e){
    e.preventDefault();
}

function login(e) {
    e.preventDefault();
    const EMAIL = document.getElementById("email").value;
    const PASSWORD = document.getElementById("password").value;

    if (EMAIL === "" || PASSWORD === "") {
        showPopUp("Please fill in all fields");
    }else{
        loginNormalUser(EMAIL, PASSWORD);
    }
}

function logInMockUser(e){
    e.preventDefault();
    if (e.target.id === "user"){
        const EMAIL = "user@space.drop";
        const PASSWORD = "mock";

        loginNormalUser(EMAIL, PASSWORD);
    }
}

function loginNormalUser(email, password){
    loginUser(email, password).then(response => {
        if (response.message === undefined){
            setToken(response);
            getOrders().then((responseLogin) => {
                if (responseLogin.status === 500) {
                    window.location.href = "index.html";
                }else {
                    window.location.href = "adminFlightsOverview.html";
                }
            });
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

    console.log(loggedIn);
}

function goToReg() {
    window.location.href = "register.html";
}


function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        const DATE = new Date();
        DATE.setTime(DATE.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + DATE.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires;
}
function getCookie(cname) {
    const NAME = cname + "=";
    const CA = document.cookie.split(';');
    for(let i = 0; i < CA.length; i++) {
        let c = CA[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(NAME) === 0) {
            return c.substring(NAME.length, c.length);
        }
    }
    return "";
}

function onSignIn(googleUser) {
    const ACCESS_TOKEN = googleUser.xc.access_token;
    setCookie("auth", ACCESS_TOKEN, 30);
    document.querySelector("div.hidden").classList.remove("hidden");
    getLoggedInUserFetch();
}


function getLoggedInUserFetch(){
    if (getCookie("auth") !== null){
        fetch("https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" + getCookie("auth"))
            .then(response => response.json())
            .then(user => {
                document.querySelector("#googleWelcome").innerHTML =
                    `<h5>Welcome, ${user.name}</h5>
                    <img src="${user.picture}" alt="google avatar" referrerpolicy="no-referrer">
                    <a href="#" id="googleSignOff">Logout</a>`;
            });
    }
}

function signOut(e) {
    if(e.target.id === "googleSignOff"){
        const AUTH = gapi.auth2.getAuthInstance();
        AUTH.signOut().then(function () {
            document.querySelector("#googleWelcome").classList.add("hidden");
            setCookie("auth", null, 30);
        });
        AUTH.disconnect();
    }
}






