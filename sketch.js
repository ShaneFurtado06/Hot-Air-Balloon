//Hot Air Balloon using firebase database

var backI;
var HB,HBI;
var database,position;

function preload(){
  backI=loadImage("HotAirBallon-01.png");

  HBA=loadAnimation("HotAirBallon-02.png","HotAirBallon-03.png","HotAirBallon-04.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1500,700);
  
  HB=createSprite(300, 200, 30, 30);
  HB.addAnimation("flying",HBA);
  HB.scale=0.5;

  var ballpos=database.ref('Balloon/Position');
  ballpos.on("value",readPosition,showError);
}

function draw() {
  background(backI);  

  if (keyDown(LEFT_ARROW)){
    writePosition(-10,0);
  }

  else if (keyDown(RIGHT_ARROW)){
    writePosition(+10,0);
  }

  else if (keyDown(UP_ARROW)){
    writePosition(0,-10)
    HB.scale=HB.scale-0.005;
  }

  else if (keyDown(DOWN_ARROW)){
    writePosition(0,+10);
    HB.scale=HB.scale+0.005;
  }

  drawSprites();
}

function showError() {
  console.log("Error");
}

function writePosition(x,y){
  database.ref("Balloon/Position").set({
    'x':position.x+x,
    'y':position.y+y
});
}

function readPosition(data){
  position=data.val();
    HB.x=position.x;
    HB.y=position.y;
}

