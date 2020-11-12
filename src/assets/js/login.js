document.addEventListener("DOMContentLoaded", loginInit);

function loginInit() {
    document.querySelector("#submit").addEventListener("click", getLoginCredentials);
}

function getLoginCredentials() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    if(isValidUser(email)){

    }
}

function isValidUser(email) {

}