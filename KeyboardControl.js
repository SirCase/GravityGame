document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "a":
      P1.directionL = true;
      P1.renderDirection = "L";
      break;
    case "d":
      P1.directionR = true;
      P1.renderDirection = "R";
      break;
    case "w":
      P1.jumpPressed = true;
      if (P1.canJump){
        P1.yvel = -P1.jumpStrength;
        P1.canJump = false;
        P1.jumping = true;
      }
      break;
    case "r":
      if (!GAME.started){
        initializePlayer();
        GAME.started = true;
      }
      break;
    case "o":
      BACKGROUND.direction = 0;
      break;
    case "p":
      BACKGROUND.direction = 1;
      break;
    default:
      break;
  }
});

document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case "w":
      P1.jumpPressed = false;
      break;
    case "a":
      P1.directionL = false;
      break;
    case "d":
      P1.directionR = false;
      break;
    default:
      break;
  }
});
