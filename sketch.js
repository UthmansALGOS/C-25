const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls = [];
var boat;
var boats=[];


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  cannon = new Cannon(180, 110, 130, 100, angle);
 
 // boat = new Boat(width-79,height-60,170,170,-100);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();

  showboats();

  for(var i = 0;i<balls.length;i++){
    showcannonballs(balls[i]);
  }
  cannon.display();
  //Matter.Body.setVelocity(boat.body,{x:-0.9,y:0});
  //boat.display();
  
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);

  }

}
function keyReleased() {
  if (keyCode === DOWN_ARROW) {
  balls[balls.length-1].shoot();
  }
}
function showcannonballs(ball){
  if(ball){
    ball.display();
  }
}
function showboats(){

  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position);

      boats.push(boat);
    }
  }




  if(boats.length>0){
    for(var i =0;i<boats.length;i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0});
        boats[i].display();
      }
    }
  }
  else{
    boat = new Boat(width,height-60,170,170,-60);
    boats.push(boat);
  }
  }

