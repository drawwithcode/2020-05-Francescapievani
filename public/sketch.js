let socket = io();
let myColor ="white";
let myImage;

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);
socket.on("newPlayer", newPlayer);

function newPlayer(newPlayerColor) {
  console.log(newPlayerColor);
  push();
  fill("white");
  rectMode(CENTER);
  noStroke();
  rect(width / 2, height / 10 * 9, windowwidth/2, windowheight/2);
  textFont("Nerko One")
  textSize(25);
  textAlign(CENTER);
  fill(newPlayerColor);
  text("New traveler joined: " + newPlayerColor, width / 2, height / 10 * 9);
  pop();
}

function setColor(assignedColor){
  myColor = assignedColor;
}

function newConnection(){
  console.log("your id: " + socket.id);
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

function drawOtherMouse(data){
  push();
stroke(data.color);
strokeWeight(7);
  line(data.x, data.y, data.x2, data.y2);
  pop();
}


function draw() {
  // put drawing code here
imageMode(CENTER);
image(myImage, width / 2, height / 2, myImage.width / 3, myImage.height /3)

//titolo sfondo
push();
let myText = "Where will be your first trip after Covid?";
fill("red");
textFont("Nerko One");
textAlign(CENTER);
textSize(40);
text(myText,windowWidth/2, 50);
pop();

push();
let myText2 = "Color on the map your dreaming place in the world and discover other people's dream";
fill("blue");
textFont("Nerko One");
textAlign(CENTER);
textSize(35);
text(myText2,windowWidth/2, 900);
pop();


}

function mouseDragged(){
  push();
  stroke(myColor);
  strokeWeight(7);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
  //create the message
  let message = {
    x: mouseX,
    y: mouseY,
    x2: pmouseX,
    y2: pmouseY,
    color : myColor,
  };
  //send to the server
  socket.emit("mouse", message);
}
