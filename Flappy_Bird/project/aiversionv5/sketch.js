let pace = -2;
let spaceBetweenObstacles = 200;
let distance;
let obstacles;
let w = 70;
let games;
let begin;
let max = 0;
let amountofinstances = 50;
let neuralNetworkConfig = [5, 10, 10, 2];
let bestLocalScore = -1;
let next;
let bestLocalIndex = -1;
let localscore = -1;
let generation = 1;
let innerspace = 200;

function setup() {
  createCanvas(500, 500);
  frameRate(10);
  obstacles = [];
  distance = 0;
  obstacles.push(new Obstacle());
  next = obstacles[0];
  games = [];
  for(let i = 0; i < amountofinstances; i++){
    games.push(new Game(i));
  }
}

function Bird() {
  this.x = width/6;
  this.y = height/2;
  this.yvel = 0;
  this.yvelmax = 20;
  this.yacc = 0.7;
  this.w = 50;
  this.jump = () => {
    this.yvel = -11;
  };
  this.move = () => {
    this.y += this.yvel;
    this.yvel = constrain(this.yvel +  this.yacc, -this.yvelmax, this.yvelmax);
    if(this.y + this.w >= height) this.y = height-this.w;
    else if(this.y <= 0) this.y = 0;
  };
  this.didCollide = (obstacle, index) => {
    if(this.x + this.w > obstacle.x && this.x < obstacle.x + obstacle.w){
      begin = true;
      //next = obstacles[index+1];
      if(!(this.y > obstacle.topheight && this.y + this.w < obstacle.topheight + obstacle.innerspace)){
        return true;
      }
    }
    if(this.y + this.w >= height || this.y <= 0){
      return true;
    }
    return false;
  };
  this.render = () => {
    fill(color(255, 0, 0));
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.w, this.w);
  }
  this.isDead = () => {
    for(let i = 0; i < obstacles.length; i++){
      if(this.didCollide(obstacles[i], i))  {
        return true;
      }
    }
    return false;
  }
  this.reset = () => {
    this.x = width/6;
    this.y = height/2;
    this.yvel = 0;
    this.yvelmax = 20;
    this.yacc = 0.7;
    this.w = 50;
  }
}

// visualisation
let dir = 1;
let c = 0;

function drawBackground(){
  c += dir;
  background(color(50 + c,50 + c, 200, 145));
}

function draw(){
  drawBackground();
  for(let i = 0; i < obstacles.length; i++){
    obstacles[i].render();
  }
  for(let i = 0; i < games.length; i++){
    if(!games[i].isDead){
      games[i].render();
    }
  }
  if(mouseIsPressed){
    update();
  }else{
    for(let i = 0; i < 500; i++){
      update();
    }
  }
  fill(255);
  textSize(16);
  text("BestLocalScore: " + bestLocalScore + " BestGlobalScore: " + max + " Generations: " + generation, 10, 20);
}

function update() {
  distance += Math.abs(pace);
  if(distance - w >= spaceBetweenObstacles){
    obstacles.push(new Obstacle());
    distance = 0;
    /*for(let i = 0; i < games.length; i++){
      if(begin){
        games[i].score++;
      }
    }*/
    dir = dir * -1; // for visualisation
  }
  let deleteObstacleIndex = -1;
  for(let i = 0; i < obstacles.length; i++){
    obstacles[i].move();
    if(obstacles[i].x + obstacles[i].w < 0){
      deleteObstacleIndex = i;
      delete obstacles[i];
    }
  }
  if(deleteObstacleIndex != -1) obstacles.splice(deleteObstacleIndex, 1); // this is time consuming.
  let alive = false;
  let found = false;
  for(let i = 0; i < games.length; i++){
    if(!games[i].isDead){
      games[i].update();
      if(games[i].bird.x > next.x + next.w){
        games[i].score++;
        found = true;
      }
      alive = true;
    }
  }
  if(found){
    next = obstacles[obstacles.indexOf(next) + 1];
  }
  localscore = -1;
  bestLocalIndex = -1;
  for(let i = 0; i < games.length; i++){
    if(games[i].getResult() > bestLocalScore){
      bestLocalScore = games[i].getResult();
    }
    if(games[i].getResult() > localscore){
      localscore = games[i].getResult();
      bestLocalIndex = i;
    }
  }
  if(!alive){
    generation++;
    for(let i = 0; i < games.length; i++){
      if(i != bestLocalIndex){
        games[i].predictor.improve(games[bestLocalIndex].predictor);
      }
      if(bestLocalScore == 0 && max == 0){
        games[i].predictor = new NeuralNetwork(neuralNetworkConfig, games[i].id)
      }
      games[i].reset();
    }
    reset();
  }
}

function reset(){
  if(bestLocalScore > max) max = bestLocalScore;
  bestLocalScore = -1;
  begin = false;
  dir = 1; // for visualisation
  c = 0;
  obstacles = [];
  distance = 0;
  obstacles.push(new Obstacle());
  next = obstacles[0];
}

function Obstacle() {
  this.w = w;
  this.innerspace = innerspace;
  this.topheight = random(0, height-this.innerspace);
  this.x = width;
  this.move = () => {this.x += pace;}
  this.render = () => {
    fill(color(0, 255, 0));
    rect(this.x, 0, this.w, this.topheight);
    rect(this.x, this.innerspace + this.topheight, this.w, height - this.innerspace - this.topheight);
  }
}
