var player, ground;
var cave;
var flag = 0;
var wizard;
var touched = 0;

//introduces game states
var gameState = "START";

function setup(){
  createCanvas(600,600);
  player = createSprite(50,570,10,10);
  ground = createSprite(300,580,600,10);
  cave = createSprite(590,525,100,100);

  player.shapeColor = "black";
  ground.shapeColor = "brown";
  cave.shapeColor = rgb(100,100,100);



}

function draw(){
  background("green");
  
  if(keyWentDown(RIGHT_ARROW)){
    player.velocityX = 2;
  }

  if(keyWentUp(RIGHT_ARROW)){
    player.velocityX = 0;
  }

  if(gameState === "START"){
    if(player.isTouching(cave)){
      flag = 1;
      player.x = 50;
      cave.destroy();
      wizard = createSprite(500,570,10,10);
      wizard.shapeColor = "purple";
      gameState = "CAVE";
    }
  }
  

  if(gameState === "CAVE"){
    background(225);
    
    if(player.isTouching(wizard)){
      player.scale = 5;
      player.y = 300;
      touched = 1;

      wizard.scale = 5;
      wizard.y = 300;
    }

    if(touched === 1){
      player.x = 50;
      fill(0);
      text("Who are you?",50,200);
    } else if (touched === 2){
      fill(0);
      text("That is not important. What is important is the fate of the world!",200,200);
    }



      
    
    
  }

  
  
  drawSprites();

  if(flag === 0){
    fill(0);
    text("Press the right arrow to go right! You can't go left because there's NO GOING BACK!",100,100);
  }
 
}

function mouseClicked(){
  if(touched === 1){
    touched = 2;
  } 
  
}
