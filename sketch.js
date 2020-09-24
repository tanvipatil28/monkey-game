var PLAY = 1;
var END = 0;
var GameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var SurvivalTime = 0;

function preload(){
  
  
monkey_running =           loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");

}



function setup() {
createCanvas(400, 400);
 
//creating monkey
monkey=createSprite(50,355,20,20);
monkey.addAnimation("moving", monkey_running);
monkey.scale=0.1;

ground = createSprite(200,390,400,20);
obstacleGroup = new Group();
FoodGroup = new Group();
  
  invisibleGround = createSprite(300,190,400,10);
  invisibleGround.visible =false ;
  
}


function draw() {

  background(255);
  text(score, 200, 50);
     if (GameState===PLAY){
  if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
       
       monkey.collide(invisibleGround);
    
  monkey.collide(ground);
  spawnObstacles();
  if(FoodGroup.isTouching(monkey)) {
  score = score + 1;
  FoodGroup.destroyEach();
    
  }
  if (obstacleGroup.isTouching(monkey)) {
    GameState = END;
  score = 0;
    
  }
       }
  else if (GameState === END) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
     
    
  }
  drawSprites(); 
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,365,10,40);
    //obstacle.debug = true;
    obstacle.addImage(obstacleImage);
    banana = createSprite(610, 280);
    banana.addImage("Bananaimage", bananaImage);
    banana.scale = 0.1;
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
    obstacle.velocityX = -(6 + 3*score/100);
    banana.velocityX = -(6 + 3*score/100);
    obstacleGroup.add(obstacle);
    banana.lifetime = 300;
    FoodGroup.add(banana);
  }
}
  



