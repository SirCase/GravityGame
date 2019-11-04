document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case "a":
      P1.direction = "L";
      P1.renderDirection = "L";
      break;
    case "d":
      P1.direction = "R";
      P1.renderDirection = "R";
      break;
    case "w":
      if (P1.canJump){
        P1.yvel = 5;
      }
      break;
    case "r":
      if (!GAME.started){
        initializePlayer();
        GAME.started = true;
      }
      break;
    default:
      break;
  }
});

document.addEventListener('keyup', function(event) {
  switch (event.key) {
    case " ":
      P1.yvel = 5;
      break;
    case "a":
      P1.direction = "0";
      break;
    case "d":
      P1.direction = "0";
      break;
    default:
      break;
  }
});
