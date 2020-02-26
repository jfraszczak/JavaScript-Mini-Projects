let width, height;
let discs;
let steps = [];
let tmpDiscs;
let index = 0;
var img;

function preload(){
  img = loadImage('rainbow1.png');
}

function setup() {
  width = 600;
  height = 300;
  createCanvas(width, height);
  HanoiSolver(7);
}

function draw() {
  background(img);
  frameRate(1);
  drawRods();
  drawDiscs();
  update_drawing(7);
}

function drawRods(){
  fill(200, 0, 100);
  rectMode(CENTER);
  for(let i = 0; i < 3; i++){rect(width / 3 * i + width / 6, height - 13 * height / 30, 7, 26 * height / 30);}
}

function drawDiscs(){
  for(let i = 0; i < 3; i++){
    rectMode(CENTER);
    if(tmpDiscs[i].length > 0){
      for(let j = 0; j < tmpDiscs[i].length; j++){
        fill(255, 0, 200);
        rect(width / 3 * i + width / 6, height - height / 30 - height / 15 * j, width * 0.05 + width / 40 * tmpDiscs[i][j] , height / 15, 20);
        fill(255);
        text(tmpDiscs[i][j], width / 3 * i + width * 0.162 , height - height / 50 - height / 15 * j);
      }
    }
  }
}

function initialize_discs(number){
  discs = [[], [], []];
  for(let i = number; i > 0; i--){
    discs[0].push(i);
  }
}

function auxiliary_rod(position, target){
  let rod;
  for(let i = 0; i < 3; i++){
    if(i != position && i != target){rod = i;}
  }
  return rod;
}

function Hanoi(number, position, target){
  if(number == 1){
    let tmp = discs[position][discs[position].length - 1];
    discs[position].pop();
    discs[target].push(tmp);
    steps.push([tmp, position, target]);
  }
  else{
    let rod = auxiliary_rod(position, target);
    Hanoi(number - 1, position, rod);
    let tmp = discs[position][discs[position].length - 1];
    discs[position].pop();
    discs[target].push(tmp);
    steps.push([tmp, position, target]);
    Hanoi(number - 1, rod, target);
  }
}

function HanoiSolver(number){
  initialize_discs(number);
  initialize_tmpDiscs(number);
  Hanoi(number, 0, 2);
}

function initialize_tmpDiscs(number){
  tmpDiscs = [[], [], []];
  for(let i = number; i > 0; i--){
    tmpDiscs[0].push(i);
  }
}

function update_drawing(number){
  if(index < steps.length){
    tmpDiscs[steps[index][1]].pop();
    tmpDiscs[steps[index][2]].push(steps[index][0]);
    index++;
  }
  else{
    initialize_tmpDiscs(number);
    index = 0;
  }
}

