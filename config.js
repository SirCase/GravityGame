var GAME = {
  canvas : {
    width : 934,
    height : 934,
  },
  gravity : 1,
  started : true,
  jumpPressed : false
};

var P1 = {
  x : 0,
  y : 0,
  width : 74,
  height : 74,
  yvel : 0,
  yacc : 0,
  xvel : 5,
  jumpStrength : 20,
  direction : "R",
  renderDirection : "R",
  canJump : false,
  currentFrame : 0,
  totalFrames : 69,
  runCutoff: 20,
  frameDuration : 3,
  sheetWidth : 5106,
  sheetHeight : 74
};
var BACKGROUND = {
  currentFrame : 0,
  totalFrames : 30,
  frameDuration : 3,
  width : 16200,
  height : 540,
  direction : "D"
};
