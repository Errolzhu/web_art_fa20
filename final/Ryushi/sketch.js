let capture;

let num = 4000;
let ps = [];
let summonList = [4000];
let wanderList = [4000];
//let base;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
  //---------------------------------
  //base = createImage(capture.width, capture.height);
  frameRate(60);
  for (let i = 0; i < num; i++) {
    ps[i] = new Particle(i);
    //wanderList.push(new intkiss(i));
    wanderList[i] = i;
    summonList[i] = false;
  }
  noStroke();
  smooth();
  //pixelDensity(2);
  background(255, 0);
}

function draw(){
  background(255);
  //image(capture, 0, 0);
  capture.loadPixels();
  for (let i = 0; i < 20; i++) { 
	 if(wanderList.length>0){
		let index = int(random(wanderList.length));
		convert(index);
	 }
  }

  for (let i = 0; i < num; i++) {
    ps[i].update();
    if (summonList[i] == false) {
      ps[i].display();
    }
  }

  for (let i = 0; i < num; i++) {
    if (summonList[i]) {
      ps[i].display();
    }
  }
}
//------------------------------------------------------
let len;
let angle;
let xx;
let yy;

function generateNewPosition() {
  len = randomGaussian(0, 20) * 180;
  angle = random(TWO_PI);
  xx = mouseX + cos(angle) * len;
  yy = mouseY + sin(angle) * len;
}

function convert(index) {
  let arrayIndex = wanderList[index]; //index

  generateNewPosition();
  while (xx < 0 || xx >= width || yy < 0 || yy >= height) {
    generateNewPosition();
  }
  let a = int(map(xx, 0, width, capture.width, 0));
  let b = int(map(yy, 0, height, 0, capture.height));
 
 //fill(capture.pixels[idx],capture.pixels[idx+1],capture.pixels[idx+2],capture.pixels[idx+3]);
  let pixelClR = capture.pixels[4 * (b * capture.width + a)];
  let pixelClG = capture.pixels[4 * (b * capture.width + a)+1];
  let pixelClB = capture.pixels[4 * (b * capture.width + a)+2];
//console.log(a)
// console.log(b)
// console.log(pixelCl)
  ps[arrayIndex].setTarget(xx, yy, pixelClR,pixelClG,pixelClB);
  wanderList.splice(index,1);
  //let aa =ps[arrayIndex].get(indexInArray);
  //summonList.push(aa);
  //summonList[ps[arrayIndex].indexInArray] = true;
}



class Particle {

  constructor(_i) {
    // this.gray;
    // this.targetGray;

    this.targetClR = 255;
      this.targetClG = 255;
      this.targetClB = 255;
    this.colorLerp = 0;

    this.isSummoned = false;

    this.diam = random(0.5, 15);
    this.pos = createVector(random(this.diam, width - this.diam), random(this.diam, height - this.diam));
    this.spd = p5.Vector.random2D();
    this.spd.mult(0.9);
    this.target = createVector(0, 0);

    this.rushSpd = createVector(0, 0);
    this.acc = createVector(0, 0);

    this.indexInArray = _i;
    this.clR = 255;
      this.clG = 255;
      this.clB = 255;
  }

  wander() {
    this.pos.add(this.spd);
    if (this.pos.x - this.diam / 2 < 0 || this.pos.x + this.diam / 2 > width) {
      this.spd.x *= -1;
    }
    if (this.pos.y - this.diam / 2 < 0 || this.pos.y + this.diam / 2 > height) {
      this.spd.y *= -1;
    }
  }

  rushing() {
    this.acc = p5.Vector.sub(this.target, this.pos);
    this.acc.mult(0.024);
    this.rushSpd.add(this.acc);
    this.pos.add(this.rushSpd);
    this.rushSpd.mult(0.54);

     this.colorLerp += 0.02;
     this.colorLerp = constrain(this.colorLerp, 0, 10);
    // this.cl = lerpColor(this.cl, this.targetCl, this.colorLerp);
	if(this.clR>this.targetClR)
	{
		this.clR = this.clR - this.colorLerp;
		if(this.clR<this.targetClR)
		{
			this.clR = this.targetClR;
		}
	}
	else
	{
		this.clR = this.clR + this.colorLerp;
		if(this.clR>this.targetClR)
		{
			this.clR = this.targetClR;
		}
	}
	//G
	if(this.clG>this.targetClG)
	{
		this.clG = this.clG - this.colorLerp;
		if(this.clG<this.targetClG)
		{
			this.clG = this.targetClG;
		}
	}
	else
	{
		this.clG = this.clG + this.colorLerp;
		if(this.clG>this.targetClG)
		{
			this.clG = this.targetClG;
		}
	}
	//B
	if(this.clB>this.targetClB)
	{
		this.clB = this.clB - this.colorLerp;
		if(this.clB<this.targetClB)
		{
			this.clB = this.targetClB;
		}
	}
	else
	{
		this.clB = this.clB + this.colorLerp;
		if(this.clB>this.targetClB)
		{
			this.clB = this.targetClB;
		}
	}
  }

  reachTarget() {
    if (dist(this.target.x, this.target.y, this.pos.x, this.pos.y) < 1) {
      return true;
    } else {
      return false;
    }
  }

  setTarget(xx1, yy1, _clR,_clG,_clB) {
    this.target.set(xx1, yy1);
    this.targetClR = _clR;
      this.targetClG = _clG;
      this.targetClB = _clB;
    this.colorLerp = 0;

    this.timer = 100;
    this.isSummoned = true;
  }

  update() {
    if (this.isSummoned) {
      this.rushing();
      this.timer--;
      if (this.timer < 0) {
        this.isSummoned = false;
        wanderList.push(this.indexInArray);
        summonList[this.indexInArray] = false;
		//this.cl = this.targetCl;
		this.clR = this.targetClR;
      this.clG = this.targetClG;
      this.clB = this.targetClB;
      }
    } else {
      this.wander();
    }
  }

  display() {
    fill(this.clR,this.clG,this.clB); //
    ellipse(this.pos.x, this.pos.y, this.diam, this.diam);
  }
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}