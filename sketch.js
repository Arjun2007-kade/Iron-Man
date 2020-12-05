var PLAY = 0;
var END = 1;
var gameState = PLAY;

var ironMan,ironManflying,ironMans,ironR,ironS;

var ground,bground;

var obstacle,ObstacleGroup;

var e1,e2,e3,e4,e5,e6;
var oo1,oo2,oo3;

var ee1,ee2,ee3,ee4,ee5,ee6;
var score = 0;

var createBullet;
var BulletGroup;
var bem;
var ggo,ggO;

function preload(){
  
  ggO=loadImage("001.jpg");
 
  back = loadImage("back.jpg");
  
  ee1 = loadImage("ee1.png");
  ee1.scale=0.1;
  ee2 = loadImage("ee2.png");
  ee2.scale=0.1
  ee3 = loadImage("ee3.png");
  ee3.scale=0.1;
  ee4 = loadImage("ee4.png");
  ee4.scale=0.1;
  ee5 = loadImage("ee5.png");
  ee5.scale=0.1;
  ee6 = loadImage("ee6.png");
  ee6.scale=0.1;
  
  
  bem=loadImage("beam.png");
   ironManflying = loadImage("12.png");
  ironMans = loadImage("Picture1.png");
  ironR = loadImage("14.png");
  ironS = loadImage("shoot.png");
}
  

function setup() {
  createCanvas(500,400);
  
  
  
  bground = createSprite(250,200,750,600);
  bground.addImage("back",back);
  bground.scale= 1.6;
  
  ironMan = createSprite(50,300,20,50);
  
  ironMan.addImage(ironManflying);
  ironMan.scale = 0.2;
  
  ground = createSprite(200,350,400,10);
  ground.visible = false;
  
  ObstacleGroup = new Group();
  BulletGroup = new Group();
  
  ironMan.setCollider("circle",0,0,160);
  
  ggo=createSprite(250,200);
  ggo.addImage(ggO);
  ggo.scale=0.8;
  ggo.visible=false;
  
  
}

function draw() {
  background(255);
  
  
  
  if(gameState === PLAY){
    //move the ground
    bground.velocityX = -4;
     
    score = score + Math.round(frameCount/150);
    
    if (bground.x < 0){
    bground.x = bground.width/2;
  }
    if(keyDown("space")&& ironMan.y >= 200) {
    ironMan.velocityY = -10;
   ironMan.addImage(ironMans);
      gameState=PLAY;
  }
    if(keyWentDown("right")){
      ironMan.addImage(ironS);
    createBullet();
    
  
}
    ironMan.velocityY = ironMan.velocityY + 0.8;
    
    
    if(ObstacleGroup.isTouching(ironMan)) {
      gameState = END;
      ObstacleGroup.setVelocityXEach(0);
      ObstacleGroup.visible=false;
      
    }
    
  }
  else if(gameState===END){
    ironMan.velocityY=0;
    ObstacleGroup.setLifetimeEach(-1);
    bground.velocityX=0;
    ObstacleGroup.setVelocityXEach=(0);
    ggo.visible=true;
  }
  
  
  if(ironMan.y>300){
    ironMan.addImage(ironManflying);
    ironMan.scale = 0.2;
  }
  ironMan.collide(ground);
  

    
  
  if (frameCount%150 === 0){
   var obstacle = createSprite(500,330,10,40);
  obstacle.velocityX = -6;
  
   var rand = Math.round(random(1,6));
  switch(rand){
  case 1: obstacle.addImage(ee1);
  break;
  case 2: obstacle.addImage(ee2);
  break;
  case 3: obstacle.addImage(ee3);
  break;
  case 4: obstacle.addImage(ee4);
  break;
  case 5: obstacle.addImage(ee5);
  break;
  case 6: obstacle.addImage(ee6);
  break;
  default : break;
  }
     obstacle.scale=3/6;
     obstacle.lifetime = 100;
     
     ObstacleGroup.add(obstacle);
   }
  ggo=createSprite(250,200);
  ggo.addImage(ggO);
  ggo.scale=0.8;
  ggo.visible=false;
  
  drawSprites();
  
  
  text("Score: "+ score, 400,50);
  }  
 function createBullet(){
    
    
var bullet=createSprite(50,280,20,10);
bullet.addImage(bem);
   bullet.scale=0.1;
 bullet.velocityX=5;
BulletGroup.add(bullet);
if(bullet.destroy===null){
   bullet.destroy();
}  
bullet.depth=ironMan.depth;
ironMan.depth++;
   bullet.lifetime=90;
 }