var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var car1;
var car2;
var car3;
var car4;
var cars;

var carIMG1,carIMG2,carIMG3,carIMG4,ground,track;

function preload(){
  carIMG1 = loadImage("images/car1.png");
  carIMG2 = loadImage("images/car2.png");
  carIMG3 = loadImage("images/car3.png");
  carIMG4 = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  track = loadImage("images/track.jpg");
}
function setup(){
  canvas = createCanvas(displayWidth-20,displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  
}
