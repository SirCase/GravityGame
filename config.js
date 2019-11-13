var GAME = {
  canvas : {
    width : 934,
    height : 934,
  },
  gravity : 0.5,
  flippingGravity : false,
  started : true,
  level : 1,
  platforms : [],
  platformSprite : null,
  lavaSprite : null,
  spikeSprite : null,
  canFlip : true
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
  currentFrame : 0,
  totalFrames : 69,
  runCutoff: 20,
  frameDuration : 4,
  sheetWidth : 5106,
  sheetHeight : 74,
  jumping : false,
  jumpPressed : false,
  imageL : null,
  imageR: null,
  health : 10,
  hitboxX : 30,
  damageTimer : 0
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
function makePlatform(x, y, w, h, type){
  var PLATFORM = {
    x : x,
    y : y,
    width : w,
    height : h,
    type : type
  }
  return PLATFORM;
}
var DOOR = {
  x : 0,
  y : 0,
  width : 45,
  height : 45,
  image : null,
  exitX : 210,
  exitY : -130
}
