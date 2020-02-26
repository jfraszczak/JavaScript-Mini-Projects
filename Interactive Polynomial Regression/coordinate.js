class coordinate{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  draw(){
    stroke(255);
    strokeWeight(6);
    point(this.x * width, height - this.y * height);   
  }
  
}