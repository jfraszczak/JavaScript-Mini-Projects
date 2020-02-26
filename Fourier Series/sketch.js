class Vector{
 constructor(x, y, frequency, radius){
   this.x1 = x;
   this.y1 = y;
   this.x2 = cos(-time * this.frequency * 2 * PI) * this.radius + this.x1;
   this.y2 = sin(-time * this.frequency * 2 * PI) * this.radius + this.y1;
   this.frequency = frequency;
   this.radius = radius;
 }
  
 update(){
   this.x2 = cos(-time * this.frequency * 2 * PI) * this.radius + this.x1;
   this.y2 = sin(-time * this.frequency * 2 * PI) * this.radius + this.y1;
 }
  
 draw(){
   this.update();
   stroke(255);
   noFill();
   ellipse(this.x1, this.y1, 2 * this.radius);
   line(this.x1, this.y1, this.x2, this.y2);
 }
  
}


let time = 0;
let vector = [];
let N = 10;
let wave = [];
let width = 800, height = 400;

function setup() {
  createCanvas(width, height);
  let x = 200, y = height / 2;
  let radius;
  let frequency;
  for(let i = 0; i < N; i++){
    radius = 4 / ((2 * i + 1) * PI) * 50;
    frequency = 2 * i + 1;
    vector.push(new Vector(x, y, frequency, radius));
    x = vector[i].x2;
    y = vector[i].y2;
  }
}

function draw() {
  background(0);
  
  let x = 200, y = 200;
  for(let i = 0; i < N; i++){
    vector[i].x1 = x;
    vector[i].y1 = y;
    vector[i].draw();
    x = vector[i].x2;
    y = vector[i].y2;
  }
  wave.unshift(y);
  if(wave.length > width / 2){wave.pop();}
  beginShape();
  for(let i = wave.length; i >= 0; i--){
    vertex(width / 2 + i, wave[i]); 
  }
  endShape();
  
  line(x, y, width / 2, y);
  
  
  time += 0.005;
}
