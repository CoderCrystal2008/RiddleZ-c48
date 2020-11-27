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
var bg1Img, eraserImg, hintImg;
var caveImg;
var wizardImg, guardian1Img;

//introduces game states
var gameState = "START";

//creates the background
var bg;

//creates the image of the key
var keyImg;

function preload(){
  boyImg = loadImage("images/boy2.png");
  girlImg = loadImage("images/Girl.png");

  boyRunningImg = loadAnimation("NewBoy/tile000.png","NewBoy/tile001.png","NewBoy/tile002.png");
  girlRunningImg = loadAnimation("NewGirl/tile000.png","NewGirl/tile001.png","NewGirl/tile002.png");

  bg1Img = loadImage("images/bg1.png");

  eraserImg = loadImage("images/eraser.png");
  hintImg = loadImage("images/hint.png");

  caveImg = loadImage("images/cave.png");

  wizardImg = loadImage("images/wizard.png");
  guardian1Img = loadImage("images/guardian1.png");

  keyImg = loadImage("images/key.png");
}
function setup(){
  createCanvas(600,600);
  player = createSprite(50,520,10,10);
  player.addImage("boyImg",boyImg);
  player.addImage("girlImg",girlImg);
  player.addAnimation("boyRunningImg",boyRunningImg);
  player.addAnimation("GirlRunningImg",girlRunningImg);
  ground = createSprite(300,580,600,10);

  cave = createSprite(580,465,100,100);
  cave.addImage("caveImg",caveImg);
  cave.scale = 0.75;

  guardian1 = createSprite(200,200,10,10);
  guardian1.addImage("guardian1Img",guardian1Img);

  player.visible = false;
  ground.visible = false;
  cave.visible = false;
  guardian1.visible = false;

  player.shapeColor = "black";
  ground.shapeColor = "brown";
  cave.shapeColor = rgb(100,100,100);

  bg = createSprite(300,300,600,600);
  bg.visible = false;

  buttonsGrp = new Group();
}

function draw(){
  console.log(gameState);

  if(gameState !== "START" && keyWentDown(RIGHT_ARROW)){
    player.velocityX = 2;
    if(gender === "m"){
      player.changeAnimation("boyRunningImg",boyRunningImg);
    } else if(gender === "f"){
      player.changeAnimation("GirlRunningImg",girlRunningImg);
    }
    
  }

  if(keyWentUp("RIGHT_ARROW")){
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
      wizard.addImage("wizardImg",wizardImg);
      wizard.scale = 0.2;
      gameState = "CAVE";
    }
  }
  

  if(gameState === "CAVE"){
    background(225);
    console.log(gender);
    
    if(player.isTouching(wizard)){
      player.scale = 0.75;
      player.y = 300;
      touched = 1;

    
      wizard.y = 300;
      text("Press the right arrow to go ahead!",450,450);
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

      text("You are indeed worthy! I will give you two magical objects that will make it easier for you to answer the riddles!",200,200,200,200);
      text("The eraser you see can eradicate one wrong answer whereas the exclamation coin   one can give you a hint! But use wisely becasue your uses are limited!",200,300,300,300);
  
      wrongEradicator = createSprite(50,100,50,50);
      wrongEradicator.addImage("eraserImg",eraserImg);
      wrongEradicator.scale = 0.2;
  
      hintGiver = createSprite(150,100,50,50);
      hintGiver.addImage("hintImg",hintImg);
      hintGiver.scale = 0.2;
      
      player.scale = 1;
      wizard.scale = 0.2;
  
      
      player.y = 520;
  
      
      
      touched = 0;
  
      wizard.x = 500;
      wizard.y = 570;
  
      
  
      if(keyWentDown("RIGHT_ARROW")){
        player.velocityX = 2;
      }

      if(keyWentUp("RIGHT_ARROW")){
        player.velocityX = 0;
      }
  
    if(player.x >= 600){
      player.x = 50;
      wizard.destroy();
      guardian1.visible = true;
      guardian1.x = 500;
      guardian1.y = 570;
      guardian1.shapeColor = "blue";
      gameState = "FIRST";
      touched = 6;
    } 
  }

  if(gameState === "FIRST"){
    if(guardian1.visible === true){
      background("pink");
    }
    if(player.isTouching(guardian1)){
      player.visible = false;
      guardian1.visible = false;

      fill(0);
      text("What is a dress that can't be worn?",300,250);
    }
    if(mousePressedOver(button)){
      gameState = "ADVENTURE2";
       buttonsGrp2.destroyEach();
      player.visible = true;
      guardian1.visible = true;
      touched = 7;
      
    }
  }

  if(gameState === "ADVENTURE2"){
    fill(0);
    text("You are worthy! Take this key and use it to save the world. Use it wisely.",300,300);
    var key = createSprite(300,350,10,10);
    key.addImage("keyImg",keyImg);
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

  if(touched === 6){
    text("Nothing",250,390);
    text("Address",250,300);
    text("I don't know",50,300);
    text("A dress that can't be worn",50,390);

    var buttonsGrp2 = new Group();

      var button = createSprite(300,300,100,50);
      button.shapeColor = "red";
      var button1 = createSprite(100,300,100,50);
      button1.shapeColor = "green";
      var button2 = createSprite(100,390,100,50);
      button2.shapeColor = "blue";
      var button3 = createSprite(300,390,100,50);
      button3.shapeColor = "purple";

      buttonsGrp2.add(button);
      buttonsGrp2.add(button1);
      buttonsGrp2.add(button2);
      buttonsGrp2.add(button3);

      if(mousePressedOver(wrongEradicator)){
        button1.destroy();
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
