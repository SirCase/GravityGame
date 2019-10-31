// var GAME = {
//   canvas : {
//     width : 600,
//     height : 300
//   },
//   started : true,
//   level : 1
// };
//
// var PLAYER = {
//   initialized : false,
//   bullets : [],
//   latest : {
//     x : 0,
//     y : 0
//   }
// };
//
// var NEW_OBJECT = {
//   x : 0,
//   y : 0
// };
var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 300;


var background = new Image();
background.src = "Sprites/background.gif";

background.onload = function(){
    ctx.drawImage(background,600,300);
