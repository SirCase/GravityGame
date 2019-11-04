
function renderPlayer(context) {
  var canvas = document.getElementById('canvas');
  if (GAME.started){
    handlePlayerMovement();
  }
  var p1 = new Image();
    p1.src = '/Sprites/player' + P1.renderDirection + '.png';
  if (P1.direction == "L" || P1.direction == "R"){
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
  context.drawImage(p1,P1.sheetWidth / P1.totalFrames * Math.floor(P1.currentFrame/P1.frameDuration),0,P1.sheetWidth / P1.totalFrames, P1.sheetHeight, P1.x-(P1.width/2), P1.y-(P1.height/2), P1.width, P1.height);
}
function initializePlayer(){
  P1.x = GAME.canvas.width/2;
  P1.y = GAME.canvas.height/2;
  P1.xvel = 5;
  P1.xacc = 0;
  P1.yvel = 0;
  P1.yacc = 0;
  P1.direction = "0";
  P1.renderDirection = "R";
}
function handlePlayerMovement() {
  if (P1.direction == "L"){
    P1.x -= P1.xvel;
  }
  else if (P1.direction == "R"){
    P1.x += P1.xvel;
  }
  P1.yacc = GAME.gravity;
  P1.canJump = false;
  P1.y += P1.yvel;
  P1.yvel += P1.yacc;
  if (P1.x > GAME.canvas.width - P1.width/2){
      P1.x = GAME.canvas.width - P1.width/2;
  }
  if (P1.x - P1.width/2 <0){
    P1.x = P1.width/2;
  }
  if (P1.y + P1.height/2 >= GAME.canvas.height){
    P1.y = GAME.canvas.height-P1.height/2;
    P1.yvel = 0;
    P1.canJump = true;
  }
}
function renderBackground(context){
  var background = new Image();
  background.src = "Sprites/background" + BACKGROUND.direction + ".png";
  context.drawImage(background,BACKGROUND.width / BACKGROUND.totalFrames * Math.floor(BACKGROUND.currentFrame/BACKGROUND.frameDuration),0,BACKGROUND.width / BACKGROUND.totalFrames, BACKGROUND.height,0, 0, GAME.canvas.width, GAME.canvas.height);
  if (BACKGROUND.currentFrame < BACKGROUND.totalFrames * BACKGROUND.frameDuration){
    BACKGROUND.currentFrame++;
  }
  else{
    BACKGROUND.currentFrame = 0;
  }
}

function runGame() {
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  if (GAME.started) {
    renderBackground(context);
    renderPlayer(context);
    context.font = "30px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("x: " + P1.x + " y: " + P1.y + " xvel: " + P1.xvel + " yvel: " + P1.yvel + " cj: " + P1.canJump, GAME.canvas.width/2, 200);
  }
  else{
    renderBackground(context);
    context.font = "30px Arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText("Game Over: " + GAME.death, GAME.canvas.width/2, 200);
    context.fillText("Press R to try again", GAME.canvas.width/2, 260);
  }
  window.requestAnimationFrame(runGame);
}
window.requestAnimationFrame(runGame);
