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
            window.location.href = "index.html";
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

    console.log(loggedIn)
}

function goToReg() {
    window.location.href = "register.html";
}


function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires;
}
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function onSignIn(googleUser) {
    let accessToken = googleUser.xc.access_token;
    setCookie("auth", accessToken, 30);
    document.querySelector("div.hidden").classList.remove("hidden");
    getLoggedInUserFetch();
}


function getLoggedInUserFetch(){ //todo: token in cookie steken
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
        let auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            document.querySelector("#googleWelcome").classList.add("hidden");
            setCookie("auth", null, 30);
        });
        auth2.disconnect();
    }
}






