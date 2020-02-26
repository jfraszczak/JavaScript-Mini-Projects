class tile{
  
  constructor(size, length, index){
    this.size = size;
    this.length = length;
    this.index = index;
    this.color = floor(random(6));
    this.base = false;
  }
  
  draw(){
    let colors = [[255, 0, 200], [0, 255, 0], [0, 100, 255], [255, 100, 0], [255, 0, 0], [255, 255, 0]];
    this.red = colors[this.color][0];
    this.green = colors[this.color][1];
    this.blue = colors[this.color][2];
    let x, y;
    x = (this.index % this.size) / this.size * this.length;
    y = floor(this.index / this.size) / this.size * this.length;
    noStroke();
    fill(this.red, this.green, this.blue);
    square(x, y, this.length / this.size);
  }
  
}