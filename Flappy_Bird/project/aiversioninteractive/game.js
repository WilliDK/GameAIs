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

class Game{
  constructor(id){
    this.predictor = new NeuralNetwork(neuralNetworkConfig, id);
    this.bird = new Bird();
    this.score = 0;
    this.result = 0;
    this.isDead = false;
    this.dist = 0;
  }
  getResult(){
    if(!this.isDead){
      return this.dist;
    }
    return this.result;
  }
  reset(){
    this.isDead = false;
    this.score = 0;
    this.result = 0;
    this.bird.reset();
    this.dist = 0;
  }
  getFactors(){
    let xdist = next.x-this.bird.x;
    let ydist = next.topheight-this.bird.y;
    let dist = Math.sqrt(xdist * xdist + ydist * ydist);
    let maxdist = Math.sqrt(height * height + spaceBetweenObstacles * spaceBetweenObstacles);
    let input = [
      normalize(height - this.bird.y, height), // distance to bottom
      normalize(this.bird.yvel, this.bird.yvelmax), // birds velocity
      normalize(this.bird.y, height), // distance to top
      normalize(xdist, spaceBetweenObstacles), // x distance
      normalize(ydist, height), // y distance
      normalize(dist, maxdist) // total distance
    ];
    return input;
  }
  predict(){
    let input = this.getFactors();
    let result = this.predictor.predict(input);
    let max = -1;
    let maxIndex = -1;
    for(let i = 0; i < result.length; i++){
      if(result[i] > max){
        max = result[i];
        maxIndex = i;
      }
    }
    if(getOutput(maxIndex)){
      this.bird.jump();
    }
  }

  update(){
    this.dist += Math.abs(pace);
    this.predict();
    this.bird.move();
    if(this.bird.isDead()){
      this.result = this.dist;
      this.isDead = true;
    }
  }

  render(){
    this.bird.render();
  }
}

function getOutput(index) {
  if(index == 0) return true;
  return false;
}
