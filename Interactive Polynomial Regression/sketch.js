let dataSet = []
let width, height;
let x = [];
let y = [];

let a = [];
let rank = 5;

const learningRate = 0.8;
const optimizer = tf.train.adam(learningRate);

function setup() {
  width = 400;
  height = 400;
  createCanvas(width, height);
  slider = createSlider(1, 5, 1);
  slider.position(width / 3, height);
  
  for(let i = 0; i <= rank; i++){
    a.push(tf.variable(tf.scalar(random(-1, 1))));
  }
}

function draw(){
  background(0);
  rank = slider.value();
  
  if(x.length > 0){
    const yTensor = tf.tensor1d(y);
    optimizer.minimize(() => lossFunction(predict(x), yTensor));
    drawLine();
  }
  
  
  for(let i = 0; i < dataSet.length; i++){
    dataSet[i].draw()
  }
  
  
}

function mousePressed(){
  dataSet.push(new coordinate(mouseX / width, 1 - mouseY / height));
  x.push((mouseX / width - 0.5) * 2);
  y.push((0.5 - mouseY / height) * 2);
}

function lossFunction(predictions, labels){
  return predictions.sub(labels).square().mean();
}

function predict(x){
  const xTensor = tf.tensor1d(x);
  let y = a[0];
  for(let i = 1; i <= rank; i++){
    y = y.mul(xTensor).add(a[i]);
  }
  
  return y;
}

function drawLine(){
  
  curveX = [];
  for(let i = -1; i <= 1; i += 0.05){
    curveX.push(i);
  }
  
  curveY = predict(curveX).dataSync();
  
  beginShape();
  noFill();
  stroke(255);
  strokeWeight(1);
  for(let i = 0; i < curveX.length; i++){
    vertex((curveX[i] + 1) / 2 * width , (1 - (curveY[i] + 1) / 2) * height);
  }
  endShape();

}