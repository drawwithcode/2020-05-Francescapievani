// let myImage;
let socket = io();

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);

function newConnection(){
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data){
  fill("blue");
  ellipse(data.x, data.y, 10);
}

function preload(){
  // put preload code here
  // myImage = loadImage("./assets/images/Mappa.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  // put setup code here
  background("red");


}

function draw() {
  // put drawing code here
// imageMode(CENTER);
// image(myImage, width / 2, height / 2, myImage.width / 1.8, myImage.height / 1.8)
}

function mouseMoved(){
  noStroke();
  fill("yellow");
  ellipse(mouseX,mouseY, 10);
  //create the message
  let message = {
    x: mouseX,
    y: mouseY,
  };
  //send to the server
  socket.emit("mouse", message);
}
