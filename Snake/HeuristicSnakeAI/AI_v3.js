let Neuron = function(lengthOfPreviousLayer) {
  this.weights = [];
  for (let i = 0; i < lengthOfPreviousLayer; i++) {
    this.weights.push(Math.random());
  }
  this.sum = 0;
  this.normalizeToResult = function() {
    this.result = this.sum / this.maxsum;
  }
  this.addToSum = function(x, i) {
    this.sum += this.weights[i] * x;
  }
  this.maxsum = this.weights.reduce(function(runningsum, el) {
    return runningsum + el;
  });
  this.result = -1;
  this.reset = function() {
    this.result = -1;
    this.sum = 0;
  }
}

class NeuralNetwork {
  constructor(layerDescription) {
    this.layers = [];
    for (let i = 1; i < layerDescription.length; i++) {
      this.layers.push([]);
      for (let j = 0; j < layerDescription[i]; j++) {
        this.layers[i - 1].push(new Perceptron(layerDescription[i - 1]));
      }
    }
  }

  improve(best) {
    const learningRate = 1;
    for (var i = 0; i < this.layers.length; i++) {
      for (var j = 0; j < this.layers[i].length; j++) {
        for (var k = 0; k < this.layers[i][j].weights.length; k++) {
          this.layers[i][j].weights[k] = best.layers[i][j].weights[k] + random(-learningRate, learningRate);
        }
      }
    }
    console.log("improved");
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
        for (let k = 0; k < layers[i - 1].length; k++) {
          this.layers[i][j].addToSum(layers[i - 1][k].result, k);
        }
        this.layers[i][j].normalizeToResult();
      }
    }
    let max = -1;
    let maxIndex = 0;
    for (let i = 0; i < this.layers[layers.length - 1].length; i++) {
      if (this.layers[layers.length - 1][i].result > max) {
        max = this.layers[layers.length - 1][i].result
        maxIndex = i;
      }
    }
    return getOutput(maxIndex);
  }
}


function normalize(val, max) {
  return val / max;
}

function formatInput(food, snake) {
  let newInput = []
  newInput.push(normalize(food[0], int(width / w) * w));
  newInput.push(normalize(food[1], int(height / w) * w));
  for (let i = 0; i < snake.length; i++) {
    newInput.push(normalize(snake[i][0], int(width / w) * w));
    newInput.push(normalize(snake[i][1], int(height / w) * w));
  }
  for (let i = newInput.length; i < int(width / w) * int(height / w) * 2; i++) {
    newInput.push(0);
  }
  return newInput;
}


function getOutput(index) { //could be done aritmitcally
  switch (index) {
    case 0:
      return 37;
    case 1:
      return 38;
    case 2:
      return 39;
    case 3:
      return 40;
  }
}