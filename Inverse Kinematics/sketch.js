let arm1, arm2;
let balls = [];
let num_balls = 5;

function setup() {
  let width = 800;
  let height = 400;
  createCanvas(width, height);
  arm1 = new Arm(new Vector(50, 300), 10, 30);
  arm2 = new Arm(new Vector(750, 300), 10, 30);
  for(let i = 0; i < num_balls; i++){
    balls.push(new Ball(random(0, width), random(0, height), random(1, 3), 10));
  }
}

function draw() {
  background(0);
  
  var min1 = 100000;
  var min2 = 100000;
  var index1, index2;
  for(let i = 0; i < num_balls; i++){
    let v = (new Vector()).subtract(new Vector(balls[i].x, balls[i].y), arm1.segments[arm1.N - 1].B);
    if(v.magnitude() < min1){min1 = v.magnitude(); index1 = i;}
    v = (new Vector()).subtract(new Vector(balls[i].x, balls[i].y), arm2.segments[arm2.N - 1].B);
    if(v.magnitude() < min2){min2 = v.magnitude(); index2 = i;}
  }
  arm1.move(balls[index1].x, balls[index1].y);
  arm2.move(balls[index2].x, balls[index2].y);
  for(let i = 0; i < num_balls; i++){
    balls[i].bounce(width, height);
  }
}