/*
Possibly I could save the states in a hashmap and reuse through a linked list later on.
*/

let fractal = mandelBrot;
let zoomx = [-2, 2];
let zoomy = [-2, 2];
let scrollPrecision = 0.1
let range = 4

function setup() {
  createCanvas(300, 300);
  frameRate(10)
}

function draw() {
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      set(i, j, fractal(i, j));
    }
  }
  updatePixels();
}

function mouseWheel(event) {
  if (event.delta < 0) {
    zoomx[0] += scrollPrecision * range
    zoomx[1] -= scrollPrecision * range
    zoomy[0] += scrollPrecision * range
    zoomy[1] -= scrollPrecision * range
  } else {
    zoomx[0] -= scrollPrecision * range
    zoomx[1] += scrollPrecision * range
    zoomy[0] -= scrollPrecision * range
    zoomy[1] += scrollPrecision * range
  }
  const offsetx = map(mouseX - width / 2, -width / 2, width / 2, -range/2, range/2);
  const offsety = map(mouseY - height / 2, -height / 2, height / 2, -range/2, range/2);
  zoomx[0] += offsetx
  zoomx[1] += offsetx
  zoomy[0] += offsety
  zoomy[1] += offsety
  range = zoomx[1] - zoomx[0]
}

function mandelBrot(x, y) {
  // https://da.wikipedia.org/wiki/Mandelbrotm%C3%A6ngden
  a = map(x, 0, width, zoomx[0], zoomx[1]);
  b = map(y, 0, height, zoomy[0], zoomy[1]);
  x_n = 0;
  y_n = 0;
  let col = color(255)
  let n_max = 100;
  let colorChange = 255 / n_max;
  for (let i = 0; i < n_max; i++) {
    x_old = x_n
    x_n = x_n * x_n - y_n * y_n + a;
    y_n = 2 * x_old * y_n + b;
    z_n_len = sqrt(x_n * x_n + y_n * y_n);
    if (z_n_len > 2) { //-2/range*0.001
      col = i * colorChange;
      col = color(i*colorChange, (n_max-i-1)*colorChange, 255);
      break;
    }
    if (i == n_max - 1) col = color(0);
  }
  return col;
}

function billemset(x, y){
  a = map(x, 0, width, zoomx[0], zoomx[1]);
  b = map(y, 0, height, zoomy[0], zoomy[1]);
  x_n = 0;
  y_n = 0;
  let col = color(255)
  let n_max = 20;
  let colorChange = 255 / n_max;
  for (let i = 0; i < n_max; i++) {
    x_old = x_n
    x_n = a*b + y_n*y_n
    y_n = b*a + x_old*x_old
    z_n_len = sqrt(x_n * x_n + y_n * y_n);
    if(z_n_len > 10){
      col = color(i*colorChange, (n_max-i-1)*colorChange, 255);
      break;
    }
  }
  return col;
}