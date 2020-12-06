
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint=Matter.Constraint

var back,cloudsGroup,coinsCollected=0,score=0
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload()
{
  wal=loadAnimation("imgs/wa1.png","imgs/wa2.png","imgs/wa3.png","imgs/wa4.png","imgs/wa5.png","imgs/wa6.png"
  ,"imgs/wa7.png","imgs/wa8.png","imgs/wa9.png","imgs/wa10.png","imgs/wa 11.png","imgs/wa12.png",
  "imgs/wa13.png")

  clo=loadImage("imgs/sky.png")
  wat=loadImage("imgs/water.png")
  bac=loadImage("imgs/backdrop.png")
  gr=loadImage("imgs/grass.png")
  gra=loadImage("imgs/grass-1.png")

  co=loadAnimation("imgs/Coin_1.png","imgs/Coin_2.png","imgs/Coin_3.png","imgs/Coin_4.png")
  spi=loadImage("imgs/spikes.png")


}

function setup() {
	createCanvas(1365, 620);
    
    


	engine = Engine.create();
  world = engine.world;
 
  //Create the Bodies Here.
  backgr=createSprite(300,400)
  backgr.addImage(bac)
  backgr.scale=0.7

  backgr1=createSprite(1000,400)
  backgr1.addImage(bac)
  backgr1.scale=0.7

  walk=createSprite(100,310)
  walk.addAnimation("walk",wal)
  walk.scale=1.7

  water=createSprite(1000,610)
  water.addImage(wat)
  water.scale=0.4
  water.velocityX=-2

   grassgroup=new Group()
   gragrou=new Group()
   coinsgro=new Group()
  
   stand=createSprite(0,450)
   stand.addImage(gr)
  // stand.vsi
    
  

  Engine.run(engine)
}

function draw() {
  rectMode(CENTER);
  background("#ABB6D4")
 
  if(gameState==PLAY){
  spawnClouds()
 
  
  if(water.x<700){
    water.x=1000
  }
 
  if(keyDown("space")){
    walk.velocityY=-8
  
  }
  walk.velocityY=walk.velocityY+0.8

 // walk.velocityY=+2

 if(walk.y>500){
    walk.destroy()
    gameState=END
  }

  if(gragrou.isTouching(walk)||(grassgroup.isTouching(walk))||(stand.isTouching(walk))){
    walk.velocityY=0

  }

  if(frameCount%60==0){
    stand.remove()
  }
  if(coinsgro.isTouching(walk)){
    coinsgro.destroyEach()
    coinsCollected=coinsCollected+1
  }

  score = score + Math.round(getFrameRate()/60);

 
  Spawngrounds()
  spawngro()
  Spawncoins()
 

  drawSprites();
  textSize(50)
  text ("💰: "+coinsCollected,1200,200)
  text (" score: "+score,1000,100)
text("press space to jump",100,100)
}

 else if (gameState==END){
     grassgroup.velocityX=0;
     gragrou.velocityX=0;
     cloudsGroup.velocityX=0;
     coinsgro.velocityX=0;
     
    // fill (color(random(200,500)))
     text("score: "+score,600,400)
     text("coins collected",600,500)
     text("press f5 to play again",200,100)
     drawSprites();
  }

  


}

function spawnClouds() {
  
  if (frameCount % 90 === 0) {
   var  cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(120,180));
    cloud.addImage(clo);
    cloud.scale = 0.6;
    cloud.velocityX = -7;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
   
  }
  
}

function Spawngrounds()
{
  if(frameCount%200==0){

  grass =createSprite(100,400)
  grass.addImage(gr)
  grass.scale=0.3


  grass.x=Math.round(random(1000,1300))
  grass.y=Math.round(random(300,400))
  grass.velocityX=-3
  grassgroup.add(grass)
}}
 
function spawngro(){
  if(frameCount%150==0){
    gra1=createSprite(200,600)
    gra1.addImage(gra)
    gra1.scale=4
    gra1.x=Math.round(random(1000,1300))
   // gra1.y=Math.round(random(300,400))
    gra1.velocityX=-5
    gragrou.add(gra1)
  }
}

function Spawncoins(){
  if(frameCount%80==0){
    coins=createSprite(200,600)
    coins.addAnimation("coin",co)
    coins.scale=0.3
    coins.velocityX=-4
    coins.x=Math.round(random(1000,1300))
    coins.y=Math.round(random(200,400))
    coinsgro.add(coins)
  }
}


