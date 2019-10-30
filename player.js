//Create the player and it's movements

function InitializeCharacter (){
var playerImage = new Image ();
playerImage.src = "Sprites/player.png"

}
function sprite (options) {

    var that = {};

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    return that;
  }
  var canvas = document.getElementById('map.js');
    var context = canvas.getContext('2d');
    var background = new Image();
  background.onload = function() {
      context.drawImage(img,0,0,600,300);
    }
  background.src = 'Sprites/background.gif';


    var player = sprite({
        context: canvas.getContext("2d"),
        width: 100,
        height: 100,
        image: playerImage
    });
    function sprite (options) {


    that.render = function () {

        // Draw the animation
        that.context.drawImage(
           that.image,
           0,
           0,
           that.width,
           that.height,
           0,
           0,
           that.width,
           that.height);
    };


}
