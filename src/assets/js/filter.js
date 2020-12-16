"use strict";

document.addEventListener("DOMContentLoaded", filterInit);

function filterInit(){
    renderCountryList();
    document.querySelectorAll(".buttons").forEach(button => {
        button.addEventListener("click", goToOptimizer);
    });
}

function goToOptimizer(e){
    if (e.target.id === "nextStep"){
        document.querySelector(".filterStep1").classList.add("hidden");
        document.querySelector(".filterStep2").classList.remove("hidden");
    } else if (e.target.id === "previous"){
        document.querySelector(".filterStep1").classList.remove("hidden");
        document.querySelector(".filterStep2").classList.add("hidden");
    }

}
