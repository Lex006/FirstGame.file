var background, backgroundImg;
var monster, monster_running, monster1Img, monster2Img, monster3Img, monster4Img, monster5Img, monster6Img, monster7Img;
var runner, runner_running, running1Img, running2Img, running3Img, runnning4Img, running5Img;
var cactus;
var ground;
var gameState = PLAY;





function preload(){

monster_running = loadAnimation("monster1.png","monster2.png","monster3.png","monster4.png","monster5.png","monster6.png","monster7.png");
running_running = loadAnimation("running1.png","running2.png","running3.png","running4.png","running5.png");

backgroundImg = loadImage("background.png");

cactus = loadImage("cactus.png");

}

function setup() {
 
createCanvas(windowWidht, windowHeight);
background = createSprite(600,600);
background.addImage("background", backgroundImg);
background.velocityX = -3

cactusGroup = new Group();

running = createSprite(200,200,50,50);
  running.scale = 0.3;
  running.addImage("running" , runner_running);

monster = createSprite(100,100,50,50);
monster.scale = 0.6;
monster.addImage("monster", monster_running);

ground = createsprite(200,180,400,20);
ground.x = ground.width /2;
ground.velocityX = -(6 + 3*score/100);  


invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;

cactusGroup = createGroup();

runner.setCollider("circle",0,0,40);
runner.debug = true;

score = 0;

}

function draw() {
 background(180);
 text("Score: "+ score, 500,50);
 score = score + Math.round(frameCount/60);

 if(gameState === PLAY){
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);

    if((touches.legth > 0 || keydown("SPACE")) && trex.y  >= height-120){
        jumpSound.play()
        trex.velcity.Y = -10;
        touches = [];
      }


    if (ground.x < 0){
        ground.x = ground.width/2;
      }
      
      if(keyDown("space") && runner.y >= 150) {
        runner.velocityY = -13;
      }
    
      runner.velocityY = runner.velocityY + 0.8
    
      
      spawnCactus();
    
      if(cactusGroup.isTouching(runner)){
        gameState = END;
      }   
    }
    else if(gameState === END){
      ground.velocityX = 0;
      runner.velocityY = 0;
      monster.velocityY = 0;
      }


      runner.collide(invisibleGround);

      spawncactus();

      drawSprites();
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
      var cactus = createSprite(400,165,10,40);
      cactus.velocityX = -6;

      cactus.scale = 0.2;
      cactus.lifetime = 300;
     
    cactusGroup.add(cactus);
   }
  }
  