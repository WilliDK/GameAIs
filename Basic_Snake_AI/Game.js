class Game{
  constructor(id){
    this.predictor = new NeuralNetwork(globalNNconfig, id);
    this.coords = [[globalStartCoords[0][0], globalStartCoords[0][1]]];
    this.foodIndex = 0;
    this.key = UP_ARROW;
    this.direction = [0, -1];
    this.isDead = false;
    this.score = -1;
    this.id = id;
  }
  
  getBetter(bestgame){
    this.predictor.improve(bestgame.predictor);
  }
  
  getScore(){
    if(this.score == -1){
      return this.coords.length;
    }
    return this.score; //hvor hurtigt den fik pointene
    //return this.coords.length;
  }
  
  getSize(){
    return this.coords.length;
  }
  
  reset(){
    this.coords = [[globalStartCoords[0][0], globalStartCoords[0][1]]];
    this.foodIndex = 0;
    this.key = UP_ARROW;
    this.direction = [0, -1];
    this.isDead = false;
    this.score = -1;
  }
  
  update(){
    this.move();
    for (var i = this.coords.length - 1; i >= 1; i--) {
    	this.coords[i][0] = this.coords[i - 1][0];
		this.coords[i][1] = this.coords[i - 1][1];
    }
    this.coords[0][0] += this.direction[0] * w;
	this.coords[0][1] += this.direction[1] * w;
	this.coords[0] = checkPosition(this.coords[0])
    if(this.checkForDeath()){
      this.isDead = true;
      this.score = 1;
    }
    if(this.coords[0][0] == globalFoodCoords[this.foodIndex][0] && this.coords[0][1] == globalFoodCoords[this.foodIndex][1]) {
	  this.coords.push([-w*2, -w*2]);
      this.foodIndex++;
      //this.score += 1*(ITERATIONS-iterator)
	}
  }
  
  checkForDeath(){
    for (var i = this.coords.length - 1; i >= 1; i--) {
		if(this.coords[i][0] == this.coords[0][0] && this.coords[i][1] == this.coords[0][1]){
          return true;
        }
    }
    return false;
  }
  
  move(){
    let prediction1 = this.predictor.predict(this.coords, globalFoodCoords[this.foodIndex])
    let prediction2 = predictHeuristically(this.coords[0], globalFoodCoords[this.foodIndex], this.coords)
    let prediction = entrywiseMatrixSum([prediction1], [prediction2]);
    let max = -1000000000;
    let maxIndex = -1;
    for(let i = 0; i < prediction[0].length; i++){
      if(prediction[0][i] > max){
        max = prediction[0][i];
        maxIndex = i;
              //console.log(prediction2[i]*0.001/prediction[0][i])
      }
    }
    this.key = getOutput(maxIndex);
    this.setDirection();
  }
  
  setDirection() {
	if (this.key === LEFT_ARROW && this.direction[0] != 1) {
		this.direction = [-1, 0];
	} else if (this.key === RIGHT_ARROW && this.direction[0] != -1) {
		this.direction = [1, 0];
	} else if (this.key === UP_ARROW && this.direction[1] != 1) {
		this.direction = [0, -1];
	} else if (this.key === DOWN_ARROW && this.direction[1] != -1) {
		this.direction = [0, 1];
	}
  }
}

function entrywiseMatrixSum(matrix1, matrix2){
  let matrix = []
  for(let i = 0; i < matrix1.length; i++){
    matrix.push([]);
    for(let j = 0; j < matrix1[i].length; j++){
      //matrix[i].push(matrix1[i][j] + matrix2[i][j]/1500)
	  matrix[i].push(matrix1[i][j] + matrix2[i][j]/500)
    }
  }
  return matrix;
}