let bodies = [];
let rotation = 0.1;

class Body{
  constructor(x1, y1, x2, y2){
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }

  render(){
    stroke(255);
    line(this.x1, this.y1, this.x2, this.y2);
  }

  intersect(ray){
    //const raya = (ray.y2-ray.y1)/(ray.x2 - ray.x1);
    //const rayb = ray.y1/(raya * ray.x1);
    /*const bodya = (this.y2-this.y1)/(this.x2 - this.x1);
    const bodyb = this.y1/(bodya * this.x1);
    console.log(raya, rayb, bodya, bodyb);
    if(raya == bodya) return Infinity;
    const x = (rayb - bodyb) / (bodya - raya);
    const y = raya * x + rayb;
    const dist = Math.sqrt((x - ray.x1)*(x - ray.x1) * (y - ray.y1)*(y - ray.y1));
    if(x >= this.x1 && x <= this.x2) return dist;
    return Infinity;*/
    let angle = Math.atan(dir[1]/dir[0]);
    angle += ray.relativeAngle;
    if(dir[0] < 0) angle += Math.PI;
    if(dir[1] < 0 && dir[0] > 0) angle += Math.PI * 2;

    const x1 = this.x1;
    const x2 = this.x2;
    const x3 = ray.x1;
    //const x4 = range1[1] * range1[1];
    //const x4 = ray.x2;
    const x4 = pos[0] + Math.cos(angle) * 1000;

    const y1 = this.y1;
    const y2 = this.y2;
    const y3 = ray.y1;
    //const y4 = raya * x4 + rayb;
    //const y4 = ray.y2;
    const y4 = pos[1] + Math.sin(angle) * 1000;

    const denominator = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4);
    const top1 = (x1-x3)*(y3-y4)-(y1-y3)*(x3-x4);
    const top2 = (x1-x2)*(y1-y3)-(y1-y2)*(x1-x3);
    const t = top1/denominator;
    const u = -top2/denominator;
    if(t >= 0 && t <= 1 && u >= 0 && u <= 1){
      const px = x1 + t*(x2-x1);
      const py = y1 + t*(y2-y1);
      const dist = Math.sqrt((px - x3)*(px - x3) + (py - y3)*(py - y3));
      return dist;
    }else{
      return undefined;
    }
  }
}
