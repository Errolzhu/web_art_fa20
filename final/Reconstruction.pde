import processing.video.*;

Capture cam;

int num=3000;
Particle[]ps;
IntList wanderList;
//IntList summonList;
boolean[]summonList;
PImage base;




void setup() {
  //size(1024, 768,P2D);
  fullScreen(P2D);
  cam=new Capture(this, 640, 480);
  cam.start();
  base=createImage(cam.width, cam.height, RGB);

  ps=new Particle[num];
  wanderList=new IntList();
  //summonList=new IntList();
  summonList=new boolean[num];
  for (int i=0; i<num; i++) {
    ps[i]=new Particle(i);
    wanderList.append(i);
    summonList[i]=false;
  }
  noStroke();
  smooth();
  pixelDensity(2);
  background(0,0);
  //cursor(HAND);
}



void draw() {
  background(0,0);
  if (cam.available() == true) {
    cam.read();
  }

  //pushMatrix();
  //translate(width, 0);
  //scale(-1, 1);
  //image(cam, 0, 0, width, height);
  //popMatrix();

  for (int i=0; i<16; i++) {
    int index=int(random(wanderList.size()));
    convert(index);
  }

  for (int i=0; i<num; i++) {
    ps[i].update();
    //ps[i].display();
    
    if(summonList[i]==false){
      ps[i].display();
    }
  }
  
  for (int i=0; i<num; i++) {

    
    if(summonList[i]){
      ps[i].display();
    }
  }

  //image(cam, 0, 0);
  
  //fill(255,255,0);
  //ellipse(mouseX,mouseY,20,20);
}


float len;
float angle;
float xx;
float yy;

void generateNewPosition() {
  len=randomGaussian()*180;
  angle=random(TWO_PI);
  xx=mouseX+cos(angle)*len;
  yy=mouseY+sin(angle)*len;
}

void convert(int index) {
  int arrayIndex=wanderList.get(index);

  generateNewPosition();
  while (xx<0|| xx>=width || yy<0 || yy>=height) {
    generateNewPosition();
  }
  color pixelCl=(cam.get(int(map(xx, 0, width, cam.width, 0)), 
    int(map(yy, 0, height, 0, cam.height))));

  ps[arrayIndex].setTarget(xx, yy, pixelCl);
  wanderList.remove(index);
  
  //summonList.append(ps[arrayIndex].indexInArray);
  summonList[ps[arrayIndex].indexInArray]=true;
}




class Particle {

  float gray;
  float targetGray;
  float diam;

  color cl;
  color targetCl;
  float colorLerp=0;
  //float dist;

  PVector pos;
  PVector spd;
  PVector rushSpd;
  PVector acc;
  PVector target;


  int timer;
  boolean isSummoned=false;
  int indexInArray;
  //int indexInList;

  Particle(int _i) {
    diam=random(0.5,20);
    pos=new PVector(random(diam, width-diam), random(diam, height-diam));
    spd=PVector.random2D();
    spd.mult(0.9);
    target=new PVector();

    rushSpd=new PVector(0, 0);
    acc=new PVector();

    indexInArray=_i;
    //indexInList=_i;
    //gray=255;
    cl=color(255);
  }


  void wander() {
    pos.add(spd);
    if (pos.x-diam/2<0 || pos.x+diam/2>width) {
      spd.x*=-1;
    }
    if (pos.y-diam/2<0 || pos.y+diam/2>height) {
      spd.y*=-1;
    }
  }

  void rushing() {
    acc=PVector.sub(target, pos);
    acc.mult(0.01);
    rushSpd.add(acc);
    pos.add(rushSpd);
    rushSpd.mult(0.72);

    //gray+=(targetGray-gray)*0.1;

    colorLerp+=0.02;
    colorLerp=constrain(colorLerp, 0, 1);
    cl=lerpColor(cl, targetCl, colorLerp);
  }

  boolean reachTarget() {
    if (PVector.dist(target, pos)<1) {
      return true;
    } else {
      return false;
    }
  }

  void setTarget(float xx, float yy, color _cl) {
    target.set(xx, yy);
    //targetGray=_gray;
    targetCl=_cl;
    colorLerp=0;
    //dist=PVector.dist(pos,target);

    timer=100;
    isSummoned=true;

    //indexInList=summonList.size();
  }

  void update() {
    if (isSummoned) {
      rushing();
      timer--;
      if (timer<0) {
        isSummoned=false;
        wanderList.append(indexInArray);
        //summonList.remove(indexInList);
        //indexInList=wanderList.size();
        summonList[indexInArray]=false;
      }
    } else {
      wander();
    }
  }

  void display() {
    fill(cl);
    ellipse(pos.x, pos.y, diam, diam);
  }
}
