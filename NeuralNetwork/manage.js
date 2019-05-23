let NeuralNetwork = require("./NeuralNetwork.js");

let NN = new NeuralNetwork.NeuralNetwork([3,3,3], "backpropagation");

/*var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
standard_input.on('data', function (data) {
    if(data === 'exit\n'){
        process.exit();
    }else{

    }
});*/

for(let i = 0.01; i < 1; i+=0.001){ //what about 0 values
  console.log("Trainingdata: " + [i,i,i] + " | prediction: " + NN.predict([i, i, i]));
  NN.improve([0, 0, 1]);
}

console.log("Applying weight changes")
NN.applyWeightChanges();
console.log("Applying bias changes")
NN.applyBiasChanges();

for(let i = 0.01; i < 1; i+=0.1){ //what about 0 values
  console.log("Testdata: " + [i,i,i] + " | prediction: " + NN.predict([i, i, i]))
}

/*
for(let i = 0.01; i < 1; i+=0.0001){ //what about 0 values
  console.log("Trainingdata: " + [i] + " | prediction: " + NN.predict([i]));
  NN.improve([0,0,1]);
}

console.log("Applying weight changes")
NN.applyWeightChanges();

for(let i = 0.01; i < 1; i+=0.1){ //what about 0 values
  console.log("Testdata: " + [i] + " | prediction: " + NN.predict([i]))
}*/

//NN.predict([0.5]);
