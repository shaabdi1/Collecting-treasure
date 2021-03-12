var PLAY = 1;
var END = 0;
var gameState = 1;

var knife, fruits, score, fruitGroup, enemyGroup, monster;

var randomFruit, knifeImage , fruit1, fruit2 ,fruit3,fruit4, monsterImage, gameOverImage;

function preload(){
  
  knifeImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
 
}

function setup(){
  
  knife = createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale = 0.5;
  
  score = 0;
  
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
}
function draw(){
  background("lightblue");
  
  if(gameState === PLAY){
    
    knife.y = World.mouseY;
    knife.x = World.mouseX;
    
    fruits();
    enemy();

    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
   //   knifeSwooshSound.play();
      score = score +2;
    }
    
    else {
  
      if(enemyGroup.isTouching(knife)){
        gameState = END;
        gameOverSound.play();
        
        knife.addImage(gameOverImage);
        knife.x = 200;
        knife.y = 200;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
      }
    }
  }
  
  drawSprites();
  
  text("Score : "+ score,300,30);

}

function fruits(){
   if(World.frameCount %80 === 0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
     
     r = Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
   
    position = Math.round(random(1,4));
     
     if (position ==1 ){
       fruit.x = 400;
       fruit.velocityX = -(4+score/10);
     }
    else{
      if(position == 2){
        fruit.x = 0;
        fruit.velocityX = -(4+score/10);
      }
    }
 
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount %200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+score/10);
    monster.setLifetime = 50;   
    enemyGroup.add(monster);
  }
}
