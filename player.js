//Create the player and it's movements

function InitializeCharacter (){

  var canvas = document.getElementById('mainCanvas');
    var context = canvas.getContext('2d');
    var background = new Image();
  background.src = 'Sprites/background.gif';

  //background.onload = function() {
      context.drawImage(background,0,0,600,300);
}
