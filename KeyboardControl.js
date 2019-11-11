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
        P1.yvel = 0;
        P1.jumping = true;
      }
      break;
    case "r":
      if (!GAME.started){
        initializePlayer();
        GAME.started = true;
      }
      break;
    case " ":
      if(!GAME.flippingGravity && BACKGROUND.direction == 0){
          BACKGROUND.direction = 2;
      }
      else if (!GAME.flippingGravity){
        BACKGROUND.direction = 0;
      }
      P1.flippingGravity = true;
      P1.y = -P1.y;
      P1.x = -P1.x;
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
    case " ":
      GAME.flippingGravitys = false;
      break;
    default:
      break;
  }
});
