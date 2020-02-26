let Size = 6;
let length = 400;
let tiles;
let potential;
let base;
let recentColor;
let replay;
let moves;

function preload(){
  replay = loadImage("replay1.png");
}

function setup(){
  createCanvas(length, length * 1.3);
  initialize();
}

function draw() {
  background(255);
  for(let i = 0; i < Size * Size; i++){
    tiles[i].draw();
  }
  drawTiles();
  strokeWeight(3);
  stroke(0);
  line(0, length * 1.08, width, length * 1.08);
  line(0, length * 1.27, width, length * 1.27);
  if(base.length == Size * Size){
    if(mouseX >= length / 2 - length / 4 && mouseX <= length / 2 + length / 4 &&
       mouseY >= length / 2 - length / 4 && mouseY <= length / 2 + length / 4){drawReplay(1.1);}
    else{drawReplay(1);}
  }
  strokeWeight(2);
  textSize(26);
  fill(255,255,0);
  text("Moves: " + moves, length * 0.37, length * 1.06);
}

function drawTiles(){
  let colors = [[255, 0, 200], [0, 255, 0], [0, 100, 255], [255, 100, 0], [255, 0, 0], [255, 255, 0]];
  for(let i = 0; i < 6; i++){
    let x = length / 6 * i + length / Size * 0.05;
    let y = 1.1 * length;
    if(mouseX >= x && mouseX <= x + length / Size * 0.9 && mouseY >= y && mouseY <= y + length / Size * 0.9){
      fill(colors[i][0], colors[i][1], colors[i][2], 100);
    }
    else{fill(colors[i][0], colors[i][1], colors[i][2]);}
    square(x, y, length / Size * 0.9);
  }
}

function mousePressed(){
  if(base.length < Size * Size){
  if(mouseY >= 1.1 * length && mouseY <= 1.1 * length + length / Size * 0.9){
    if(mouseX >= length / 6 * 0 + length / Size * 0.05 && mouseX <= length / 6 * 0 + length / Size * 0.05 + length / Size * 0.9){
      if(recentColor != 0){moves++;}
      recentColor = 0;
      while(update());
    }
    else if(mouseX >= length / 6 * 1 + length / Size * 0.05 && mouseX <= length / 6 * 1 + length / Size * 0.05 + length / Size * 0.9){
      if(recentColor != 1){moves++;}
      recentColor = 1;
      while(update());
    }
    else if(mouseX >= length / 6 * 2 + length / Size * 0.05 && mouseX <= length / 6 * 2 + length / Size * 0.05 + length / Size * 0.9){
      if(recentColor != 2){moves++;}
      recentColor = 2;
      while(update());
    }
    else if(mouseX >= length / 6 * 3 + length / Size * 0.05 && mouseX <= length / 6 * 3 + length / Size * 0.05 + length / Size * 0.9){
      if(recentColor != 3){moves++;}
      recentColor = 3;
      while(update());
    }
    else if(mouseX >= length / 6 * 4 + length / Size * 0.05 && mouseX <= length / 6 * 4 + length / Size * 0.05 + length / Size * 0.9){
      if(recentColor != 4){moves++;}
      recentColor = 4;
      while(update());
    }
    else if(mouseX >= length / 6 * 5 + length / Size * 0.05 && mouseX <= length / 6 * 5 + length / Size * 0.05 + length / Size * 0.9){
      if(recentColor != 5){moves++;}
      recentColor = 5;
      while(update());
    }
  }
  }
  else{
    if(mouseX >= length / 2 - length / 4 && mouseX <= length / 2 + length / 4 &&
       mouseY >= length / 2 - length / 4 && mouseY <= length / 2 + length / 4){initialize();} 
  }
  
  
  
}

function update(){
  let flag = false;
  for(let i = 0; i < potential.length; i++){
    if(recentColor == tiles[potential[i]].color){
      base.push(potential[i]);
      tiles[potential[i]].base = true;
      potential = addPotential(potential[i], potential);
      potential.splice(i, 1);
      flag = true;
    }
  }
  for(let i = 0; i < base.length; i++){
    tiles[base[i]].color = recentColor;
  }
  print(base, potential);
  return flag;
}

function addPotential(index, potential){
  if(floor(index / Size) != 0 && !potential.includes(index - Size) && !tiles[index - Size].base){potential.push(index - Size);}
  if(floor(index / Size) != Size - 1 && !potential.includes(index + Size) && !tiles[index + Size].base){potential.push(index + Size);}
  if(index % Size != 0 && !potential.includes(index - 1) && !tiles[index - 1].base){potential.push(index - 1);}
  if(index % Size != Size - 1 && !potential.includes(index + 1) && !tiles[index + 1].base){potential.push(index + 1);}
  return potential;
}

function initialize(){
  tiles = [];
  potential = [];
  base = [0]
  moves = 0;
  for(let i = 0; i < Size * Size; i++){
    tiles.push(new tile(Size, length, i));
  }
  potential.push(1);
  potential.push(Size);
  tiles[0].base = true;
  recentColor = tiles[0].color;
  while(update());
}

function drawReplay(scale){
  image(replay, length / 2 - length / 4 * scale, length / 2 - length / 4 * scale, length / 2 * scale, length / 2 * scale); 
}
