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

function includesEmptyField(planet, email, fname, lname, street, nr, colony, country, city){
    if(planet === "mars"){
        const marsFields = [planet, email, fname, lname, street, nr, colony];
        return marsFields.includes("");
    }
    else if(planet === "earth"){
        const earthFields = [planet, email, fname, lname, street, nr, country, city];
        return earthFields.includes("");
    }
    else{
        showPopUp("Something went wrong");
        const planetFields = [planet, email, fname, lname, street, nr, country, city];
        return planetFields.includes("");
    }
}

function isPasswordValid(password, repeatPassword){
    return (password === repeatPassword);
}