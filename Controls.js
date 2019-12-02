
/*CONTROLS
A - Move Left
D - Move Right
W - Jump
SPACE - Flip Gravity

DEVELOPER TOOLS
H - Toggle Hitbox Mode
2 - Skip To Level 2
*/
document.addEventListener('keydown', function(event) {

  switch (event.key) {
    case "1":
      if (GAME.started) {
        GAME.platforms = [];
        GAME.level = 1;
        initializePlatforms();
      }
      case "2":
        if (GAME.started) {
          BACKGROUND.direction = 0;
          GAME.platforms = [];
          GAME.level = 2;
          initializePlatforms();
          P1.x = DOOR.x;
          P1.y = DOOR.y;
        }
        break;
      case "a":
        if (GAME.started) {
          P1.directionL = true;
          P1.renderDirection = "L";
        }
        break;
      case "d":
        if (GAME.started) {
          P1.directionR = true;
          P1.renderDirection = "R";
        }
        break;
      case "w":
        P1.jumpPressed = true;
        break;
      case "r":
        if (!GAME.started) {
          BACKGROUND.direction = GAME.d1;
          initializePlayer();
          GAME.started = true;
        }
        break;
      case " ":
        if (!GAME.flippingGravity && BACKGROUND.direction == GAME.d1 && GAME.canFlip && GAME.started) {
          BACKGROUND.direction = GAME.d2;
          P1.yvel = 0;
          if (GAME.d2 == 2) {
            P1.y = -P1.y;
            P1.x = -P1.x;
          } else if (GAME.d2 == 1) {
            var temp = P1.x;
            P1.x = -P1.y;
            P1.y= temp;
            P1.y -=Math.ceil(P1.height-P1.hitboxX)/2;
          }
          else if (GAME.d2 == 3){
            var temp = P1.y;
            P1.y = -P1.x;
            P1.x = temp;
            P1.y -=Math.ceil(P1.height-P1.hitboxX)/2;
          }
          GAME.canFlip = false;
        } else if (!GAME.flippingGravity && BACKGROUND.direction == GAME.d2 && GAME.canFlip && GAME.started) {
          BACKGROUND.direction = GAME.d1;
          P1.yvel *= 0;
          if (GAME.d2 == 2) {
            P1.y = -P1.y;
            P1.x = -P1.x;
          } else if (GAME.d2 == 1) {
            var temp = P1.y;
            P1.y = -P1.x;
            P1.x = temp;
            P1.y -=Math.ceil(P1.height-P1.hitboxX)/2;
          }
          else if (GAME.d2 == 3){
            var temp = P1.x;
            P1.x = -P1.y;
            P1.y = temp;
            P1.y -=Math.ceil(P1.height-P1.hitboxX)/2;
          }
          GAME.canFlip = false;
        }
        GAME.flippingGravity = true;
        break;
      case "h":
        if(!GAME.pressingHitbox){
          GAME.hitboxMode = !GAME.hitboxMode;
          GAME.pressingHitbox = true;
        }
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
    case "h":
        GAME.pressingHitbox = false;
      break;
    default:
      break;
  }
});
