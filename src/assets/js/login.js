document.addEventListener("DOMContentLoaded", loginInit);

function loginInit() {
    document.querySelector("#submit").addEventListener("submit", preventFormSubmit);
    document.querySelector("#submit").addEventListener("click", login);
    document.querySelector("#reg").addEventListener("click", goToReg);
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
            if (response === getToken()){
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


