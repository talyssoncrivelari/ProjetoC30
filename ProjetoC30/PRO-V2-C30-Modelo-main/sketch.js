const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
let ground, bridge;
let leftWall, rightWall;
let jointPoint;
let jointLink;
let breakButton;
let bgImg;
let stoneImg;
let zombie, zombie1, zombie2, zombie3, zombie4;
let bottonAxe;

let stones = [];

function preload() {
  bgImg = loadImage("./assets/background.png");
  stoneImg = loadImage("./assets/stone.png");
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20, "#795548", true);
  leftWall = new Base(0, height / 2 - 75, 300, 100, "#8d6e63", true);
  rightWall = new Base(width - 20, height / 2 - 75, 300, 100, "#8d6e63", true);

  breakButton = createImg("./assets/axe.png");
  breakButton.position(windowWidth - 150, windowHeight /2 - 125);
  breakButton.size(75, 75);
  breakButton.mouseClicked(handleButtonPress);

  zombie = createSprite(width / 2, height - 110);
  zombie.addAnimation("leftToRight", zombie1, zombie2, zombie1);
  zombie.addAnimation("rightToLeft", zombie3, zombie4, zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 8;

  bridge = new Bridge(30, { x: 50, y: height / 2 - 90 });
  jointPoint = new Base(width - 110, height / 2 - 90, 40, 20, "#8d6e63", true);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-10, 110);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
}

function draw() {
  background("BLACK");
  image(bgImg, width/2, height/2, width, height);
  image(stoneImg, stones.x, stones.y, 60, 60);
  Engine.update(engine);

  bridge.show();
  //ground.show();
  //leftWall.show();
  //rightWall.show();

  for (var stone of stones) {
    stone.show();
  }

  if (zombie.position.x >= width - 250) {
    zombie.velocityX = -8;
    zombie.changeAnimation("rightToLeft");
  }

  if (zombie.position.x <= 250) {
    zombie.velocityX = 8;
    zombie.changeAnimation("leftToRight");
  }

  drawSprites();
}

function handleButtonPress() {
  jointLink.detach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}
