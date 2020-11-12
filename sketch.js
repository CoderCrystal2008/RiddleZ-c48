var player, ground;
var cave;
var flag = 0;
var wizard;
var touched = 0;
var buttonsGrp;

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

  buttonsGrp = new Group();



}

function draw(){
  
  
  if(keyWentDown(RIGHT_ARROW)){
    player.velocityX = 2;
  }

  if(keyWentUp(RIGHT_ARROW)){
    player.velocityX = 0;
  }

  if(gameState === "START"){
    background("green");
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
    } else if (touched === 3){
      fill(0);
      text("The world is in danger by a vicious beast! He is looking for sacred keys! If he gets a hold of the keys, he will wreak havoc on the world! You have been chosen by the gods to stop him by hiding the keys in plain sight! Centuries ago, the gods assigned guardians of the keys, who will give any them to any worthy one. The villain is smart, so you have to hurry up! You have to make the gods proud of you by answering this riddle!",200,200,200,100);
      
    }

    if(touched === 4){
      wizard.visible = false;
      player.visible = false;
      ground.visible = false;
      fill(0);
      text("What can you put in your left hand that you can't in your right hand?",100,100);
      var button = createSprite(300,300,100,50);
      button.shapeColor = "red";
      var button1 = createSprite(100,300,100,50);
      button1.shapeColor = "green";
      var button2 = createSprite(100,390,100,50);
      button2.shapeColor = "blue";
      var button3 = createSprite(300,390,100,50);
      button3.shapeColor = "purple";

      buttonsGrp.add(button);
      buttonsGrp.add(button1);
      buttonsGrp.add(button2);
      buttonsGrp.add(button3);


      if(mousePressedOver(button3)){
        gameState = "ADVENTURE";
        wizard.visible = true;
        ground.visible = true;
        player.visible = true;
        buttonsGrp.destroyEach();
        touched = 5;
        
      }



    }

    






      
    
    
  }

  if(gameState === "ADVENTURE"){
    background(225);
  }
  
  
  
  drawSprites();

  if(flag === 0){
    fill(0);
    text("Press the right arrow to go right! You can't go left because there's NO GOING BACK!",100,100);
  }
  if(touched === 4){
    text("Your right hand",250,390);
    text("Air",250,300);
    text("Nothing",50,300);
    text("I don't know",50,390);
  }
 
}

function mouseClicked(){
  if(touched === 1){
    touched = 2;
  }else if (touched === 2){
    touched = 3;
  } else if(touched === 3){
    touched = 4;
  }
  
}
