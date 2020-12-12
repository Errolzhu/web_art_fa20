let capture;
let num = 50;
let wanderList=[];
let summonList=[];
let base;

function setup() {
  createCanvas(displayWidth, displayHeight);
  
  capture = createCapture(VIDEO);
  capture.size(displayWidth, displayHeight);
  base = createImg(capture.widthm, capture.height, RGB);
  
  stroke(255);
  noFill();
  
  system = new ParticleSystem(createVector(width / 2, num))
}

function draw() {
 //image(capture, 0, 0, displayWidth, displayHeight);
   if (capture.loadedmetadata) {
     
   }
  system.addParticle();
  system.run();
}


function update(){
  if(isSumminde){
    rushing();
    timer--;
    if(timer<0){
      isSummoned=false;
      wanderList.append(indexInArray);
      summonList[indexInArray]=false);
    }
  }
}

function display(){
  fill(cl);
  ellipse(pos.x, pos.y, diam, diam);
}