
let Neuron = function(lengthOfPreviousLayer) {
  this.weights = [];
  for (let i = 0; i < lengthOfPreviousLayer; i++) {
    this.weights.push(random(-1,1));
  }
  this.sum = 0;
  this.normalizeToResult = function() {
    this.result = this.sum / this.maxsum;
  }
  this.addToSum = function(x, i) {
    this.sum += this.weights[i] * x;
  }
  this.maxsum;
  this.setMaxSum = function(){
    this.maxsum = this.weights.reduce(function(runningsum, el) {
      return runningsum + el;
    },0);
  }
  this.setMaxSum();
  this.result = -1;
  this.reset = function() {
    this.result = -1;
    this.sum = 0;
  }
}

class NeuralNetwork {
  constructor(layerDescription, id) {
    this.layers = [];
    this.id = id;
    for (let i = 1; i < layerDescription.length; i++) {
      this.layers.push([]);
      for (let j = 0; j < layerDescription[i]; j++) {
        this.layers[i-1].push(new Neuron(layerDescription[i-1]));
      }
    }
  }

  improve(best) {
    const learningRate = random(0,0.3);
    for (var i = 0; i < this.layers.length; i++) {
      for (var j = 0; j < this.layers[i].length; j++) {
        for (var k = 0; k < this.layers[i][j].weights.length; k++) {
          this.layers[i][j].weights[k] = best.layers[i][j].weights[k] + random(-learningRate, learningRate);
        }
        this.layers[i][j].setMaxSum();
      }
    }
  }

  predict(input) {
    for (let i = 0; i < this.layers[0].length; i++) {
      this.layers[0][i].reset();
      for (let j = 0; j < input.length; j++) {
        this.layers[0][i].addToSum(input[j], j);
      }
      this.layers[0][i].normalizeToResult();
    }
    for (let i = 1; i < this.layers.length; i++) {
      for (let j = 0; j < this.layers[i].length; j++) {
        this.layers[i][j].reset();
        for (let k = 0; k < this.layers[i - 1].length; k++) {
          this.layers[i][j].addToSum(this.layers[i - 1][k].result, k); // is this right
        }
        this.layers[i][j].normalizeToResult();
      }
    }
    let results = [];
    for (let i = 0; i < this.layers[this.layers.length - 1].length; i++) {
      results.push(this.layers[this.layers.length - 1][i].result);
    }
    return results;
  }
}


function normalize(val, max) {
  return val / max;
}
