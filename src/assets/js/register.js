"use strict";

document.addEventListener("DOMContentLoaded", registerInit);

function registerInit() {
    document.querySelector("#submit").addEventListener("click", makeAccount);
    changeVisable();
}

function changeVisable(){
    if(document.getElementById("planet").value === "mars"){
        document.getElementById("marsLabel").style.display = 'table-row';
        document.getElementById("earthLabel").style.display = 'none';
        document.getElementById("mars").style.display = 'table-row';
        document.getElementById("earth").style.display = 'none';
        document.getElementById("country").removeAttribute("required");
        document.getElementById("city").removeAttribute("required");
        document.getElementById("colony").setAttribute("required","");


    }
    else{
        document.getElementById("marsLabel").style.display = 'none';
        document.getElementById("earthLabel").style.display = 'table-row';
        document.getElementById("mars").style.display = 'none';
        document.getElementById("earth").style.display = 'table-row';
        document.getElementById("country").setAttribute("required","");
        document.getElementById("city").setAttribute("required","");
        document.getElementById("colony").removeAttribute("required");
    }
}

function makeAccount() {
    const email = document.getElementById("email").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    const street = document.getElementById("street").value;
    const nr = document.getElementById("nr").value;
    const planet = document.getElementById("planet").value;
    if(document.getElementById("phone").value==null){
        const phone = document.getElementById("phone").value;
    }

    if(password!==repeatPassword){
        passwordNotIdentical();
    }
    else{
        if(planet==="mars"){
            const colony = document.getElementById("colony").value;
            if(email===""||fname===""||lname===""||street===""||nr===""||colony===""){
                fillInAllFieldsPopUp();
            }
            else{
                //TODO send userdata to server with mars address
                console.log("send userdata to server with mars address");
            }
        }
        else if(planet==="earth"){
            const country = document.getElementById("country").value;
            const city = document.getElementById("city").value;
            if(email===""||fname===""||lname===""||street===""||nr===""||country===""||city===""){
                fillInAllFieldsPopUp();
            }
            else{
                //TODO send userdata to server with earth address
                console.log("send userdata to server with earth address");
            }
        }
        else{
            somethingWentWrongPopUp();
        }
    }
}

function passwordNotIdentical() {
    console.log("passwords are not identical");
    //TODO
}

function fillInAllFieldsPopUp() {
    console.log("Not all fields are filled in");
    //TODO

}

function somethingWentWrongPopUp() {
    console.log("Something went wrong");
    //TODO
}