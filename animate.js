function handlePlayerAnimation() {
  if (CONTROLS.player.up) {
    PLAYER.y += 10;
  }
  if (CONTROLS.player.down) {
    PLAYER.y -=  5
  }
  if (CONTROLS.player.left) {
    PLAYER.x -= 3;
  }
  if (CONTROLS.player.right) {
    PLAYER.x += 3;
  }

  // Check if asteroid is leaving the boundary, if so, switch sides
  if (SPACE_SHIP.x > GAME.canvas.width) {
    SPACE_SHIP.x = 0;
  } else if (SPACE_SHIP.x < 0) {
    SPACE_SHIP.x = 600;
  } else if (SPACE_SHIP.y > GAME.canvas.height) {
    SPACE_SHIP.y = 0;
  } else if (SPACE_SHIP.y < 0) {
    SPACE_SHIP.y = 300;
  }
}
