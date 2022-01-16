class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage(carIMG1);
    car2 = createSprite(200,200);
    car2.addImage(carIMG2);
    car3 = createSprite(300,200);
    car3.addImage(carIMG3);
    car4 = createSprite(400,200);
    car4.addImage(carIMG4);
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      //var display_position = 130;
      background("brown");
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;
      var x = 175;
      var y;
      for(var plr in allPlayers){
        index ++;
        x += 200;
        y = displayHeight-allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          ellipseMode(CENTER);
          stroke(3);
          fill("red");
          ellipse(x,y,70,70);

        }        
        /*if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, width/2,display_position)*/
      }
      
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50;
      player.update();
    }
    if(player.distance>3860){
      gameState = 2
      player.ranking += 1;
      Player.updateRanking(player.ranking);
    }
    drawSprites()
  }
  end(){
    console.log("game ended");
    console.log(player.ranking);
  }
}
