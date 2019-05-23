let range1;
let range2;
let pos;
let dir;
let w = 20;
let playerSize = 10;
let activePosition;
let active;
let deltaAngle = rangeOfVision / 300;
let sensitivity = Math.PI / 60;

console.log("test github")

function setup() {
  //environment
  createCanvas(450, 200);
  frameRate(60);
  range1 = [
    0, 200
  ];
  range2 = [
    200, width
  ];
  //setup grid
  for (let i = 0; i < floor(range1[1] / w); i++) {
    grid[i] = []
    for (let j = 0; j < floor(height / w); j++) {
      grid[i].push(new Position(i, j));
    }
  }
  stack.push(grid[0][0]);
  while (stack.length != 0) {
    run();
  }
  for (let i = 0; i < floor(range1[1] / w); i++) {
    for (let j = 0; j < floor(height / w); j++) {
      grid[i][j].addWalls();
    }
  }

  // player
  pos = [
    w/2, w/2
  ];
  dir = [
    0, 1
  ];
  ellipseMode(CENTER);
  activePosition = getActivePosition(pos[0], pos[1]);
  active = grid[activePosition[0]][activePosition[1]];

  //rays
  const start = - rangeOfVision / 2;
  const end = rangeOfVision / 2;
  for(let i = start; i <= end; i += deltaAngle){
    rays.push(new Ray(i));
  }
}

function constrainPos(){
  if(active.walls[0] && pos[0] < active.x+1){
    pos[0] = active.x+1;
  }
  if(active.walls[1] && pos[1] > active.y+w-1){
    pos[1] = active.y+w-1;
  }
  if(active.walls[2] && pos[0] > active.x+w-1){
    pos[0] = active.x+w-1;
  }
  if(active.walls[3] && pos[1] < active.y+1){
    pos[1] = active.y+1;
  }
}

function draw() {
  background(0);
  checkForInput();
  constrainPos();
  if(document.getElementById("showMazeCheckBox").checked){
    for (let i = 0; i < bodies.length; i++) {
      bodies[i].render();
    }
  }
  for(let i = 0; i < rays.length; i++){
    rays[i].update();
    rays[i].render();
  }
  ellipse(pos[0], pos[1], playerSize, playerSize);
  activePosition = getActivePosition(pos[0], pos[1]);
  active = grid[activePosition[0]][activePosition[1]];

  //3D view
  rectMode(CORNERS);
  noStroke();
  for(let i = 0; i < rays.length/2; i++){
    render3Dray(i);
  }
  for(let i = rays.length-1; i >= rays.length/2; i--){
    render3Dray(i);
  }
}

function render3Dray(i){
  const deltax = (range2[1]-range2[0])/rays.length;
  // https://gamedev.stackexchange.com/questions/45295/raycasting-fisheye-effect-question
  const maxlength = Math.sqrt(range1[1] * range1[1] + height * height);
  const len = map(rays[i].len * Math.cos(rays[i].relativeAngle), 0, maxlength, maxlength, 0)/1.6;
  //const len = map(rays[i].len, range1[0], range1[1], range1[1], range1[0]);
  const deltax2 = map(Math.abs(rays[i].relativeAngle), 0, rangeOfVision/2, 10, 0);
  const x = range2[0] + i * deltax;
  const y1 = height/2 - len/2;
  const y2 = height/2 + len/2;
  const color = map(len, range1[0] + range1[1]/1.5, range1[1], 0, 255);
  //console.log(map(len, range1[0] + range1[1]/1.5, range1[1], 0, 255))
  /*fill(0);
  rect(x - deltax2/2, 0, x + deltax2 / 2, height);
  fill(color);
  rect(x - deltax2/2, y1, x + deltax2 / 2, y2);*/
  stroke(color);
  line(x, y1, x, y2);
}

function checkForInput() {
  if (keyIsDown(UP_ARROW)) {
    pos[1] += dir[1];
    pos[0] += dir[0];
  }
  if (keyIsDown(DOWN_ARROW)) {
    pos[1] -= dir[1];
    pos[0] -= dir[0];
  }
  const len = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);
  let angle = Math.atan(dir[1]/dir[0]);
  if(dir[0] < 0) angle += Math.PI;
  if(dir[1] < 0 && dir[0] > 0) angle += Math.PI * 2;
  if (keyIsDown(RIGHT_ARROW)) {
    angle += sensitivity;
  }
  if (keyIsDown(LEFT_ARROW)) {
    angle -= sensitivity;
  }
  dir[0] = Math.cos(angle) * len;
  dir[1] = Math.sin(angle) * len;
}

function getActivePosition(x, y){
  i = floor(x/w);
  j = floor(y/w);
  return [i,j];
}
