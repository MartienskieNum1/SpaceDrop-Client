"use strict";

document.addEventListener("DOMContentLoaded", filterInit);

function filterInit(){
    document.querySelectorAll(".buttons").forEach(button => {
        button.addEventListener("click", goToOptimizer);
    });
}

function goToOptimizer(e){
    if (e.target.id === "optimize"){
        document.querySelector(".filterBot").classList.add("hidden");
        document.querySelector(".filterStep1").classList.remove("hidden");
    } else if (e.target.id === "nextStep"){
        document.querySelector(".filterStep1").classList.add("hidden");
        document.querySelector(".filterStep2").classList.remove("hidden");
    }

}
