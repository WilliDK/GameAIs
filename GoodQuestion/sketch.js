var p = new player()
var snowFlakes = []
var players = []
var n = 10
var W = 0
var H = 0
var question
var pace = 5

if(window.localStorage["highscore"] == undefined){
  window.localStorage["highscore"] = -10000000000
}

function setup() {
  W = windowWidth-20  
  H = windowHeight-1
  createCanvas(W, H)
  for(var i = 0; i < n; i++){
    snowFlakes[i] = new snowFlake(Math.random()*100)
  }
  players[0] = new player()
  question = generateQuestion()
}

function draw() {
  background(100)
  fill(255)
  
  //answers
  snowFlakes.forEach(flake => {
    flake.move()
    flake.show()
    if(flake.inDanger){
      players.forEach(p => {
        if(valuecheck(p, flake)){
          switch(flake.type){
            case "answer":
              p.points += 3
              question = generateQuestion()
              break;
            case "red":
              p.points -= 3
              break;
            case "wronganswer":
              p.points -= 1
              break;                      
          }
          var i = snowFlakes.indexOf(flake)
          snowFlakes[i] = new snowFlake(Math.random()*100)
          delete flake
        }
      })
    }
  })

  fill(255)
  textSize(32);
  text("Question: " + question, W/2-250, 60);

  //player
  players.forEach(p => {
    p.move()
    p.show()
    textSize(24);
    text("Points: " + p.points + " | Highscore: " + window.localStorage["highscore"], 10, 20);
    if(p.points > window.localStorage["highscore"]){
      window.localStorage["highscore"] = p.points
    }
    pace = constrain(5+p.points/2,5,100)
  })

  text("It is a damn good question | a game by Louie and William", W/2-W/5.5, 20);
}


function valuecheck(player, snowFlake){
  if(snowFlake.x+snowFlake.r/2 >= player.x && snowFlake.x + snowFlake.r/2 <= player.x + player.w){
    return true
  }
  return false
}

function generateQuestion(){
  var i = int(Math.random()*n)
  while(snowFlakes[i].inDanger && snowFlakes[i].type == "red"){
    i = int(Math.random()*n)
  }
  var a = snowFlakes[i].value
  snowFlakes[i].type = "answer"
  var x = a-Math.random()*a
  var question = (x).toString().substring(0,5) + " + " + (a-x).toString().substring(0,5) + " = x, what is x?"
  return question
}

function snowFlake(v){
  this.value = v
  this.type = "wronganswer"
  this.r = 70
  this.fill = 255
  this.y = int((Math.random()-1)*H)
  this.x = int(Math.random()*W)
  this.inDanger = false
  if(Math.random() > 0.8){
    this.type = "red"
    this.r = 110
    this.fill = color(255, 0, 0)
  }
  this.move = function(){
    this.y+=int(Math.random()*pace)
    this.x = constrain(this.x + int((Math.random()-0.5)*5),0,W-this.r)
    if(this.y > H){
      if(this.type == "answer"){
        console.log("ran")
        question = generateQuestion()
      }
      var i = snowFlakes.indexOf(this)
      snowFlakes[i] = new snowFlake(Math.random()*100)
      delete this
    }else if(this.y+this.r/2 >= H-30){
      this.inDanger = true
    }
  }
  this.show = function(){
    ellipseMode(CORNER)
    noStroke()
    fill(this.fill)
    ellipse(this.x, this.y, this.r, this.r)
    textSize(20);
    fill(0)
    textAlign(LEFT,TOP);
    text(this.value.toString().substring(0,5), this.x+this.r/7, this.y+this.r/2-this.r/10);   
  }
}

function player(){
  this.points = 0
  this.w = 160
  this.h = 45
  this.x = 0
  this.vx = 0

  this.move = function(){
    this.x = this.x + this.vx
    if (this.x > W) {
      this.x = 0
    }else if(this.x < 0){
      this.x = W
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.vx -= (2 + Math.sign(this.vx))
    }else if(keyIsDown(RIGHT_ARROW)){
      this.vx += (2 - Math.sign(this.vx))
    }else{
      if(this.vx > 0){
        this.vx -= 1
      }else if(this.vx < 0){
        this.vx += 1
      }
    }
  }

  this.show = function(){
    noStroke()
    rect(this.x, H-this.h, this.w, this.h);
  }
}
