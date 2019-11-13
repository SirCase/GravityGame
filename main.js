
// Javascript Canvas Intro!

/**
 *  This is called once after the HTML of the page loads
 *
 */
function Start() {
  initializePlatforms();
  initializePlayer();
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  GAME.context = context;
  context.translate(GAME.canvas.width/2, GAME.canvas.height/2);
  context.rotate(-Math.PI/2-(BACKGROUND.direction * Math.PI/2));
  context.save();
  BACKGROUND.image = new Image();
  BACKGROUND.image.src = "Sprites/background.png";
  P1.imageL = new Image();
  P1.imageL.src = '/Sprites/playerL.png';
  P1.imageR = new Image();
  P1.imageR.src = '/Sprites/playerR.png';
  P1.imageR = new Image();
  P1.imageR.src = '/Sprites/playerR.png';
  GAME.platformSprite = new Image();
  GAME.platformSprite.src = '/Sprites/platform.png';
  GAME.lavaSprite = new Image();
  GAME.lavaSprite.src = '/Sprites/lava.png';
  GAME.spikeSprite = new Image();
  GAME.spikeSprite.src = '/Sprites/spike.png';
  DOOR.image = new Image();
  DOOR.image.src = '/Sprites/door.png';
  window.requestAnimationFrame(runGame);
}
