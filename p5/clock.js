
///sekunden_spirale
let diameterCircle = 40

let angle = 0
let angle2 = 0
let factor1 = 0
let factor2 = 0

let speed = .45
let colorCircle = 255

///array für sekunden
let shapes = []
let traceLength = 60
let traceSize = 50

let a = 0

///farben
let R = 255
let G = 0
let B = 0
let T = 120

function setup() {
  
  let canvas = createCanvas(600, 600)
  canvas.parent('p5-container-clock')
  background(0)  
}

function draw() {
  
  translate(300, 300)

  let x1 = cos(angle) * factor1
  let y1 = sin(angle) * factor2

  fill(R,G,B,T)
  stroke(255)
  strokeWeight(0.2)
  ellipseMode(CENTER)
  ellipse(x1,y1,diameterCircle,diameterCircle)
  
  angle += speed
  factor1 += speed*5
  factor2 += speed*5

  if (frameCount%60==0){
    factor1 = 0
    factor2 = 0
    colorCircle -= 10

    R = random(0,255)
    G = random(0,255)
    B = random(0,255)

    background(0)
    
  
 
  let diameter = 350
  let radius = diameter/2

  fill(R,G,B,T)
  
  let posY = sin(a) * radius
  let posX = cos(a) * radius
  
  
  ellipse(posX, posY, 50)

  a += PI/30


  //spur aufzeichnen
  shapes.push({x: posX, y: posY})

  if (shapes.length>traceLength){
    shapes.shift()
  }

  if (shapes.length>61){
    shapes = []
  }
  
  //spur zeichnen
  for (let j = 0; j < shapes.length; j += 1) {
    noFill() 
    stroke(255)
    strokeWeight(0.2)
    ellipse(shapes[j].x, shapes[j].y, traceSize)
    }
  }
}