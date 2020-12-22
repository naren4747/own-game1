var player,playerimg
var enemy,enemyimg,enemyGroup
var rocket,rocketimg,rocketGroup
var bgimg
var edge
var enemyDeaths=19
var gameState="level1"

function preload(){
    playerimg=loadImage("player.png")
    enemyimg = loadImage("enemy.png")
    rocketimg=loadImage("rocket.png")
    bgimg=loadImage("bg2.png")

}
function setup(){
    createCanvas(1200,700)
    
    player=createSprite(600,600)
    player.addImage(playerimg)
    enemyGroup = new Group()
    rocketGroup=new Group()
    edge=createEdgeSprites()

}
function draw(){
    background(0)
    if(gameState==="level1"){
        if(keyDown("left")){
        player.x=player.x-10
    }
    if(keyDown("right")){
        player.x=player.x+10
    }

    if(keyDown("space")){
        spawnrocket()
    }
    if(rocketGroup.isTouching(enemyGroup)){
        rocketGroup.destroyEach()
        enemyGroup.destroyEach()
        enemyDeaths+=1
    }
      spawnenemy()
      if(enemyGroup.isTouching(edge[3])){
        
        gameState="end"
    }
    if(enemyDeaths===20){
      gameState="level2"
    }
    }
    fill("white")
    textSize(20)
    text("Score : "+enemyDeaths,600,100)
    if(gameState==="level2"){
      player.x=55
      player.y=350
      if(keyDown("up")){
        player.velocityY=-10
    }
    if(keyDown("down")){
        player.velocityY=+10
    }
    if(keyWentUp("up")){
        player.velocityY=0
    }
    if(keyWentUp("down")){
        player.velocityY=0
    }
      player.rotation=90
      player.rotateToDirection=true
      enemyGroup.pointToEach(700,random(50,1150))
      enemyGroup.setRotationEach(90)
      enemyGroup.setRotateToDirectionEach(true)
      enemyGroup.setVelocityYEach(0)
      enemyGroup.setVelocityXEach(-10)
      
      rocketGroup.setRotationEach(90)
      rocketGroup.setRotateToDirectionEach(true)
      rocketGroup.setVelocityYEach(0)
      rocketGroup.setVelocityXEach(10)
      
      
     


    if(keyDown("space")){
        spawnrocket()
    }
    if(rocketGroup.isTouching(enemyGroup)){
        rocketGroup.destroyEach()
        enemyGroup.destroyEach()
        enemyDeaths+=1
    }
      spawnenemy()
      if(enemyGroup.isTouching(edge[0])){
        
        gameState="end"
    }
   
    if(enemyDeaths===50){
      gameState="level3"
    }
    }
    if(gameState==="end"){
        fill("red")
        textSize(20)
        text("GameOver",600,350)
        player.destroy()
        enemyGroup.setVelocityYEach(0)
    }
    
  

  drawSprites()
}
function spawnrocket(){
    rocket=createSprite(player.x,player.y-100)
    rocket.addImage(rocketimg)
    rocket.scale=0.04
    rocket.velocityY=-10
    rocketGroup.add(rocket)
    rocket.lifeTime=100
}
function spawnenemy(){
    if(frameCount%150===0){
    enemy=createSprite(random(50,1150),0)
    enemy.addImage(enemyimg)
    
    enemy.scale=0.4
    enemy.velocityY=5
    enemyGroup.add(enemy)
    enemy.lifeTime=150
    enemy.collide(edge[3])
}
}