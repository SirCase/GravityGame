
function renderPlayer(context) {
  if (GAME.started){
    handlePlayerMovement();
  if  (P1.directionL && P1.directionR){
    P1.renderDirection = "L";
  }
  else if (P1.directionR && ! P1.directionL){
    P1.renderDirection = "R";
  }
  if(P1.jumping){
    P1.currentFrame = 20 * P1.frameDuration;
  }
  else if (P1.directionL || P1.directionR){
    if (P1.currentFrame < P1.totalFrames * P1.frameDuration  && P1.currentFrame >= P1.runCutoff * P1.frameDuration){
      P1.currentFrame++;
    }
    else{
      P1.currentFrame = P1.runCutoff * P1.frameDuration;
    }
  }
  else{
    if (P1.currentFrame < P1.runCutoff * P1.frameDuration-1){
      P1.currentFrame++;
    }
    else{
      P1.currentFrame = 0;
    }
  }
}
  //drawRotatedPlayer(context, p1, P1.sheetWidth / P1.totalFrames * Math.floor(P1.currentFrame/P1.frameDuration),0,P1.sheetWidth / P1.totalFrames, P1.sheetHeight, (P1.width/2), (P1.height/2), P1.width, P1.height, Math.PI/2+BACKGROUND.direction * Math.PI/2);
  if (P1.renderDirection == "L"){
    context.drawImage(P1.imageL, P1.sheetWidth / P1.totalFrames * Math.floor(P1.currentFrame/P1.frameDuration),0,P1.sheetWidth / P1.totalFrames, P1.sheetHeight, P1.x-(P1.width/2), P1.y-(P1.height/2), P1.width, P1.height);
  }
  else /*if (P1.renderDirection == "R")*/{
    context.drawImage(P1.imageR, P1.sheetWidth / P1.totalFrames * Math.floor(P1.currentFrame/P1.frameDuration),0,P1.sheetWidth / P1.totalFrames, P1.sheetHeight, P1.x-(P1.width/2), P1.y-(P1.height/2), P1.width, P1.height);
  }
  context.beginPath();
  context.lineWidth = "1";
  context.strokeStyle = "red";
  context.rect(P1.x-P1.hitboxX/2, P1.y-P1.height/2, P1.hitboxX, P1.height);
  context.stroke();
}
/*
function drawRotatedPlayer(context, image, sx, sy, dx, dy, x, y, width, height, angle) {
context.save();
	context.translate(P1.x, P1.y);
	context.rotate(Math.PI/2-angle);
	context.drawImage(image, sx, sy, dx, dy, x, y, width, height) ;
  context.restore();
}*/
function checkCollisions(){
  P1.xvel = 3; //Reset xvel in case it was set to 0
  if (BACKGROUND.direction == 0){
    for (var i = 0; i < GAME.platforms.length; i++){
      var p = GAME.platforms[i];
      if ((P1.x - P1.hitboxX/2 <= p.x+p.width/2) &&
       (P1.x + P1.hitboxX/2 >= p.x-p.width/2) &&
       (P1.y-P1.height/2 <= p.y+p.height/2) &&
       (P1.y + P1.height/2 >= p.y-p.height/2)){
         if (p.type == "l"){
           P1.health = 0;
         }
         else if ((p.type == "sU" || p.type == "sD" || p.type == "L" || p.type == "sR") && P1.damageTimer <= 0){
           P1.health -= 2;
           if (P1.health < 0){
             P1.health = 0;
           }
           P1.damageTimer = 60;
         }
         if (P1.y-P1.height/2 >= p.y + p.height/2+P1.yvel){ //Collision with bottom of platform
           if (!(P1.y+P1.height/2 > p.y - p.height/2 + P1.yvel)){ //Prevents clipping through floor in case of collisions with multiple platforms at the same time
             P1.y = p.y+p.height/2 + P1.height/2;
             P1.yvel = 1;
           }
         }
         else if (P1.y+P1.height/2 > p.y - p.height/2 + P1.yvel){ //Collision with side of platform
           if (P1.x < p.x && P1.directionR){ //From left and moving right
             P1.xvel = 0;
             P1.x = p.x - p.width/2 - P1.hitboxX/2;
           }
           else if (P1.x > p.x && P1.directionL){//From right and moving left
             P1.xvel = 0;
             P1.x = p.x + p.width/2 + P1.hitboxX/2;
           }
         }
         else{ //Collision with top of platform
           if (P1.jumpPressed){ //Jump
             P1.yvel = -P1.jumpStrength
             P1.jumping = true;
           }
           else{ //Stand on platform
             P1.yvel = 0;
             P1.y = p.y-p.height/2 - P1.height/2;
             P1.jumping = false;
           }
        }
      }
    }
  }
}
function initializePlayer(){
  P1.x = -100;
  P1.y = 0;
  P1.xvel = 3;
  P1.xacc = 0;
  P1.yvel = 0;
  P1.yacc = 0;
  P1.directionL = false;
  P1.directionR = false;
  P1.renderDirection = "R";
  P1.health = 10;
  P1.canMoveX = true;
}
function handlePlayerMovement() {
  if (P1.canMoveX){
    if (P1.directionL){
      P1.x -= P1.xvel;
    }
    else if (P1.directionR){
      P1.x += P1.xvel;
    }
  }
  P1.yacc = GAME.gravity;
  P1.yvel += P1.yacc;
  checkCollisions();
  if (P1.damageTimer > 0){
    var canvas = document.getElementById('mainCanvas');
    var context = canvas.getContext('2d');
    P1.damageTimer--;
    context.beginPath();
    context.lineWidth = "1";
    context.strokeStyle = "red";
    context.fillRect(-GAME.canvas.width/2, -GAME.canvas.height/2, GAME.canvas.width, P1.damageTimer);//Top
    context.fillRect(-GAME.canvas.width/2, -GAME.canvas.height/2, P1.damageTimer, GAME.canvas.height);//Left
    context.fillRect(-GAME.canvas.width/2, GAME.canvas.height/2-P1.damageTimer, GAME.canvas.width, P1.damageTimer);//Bottom
    context.fillRect(GAME.canvas.width/2-P1.damageTimer, -GAME.canvas.height/2, P1.damageTimer, GAME.canvas.height);//Right
    context.stroke();
  }
  P1.y += P1.yvel;
  if (P1.x > GAME.canvas.width/2 - P1.hitboxX/2){
      P1.x = GAME.canvas.width/2 - P1.hitboxX/2;
  }
  if (P1.x - P1.hitboxX/2 <-GAME.canvas.width/2){
    P1.x = -GAME.canvas.width/2 + P1.hitboxX/2;
  }
  if (P1.health == 0){
    GAME.started = false;
  }
}
function renderBackground(context){
  //context.clearRect(-GAME.canvas.width/2, -GAME.canvas.height/2, GAME.canvas.width, GAME.canvas.height);
  context.drawImage(BACKGROUND.image,BACKGROUND.width / BACKGROUND.totalFrames * Math.floor(BACKGROUND.currentFrame/BACKGROUND.frameDuration),0,BACKGROUND.width / BACKGROUND.totalFrames, BACKGROUND.height,-GAME.canvas.width/2, -GAME.canvas.height/2, GAME.canvas.width, GAME.canvas.height);
  if (BACKGROUND.currentFrame < BACKGROUND.totalFrames * BACKGROUND.frameDuration){
    BACKGROUND.currentFrame++;
  }
  else{
    BACKGROUND.currentFrame = 0;
  }
  context.beginPath();
  context.lineWidth = "1";
  context.strokeStyle = "red";
  context.rect(-GAME.canvas.width/2, -GAME.canvas.height/2, GAME.canvas.width/2, GAME.canvas.height/2);
  context.rect(0, -GAME.canvas.height/2, GAME.canvas.width/2, GAME.canvas.height/2);
  context.rect(-GAME.canvas.width/2,0, GAME.canvas.width/2, GAME.canvas.height/2);
  context.rect(0,0, GAME.canvas.width/2, GAME.canvas.height/2);

  context.stroke();
}
function initializePlatforms(){
  /*for (var i = 0; i < 5; i++){
    GAME.platforms.push(makePlatform(-GAME.canvas.width/2 + 100 * i, 450, 20, 10));
  }*/
  GAME.platforms.push(makePlatform(-100, 300, 500, 5, "p"));
  GAME.platforms.push(makePlatform(-100, 230, 100, 50, "p"));
  GAME.platforms.push(makePlatform(-150, 190, 200, 30, "sU"));
//  GAME.platforms.push(makePlatform(0, 425, 20, 10));
}
function renderPlatforms(context){
  for (var i = 0; i < GAME.platforms.length; i++){
    var p = GAME.platforms[i];
    var image;
    if (p.type == "l"){
      image = GAME.lavaSprite;
    }
    else if (p.type == "sU"){
      image = GAME.spikeUSprite;
    }
    else if (p.type == "sD"){
      image = GAME.spikeDSprite;
    }
    else if (p.type == "sL"){
      image = GAME.spikeLSprite;
    }
    else if (p.type == "sR"){
      image = GAME.spikeRSprite;
    }
    else{
      image = GAME.platformSprite;
    }
    if(p.type == "sU" || p.type == "sD" || p.type == "L" || p.type == "sR"){
      p.x-p.width/2, p.y-p.height/2, p.width, p.height
      var startX = p.x-p.width/2;
      var startY = p.y-p.height/2;
      var number;
      var remainder;
      if (p.type == "sU" || p.type == "sD"){
        number = Math.round(p.width/10);
        remainder = p.width%10/number;
        for (var i = 0; i < number; i++){
          context.drawImage(image, startX + (10-remainder) * i, startY, 10-remainder, p.height);
        }
      }
      else{
        number = Math.round(p.height/10);
        remainder = p.width%10/number;
        for (var i = 0; i < number; i++){
          context.drawImage(image, startX, startY + (10-remainder) * i, p.width, 10-remainder);
        }
      }

    }
    else{
      context.drawImage(image, p.x-p.width/2, p.y-p.height/2, p.width, p.height);
    }
  }
}
function runGame() {
  var canvas = document.getElementById('mainCanvas'); //CALL THESE EVERY FRAME??????
  var context = canvas.getContext('2d');
  if (GAME.started) {
    context.font = "30px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.save();
    context.rotate(Math.PI/2+(BACKGROUND.direction * Math.PI/2));
    renderBackground(context);
    renderPlatforms(context);
    context.restore();
    context.save();
    context.rotate(Math.PI/2);
    renderPlayer(context);
    //context.fillText("cj: " + P1.canJump + " xvel: " + P1.xvel + " cmx: " + P1.canMoveX, 0, 200);
    //context.fillText("x: " + GAME.platforms[0].x + " y: " + GAME.platforms[0].y + " w: " + GAME.platforms[0].width + " h: " + GAME.platforms[0].height, 0, 250);
    var healthYPos = GAME.canvas.height/2 -5;
    if (P1.damageTimer > 0){
      context.font = "80px Arial";
      healthYPos = 25;
    }
    context.fillText("Health: " + P1.health, 0, healthYPos);
    context.restore();
  }
  else{
    context.save();
    context.rotate(Math.PI/2+(BACKGROUND.direction * Math.PI/2));
    renderBackground(context);
    renderPlatforms(context);
    context.restore();
    context.save();
    context.rotate(Math.PI/2);
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
