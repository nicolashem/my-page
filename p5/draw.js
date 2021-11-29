function setup() {
    let canvas = createCanvas(400, 300)
    canvas.parent('p5-container-draw')
}

function draw() {
    ellipse(mouseX, mouseY, 50)
}