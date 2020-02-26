class Vector{

  constructor(x, y){
    this.x = x;
    this.y = y;
    this.length = sqrt(pow(x, 2) + pow(y, 2));
  }
  
  multiply(n){
    this.x *= n;
    this.y *= n;
  }
  
  add(a, b){
    let r = new Vector(a.x + b.x, a.y + b.y);
    return r;
  }
  
  subtract(a, b){
    let r = new Vector(a.x - b.x, a.y - b.y);
    return r;
  }
  
  setMag(newLength){
    this.x *= newLength / this.length;
    this.y *= newLength / this.length;
  }
  
  magnitude(){
    return sqrt(pow(this.x, 2) + pow(this.y, 2));
  }
}