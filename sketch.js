var trex, ground , cloud, cactus1,  cactus2, cactus3, cactus4, cactus5, cactus6, restart, gameOver;
var trex_ruuning, ground_image, invisGround, cloud_img, cactus_img, restartImg, gameOverImg;
var jump, die, checkpoint
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
trex_ruuning=loadAnimation("trex1.png","trex3.png","trex4.png",);
trex_collided=loadAnimation("trex_collided.png")
ground_image=loadImage("ground2.png")
cloud_img= loadImage("cloud.png");
cactus1= loadImage("obstacle1.png");
cactus2=loadImage("obstacle2.png");
cactus3=loadImage("obstacle3.png");
cactus4=loadImage("obstacle4.png");
cactus5=loadImage("obstacle5.png");
cactus6=loadImage("obstacle6.png");
restartImg=loadImage("restart.png ");
gameOverImg= loadImage("gameOver.png");

jump = loadSound("jump.mp3")
die = loadSound("die.mp3")
checkpoint = loadSound("checkpoint.mp3")
}



function setup(){
  createCanvas(600,200);
  trex=createSprite(50,150,20,20);
  trex.addAnimation("running",trex_ruuning);
  trex.addAnimation("trex_collided", trex_collided);
  trex.scale=0.7;
  
  ground = createSprite(300, 170, 600, 10)
  ground.addImage(ground_image)
  
  invisGround = createSprite(300, 180, 600, 10)

  invisGround.visible =  false

  score = 0

  cloudsGroup= new Group();
  obstaclesGroup= new Group();

  restart = createSprite(300, 120, 10, 10);
  restart.addImage(restartImg);
  restart.scale= 0.6
  gameOver= createSprite(300, 80, 10, 10);
  gameOver.addImage(gameOverImg);
  gameOver.scale= 0.6
}



function draw(){
background("white");
text ("Score: " + score, 500, 50)
trex.collide(invisGround)


if (gameState === PLAY) {
score = score + Math.round(getFrameRate()/ 60)
ground.velocityX= -10
restart.visible= false
gameOver.visible= false
if(keyDown("space")&& trex.y>=142) {
  trex.velocityY=-15
  jump.play()
}

trex.velocityY=trex.velocityY+1

if (score % 100===0) {
  checkpoint.play();
}

if (ground.x<0) {
  ground.x=300
}
cloudSpawn();
spawnCactus();

if (obstaclesGroup.isTouching(trex)) {
  gameState = END
  die.play();
}

}
 else if (gameState === END) {
  ground.velocityX= 0
  restart.visible= true
  gameOver.visible= true
  obstaclesGroup.setLifetimeEach(-1)
  cloudsGroup.setLifetimeEach(-08273);
  trex.changeAnimation("trex_collided", trex_collided)
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  trex.velocityY= 0

  if (mousePressedOver(restart)) {
    reset();
  }
}



drawSprites();

}

function cloudSpawn() {
 if (frameCount % 60===0) {
   cloud = createSprite(550, 50, 10, 10)
   cloud.addImage(cloud_img)
   cloud.velocityX = -2
   cloud.scale = 0.5
   cloud.y = Math.round(random(20, 80))
   cloud.lifetime= 250
   cloudsGroup.add(cloud)
   cloud.depth = trex.depth
   trex.depth = trex.depth + 1  
 }

}

function spawnCactus() {
  if (frameCount % 100===0) {
  cactus = createSprite(550, 150, 20, 20)
  cactus.velocityX= -10
  var diffImg= Math.round(random(1, 6))

  switch (diffImg) {
    case 1: cactus.addImage(cactus1)
       break 
    case 2: cactus.addImage(cactus2)
        break
    case 3: cactus.addImage(cactus3)
         break
    case 4: cactus.addImage(cactus4)
         break
    case 5: cactus.addImage(cactus5)
         break
    case 6: cactus.addImage(cactus6)
       break
    default:break
  }

  
  cactus.scale= 0.5
  cactus.lifetime= 250
  obstaclesGroup.add(cactus)
  }
}

function reset() {
  gameState= PLAY
  score=0
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_ruuning)
}





