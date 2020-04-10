// CREATE GLOBAL VARIABLES
// For Engine, World, Bodies and any other that you have in mind to make your coding life easier.
// remember to create an array of boxes.
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
var boxes = [];
 
var ground;
var gSlider;
 
function setup() {
    createCanvas(600, 600);

    // Create an instance of Engine, World
    engine = Engine.create();
    world = engine.world;
 
    // A slider is already created for you here. This slider will dictate the gravity of the world
    gSlider = createSlider(0, 100, 50);
    gSlider.position(40,20);
    gSlider.input = map(engine.world.gravity, gSlider.min, gSlider.max, 0, 1);
 
    // Create a ground rectangle that would hold all the boxes and add it to the world.
    ground = new Ground(300,585,600,30);

}
 
function mousePressed() {
    if (mouseY < 550 && mouseY>90) {
        // Every time a mouse press occures create a new box.
        boxes.push(new Box(mouseX, mouseY, random(30, 80), random(30, 80)));
        
    }
}
 
function draw() {
    background("purple");
    // This is the value of your gravity. You can optionally show it to the viewer.
    var fVal = gSlider.value();
  
    // Use a for loop to show all the boxes
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    strokeWeight(4);
    fill(255);
    textSize(25);
    text("Gravity" + fVal, 180, 40);
    ground.display();

}
 

// You can either create a file for the class Box or build a simple function that creates one box at a time.
// I have gone for the second option.
function Box(x, y, w, h) {
    var options = {
        friction: 0.5,
        restitution: 0.5
    }
 
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
 
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(2.5);
        stroke(255);
        fill(0,200,200);
        rect(0, 0, this.w, this.h);
        pop();
    }
}