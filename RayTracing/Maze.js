//MAZE GENERATION
let stack = [];
let grid = [];

function Position(i, j) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.walls = [true, true, true, true]; // left, bottom, right, top
  this.visited = false;
  this.addWalls = () => {
    if (this.walls[0]) bodies.push(new Body(this.i * w, this.j * w, this.i * w, this.j * w + w));
    if (this.walls[1]) bodies.push(new Body(this.i * w, this.j * w + w, this.i * w + w, this.j * w + w));
    if (this.walls[2]) bodies.push(new Body(this.i * w + w, this.j * w, this.i * w + w, this.j * w + w));
    if (this.walls[3]) bodies.push(new Body(this.i * w, this.j * w, this.i * w + w, this.j * w));
  }
}

function run() {
  const curr = stack.pop();
  if (curr) {
    curr.visited = true;
    const nb = getRandomNB(curr);
    if (nb) {
      stack.push(curr);
      stack.push(nb.pos);
      nb.pos.walls[nb.index_nb] = false;
      curr.walls[nb.index_curr] = false;
    }
  }
}

function getRandomNB(pos) {
  let nbs = [];
  const i = pos.i;
  const j = pos.j;
  if (check(i - 1, j) && !grid[i - 1][j].visited) {
    nbs.push({
      pos: grid[i - 1][j],
      index_curr: 0,
      index_nb: 2
    });
  }
  if (check(i + 1, j) && !grid[i + 1][j].visited) {
    nbs.push({
      pos: grid[i + 1][j],
      index_curr: 2,
      index_nb: 0
    });
  }
  if (check(i, j - 1) && !grid[i][j - 1].visited) {
    nbs.push({
      pos: grid[i][j - 1],
      index_curr: 3,
      index_nb: 1
    });
  }
  if (check(i, j + 1) && !grid[i][j + 1].visited) {
    nbs.push({
      pos: grid[i][j + 1],
      index_curr: 1,
      index_nb: 3
    });
  }
  if (nbs.length == 0) {
    return undefined;
  }
  return nbs[floor(Math.random() * nbs.length)];
}

function check(i, j) {
  if (i < 0 || i >= floor(range1[1] / w) || j < 0 || j >= floor(height / w) || grid[i][j].visited) {
    return false;
  }
  return true;
}
