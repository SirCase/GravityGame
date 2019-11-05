
// Javascript Canvas Intro!

/**
 *  This is called once after the HTML of the page loads
 *
 */
function Start() {
  initializePlayer();
  initializePlatforms()
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  context.translate(GAME.canvas.width/2, GAME.canvas.height/2);
  context.rotate(-Math.PI/2-(BACKGROUND.direction * Math.PI/2));
  context.save();
  BACKGROUND.image = new Image();
  BACKGROUND.image.src = "Sprites/backgroundD.png";
  P1.imageL = new Image();
  P1.imageL.src = '/Sprites/playerL.png';
  P1.imageR = new Image();
  P1.imageR.src = '/Sprites/playerR.png';
  window.requestAnimationFrame(runGame);
}
