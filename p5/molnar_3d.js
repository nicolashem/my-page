
let shapesArray = [];
let numShapes = 9;
let pos = 0;
let elem = 0;

let cam;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

//   slider = createSlider(1, 100, 255);
//   slider.position(10, 10);
//   slider.style('width', '120px');

//   cam = createCamera();
   
  perspective(PI / 3.0, width / height, 0.1, 500000);
  
  for (let i = 0; i < numShapes; i++){
    shapesArray.push(new Shape(i));
  }
}



class Shape {
  
  constructor(){

    let rectArray = []
    let numRect = 10;
    
    for (let i = 0; i < numRect; i++){
      rectArray.push(new Rectangle(0, 0, i * 100, 100 + i * 50, i * 10 + 30));
    }
    this.rectangles = rectArray
  }
  
  display(time){
    for(let rectangle of this.rectangles) {
      rectangle.display(time)
    }
    
  }
}


class Rectangle {
  constructor(centerX, centerY, centerZ, edgeL, zDepth){
    this.zDepth = zDepth
    
    let maxNoise = 40;
    let minNoise = 10;
    let noise1 = random(minNoise, maxNoise);
    let noise2 = random(minNoise, maxNoise);
    let noise3 = random(minNoise, maxNoise);
    let noise4 = random(minNoise, maxNoise);
    let noise5 = random(minNoise, maxNoise);
    let noise6 = random(minNoise, maxNoise);
    let noise7 = random(minNoise, maxNoise);
    let noise8 = random(minNoise, maxNoise);

    
    this.p1 = {
      x: centerX - edgeL/2 + noise1,
      y: centerY - edgeL/2 + noise2,
      z: centerZ
    }
    this.p2 = {
      x: centerX - edgeL/2 + noise1,
      y: centerY - edgeL/2 + noise2,
      z: centerZ
    }
    this.p3 = {
      x: centerX + edgeL/2 + noise3,
      y: centerY - edgeL/2 + noise4,
      z: centerZ
    }
    this.p4 = {
      x: centerX + edgeL/2 + noise3,
      y: centerY - edgeL/2 + noise4,
      z: centerZ
    }
    this.p5 = {
      x: centerX + edgeL/2 + noise5,
      y: centerY + edgeL/2 + noise6,
      z: centerZ
    }
    this.p6 = {
      x: centerX + edgeL/2 + noise5,
      y: centerY + edgeL/2 + noise6,
      z: centerZ
    }
    this.p7 = {
      x: centerX - edgeL/2 + noise7,
      y: centerY + edgeL/2 + noise8,
      z: centerZ
    }
    this.p8 = {
      x: centerX - edgeL/2 + noise7,
      y: centerY + edgeL/2 + noise8,
      z: centerZ
    } 
  }
  
  //methoden
  display(time) {

    let offset = sin(time)*1;

    //flaeche F1
    beginShape();
    vertex (this.p1.x, this.p1.y, this.p1.z * offset)
    vertex (this.p2.x, this.p2.y, this.p2.z * offset + this.zDepth)
    vertex (this.p3.x, this.p3.y, this.p3.z * offset + this.zDepth)
    vertex (this.p4.x, this.p4.y, this.p4.z * offset)
    endShape(CLOSE);
    
    //flaeche2
    beginShape();
    vertex (this.p3.x, this.p3.y, this.p3.z * offset+ this.zDepth)
    vertex (this.p4.x, this.p4.y, this.p4.z * offset)
    vertex (this.p5.x, this.p5.y, this.p5.z * offset)
    vertex (this.p6.x, this.p6.y, this.p6.z * offset+ this.zDepth)
    endShape(CLOSE);
    
    //flaeche3
    beginShape();
    vertex (this.p5.x, this.p5.y, this.p5.z * offset)
    vertex (this.p6.x, this.p6.y, this.p6.z * offset+ this.zDepth)
    vertex (this.p7.x, this.p7.y, this.p7.z * offset+ this.zDepth)
    vertex (this.p8.x, this.p8.y, this.p8.z * offset)
    endShape(CLOSE);
    
    //flaeche4
    beginShape();
    vertex (this.p7.x, this.p7.y, this.p7.z * offset+ this.zDepth)
    vertex (this.p8.x, this.p8.y, this.p8.z * offset)
    vertex (this.p1.x, this.p1.y, this.p1.z * offset)
    vertex (this.p2.x, this.p2.y, this.p2.z * offset+ this.zDepth)
    endShape(CLOSE);
  }

}

function draw() {
  background(0);

  stroke(255);
  fill(0);

  orbitControl();

  camera(20 + sin(frameCount * 0.002) * 6000, 1500, 4500, 1500, 1500, 0, 0, 1, 0);

  elem = 0;


  for (let x = 0; x < 3000; x += 1000) {
      for (let y = 0; y < 3000; y += 1000) {
          push();

          translate(x, y, 0);
          
          shapesArray[elem].display(frameCount/40 + x +y);
          pop();

          elem++;
      }
      
  }
}
