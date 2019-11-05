var GAME = {
  canvas : {
    width : 934,
    height : 934,
  },
  gravity : 0.6,
  started : true,
  level : 1,
  platforms : []
};

var P1 = {
  x : 0,
  y : 0,
  width : 45,
  height : 45,
  yvel : 0,
  yacc : 0,
  xvel : 0,
  jumpStrength : 10,
  directionL : false,
  directionR : false,
  renderDirection : "R",
  canJump : false,
  currentFrame : 0,
  totalFrames : 69,
  runCutoff: 20,
  frameDuration : 5,
  sheetWidth : 5106,
  sheetHeight : 74,
  jumping : false,
  jumpPressed : false,
  imageL : null,
  imageR: null,
  health : 10,
  hitboxX : 30,
  canMoveX : true
};
var BACKGROUND = {
  currentFrame : 0,
  totalFrames : 30,
  frameDuration : 1,
  width : 16200,
  height : 540,
  direction : 0,
  image : null
};
function makePlatform(x, y, w, h){
  var PLATFORM = {
    x : x,
    y : y,
    width : w,
    height : h
  }
  return PLATFORM;
}
