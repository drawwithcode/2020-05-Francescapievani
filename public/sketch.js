let myImage;
let socket = io();
let myColor ="white";

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);

function setColor(assignedColor){
  myColor = assignedColor;
}

function newConnection(){
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data){
  push();
  noStroke();
  fill(data.color);
  ellipse(data.x, data.y, 10);
  pop();
}

function preload(){
  // put preload code here
 myImage = loadImage("./assets /images/Mappa.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background("LightSkyBlue");
  // put setup code here
}
function draw() {
  // put drawing code here
imageMode(CENTER);
image(myImage, width / 2, height / 2, myImage.width / 3, myImage.height /3)
}


function mouseDragged(){
  push();
  noStroke();
  fill(myColor);
  ellipse(mouseX,mouseY,10);
  pop();
  //create the message
  let message = {
    x: mouseX,
    y: mouseY,
    color : myColor,
  };
  //send to the server
  socket.emit("mouse", message);
}
