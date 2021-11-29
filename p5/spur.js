let shapes = []
let traceLength = 60
let NumPoints = 10

let circleSize = 50
let traceSize = 50

//background(0)

function setup() {
  createCanvas(500, 500)
  
  
  // Zwei Objekte in den Array «pushen».
  for (let i=0; i<NumPoints; i+=1) {
    let myNewObject = {
      x: random() * width,
      y: random() * height,
      changeX: random(-2,2),
      changeY: random(-2,2),
      trace: []
    }
    shapes.push(myNewObject)
  }
}

function draw() {


  rect(mouseX, mouseY, 10, 100)


  background(0,255,255)

  // Loop durch den Array
  for (let i = 0; i < shapes.length; i += 1) {
    
    // Varible mit einzelnem Element aus dem Array 
    let currentShape = shapes[i]

    // Einen Kreis zeichnen
    //fill(255,0,0)
    //ellipse(currentShape.x, currentShape.y, circleSize)
    

    // Spur zeichnen
    for (let j = 0; j < currentShape.trace.length; j += 1) {
      noFill() 
      strokeWeight(0.1)
      ellipse(currentShape.trace[j].x, currentShape.trace[j].y, traceSize)
      }
  
    //Letzte Positionen in Spur speichern
    currentShape.trace.push({x: currentShape.x, y: currentShape.y})
    if (currentShape.trace.length>traceLength){
      currentShape.trace.shift()
    }
    
    // Werte im Objekt ändern
    if (currentShape.x > width || currentShape.x < 0) {
      currentShape.changeX = currentShape.changeX  * -1
    }

    if (currentShape.y > width || currentShape.y < 0) {
      currentShape.changeY = currentShape.changeY * -1
    }

    currentShape.x += currentShape.changeX 
    currentShape.y += currentShape.changeY 
  }
}