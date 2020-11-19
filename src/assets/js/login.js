document.addEventListener("DOMContentLoaded", loginInit);

function loginInit() {
    document.querySelector("#submit").addEventListener("click", getLoginCredentials);
}

function getLoginCredentials(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email,password);
}

function login(email,password) {
    loginUser(email, password).then(response => {
        if (response === getToken()){
            showPopUp("Braaf maatken, ge moogt binnen"); // temporarily show this message
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



