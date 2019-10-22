Gra^ity Game by Justin Ansell
Technical Specifications
Guy Hartstein

Class hierarchy:  

main.js
player.js
map.js
animate.js 
config.js 
document.html

Game features:
•	Moving the player
  o	The players movement attributes will exist within the player.js file and will be manipulated in the gravity.js file.  
  o	The player will contain attributes as defined by:

var PLAYER = {g: 0, 
       s = //sprite source
       x: (door.x + door.w), 
       y: (door.y – door.h), 
       dmg: false
};

  o	 These attributes are controlled by the keyboard settings, which are located in the animate.js file:

var canvas = document.getElementById("maincanvas");
var ctx = canvas.getContext("2d");
//Listen to keyboard cmds
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//keyboard controls
function(keyDownHandler){ //Use if statements to check keycodes and set states}

function(keyUpHandler){ //Check keycodes and set states to false
  o	Moving right: PLAYER.x ++; 
  o	Jumping: PLAYER.y ++;
  o	Moving left: PLAYER.x --;
  o	Gravity switch: PLAYER.g = true;
•	Door
  o	The door will be an object that can be placed in a map
  o	Note:  The door is not the same as the exit.

var DOOR = {
       s = //sprite source
       w = //desired sprite width), 
       h = //desired sprite height, 
};

•	Exit
  o	The exit will be an object that can be placed in a map
  o	The exit is the goal of the game

var EXIT = {
       s = //sprite source
       x = //xpos
       y = //ypos
       w = //desired sprite width), 
       h = //desired sprite height, 
       completed: false
};

•	Energy Ball Launcher
  o	Launches an energy ball that dissipates as soon as it collides with another surface
  This collision is handled with function handleBallCollision() in animate.js.

var LAUNCHER = {

       x = //xpos
       y = //ypos
       function launch(speed) {var ball = new BALL(s);}
};

var BALL = {
       x = //xpos
       y = //ypos
       s = //speed at which the ball moves, 
       r = //ball radius
};

•	Spikes
  o	Another object that can harm the player
  Detected by handleSpikeStep(p) in animate.js.

var SPIKE = {
       s = //source, p = //player that steps on the spike, d: false 
       l = //length,
       w = //width,
       x = //xpos
       y = //ypos
       d = false //detected?
};

•	Lava
  o	A type of surface object that can harm the player
  Detected by handleLavaStep(p) in animate.js.

var LAVA = {
       s = //source, p = //player that steps on the lava, d: false 
       l = //length,
       w = //width,
       x = //xpos
       y = //ypos
       d = false //detected?
 };

•	Wall
  o	A navigable surface that provides inertia to the player
  o	The platforms that stop movement animations
  o	Detected by function handleWall() in animate.js.

var WALL = {
       s = //source, 
       l = //length,
       w = //width,
       x = //xpos
       y = //ypos
       function draw(x,y,l,w){//Draws a filled rectangle with border 1px};
};

•	Multiplayer functionality
  o	All games will initialize a secondary player

var PLAYER2 = {g: 0, 
       s = //sprite source
       x: (door.x + door.w), 
       y: (door.y – door.h), 
       dmg: false
};

•	Gravity functionality
  o	There are two options for how gravity will work
    	The entire map flips around and the force of gravity has a sign change
    	The player flips and the force of gravity has a sign change

In animate.js,function handleGrav(p) is used to handle the force of gravity.  Gravity is handled first, before anything else happens.

Variables

main.js
  o	map //sources a js file
player.js
map.js
  o	secret //toggles to false if trophies < level
  o	level
  o	spike#
  o	lava#
  o	wall#
  o	launcher#
  o	ball#
animate.js 
  o	health
  o	trophies
  o	player1
  o	player2
config.js 
  o	gravity


Problems and Potential Concerns:

The game is designed so that each level is created within its own js file.  Finding a way to load a map without doing it in the animate.js file will be tricky.  We certainly don’t want to load the map 60 times per second. 

Secondly, the sprite doesn’t have a walking animation, so it will be stationary for the most part.  The other issue is that the force of gravity will need to be determined in the config.js file before it can be implemented in animate.js.  

Remember, making a map will essentially be using the PLAYER, SPIKE, LAVA, LAUNCHER, and WALL objects.  Each of these objects.  

Challenges
1.	Gravity mechanic
2.	Map switch
3.	Map construction
4.	Two player functionalities

Summary and Work Required

Overall, the project seems very clever and definitely doable.  The entire project will take four weeks to complete assuming that 7 hours are put in each week.  Hence, this is a 28-hour project at peak efficiency.  
