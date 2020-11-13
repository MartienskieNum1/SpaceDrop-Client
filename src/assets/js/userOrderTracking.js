document.addEventListener("DOMContentLoaded", userOrderTrackingInit);

function userOrderTrackingInit(){
    showOrderdetails();
    showProgression();


}

function showOrderdetails() {

}

function showProgression() {
    const progressionLevel = 3;
    for(let i=1;i<=5;i++){
        document.getElementById(i.toString()).classList.remove("active");
    }

    if(progressionLevel>=1){
        document.getElementById("1").classList.add("active");
    }
    if(progressionLevel>=2){
        document.getElementById("2").classList.add("active");
    }
    if(progressionLevel>=3){
        document.getElementById("3").classList.add("active");
    }
    if(progressionLevel>=4){
        document.getElementById("4").classList.add("active");
    }
    if(progressionLevel>=5){
        document.getElementById("5").classList.add("active");
    }



}