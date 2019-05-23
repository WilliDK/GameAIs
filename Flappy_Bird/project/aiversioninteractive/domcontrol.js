function getSliderValue(id){
  return Number(document.getElementById(id).value);
}

function setVariables(){
  //game
  pace = getSliderValue("pace");
  spaceBetweenObstacles = getSliderValue("spaceBetweenObstacles");
  w = getSliderValue("w");
  innerspace = getSliderValue("innerspace");
  fps = getSliderValue("fps");

  //model
  LEARNING_RATE = getSliderValue("LEARNING_RATE");
  amountofinstances = getSliderValue("amountofinstances");
}
