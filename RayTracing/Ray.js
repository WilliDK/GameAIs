let rangeOfVision = 60 / 360 * 2 * Math.PI;
let rays = [];

class Ray{
  constructor(relativeAngle){
    this.relativeAngle = relativeAngle;
    this.len = 1000;
  }

  update(){
    let angle = Math.atan(dir[1]/dir[0]);
    angle += this.relativeAngle;
    if(dir[0] < 0) angle += Math.PI;
    if(dir[1] < 0 && dir[0] > 0) angle += Math.PI * 2;
    this.x1 = pos[0];
    this.y1 = pos[1];
    this.updateLength();
    this.x2 = pos[0] + Math.cos(angle) * this.len;
    this.y2 = pos[1] + Math.sin(angle) * this.len;
  }

  updateLength(){
    this.len = height * height + range1[1] * range1[1];
    for(let i = 0; i < bodies.length; i++){
      const temp = bodies[i].intersect(this);
      if(temp < this.len){
        this.len = temp;
      }
    }
  }

  render(){
    stroke(255);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}
