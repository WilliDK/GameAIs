let NetworkOperations = require("./NetworkOperations.js");
let MatrixOperations = require("./MatrixOperations.js");


class NeuralNetwork{
  constructor(description, trainingmethod){
    this.layers = [[]]; //input layer is represented but not used
    this.changeInWeigthSums = [[]];
    this.previousActivations = [[]];
    this.previousResults = [[]];
    this.changeInBiasSums = [[]];
    this.biases = [0];
    for(let i = 1; i < description.length; i++){
      this.layers.push(NetworkOperations.randomMatrix(description[i-1], description[i]));
      this.changeInWeigthSums.push(NetworkOperations.constantMatrix(description[i-1], description[i], 0));
      this.previousActivations.push([]); // for backpropagation
      this.previousResults.push([]); // for backpropagation
      this.biases.push(NetworkOperations.constantList(description[i], 1));
      this.changeInBiasSums.push(NetworkOperations.constantList(description[i], 0));
    }
    this.method = trainingmethod;
    this.trainingAmount = 0;
  }

  improve(input){
    if(this.method == "backpropagation"){
      this.trainingAmount++;
      this.backpropagate(input);
    }else if(this.method == "improvebyexample"){
      this.improvebyexample(input);
    }
  }

  improvebyexample(example){
    return; // not implemented
  }

  backpropagate(test){
    // https://www.youtube.com/watch?v=tIeHLnjs5U8&vl=en
    // using bottom up dynamic programming
    // variables
    let costsDerivatives = []; //optimizing dynamic programmering memory by only keeping the last layers costs
    // base case: find cost of output layers output
    for(let i = 0; i < test.length; i++){
      costsDerivatives.push(NetworkOperations.derivedCostasActivation({
        calculation : this.previousActivations[this.previousActivations.length-1][i],
        testdata : test[i],
        basecase : true
      }));
    }
    // for each layer (ouput layer inclusive, exclusive input)
    for(let i = this.layers.length-1; i > 0; i--){
      // calculate the derivative of cost as a function of a weight and add to changeInWeigthSums
      for(let j = 0; j < this.layers[i].length; j++){
        for(let k = 0; k < this.layers[i][j].length; k++){
          this.changeInWeigthSums[i][j][k] += NetworkOperations.getWeightChange(
            this.previousActivations[i-1][j],
            this.previousResults[i][j],
            costsDerivatives[j]
          );
          this.changeInBiasSums[i][j] += NetworkOperations.derivedCostasBias(
            this.previousResults[i][j], costsDerivatives[j]
          );
        }
      }
      // calculate the derivative of cost as a function of the previous layers output and save
      let tempcosts = [];
      for(let j = 0; j < this.layers[i-1].length; j++){ // notice i-1
        tempcosts.push(NetworkOperations.getTotalCost(
          this.previousActivations[i-1][j],
          costsDerivatives,
          this.previousResults[i]
         ));
      }
      costsDerivatives = tempcosts;
    }
  }

  applyWeightChanges(){
    for(let i = 0; i < this.changeInWeigthSums.length; i++){
      for(let j = 0; j < this.changeInWeigthSums[i].length; j++){
        for(let k = 0; k < this.changeInWeigthSums[i][j].length; k++){
          this.layers[i][j][k] += this.changeInWeigthSums[i][j][k] / this.trainingAmount;
          console.log("applied: " + this.layers[i][j][k])
        }
      }
    }
  }

  applyBiasChanges(){
    for(let i = 0; i < this.changeInBiasSums.length; i++){
      for(let j = 0; j < this.changeInBiasSums[i].length; j++){
        this.biases[i][j] += this.changeInBiasSums[i][j] / this.trainingAmount;
      }
    }
  }

  predict(input){ // not working properly
    let current = input;
    this.previousActivations[0] = [...current]; //for backpropagation
    for(let i = 1; i < this.layers.length; i++){
      current = MatrixOperations.multiply(current, this.layers[i]);
      /*for(let j = 0; j < current.length; j++){
        current[j] += this.biases[i][j];
      }*/
      this.previousResults[i] = [...current];//for backpropagation
      for(let j = 0; j < current.length; j++){
        current[j] = NetworkOperations.activiate(current[j]);
      }
      this.previousActivations[i] = [...current]; //for backpropagation
    }
    return current;
  }
}

module.exports.NeuralNetwork = NeuralNetwork
