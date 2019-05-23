const w = 5;
const ITERATIONS = 1000;
const NETWORKS = 100;
let globalNNconfig;
let globalStartCoords;
let globalFoodCoords = [];
let games = [];
let iterator = 0;
let fps = 1000;

function setup() {
  createCanvas(20, 20);
  frameRate(1);
  globalNNconfig = [int(width / w) * int(height / w) * 2, 100, 4]; //nok bevægelighed
  globalStartCoords = [
    [int(width / w) / 2 * w, int(height / w) / 2 * w]
  ];
  for (let i = 0; i < ITERATIONS; i++) {
    globalFoodCoords.push([int(random(0, width / w)) * w, int(random(0, height / w)) * w]);
  }
  for (let i = 0; i < NETWORKS; i++) {
    games.push(new Game(i));
  }
}

let counter = 0;

function draw() {
  background(160);
  noStroke();
  fill(255);
  /*for (var i = 0; i < width / w; i++) {
    for (var j = 0; j < height / w; j++) {
      //if ((j % 2 == 0 && i % 2 == 0) || (j % 2 == 1 && i % 2 == 1)) rect(i * w, j * w, w, w);
    }
  }*/
  /*for (let i = 0; i < globalFoodCoords.length; i++) {
    fill(color(0, 0, 255, 2.5*255/((i+1)*(i+1))));
    rect(globalFoodCoords[i][0], globalFoodCoords[i][1], w, w);
  }*/
  for (let i = games.length - 1; i >= 0; i--) {
    fill(color(0, 255, 0, 255));
    for (let j = games[i].coords.length - 1; j >= 0; j--) {
      rect(games[i].coords[j][0], games[i].coords[j][1], w, w);
    }
  }
  for (let j = 0; j < fps; j++) {
    for (let i = games.length - 1; i >= 0; i--) {
      if (!games[i].isDead) {
        games[i].update();
      }
    }
    iterator++;
    if (iterator == ITERATIONS) {
      iterator = 0;
      console.log("new generation");
      let best = undefined;
      let max = -1;
      let sum = 0;
      let maxLength = -1;
      for (let i = games.length - 1; i >= 0; i--) {
        sum += games[i].getScore();
        if (games[i].getScore() > max) {
          max = games[i].getScore();
          best = games[i];
          maxLength = games[i].getSize();
        }
      }
      console.log(max, sum, maxLength);
      for (let i = games.length - 1; i >= 0; i--) {
        games[i].reset();
        if (games[i] != best) {
          games[i].getBetter(best);
        }
        //games[i].predictor = best.predictor;
        //console.log(games[i].predictor);
      }
    }
  }
}

function checkPosition(pos) {
  if (pos[0] >= width) pos[0] = 0
  else if (pos[0] < 0) pos[0] = width
  if (pos[1] >= height) pos[1] = 0
  else if (pos[1] < 0) pos[1] = height
  return pos
}