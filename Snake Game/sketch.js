var snake;
let width;
let height;
let buttons_height;
var img;

function preload(){
  img = loadImage('rainbow1.png');
}

function setup() {
  width = 1000;
  height = 1000;
  buttons_height = 250;
  
  createCanvas(width, height + buttons_height);
  snake = new Snake();
  food = new Food();
}

function draw() {
  background(img);
  frameRate(15);
  buttons();
  textSize(50);
  fill(255, 255, 0);
  text('SCORE: ' + (snake.tail.length - 1), 10, 50);
  snake.update();
  snake.show();
  food.show();
}

function buttons(){
  if(touches.length > 0 && touches[0].x < width / 2 && touches[0].y > height && touches[0].y < height + buttons_height){fill(255, 0, 100);}
  else{fill(200, 0, 100);}
  rect(0, height, width / 2, height + buttons_height);
  
  if(touches.length > 0 && touches[0].x > width / 2 && touches[0].y > height && touches[0].y < height + buttons_height){fill(255, 0, 100);}
  else{fill(200, 0, 100);}
  rect(width / 2, height, width / 2, height + buttons_height);
  
  fill(255, 50, 200);
  textSize(80);
  text("LEFT", width / 7, height + buttons_height * 2 / 3);
  text("RIGHT", width * 4.5 / 7, height + buttons_height * 2 / 3);
}

function keyPressed(){
  if(snake.x >= 0 && snake.x < width && snake.y >= 0 && snake.y < height){
  if (keyCode === RIGHT_ARROW){
    if(snake.ySpeed == 0){
      if(snake.xSpeed > 0){snake.changeDirection(0, 1);}
      else{snake.changeDirection(0, -1);}
    }
    else{
      if(snake.ySpeed > 0){snake.changeDirection(-1, 0);}
      else{snake.changeDirection(1, 0);}  
    }
  }
  else if (keyCode === LEFT_ARROW){
    if(snake.ySpeed == 0){
      if(snake.xSpeed > 0){snake.changeDirection(0, -1);}
      else{snake.changeDirection(0, 1);}
    }
    else{
      if(snake.ySpeed > 0){snake.changeDirection(1, 0);}
      else{snake.changeDirection(-1, 0);}  
    }
  }
  }
  
}

function touchStarted(){
  if(snake.x >= 0 && snake.x < width && snake.y >= 0 && snake.y < height){
  if(touches[0].x > width / 2 && touches[0].y > height && touches[0].y < height + buttons_height){
    if(snake.ySpeed == 0){
      if(snake.xSpeed > 0){snake.changeDirection(0, 1);}
      else{snake.changeDirection(0, -1);}
    }
    else{
      if(snake.ySpeed > 0){snake.changeDirection(-1, 0);}
      else{snake.changeDirection(1, 0);}  
    }
  }
  else if(touches[0].x < width / 2 && touches[0].y > height && touches[0].y < height + buttons_height){
  if(snake.ySpeed == 0){
      if(snake.xSpeed > 0){snake.changeDirection(0, -1);}
      else{snake.changeDirection(0, 1);}
    }
    else{
      if(snake.ySpeed > 0){snake.changeDirection(1, 0);}
      else{snake.changeDirection(-1, 0);}  
    }
  }
  }
}

class Food{
  constructor(){
    this.size = snake.size;
    this.x = floor(random(width / this.size)) * this.size;
    this.y = floor(random(height / this.size)) * this.size;
  }
  
  show(){
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }
  
  newLocation(){
    this.x = floor(random(width / this.size)) * this.size;
    this.y = floor(random(height / this.size)) * this.size;
  }
  
}

class Snake{
  constructor(){
    this.size = 40;
    this.x = floor(width / 2 / this.size) * this.size;
    this.y = floor(height /2 / this.size) * this.size;
    this.speed = 40;
    this.xSpeed = this.speed;
    this.ySpeed = 0;
    this.tail = [];
    this.tail.push([this.x, this.y]);
    this.previousLocation;
  }
  
  show(){
    fill(255, 0, 200);
    for(let i = 0; i < this.tail.length; i++){
      if(this.tail[i][1] < height){
        rect(this.tail[i][0], this.tail[i][1], this.size, this.size);
      }
    }
  }
  
  update(){
    this.previousLocation = this.tail[this.tail.length - 1];
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if(this.x > width){this.x = this.x % width;}
    else if(this.x < 0){this.x = width - this.x % width;}
    
    if(this.y > width){this.y = this.y % width;}
    else if(this.y < 0){this.y = width - this.y % width;}
    
    for(let i = this.tail.length - 1; i > 0; i--){
      this.tail[i] = this.tail[i - 1];  
    }
    this.tail[0] = [this.x, this.y];
    this.eat_yourself();
    this.eat();
  }
  
  changeDirection(x, y){
    this.xSpeed = x * this.speed;
    this.ySpeed = y * this.speed;
  }
  
  eat(){
    if(abs(this.x - food.x) < this.size && abs(this.y - food.y) < this.size){
      food.newLocation();
      this.tail.push(this.previousLocation[this.previousLocation.length - 1]);
    }
  }
  
  eat_yourself(){
    let position;
     for(let i = 1; i < this.tail.length; i++){
       if(abs(this.x - this.tail[i][0]) < this.size && abs(this.y - this.tail[i][1]) < this.size){
           position = i;
       }
     }
    this.tail.splice(position, this.tail.length - position);
  }

  
}

