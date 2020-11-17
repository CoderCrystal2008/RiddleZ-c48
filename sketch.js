var player, ground;
var cave;
var flag = 0;
var wizard;
var touched = 0;
var buttonsGrp;
var wrongEradicator, hintGiver;

var gender;

var guardian1;

//creates the images
var boyImg, girlImg;
var boyRunningImg, girlRunningImg;

//introduces game states
var gameState = "START";

function preload(){
  boyImg = loadImage("boy2.png");
  girlImg = loadImage("Girl.png");

  boyRunningImg = loadImage("boyRunningImg.png");
  girlRunningImg = loadImage("GirlRunning.png");
}
function setup(){
  createCanvas(600,600);
  player = createSprite(50,570,10,10);
  player.addImage("boyImg",boyImg);
  player.addImage("girlImg",girlImg);
  player.addImage("boyRunningImg",boyRunningImg);
  player.addImage("GirlRunning.png",girlRunningImg);
  ground = createSprite(300,580,600,10);

  cave = createSprite(590,525,100,100);

  guardian1 = createSprite(200,200,50,50);

  player.visible = false;
  ground.visible = false;
  cave.visible = false;
  guardian1.visible = false;

  player.shapeColor = "black";
  ground.shapeColor = "brown";
  cave.shapeColor = rgb(100,100,100);

  buttonsGrp = new Group();
}

function draw(){
  

  if(gameState !== "START" && keyWentDown(RIGHT_ARROW)){
    player.velocityX = 2;
    if(gender === "m"){
      player.changeImage("boyRunningImg",boyRunningImg);
    } else if(gender === "f"){
      player.changeImage("GirlRunning.png",girlRunningImg);
    }
    
  }

  if(keyWentUp(RIGHT_ARROW)){
    player.velocityX = 0;
  }

  if(gameState === "START"){
    background("purple");
    chooseGender();
  }

  if(gameState === "PLAY" ){
    background("green");
    player.visible = true;
    ground.visible = true;
    cave.visible = true;
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
      text("The world is in danger by a vicious beast! He is looking for sacred keys! If he gets a hold of the keys, he will wreak havoc on the world! You have been chosen by the gods to stop him by hiding the keys in plain sight! Centuries ago, the gods assigned guardians of the keys, who will give any them to any worthy one. The villain is smart, so you have to hurry up! You have to make the gods proud of you by answering this riddle!",200,200,300,300);
      
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
    fill(0);
    text("Press the right arrow to go ahead!",450,450);
    if(player.x >= 600){
      guardian1.visible = true;
      guardian1.x = 500;
      guardian1.y = 570;
      guardian1.shapeColor = "blue";
    }
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
  if(touched === 5){
    fill(0);
    text("You are indeed worthy! I will give you two magical objects that will make it easier for you to answer the riddles!",200,200,200,200);
    text("The red one you see can eradicate one wrong answer whereas the green one can give you a hint! But use wisely becasue your uses are limited!",200,300,300,300);

    wrongEradicator = createSprite(50,100,50,50);
    wrongEradicator.shapeColor = "red";

    hintGiver = createSprite(100,100,50,50);
    hintGiver.shapeColor = "green";
    
    player.scale = 1;
    wizard.scale = 1;

    player.x = 50;
    player.y = 570;
    
    touched = 0;

    wizard.x = 500;
    wizard.y = 570;

    player.velocityX = 2;

    if(keyDown("RIGHT_ARROW")){
      player.velocityX = 3;
    }

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

function chooseGender(){
  fill(0);
  text("Press M for male and F for female",300,300);
  image(boyImg,200,200,200,200);
  image(girlImg,400,400,200,200);
  if(keyDown("m")){
    gameState = "PLAY";
    gender = "m";
  } 
   if(keyDown("f")){
    player.changeImage("girlImg",girlImg)
    gameState = "PLAY";
    gender = "f";
  }

}
