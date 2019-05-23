function activiate(sum){
  return 1/(1+Math.pow(Math.E, -1*sum)); //sigmoid
}

function randomMatrix(a,b){
  let matrix = [];
  for(let i = 0; i < a; i++){
    matrix.push([]);
    for(let j = 0; j < b; j++){
      //matrix[i].push(Math.random()); // should it be negative,(Math.random()-0.5)*2
      matrix[i].push((Math.random()-0.5)*2);
    }
  }
  return matrix;
}

function constantMatrix(a,b,c){
  let matrix = [];
  for(let i = 0; i < a; i++){
    matrix.push([]);
    for(let j = 0; j < b; j++){
      matrix[i].push(c);
    }
  }
  return matrix;
}

function randomList(len, val){
  let res = []
  for(let i = 0; i < len; i++){
    res.push((Math.random()-0.5)*2);
  }
  return res;
}

function constantList(len, val){
  let res = []
  for(let i = 0; i < len; i++){
    res.push(val);
  }
  return res;
}

function derivedCostasBias(result, previousLayerCost){
  return derivedActivationasResult(result) * previousLayerCost
}

function getTotalCost(activation, previousLayerCosts, previousLayerResults){
  let sum = 0;
  for(let i = 0; i < previousLayerCosts.length; i++){
    sum += derivedCostasActivation({
      basecase : false,
      previousderivedresultasactivation : derivedResultasPreviousActivation(activation),
      previousderivedactivationaspreviousresult : derivedActivationasResult(previousLayerResults[i]),
      previousderivedcostaspreviousactivation : previousLayerCosts[i],
    })
  }
  return sum;
}

function getWeightChange(previousactivation, result, derivedCostasActivation){
  return derivedCostasWeight(
    derivedResultasWeight(previousactivation),
    derivedActivationasResult(result),
    derivedCostasActivation
  );
}

function derivedCostasWeight(derivedResultasWeight, derivedActivationasResult, derivedCostasActivation){
  return derivedResultasWeight * derivedActivationasResult * derivedCostasActivation;
}


/*
calculation=null, testdata=null,
basecase=false,
previousderivedresultasactivation=null,
previousderivedactivationaspreviousresult=null,
previousderivedcostaspreviousactivation=null,
*/

function derivedCostasActivation(options){
    if(options.basecase){
      return 2*(options.calculation-options.testdata);
    }else{
      return options.previousderivedresultasactivation * options.previousderivedactivationaspreviousresult * options.previousderivedcostaspreviousactivation;
    }
}

function derivedActivationasResult(result){
  //return activiate(result)*(1-activiate(result)); // https://towardsdatascience.com/derivative-of-the-sigmoid-function-536880cf918e
  return Math.pow(Math.E, -1 * result) / (Math.pow(Math.E, -1 * result) * Math.pow(Math.E, -1 * result) + 2 * Math.pow(Math.E, -1 * result) + 1)
}

function derivedResultasPreviousActivation(weight){
  return weight;
}

function derivedResultasWeight(previousactivation){
  return previousactivation;
}

module.exports = {
  activiate : activiate,
  randomMatrix : randomMatrix,
  constantMatrix : constantMatrix,
  derivedCostasActivation : derivedCostasActivation,
  getWeightChange : getWeightChange,
  getTotalCost : getTotalCost,
  derivedCostasBias : derivedCostasBias,
  constantList : constantList
}
