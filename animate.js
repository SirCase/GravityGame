
function renderPlayer(context) {
  var canvas = document.getElementById('canvas');
  if (GAME.started){
    handlePlayerMovement();
  }
  var p1 = new Image();
  if (P1.renderDirection == "L")
    p1.src = '/Sprites/playerL.png';
    if (P1.direction == "L"){
      if (P1.currentFrame < P1.totalFrames * P1.frameDuration  || P1.currentFrame < P1.runCutoff){
        P1.currentFrame++;
      }
      else{
        P1.currentFrame = P1.runCutoff;
      }
    }
    else{

    }
  else{
    p1.src = '/Sprites/playerR.png';
  }

  context.drawImage(p1,P1.width / P1.totalFrames * Math.floor(P1.currentFrame/P1.frameDuration),0,P1.width / P1.totalFrames, P1.height, P1.x-P1.width/2, P1.y-P1.height/2, P1.width, P1.height);
}
function initializePlayer(){
  P1.x = (GAME.canvas.width-P1.width)/2;
  P1.y = (GAME.canvas.height-P1.height)/2;
  P1.xvel = 0;
  P1.xacc = 0;
  P1.yvel = 0;
  P1.yacc = 0;
  P1.direction = "0";
  P1.renderDirection = "L";
}
function handlePlayerMovement() {
  if (P1.direction == "L"){
    P1.x -= P1.xvel;
  }
  else if (P1.direction == "R"){
    P1.x += P1.xvel;
  }
  if (P1.y + P1.height > GAME.canvas.height){
    P1.yacc = 0;
    P1.yvel = 0;
    P1.canJump = true;
  }
  else{
    P1.yacc = GAME.gravity;
    P1.canJump = true;
  }
  P1.yvel+=P1.yacc;
  if (P1.x > GAME.canvas.width - P1.width/2){
      P1.x = GAME.canvas.width - P1.width/2;
      P1.xvel = 0;
  }
  if (P1.x - P1.width/2 <0){
    P1.x = P1.width/2;
    P1.xvel = 0;
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
    context.fillText("x: " + P1.x + " y: " + P1.y, GAME.canvas.width/2, 200);
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
