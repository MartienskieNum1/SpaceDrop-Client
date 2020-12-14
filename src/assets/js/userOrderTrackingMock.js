document.addEventListener("DOMContentLoaded", init);

function init() {
    canvas = document.getElementById("trackingVisual");
    canvas.width = 1400;
    canvas.height = 300;
    context = canvas.getContext("2d");
    clearCanvas();
}

class Vector{
    constructor(x,y) {
        this.x = x;
        this.y = y;

    }
}

class Planet{
    constructor(positionX,color) {
        this.color = "blue";
    }
    animate(){
        context.fillStyle = this.color;
        context.arc(100, canvas.height/2, 60, 0, 2 * Math.PI);
        context.fill();

    }
}

class Rocket{
    constructor() {
        this.color = "white";
        this.width = 30;
        this.height = 10;
        this.position = new Vector(160,(canvas.height-this.height)/2);

    }
    animate(){
        context.fillStyle = this.color;
        context.fillRect(this.position.x,this.position.y,this.width,this.height);

    }
}

function clearCanvas(){
    context.fillStyle = "rgb(1,0,0)";
    context.fillRect(0,0,canvas.width,canvas.height);
    rocket = new Rocket();
    rocket.animate();
    planet = new Planet();
    planet.animate();

}
