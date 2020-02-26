class Arm{
  constructor(fixedPoint, length, N){
    this.fixedPoint = fixedPoint;
    this.length = length;
    this.N = N;
    this.segments = [];
    this.segments.push(new Segment(fixedPoint, length));
    this.segments[0].B = fixedPoint;
    for(let i = 1; i < N; i++){
      this.segments.push(new Segment(fixedPoint, length));
      this.segments[i].B = fixedPoint;
    }
  }
  
  follow(targetX, targetY){
    this.segments[this.N - 1].follow(targetX, targetY, this.length);
    for(let i = this.N - 2; i >= 0; i--){
      this.segments[i].follow(this.segments[i + 1].A.x, this.segments[i + 1].A.y, this.length);
    }
  }
  
  moveBack(){
    let delta = (new Vector()).subtract(this.fixedPoint, this.segments[0].A);
    this.segments[0].A = this.fixedPoint;
    this.segments[0].B = (new Vector()).add(this.segments[0].B, delta);
    for(let i = 1; i < this.N; i++){
      let delta = (new Vector()).subtract(this.segments[i - 1].B, this.segments[i].A);
      this.segments[i].A = this.segments[i - 1].B;
      this.segments[i].B = (new Vector()).add(this.segments[i].B, delta); 
    }    
  }
  
  move(targetX, targetY){
    this.follow(targetX, targetY);
    this.moveBack(); 
    for(let i = 0; i < this.N; i++){
      this.segments[i].draw(); 
    } 
  }
  
}