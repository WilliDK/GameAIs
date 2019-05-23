let pace = -4;
let spaceBetweenObstacles = 200;
let distance;
let obstacles;
let score = 0;
let w = 70;
let bird;
let begin;
let max = 0;

function setup() {
  distance = 0;
  createCanvas(300, 500);
  obstacles = [];
  obstacles.push(new Obstacle());
  bird = new Bird();
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
  this.didCollide = (obstacle) => {
    if(this.x + this.w > obstacle.x && this.x < obstacle.x + obstacle.w){
      begin = true;
      if(!(this.y > obstacle.topheight && this.y + this.w < obstacle.topheight + obstacle.innerspace)){
        return true;
      }
    }
    return false;
  };
  this.render = () => {
    fill(color(255, 0, 0));
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.w, this.w);
  }
}

function keyPressed(){
  bird.jump();
}

// visualisation
let dir = 1;
let c = 0;

function drawBackground(){
  c += dir;
  background(color(50 + c,50 + c, 200, 145));
}

function draw() {
  drawBackground();
  distance += Math.abs(pace);
  if(distance - w >= spaceBetweenObstacles){
    obstacles.push(new Obstacle());
    distance = 0;
    if(begin) score++;
    dir = dir * -1; // for visualisation
  }
  let deleteObstacleIndex = -1;
  for(let i = 0; i < obstacles.length; i++){
    if(bird.didCollide(obstacles[i]) && !mouseIsPressed){
      reset();
      return;
    }
    obstacles[i].move();
    obstacles[i].render();
    if(obstacles[i].x + obstacles[i].w < 0){
      deleteObstacleIndex = i;
      delete obstacles[i];
    }
  }
  if(deleteObstacleIndex != -1) obstacles.splice(deleteObstacleIndex, 1); // this is time consuming.
  bird.move();
  bird.render();
  text("Score: " + score + " hightscore: " + max, 10, 10);
}

function reset(){
  if(score > max) max = score;
  score = 0;
  begin = false;
  dir = 1; // for visualisation
  c = 0;
  setup();
}

function Obstacle() {
  this.w = w;
  this.innerspace = 200;
  this.topheight = random(0, height-this.innerspace);
  this.x = width;
  this.move = () => {this.x += pace;}
  this.render = () => {
    fill(color(0, 255, 0));
    rect(this.x, 0, this.w, this.topheight);
    rect(this.x, this.innerspace + this.topheight, this.w, height - this.innerspace - this.topheight);
  }
}
