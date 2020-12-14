document.addEventListener("DOMContentLoaded", init);

function init() {
    canvas = document.getElementById("trackingVisual");
    canvas.width = 1600;
    canvas.height = 250;
    context = canvas.getContext("2d");

    rocket = new Rocket();
    setInterval(loop, 20);
}

function loop() {
    clearCanvas();
    rocket.animate();
    planet1 = new Planet1("earth");
    planet1.animate();
    planet2 = new Planet2("mars");
    planet2.animate();
}

function clearCanvas() {
    context.fillStyle = "rgb(40, 40, 40)";
    context.fillRect(0, 0, canvas.width, canvas.height);
}


class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vector) {
        this.x+= vector.x;
        this.y+= vector.y;
    }
}

function inbounds(x, y, w, h) {
    if(x > canvas.width + 10 || (x+w) < 0 || (y+h) < 0 || y > canvas.height) {
        return false;
    } else {
        return true;
    }
}
function random(min, max) {
    return Math.random() * (max-min) + min;
}

class Smoke {
    constructor(x, y) {
        this.color = "#FF4500";
        this.maxSize = random(4, 6);
        this.maxLifetime = 100;
        this.lifetime = random(1, this.maxLifetime);
        this.age = 0;
        this.gravity = new Vector(-.1, -0.1);
        this.position = new Vector((x - this.maxSize/2), y);
        this.maxVelocity = 5;
        this.velocity = new Vector(random(-this.maxVelocity, this.maxVelocity), random(0, this.maxVelocity));
    }

    animate() {
        let position = this.position;
        let velocity = this.velocity;
        velocity.add(this.gravity);
        position.add(velocity);
        let size = this.maxSize* (1-(this.age/this.lifetime));
        context.fillStyle = this.color;
        context.fillRect(position.x, position.y, size, size);
        this.age++;
    }
}

class SmokeTrail {
    constructor(rocket) {
        this.rocket = rocket;
        this.smokes = [];
        this.smokesPerAnimation = 20;
    }
    animate() {
        let smokes = this.smokes;
        let rocket = this.rocket;
        for(let x = 0; x < this.smokesPerAnimation; x++) {
            smokes.push(new Smoke((rocket.position.x),(rocket.position.y)));
        }
        for(let x = 0; x < smokes.length; x++) {
            let smoke = smokes[x];

            if( !inbounds(smoke.position.x, smoke.position.y, smoke.size, smoke.size)
                || smoke.age >= smoke.lifetime) {

                smokes.splice(x, 1);
                x--;
            }
            smoke.animate();
        }
    }
}


class Rocket {
    constructor() {
        this.color = "white";
        this.colorv2 = "red";
        this.width = 55;
        this.height = 18;
        this.width2= 30;
        this.height2 = 10;
        this.width3 = 25;
        this.height3 = 15;
        this.width4 = 35;
        this.height4 = 5;
        this.position = new Vector(145, (canvas.height - this.height)/2);
        this.velocity = new Vector(0, 0);
        this.acceleration = new Vector(0.1, 0);
        this.smokeTrail = new SmokeTrail(this);
    }

    animate() {
        let position = this.position;
        this.velocity.add(this.acceleration);
        position.add(this.velocity);

        if(!inbounds(position.x+455, position.y, this.width, this.height)) { //position.x + 1455 is de start, 205 is het aankomen bij de andere planeet,
            this.acceleration=new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.smokeTrail.smokesPerAnimation=0;
        }

        this.smokeTrail.animate();
        context.fillStyle = this.color;
        let positioning2 =(canvas.height - this.height2)/2;
        let positioning3 =(canvas.height - this.height3)/2;
        let positioning4 =(canvas.height - this.height4)/2;
        context.fillRect(position.x, position.y, this.width, this.height);
        context.fillRect(position.x+this.width, positioning2, this.width2, this.height2);
        context.fillRect(position.x+this.width+this.width2, positioning3, this.width3, this.height3);
        context.fillStyle = this.colorv2;
        context.fillRect(position.x-7, positioning4, this.width4, this.height4);
    }
}

class Planet1{
    constructor(planet) {
        this.color = "#FF2515";
    }
    animate(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(100, canvas.height/2, 60, 0, 2 * Math.PI);
        context.fill();
    }
}

class Planet2{
    constructor(planet) {
        this.color2= "#0f5e9c";

    }
    animate(){
        context.beginPath();
        context.fillStyle = this.color2;
        context.arc(1500, canvas.height/2, 60, 0, 2 * Math.PI);
        context.fill();
    }
}
