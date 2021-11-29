
//arrays
let phenomena = []
let lissajousArray = []

//variables
let speed = 0.1
let traceSize = 2
let traceLength = 35

let red = 255
let blue = 255
let green = 255

///////////////////////////////////////////////////
//////////////////////////////////CLASSES//////////

//class grid
class Phenomenon {
    constructor(posX, posY, sizeFactor) {
        this.pos = {x: posX, y: posY}
        this.numAttributes = 1
        this.sizeFactor = sizeFactor
        this.attributes = []
        for (let i = 1; i < 9; i++) {
            this.attributes.push(new Attribute(0, 0, i * 9))
        }
    }
    show() {
        push()
        translate(this.pos.x, this.pos.y)
        for (let attribute of this.attributes) {
            attribute.show()
        }
        pop()
    }
}

//class lissajous
class Attribute {
    constructor(posX, posY, sizeFactor) {
        this.pos = {x: posX, y: posY}

        this.speed = speed
        this.sizeFactor = sizeFactor

        this.traceLength = traceLength
        this.traceSize = traceSize
        this.tracesArray = []
    }
    show() {
        push()
        translate(50,50)
        this.x = this.pos.x + this.sizeFactor * sin(3 * this.speed + PI / 2)
        this.y = this.pos.y + this.sizeFactor * sin(this.speed)
        this.speed -= 0.03
        this.traceSize = 0
        this.tracesArray.push({x: this.x, y: this.y, t: this.speed})

        if(this.tracesArray.length > this.traceLength) {
            this.tracesArray.shift()
        }

        for (let i = 1; i < this.tracesArray.length; i++) {
            fill(red, green, blue,this.alpha)
            noStroke()
            ellipse(this.tracesArray[i].x, this.tracesArray[i].y, this.traceSize) 
            this.traceSize = i/12 
        }
        pop()
    }
}  

///////////////////////////////////////////////////
//////////////////////////////////SETUP////////////

function setup() {
    let canvas = createCanvas(600, 600)
    canvas.parent('p5-container-spirals')

    background(0)  
    noFill()

    for (let i = 0; i < 400; i += 100) {
        for (let j = 0; j < 400; j += 100) {
        phenomena.push(new Phenomenon(i, j, i*0.1))
        }
    }
}

///////////////////////////////////////////////////
///////////////////////////////////DRAW////////////

function draw() {
    background(0)

    for (let phenomenon of phenomena) {
        phenomenon.show()
    }
}