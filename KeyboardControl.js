document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "a":
      if (GAME.started){
        P1.directionL = true;
        P1.renderDirection = "L";
      }
      break;
    case "d":
      if (GAME.started){
        P1.directionR = true;
        P1.renderDirection = "R";
      }
      break;
    case "w":
      P1.jumpPressed = true;
      break;
    case "r":
      if (!GAME.started){
        initializePlayer();
        GAME.started = true;
      }
      break;
    case " ":
      if(!GAME.flippingGravity && BACKGROUND.direction == 0 && GAME.canFlip){
          BACKGROUND.direction = 2;
          P1.yvel *=0;
          P1.y = -P1.y;
          P1.x = -P1.x;
          GAME.canFlip = false;
      }
      else if (!GAME.flippingGravity && BACKGROUND.direction == 2 && GAME.canFlip){
        BACKGROUND.direction = 0;
        P1.yvel *=0;
        P1.y = -P1.y;
        P1.x = -P1.x;
        GAME.canFlip = false;
      }
      GAME.flippingGravity = true;
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
      GAME.flippingGravity = false;
      break;
    default:
      break;
  }
});
