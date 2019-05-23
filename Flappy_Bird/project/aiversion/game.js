class Game{
  constructor(id){
    this.predictor = new NeuralNetwork(neuralNetworkConfig, id);
    this.bird = new Bird();
    this.score = 0;
    this.result = 0;
    this.isDead = false;
  }
  getResult(){
    if(!this.isDead){
      return this.score;
    }
    return this.result;
  }
  reset(){
    this.isDead = false;
    this.score = 0;
    this.result = 0;
    this.bird.reset();
  }
  predict(){
    let input = [normalize(this.bird.yvel, this.bird.yvelmax), normalize(this.bird.y, height), normalize(next.x-this.bird.x, spaceBetweenObstacles), normalize(next.topheight-this.bird.y, height-w)]; //first one i not needed
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
    this.bird.move();
    this.predict();
    if(this.bird.isDead()){
      this.result = this.score;
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
