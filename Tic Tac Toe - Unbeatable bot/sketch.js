let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let player1 = 'X';
let player2 = 'O';
let turn;
let moves = 0;
let winner = -1;
let flag = false;
let previous_rowPlayer;
let previous_columnPlayer;
let previous_rowBot;
let previous_columnBot;
let tie = false;

function setup() {
  var width = 1000;
  var height = 1000;
  createCanvas(width, height);
  if(random(1) < 0.5){
   turn = player1;
  }else{
    turn = player2;
  }
}

function draw() {
  if(winner == -1 && !tie){
    background(255);
    AI();
    checkWinner();
    drawBoard();
    tie = checkDraw();
  }
  else{sleep(1500); NewGame();}
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function drawBoard(){
  stroke(0);
  for(let i = 1; i < 3; i++){
    strokeWeight(4);
    line(width / 3 * i, 0, width / 3 * i, height);
    line(0, height / 3 * i, width, height / 3 * i);
  }
  
  let row;
  let column;
  
  for(let grid = 0; grid < 9; grid++){
    row = floor(grid / 3);
    column = grid % 3;
    if(board[row][column] == 'X'){
      drawX(grid);
    }else if(board[row][column] == 'O'){
      drawO(grid);
    }
  }
}

function drawX(grid){
  stroke(255, 0, 200);
  let row = floor(grid / 3);
  let column = grid % 3;
  let scale = 11;
  line(column * width / 3 + width / scale, row * height / 3 + height / scale, (column + 1) * width / 3 - width / scale, (row + 1) * height / 3 -height / scale);
  line((column + 1) * width / 3 - width / scale, row * height / 3 + height / scale, column * width / 3 + width / scale, (row + 1) * height / 3 - height / scale);
}

function drawO(grid){
  stroke(255, 0, 200);
  let row = floor(grid / 3);
  let column = grid % 3;
  fill(255, 0);
  ellipse(width / 6 + column * width / 3, height / 6 + row * height / 3, width / 5, height / 5);
  
}

function mousePressed(){
  sleep(100);
  if(!flag){
  let row;
  let column;
  for(let grid = 0; grid < 9; grid++){
    row = floor(grid / 3);
    column = grid % 3;
    if(mouseX > column * width / 3 && mouseX < (column + 1) * width / 3 && mouseY > row * height / 3 && mouseY < (row + 1) * height / 3 
       && board[row][column] == ''){
      if(turn == player1){
        board[row][column] = player1;
        previous_rowPlayer = row;
        previous_columnPlayer = column;
        turn = player2;
      }else{
        board[row][column] = player2;
        turn = player1;
      }
    }
  }
  moves++;
  }
}

function touchStarted(){
 sleep(100);
 if(!flag){
  let row;
  let column;
  for(let grid = 0; grid < 9; grid++){
    row = floor(grid / 3);
    column = grid % 3;
    if(touches[0].x > column * width / 3 && touches[0].x < (column + 1) * width / 3 && touches[0].y > row * height / 3 && 
       touches[0].y < (row + 1) * height / 3 && board[row][column] == ''){
      if(turn == player1){
        board[row][column] = player1;
        previous_rowPlayer = row;
        previous_columnPlayer = column;
        turn = player2;
      }else{
        board[row][column] = player2;
        turn = player1;
      }
    }
  }
  moves++;
  }
  return false;
  
}

function checkWinner(){
 if(moves >= 5 && winner == -1){
   for(let i = 0; i < 3; i++){
     if(board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] != ''){
       flag = true;
       winner = board[i][0];
       line(width / 24, height / 6 + i * height / 3, width / 24 * 23, height / 6 + i * height / 3); 
     }
   }
   for(let i = 0; i < 3; i++){
     if(board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] != ''){
       flag = true;
       winner = board[0][i];
       line(width / 6 + width / 3 * i, height / 24, width / 6 + width / 3 * i, height / 24 * 23);
     }
   }
   if(board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] != ''){
    flag = true;
    winner = board[0][0];
    line(width / 30, height / 30, width / 30 * 29, height / 30 * 29);
   }
   if(board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] != ''){
    flag = true;
    winner = board[0][2];
    line(width / 30 * 29, height / 30, width / 30, height / 30 * 29);
   }
 }
 return flag;
}

function checkDraw(){
  let k = 0;
  for(let i = 0; i < 3; i++){
   for(let j = 0; j < 3; j++){
     if(board[i][j] != ''){k++;} 
   }
  }
  if(k == 9){return true;}
  else{return false;}
}

function FirstStart_FirstMove(){
  if(moves == 0 && turn == player2){
    let corners = [0, 2, 6, 8];
    let tmp = floor(random(0, 4));
    let row = floor(corners[tmp] / 3);
    let column = corners[tmp] % 3;
    board[row][column] = player2;
    previous_rowBot = row;
    previous_columnBot = column;
    moves++;
    turn = player1;
  }
}

function FirstStart_SecondMove(){
  if(moves == 2 && turn == player2){
    if(previous_rowPlayer == 1 && previous_columnPlayer == 1){board[2 - previous_rowBot][2- previous_columnBot] = player2;}
    else{board[1][1] = player2;}
    moves++;
    turn = player1;
  }
}

function SecondStart_FirstMove(){
  if(moves == 1 && previous_rowPlayer == 1 && previous_columnPlayer == 1 && turn == player2){
    shuffle(coords);
    board[coords[0][0]][coords[0][1]] = player2;
    moves++;
    turn = player1;
    strategy = 3;
  }
  else if(moves == 1 && (previous_rowPlayer + previous_columnPlayer) % 2 == 0 && turn == player2){
    board[1][1] = player2;
    edge = true;
    moves++;
    turn = player1;
    strategy = 1;
  }
  else if(moves == 1 && (previous_rowPlayer + previous_columnPlayer) % 2 == 1 && turn == player2){
    board[1][1] = player2;
    moves++;
    turn = player1;
    strategy = 2;
  }
}

function BlockWin(){
  if((moves >= 4 || moves % 2 == 1) && turn == player2 && winner == -1){
    let grid1 = possibleWin(player1);
    let grid2 = possibleWin(player2);
    print(grid1, grid2);
    if(grid2 != -1){board[floor(grid2 / 3)][grid2 % 3] = player2; moves++; turn = player1;}
    else if(grid1 != -1){board[floor(grid1 / 3)][grid1 % 3] = player2; moves++; turn = player1;}
    }
  }

function SecondStart_SecondMove(){
  if(moves == 3 && turn == player2){
    if(strategy == 1){
      let edges = [[0, 1], [1, 0], [1, 2], [2, 1]];
      shuffle(edges);
      board[edges[0][0]][edges[0][1]] = player2;
      moves++;
      turn = player1;
    }
    else if(strategy == 2){
      if((board[1][0] == player1 && board[1][1] == player2 && board[1][2] == player1) || 
         (board[0][1] == player1 && board[1][1] == player2 && board[2][1] == player1)){
       
        let corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
        shuffle(corners);
        board[corners[0][0]][corners[0][1]] = player2;
        turn = player1;
        moves++;
        previous_rowBot = corners[0][0];
        previous_columnBot = corners[0][1];
        print(1);
      }
      else if((previous_rowPlayer + previous_columnPlayer) % 2 == 1){
        strategy22();
        turn = player1;
        moves++;
        print(2);
      }
    }
    else if(strategy == 3){
      if(board[0][0] == ''){board[0][0] = player2;}
      else if(board[0][2] == ''){board[0][2] = player2;}
      else if(board[2][0] == ''){board[2][0] = player2;}
      else if(board[2][2] == ''){board[2][2] = player2;}
      turn = player1;
      moves++;
    }
  }
}

function RandomMove(){
  if(turn == player2 && !checkDraw()){
    let free_grids = [];
    for(let i = 0; i < 3; i++){
     for(let j = 0; j < 3; j++){
       if(board[i][j] == ''){free_grids.push([i, j]);}
     }
    }
    shuffle(free_grids);
    board[free_grids[0][0]][free_grids[0][1]] = player2;
    print("Random Move");
    turn = player1;
    moves++;
  }
}

function NewGame(){
  board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
  ];
  
  moves = 0;
  winner = -1;
  flag = false;
  
  if(random(1) < 0.5){
   turn = player1;
  }else{
    turn = player2;
  }
  
  coords = [[0, 0], [0, 2], [2, 0], [2, 2]];
  strategy = 0;
  tie = false;
}


let coords = [[0, 0], [0, 2], [2, 0], [2, 2]];
let strategy = 0;

function AI(){
  //BEGIN AS FIRST
  
  //first move
  FirstStart_FirstMove();
  //second move
  FirstStart_SecondMove();
  
  
  //BEGIN AS SECOND
  
  //first move
  SecondStart_FirstMove();

  // blocking + winning
  BlockWin();
  
  //second move
  SecondStart_SecondMove();
  
  //nothing else to do
  RandomMove();
  
  
}

function possibleWin(player){
  let numberPlayer;
  let numberEmpty;
  let grid = -1;
  let tmp_grid;
  let flag = false;
  for(let i = 0; i < 3; i++){
    numberPlayer = 0;
    numberEmpty = 0;
    for(let j = 0; j < 3; j++){
      if(board[i][j] == player){numberPlayer++;}
      else if(board[i][j] == ''){numberEmpty++; tmp_grid = i * 3 + j;}
    }
    if(numberPlayer == 2 && numberEmpty == 1){flag = true; grid = tmp_grid;}
  }
  for(let i = 0; i < 3; i++){
    numberPlayer = 0;
    numberEmpty = 0;
    for(let j = 0; j < 3; j++){
      if(board[j][i] == player){numberPlayer++;}
      else if(board[j][i] == ''){numberEmpty++; tmp_grid = j * 3 + i;}
    }
    if(numberPlayer == 2 && numberEmpty == 1){flag = true; grid = tmp_grid;}
  }
  numberPlayer = 0;
  numberEmpty = 0;
  for(let i= 0; i < 3; i++){
    if(board[i][i] == player){numberPlayer++;}
    else if(board[i][i] == ''){numberEmpty++; tmp_grid = i * 3 + i;}
    if(numberPlayer == 2 && numberEmpty == 1){flag = true; grid = tmp_grid;}
  }
  numberPlayer = 0;
  numberEmpty = 0;
  for(let i= 0; i < 3; i++){
    if(board[i][2 - i] == player){numberPlayer++;}
    else if(board[i][2 - i] == ''){numberEmpty++; tmp_grid = i * 3 + 2 - i;}
    if(numberPlayer == 2 && numberEmpty == 1){flag = true; grid = tmp_grid;}
  }
  return grid;
}

function erease(array, element){
  for(let i = array.length - 1; i >= 0; i--){
    if(compare(array[i], element)){
      array.splice(i, 1);
    }
  }
  return array;
}

function compare(array1, array2){
  let k = 0;
  if(array1.length == array2.length){
   for(let i = 0; i < array1.length; i++){
     if(array1[i] == array2[i]){k++;}
   }
  }
  if(k == array1.length){return true;}
  else{return false;}
}

function delete_rowORcol(array, row_col, index){
  if(row_col != -1){
    for(let i = array.length - 1; i >= 0; i--){
      if(array[i][row_col] == index){array.splice(i, 1);}
    }
  }
  return array;
}

function strategy22(){
  let corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
  let edges = [[0, 1], [1, 0], [1, 2], [2, 1]];
  let prohibited_corner;
  let prohibited_edges = [];
  for(let i = 0; i < 4; i++){
    if(board[corners[i][0]][1] == '' && board[1][corners[i][1]] == ''){prohibited_corner = corners[i];}
    if(board[edges[i][0]][edges[i][1]] == ''){prohibited_edges.push(edges[i]);}
  }
  let free_grids = [];
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      if(board[i][j] == '' && (i != prohibited_corner[0] || j != prohibited_corner[1]) && 
         (i != prohibited_edges[0][0] || j != prohibited_edges[0][1]) && (i != prohibited_edges[1][0] || j != prohibited_edges[1][1])){
         free_grids.push([i, j]);
      }
    }
  }
  free_grids = shuffle(free_grids);
  board[free_grids[0][0]][free_grids[0][1]] = player2;
}

  
  
  
  
  