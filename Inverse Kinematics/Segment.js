class Segment{

  constructor(A, length){
    this.A = A;
    this.B = new Vector();
    this.length = length; 
  }
  
  follow(targetX, targetY, newLength){
    let target = new Vector(targetX, targetY);
    let dir = (new Vector()).subtract(target, this.A);
    dir.setMag(newLength);
    dir.multiply(-1);
    dir = (new Vector()).add(dir, target);
    this.A = dir;
    this.B = target;
  }
  
  draw(){
    stroke(255);
    strokeWeight(4);
    line(this.A.x, this.A.y, this.B.x, this.B.y);
  }
}