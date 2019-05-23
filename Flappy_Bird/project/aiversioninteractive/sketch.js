let pace;
let spaceBetweenObstacles;
let distance;
let obstacles;
let w;
let games;
let begin;
let max;
let amountofinstances;
let neuralNetworkConfig;
let bestLocalScore;
let next;
let bestLocalIndex;
let localscore;
let generation;
let innerspace;
let fps;
let LEARNING_RATE;

function setup() {
  //variables
  setVariables();
  max = 0;
  neuralNetworkConfig = [6, 2];
  bestLocalScore = -1;
  bestLocalIndex = -1;
  localscore = -1;
  generation = 1;
  //setup
  createCanvas(500, 500);
  frameRate(60);
  obstacles = [];
  distance = 0;
  obstacles.push(new Obstacle());
  next = obstacles[0];
  games = [];
  for(let i = 0; i < amountofinstances; i++){
    games.push(new Game(i));
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
  setVariables();
  drawBackground();
  for(let i = 0; i < obstacles.length; i++){
    obstacles[i].render();
  }
  for(let i = 0; i < games.length; i++){
    if(!games[i].isDead){
      games[i].render();
    }
  }
  for(let i = 0; i < fps; i++){
    update();
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
    if(games[i].score > bestLocalScore){
      bestLocalScore = games[i].score;
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
      if(bestLocalScore == 0){
        games[i].predictor = new NeuralNetwork(neuralNetworkConfig, games[i].id)
      }
      games[i].reset();
    }
    globalReset();
  }
}

function globalReset(){
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
