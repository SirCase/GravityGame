function renderPlayer(context) {
  if (GAME.started) {
    handlePlayerMovement();
    if (P1.directionL && P1.directionR) { //Which way player is drawn
      P1.renderDirection = "L";
    } else if (P1.directionR && !P1.directionL) {
      P1.renderDirection = "R";
    }
    if (P1.jumping) { //What frame of the animation of the sprite sheet to be on
      if (P1.directionR || P1.directionL) {
        P1.currentFrame = 20 * P1.frameDuration;
      } else {
        P1.currentFrame = 0;
      }
    } else if (P1.directionL || P1.directionR) {
      if (P1.currentFrame < P1.totalFrames * P1.frameDuration && P1.currentFrame >= P1.runCutoff * P1.frameDuration) {
        P1.currentFrame++;
      } else {
        P1.currentFrame = P1.runCutoff * P1.frameDuration;
      }
    } else {
      if (P1.currentFrame < P1.runCutoff * P1.frameDuration - 1) {
        P1.currentFrame++;
      } else {
        P1.currentFrame = 0;
      }
    }
  }
  //drawRotatedPlayer(context, p1, P1.sheetWidth / P1.totalFrames * Math.floor(P1.currentFrame/P1.frameDuration),0,P1.sheetWidth / P1.totalFrames, P1.sheetHeight, (P1.width/2), (P1.height/2), P1.width, P1.height, Math.PI/2+BACKGROUND.direction * Math.PI/2);
  if (P1.renderDirection == "L") { //Draw player
    context.drawImage(P1.imageL, P1.sheetWidth / P1.totalFrames * Math.floor(P1.currentFrame / P1.frameDuration), 0, P1.sheetWidth / P1.totalFrames, P1.sheetHeight, P1.x - (P1.width / 2), P1.y - (P1.height / 2), P1.width, P1.height);
  } else /*if (P1.renderDirection == "R")*/ {
    context.drawImage(P1.imageR, P1.sheetWidth / P1.totalFrames * Math.floor(P1.currentFrame / P1.frameDuration), 0, P1.sheetWidth / P1.totalFrames, P1.sheetHeight, P1.x - (P1.width / 2), P1.y - (P1.height / 2), P1.width, P1.height);
  }
  if (GAME.hitboxMode){
    context.beginPath(); //Display player hitbox
    context.lineWidth = "1";
    context.strokeStyle = "red";
    context.rect(P1.x - P1.hitboxX / 2, P1.y - P1.height / 2, P1.hitboxX, P1.height);
    context.stroke();
  }
}
/*
function drawRotatedPlayer(context, image, sx, sy, dx, dy, x, y, width, height, angle) {
context.save();
	context.translate(P1.x, P1.y);
	context.rotate(Math.PI/2-angle);
	context.drawImage(image, sx, sy, dx, dy, x, y, width, height) ;
  context.restore();
}*/
function checkCollisions() {
  P1.xvel = 3; //Reset xvel in case it was set to 0 the previous time
  for (var i = 0; i < GAME.platforms.length; i++) {
    var p = GAME.platforms[i];
    if (BACKGROUND.direction == 2) { //Rotate numbers if necessary for calculations
      p.x *= -1;
      p.y *= -1;
    } else if (BACKGROUND.direction == 1) { //Right gravity
      var temp;
      var temp2;
      temp = p.x;
      p.x = -p.y;
      p.y = temp;
      temp2 = p.width;
      p.width = p.height;
      p.height = temp2;
    } else if (BACKGROUND.direction == 3) { //Left gravity
      var temp;
      var temp2;
      temp = p.y;
      p.y = -p.x;
      p.x = temp;
      temp2 = p.height;
      p.height = p.width;
      p.width = temp2;
    }

    if ((P1.x - P1.hitboxX / 2 < p.x + p.width / 2) && //Did it collide at all
      (P1.x + P1.hitboxX / 2 > p.x - p.width / 2) &&
      (P1.y - P1.height / 2 <= p.y + p.height / 2) &&
      (P1.y + P1.height / 2 >= p.y - p.height / 2)) {
      if (p.type == "l") { //Lava instantly kills
        P1.health = 0;
      } else if ((p.type == "sV" || p.type == "sH") && P1.damageTimer <= 0) { //Spikes make player take damage with cooldown
        P1.health -= 2;
        if (P1.health < 0) {
          P1.health = 0;
        }
        P1.damageTimer = 60;
      }
      if (P1.y - P1.height / 2 >= p.y + p.height / 2 + P1.yvel) { //Collision with bottom of platform
        //if (P1.x-P1.hitboxX/2 > p.x-p.width/2 && P1.x+P1.hitboxX/2 < p.x+p.width/2){ //Prevents clipping through floor in case of collisions with multiple platforms at the same time
        P1.y = p.y + p.height / 2 + P1.height / 2;
        P1.yvel = 1;
      } else if (P1.y + P1.height / 2 > p.y - p.height / 2 + P1.yvel) { //Collision with side of platform
        if (P1.x < p.x && P1.directionR) { //From left and moving right
          P1.xvel = 0;
          if (!GAME.flippingGravity) {
            P1.x = p.x - p.width / 2 - P1.hitboxX / 2;
          }
        } else if (P1.x > p.x && P1.directionL) { //From right and moving left
          P1.xvel = 0;
          if (!GAME.flippingGravity) {
            P1.x = p.x + p.width / 2 + P1.hitboxX / 2;
          }
        }
      } else { //Collision with top of platform
        GAME.canFlip = true;
        if (P1.jumpPressed) { //Jump
          P1.yvel = -P1.jumpStrength
          P1.jumping = true;
        } else { //Stand on platform
          P1.yvel = 0;
          P1.y = p.y - p.height / 2 - P1.height / 2;
          P1.jumping = false;
        }
      }
    }
    if (BACKGROUND.direction == 2) { //Undo rotated variables if necessary
      p.x *= -1;
      p.y *= -1;
    }

    if (BACKGROUND.direction == 1) { //Undo rotated variables if necessary
      var temp
      var temp2
      temp = p.y;
      p.y = -p.x;
      p.x = temp;
      temp2 = p.width;
      p.width = p.height;
      p.height = temp2;
    }
    if (BACKGROUND.direction == 3) { //Undo rotated variables if necessary
      var temp
      var temp2
      temp = p.x;
      p.x = -p.y;
      p.y = temp;
      temp2 = p.height;
      p.height = p.width;
      p.width = temp2;
    }

  }
}

function initializePlayer() { //Set initial values for player, called upon restarting game too
  P1.x = DOOR.x;
  P1.y = DOOR.y;
  P1.xvel = 3;
  P1.xacc = 0;
  P1.yvel = 0;
  P1.yacc = 0;
  P1.directionL = false;
  P1.directionR = false;
  P1.renderDirection = "R";
  P1.health = 10;
  P1.canMoveX = true;
  P1.damageTimer = 0;
}

function handlePlayerMovement() { //Called every frame, handles movement, gravity, calls collisions
  if (P1.canMoveX) {
    if (P1.directionL) { //Move Left
      P1.x -= P1.xvel;
    } else if (P1.directionR) { //Move right
      P1.x += P1.xvel;
    }
  }
  P1.yacc = GAME.gravity; //Move under gravity
  P1.yvel += P1.yacc;
  checkCollisions(); //Handle all enemy and platform collisions
  if (P1.damageTimer > 0 && P1.health > 0) { //Make damage indicator
    P1.damageTimer--;
    GAME.context.beginPath();
    GAME.context.lineWidth = "1";
    GAME.context.strokeStyle = "red";
    GAME.context.fillRect(-GAME.canvas.width / 2, -GAME.canvas.height / 2, GAME.canvas.width, P1.damageTimer); //Top
    GAME.context.fillRect(-GAME.canvas.width / 2, -GAME.canvas.height / 2, P1.damageTimer, GAME.canvas.height); //Left
    GAME.context.fillRect(-GAME.canvas.width / 2, GAME.canvas.height / 2 - P1.damageTimer, GAME.canvas.width, P1.damageTimer); //Bottom
    GAME.context.fillRect(GAME.canvas.width / 2 - P1.damageTimer, -GAME.canvas.height / 2, P1.damageTimer, GAME.canvas.height); //Right
    GAME.context.stroke();
  }
  P1.y += P1.yvel;
  if (P1.health == 0) {
    GAME.started = false;
  }
}

function renderBackground(context) { //Draws and updates frame of background animation
  context.clearRect(-GAME.canvas.width / 2, -GAME.canvas.height / 2, GAME.canvas.width, GAME.canvas.height);
  context.drawImage(BACKGROUND.image, BACKGROUND.width / BACKGROUND.totalFrames * Math.floor(BACKGROUND.currentFrame / BACKGROUND.frameDuration), 0, BACKGROUND.width / BACKGROUND.totalFrames, BACKGROUND.height, -GAME.canvas.width / 2, -GAME.canvas.height / 2, GAME.canvas.width, GAME.canvas.height);
  if (BACKGROUND.currentFrame < BACKGROUND.totalFrames * BACKGROUND.frameDuration - 1) {
    BACKGROUND.currentFrame++;
  } else {
    BACKGROUND.currentFrame = 0;
  }
}

function renderLava(context) { //Draws and updates frame of background animation
  if (LAVA.currentFrame < LAVA.totalFrames * LAVA.frameDuration - 1) {
    LAVA.currentFrame++;
  } else {
    LAVA.currentFrame = 0;
  }
}

function initializePlatforms() { //Platforms have types, "p" is platform, "l" is lava, "sV" is vertical spikes, "sH" is horizontal spikes
  if (GAME.level == 1) { //Make all of the platforms for level 1
    GAME.d1 = 0;
    GAME.d2 = 2;
    DOOR.x = -200;
    DOOR.y = GAME.canvas.height / 2 - 185 - DOOR.height / 2;
    //DOOR.x = -100;//Skip ahead
    //DOOR.y = 160;
    //DOOR.x = -125;//Skip ahead 2
    //DOOR.y = -83;
    //DOOR.x = 33;//Skip ahead 3
    //DOOR.y = -130;
    GAME.platforms.push(makePlatform(-GAME.canvas.width / 2 + 180, 0, 10, GAME.canvas.height - 360, "p")); //Left
    GAME.platforms.push(makePlatform(GAME.canvas.width / 2 - 180, 0, 10, GAME.canvas.height - 360, "p")); //Right
    GAME.platforms.push(makePlatform(0, -GAME.canvas.height / 2 + 180, GAME.canvas.height - 360, 10, "p")); //Top
    GAME.platforms.push(makePlatform(0, GAME.canvas.height / 2 - 180, GAME.canvas.width - 360, 10, "p")); //Bottom

    GAME.platforms.push(makePlatform(-57, GAME.canvas.width / 2 - 280, 450, 10, "p")); //First ceiling

    GAME.platforms.push(makePlatform(-60, GAME.canvas.width / 2 - 200, 120, 30, "sH")); //First spikes

    GAME.platforms.push(makePlatform(110, 210, 120, 30, "sH")); //Second spikes

    GAME.platforms.push(makePlatform(163, 166, 10, 30, "p")); //First wall
    GAME.platforms.push(makePlatform(163, 10, 10, 120, "p")); //Second wall

    GAME.platforms.push(makePlatform(123, -70, 318, 40, "l")); //First Lava
    GAME.platforms.push(makePlatform(223, -30, 30, 30, "p")); //First platform
    GAME.platforms.push(makePlatform(100, 135, 30, 30, "p")); //second platform
    GAME.platforms.push(makePlatform(93, 166, 130, 30, "l")); //second Lava


    GAME.platforms.push(makePlatform(-30, 38, 10, 175, "p")); //third wall
    GAME.platforms.push(makePlatform(-10, 10, 30, 120, "sV")); //Third spikes

    GAME.platforms.push(makePlatform(-75, 120, 80, 10, "p")); //second ceiling

    GAME.platforms.push(makePlatform(-120, 46, 10, 158, "p")); //fourth wall
    GAME.platforms.push(makePlatform(-170, -20, 90, 20, "l")); //third Lava
    GAME.platforms.push(makePlatform(-170, 0, 20, 20, "p")); //third platform

    GAME.platforms.push(makePlatform(-230, 172, 105, 20, "l")); //fourth Lava
    GAME.platforms.push(makePlatform(-272, -60, 20, 444, "l")); //fifth Lava
    GAME.platforms.push(makePlatform(10, -272, 544, 20, "l")); //sixth Lava
    GAME.platforms.push(makePlatform(-175, -252, 40, 20, "p")); //fourth platform

    GAME.platforms.push(makePlatform(-117, -212, 30, 100, "l")); //seventh Lava
    GAME.platforms.push(makePlatform(-125, -46, 30, 30, "p")); //fifth platform
    GAME.platforms.push(makePlatform(-75, 105, 70, 18, "sH")); //fourth spikes

    GAME.platforms.push(makePlatform(-40, -250, 90, 20, "p")); //sixth platform
    GAME.platforms.push(makePlatform(35, -100, 50, 15, "p")); //seventh platform

    GAME.platforms.push(makePlatform(-16, -99, 40, 30, "l")); //eighth Lava
    GAME.platforms.push(makePlatform(30, -227, 20, 70, "l")); //ninth Lava

    GAME.platforms.push(makePlatform(120, -125, 20, 70, "l")); //tenth Lava
    GAME.platforms.push(makePlatform(210, -100, 120, 15, "p")); //eighth platform
  }
  if (GAME.level == 2) {
    GAME.d1 = 0;
    GAME.d2 = 1;
    DOOR.x = -250;
    GAME.platforms.push(makePlatform(-GAME.canvas.width / 2 + 180, 0, 10, GAME.canvas.height - 360, "p")); //Left
    GAME.platforms.push(makePlatform(GAME.canvas.width / 2 - 180, 0, 10, GAME.canvas.height - 360, "p")); //Right
    GAME.platforms.push(makePlatform(0, -GAME.canvas.height / 2 + 180, GAME.canvas.height - 360, 10, "p")); //Top
    GAME.platforms.push(makePlatform(0, GAME.canvas.height / 2 - 180, GAME.canvas.width - 360, 10, "p")); //Bottom

    GAME.platforms.push(makePlatform(-240, 175, 100, 30, "sH"));
    GAME.platforms.push(makePlatform(-140, 175, 75, 30, "sH"));
    GAME.platforms.push(makePlatform(-200, 260, 15, 60, "p"));
    GAME.platforms.push(makePlatform(-120, 170, 15, 80, "p"));
    GAME.platforms.push(makePlatform(-40, 250, 20, 80, "l"));
    GAME.platforms.push(makePlatform(-40, 75, 15, 475, "p"));

    GAME.platforms.push(makePlatform(-240, 155, 80, 15, "p"));
    GAME.platforms.push(makePlatform(-200, -45, 15, 250, "p"));
    GAME.platforms.push(makePlatform(-275, 40, 35, 15, "p"));
    GAME.platforms.push(makePlatform(-200, -50, 30, 80, "sV"));
    GAME.platforms.push(makePlatform(-200, -50, 70, 20, "p"));

    GAME.platforms.push(makePlatform(-70, -170, 270, 10, "l"));
    GAME.platforms.push(makePlatform(0, -190, 50, 40, "p"));
    GAME.platforms.push(makePlatform(150, -190, 30, 200, "sV"));
    GAME.platforms.push(makePlatform(150, 10, 30, 200, "sV"));

    GAME.platforms.push(makePlatform(120, -100, 60, 10, "l"));
    GAME.platforms.push(makePlatform(135, -130, 10, 60, "p"));
    GAME.platforms.push(makePlatform(0, -50, 90, 50, "p"));
    GAME.platforms.push(makePlatform(100, 30, 90, 10));
    GAME.platforms.push(makePlatform(130, 0, 10, 50));
    GAME.platforms.push(makePlatform(130, 70, 10, 70, "l"));
    GAME.platforms.push(makePlatform(0, 90, 90, 10, "l"));

    GAME.platforms.push(makePlatform(90, 150, 250, 10));

  }
}

function renderPlatforms(context) {
  for (var i = 0; i < GAME.platforms.length; i++) { //Pick which sprite to draw
    var p = GAME.platforms[i];
    var image;
    if (p.type == "lH" || p.type=="lV" || p.type == "l") {
      image = GAME.lavaSprite;
    } else if (p.type == "sH" || p.type == "sV") {
      image = GAME.spikeSprite;
    } else {
      image = GAME.platformSprite;
    }
    if (p.type == "sH") { //If the platform is a spike, draw 4 of them
      context.drawImage(image, p.x - p.width / 2, p.y - p.height / 2, p.width / 4, p.height);
      context.drawImage(image, p.x - p.width / 2 + p.width / 4, p.y - p.height / 2, p.width / 4, p.height);
      context.drawImage(image, p.x - p.width / 2 + 2 * p.width / 4, p.y - p.height / 2, p.width / 4, p.height);
      context.drawImage(image, p.x - p.width / 2 + 3 * p.width / 4, p.y - p.height / 2, p.width / 4, p.height);
    } else if (p.type == "lH") {
      var number = Math.floor(p.width / 20);
      var remainder = (p.width % 20) / number;
      for (var i = 0; i < number; i++) {
        context.drawImage(image, p.width / LAVA.totalFrames * Math.floor(LAVA.currentFrame / LAVA.frameDuration), 0, p.width / LAVA.totalFrames, p.height, p.x - p.width / 2, p.y - p.height / 2, 20 + remainder, p.height);

      }
    } else if (p.type == "sV") { //If the platform is a spike, draw 4 of them
      context.drawImage(image, p.x - p.width / 2, p.y - p.height / 2, p.width, p.height / 4);
      context.drawImage(image, p.x - p.width / 2, p.y - p.height / 2 + p.height / 4, p.width, p.height / 4);
      context.drawImage(image, p.x - p.width / 2, p.y - p.height / 2 + 2 * p.height / 4, p.width, p.height / 4);
      context.drawImage(image, p.x - p.width / 2, p.y - p.height / 2 + 3 * p.height / 4, p.width, p.height / 4);

    } else { //Otherwise, just draw the platform
      context.drawImage(image, p.x - p.width / 2, p.y - p.height / 2, p.width, p.height);
    }
    if (GAME.hitboxMode){
      context.beginPath(); //Display player hitbox
      context.lineWidth = "1";
      context.strokeStyle = "red";
      context.rect(p.x - p.width / 2, p.y - p.height / 2,p.width, p.height);
      context.stroke();
    }
  }
}

function renderDoor(context) { //Draw starting and ending doors
  context.drawImage(DOOR.image, DOOR.x - DOOR.width / 2, DOOR.y - DOOR.height / 2, DOOR.width, DOOR.height);
  context.drawImage(DOOR.image, DOOR.exitX - DOOR.width / 2, DOOR.exitY - DOOR.height / 2, DOOR.width, DOOR.height);

}

function runGame() {
  var context = GAME.context
  if (GAME.started) {
    context.font = "30px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.save();
    context.rotate(Math.PI / 2 + (BACKGROUND.direction * Math.PI / 2));
    renderBackground(context);
    renderPlatforms(context);
    renderDoor(context);
    context.restore();
    context.save();
    context.rotate(Math.PI / 2);
    renderPlayer(context);
    //context.fillText("cj: " + P1.canJump + " xvel: " + P1.xvel + " cmx: " + P1.canMoveX, 0, 200);
    //context.fillText("x: " + GAME.platforms[0].x + " y: " + GAME.platforms[0].y + " w: " + GAME.platforms[0].width + " h: " + GAME.platforms[0].height, 0, 250);
    var healthYPos = GAME.canvas.height / 2 - 5;
    if (P1.damageTimer > 0) {
      context.font = "" + (20 + P1.damageTimer) + "px Arial";
      healthYPos = 25;
    }
    context.fillText("Health: " + P1.health, 0, healthYPos);
    context.restore();
  } else {
    context.save();
    context.rotate(Math.PI / 2 + (BACKGROUND.direction * Math.PI / 2));
    renderBackground(context);
    renderPlatforms(context);
    renderDoor(context);
    renderLava(context);
    context.restore();
    context.save();
    context.rotate(Math.PI / 2);
    renderPlayer(context);
    context.font = "80px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("Game Over: ", 0, -20);
    context.fillText("Press R to try again", 0, 80);
    context.restore();
  }
  context.restore();
  window.requestAnimationFrame(runGame);
}
