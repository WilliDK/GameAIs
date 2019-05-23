var direction = [0, 0];
var coords;
var w = 20;
var foodCoords = [200, 100];
var highscore = 0;
var theKey;

function setup() {
	createCanvas(400, 400);
	frameRate(60);
	//for AI v2
		setupNeuralNetwork([int(width/w) * int(height/w) * 2, 100, 100, 10, 4]);
	coords = [
		[int(width/w)/2*w, int(height/w)/2*w]
	];
}

let counter = 0;

function draw() {

	//Manual mode:
		//setDirection();
	//AI mode v1:
		theKey = predictv1(coords[0], foodCoords);
		setDirection(); // this breaks it somtimes
	//AI mode v2:
		/*counter++;
		if(counter == 50){
			counter = 0
			improve(coords.length, 10);
			coords = [[int(width/w)/2*w, int(height/w)/2*w]];
		}
		theKey = predictv2(formatInput(foodCoords, coords));
		setDirection();*/
    //AI mode v3: unsupervised

	background(160);
	noStroke();
	fill(255);
	for (var i = 0; i < width / w; i++) {
		for (var j = 0; j < height / w; j++) {
			if ((j % 2 == 0 && i % 2 == 0) || (j % 2 == 1 && i % 2 == 1)) rect(i * w, j * w, w, w);
		}
	}
	fill(color(10, 10, 200));
	rect(foodCoords[0], foodCoords[1], w, w);
	fill(color(10, 200, 10));
	for (var i = coords.length - 1; i >= 1; i--) {
		coords[i][0] = coords[i - 1][0];
		coords[i][1] = coords[i - 1][1];
		rect(coords[i][0], coords[i][1], w, w);
	}
	coords[0][0] += direction[0] * w;
	coords[0][1] += direction[1] * w;
	coords[0] = checkPosition(coords[0])
	fill(color(200, 10, 10));
	rect(coords[0][0], coords[0][1], w, w);
	if (coords[0][0] == foodCoords[0] && coords[0][1] == foodCoords[1]) {
		coords.push([-w*2, -w*2]);
		foodCoords = [int(Math.random() * width/w) * w, int(Math.random() * height/w) * w]
		while(contains(coords, foodCoords)) foodCoords = [int(Math.random() * width/w) * w, int(Math.random() * height/w) * w]
	}
	fill(0);
	textSize(20);
	text("Highscore : " + highscore + " | score : " + coords.length, 3, height-3);
	//console.log(coords);
	for (var i = coords.length - 1; i >= 1; i--) {
		if(coords[i][0] == coords[0][0] && coords[i][1] == coords[0][1]){
			if(coords.length > highscore) highscore = coords.length;
			coords = [[int(width/w)/2*w, int(height/w)/2*w]];
			break;
		}
	}
}

function checkPosition(pos){
	if(pos[0] >= width) pos[0] = 0
	else if(pos[0] < 0) pos[0] = width
	if(pos[1] >= height) pos[1] = 0
	else if(pos[1] < 0) pos[1] = height
	return pos
}

function keyPressed(){
	theKey = keyCode;
	console.log(keyCode);
}

function setDirection() {
	if (theKey === LEFT_ARROW && direction[0] != 1) {
		direction = [-1, 0];
	} else if (theKey === RIGHT_ARROW && direction[0] != -1) {
		direction = [1, 0];
	} else if (theKey === UP_ARROW && direction[1] != 1) {
		direction = [0, -1];
	} else if (theKey === DOWN_ARROW && direction[1] != -1) {
		direction = [0, 1];
	}
}
