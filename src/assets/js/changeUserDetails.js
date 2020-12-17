function changeVisible(){
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

function includesEmptyField(planet, email, phone, fname, lname, street, nr, colony, country, city){
    if(planet === "mars"){
        const marsFields = [planet, email, phone, fname, lname, street, nr, colony];
        return marsFields.includes("");
    }
    else if(planet === "earth"){
        const earthFields = [planet, email, phone, fname, lname, street, nr, country, city];
        return earthFields.includes("");
    }
    else{
        showPopUp("Something went wrong");
        const planetFields = [planet, email, phone, fname, lname, street, nr, country, city];
        return planetFields.includes("");
    }
}

function isPasswordValid(password, repeatPassword){
    return (password === repeatPassword);
}

function addOrEdit(addEdit){
    const email = document.getElementById("email").value;
    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    const street = document.getElementById("street").value;
    const nr = document.getElementById("nr").value;
    const planet = document.getElementById("planet").value;
    const phone = document.getElementById("phone").value;
    const colony = document.getElementById("colony").value;
    const country = document.getElementById("country").value;
    const city = document.getElementById("city").value;

    const validPass = isPasswordValid(password, repeatPassword);
    const fieldsArgs = [planet, email, phone, fname, lname, street, nr, colony, country, city];
    const allFieldsFilled = !includesEmptyField(...fieldsArgs);

    if(!validPass){
        showPopUp("Passwords are not identical");
    }else if (!allFieldsFilled) {
        showPopUp("Please fill in the required fields");
    }else{
        const COLONY_OR_COUNTRY = checkColonyOrCountry(colony, country);
        const userArgs = [fname, lname, email, phone, password, planet, COLONY_OR_COUNTRY, city, street, parseInt(nr)];
        if(addEdit ==="add"){
            addUser(userToJson(...userArgs)).then(response => {
                if (response.message === undefined){
                    setToken(response);
                    window.location.href = "login.html";
                }else{
                    showPopUp("Something went wrong");
                }
            });
        }else if(addEdit ==="edit"){
            const oldPassword = document.getElementById("oldPassword").value;
            editUser(oldPassword, userToJson(...userArgs)).then(response => {
                if (response.message === undefined){
                    window.location.href = "userInfo.html";
                }else{
                    showPopUp("Something went wrong");
                }
            });
        }
    }
}

function checkColonyOrCountry(colony, country){
    return ( (colony === "") ? country : colony);
}

function showPopUp(message){
    const CONTAINER = document.querySelector("#errorScreen h5");
    CONTAINER.innerHTML = message;

    const POPUP = document.querySelector("#errorScreen");
    POPUP.classList.remove("hidden");
}
