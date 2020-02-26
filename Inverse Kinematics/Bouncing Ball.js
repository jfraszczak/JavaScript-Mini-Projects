class Ball{
  constructor(x, y, speed, radius){
    this.x = x;
    this.y = y
    this.speedX = speed;
    this.speedY = speed;
    this.radius = radius;
  }
  
  move(){
    this.x += this.speedX;
    this.y += this.speedY;
  }
  
  collision_detection(width, height){
    if(this.x <= this.radius || this.x >= width - this.radius){this.speedX *= -1;}
    if(this.y <= this.radius || this.y >= height - this.radius){this.speedY *= -1;}
  }
  
  draw(){
    fill(255, 0, 200);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2);
  }
  
  bounce(width, height){
    this.collision_detection(width, height);
    this.move();
    this.draw();
  }
  
}