

let square = 100;
let distance = 120;
let cells = 6;
let offset = -cells / 2 * distance + distance * .5;
let sizes = [square, square * 0.75, square * .5];


function setup() {
    createCanvas(700, 950);

    slider = createSlider(0, 100, 50);
    slider.position(10, 10);
    slider.style('width', '120px');

    slider2 = createSlider(10, 200, 50);
    slider2.position(10, 30);
    slider2.style('width', '120px');

    slider3 = createSlider(1, 20, 6, 1);
    slider3.position(10, 50);
    slider3.style('width', '120px');

    slider4 = createSlider(1, 60, 1, 1);
    slider4.position(10, 70);
    slider4.style('width', '120px');

    slider5 = createSlider(1, 20, 1, 1);
    slider5.position(10, 90);
    slider5.style('width', '120px');
    
}

function draw() {
    
let val1 = slider.value();
let val2 = slider2.value();
let val3 = slider3.value();
let val4 = slider4.value();
let val5 = slider5.value();

noFill();
strokeWeight(val4);

scale(val5);

square = val2;
cells = val3;

randomSeed(val1);

background(255);

    for (let x = 0; x < cells; x++) {

        for (let y = 0; y < cells; y++) {

            let xpos = offset + x * distance;
            let ypos = offset + y * distance;

            let dice = Math.ceil(random() * 6);
            let step = square / 5;

            let path = [
                { x: xpos - square / 2 + Math.ceil(random() * 6) * step, y: ypos - square / 2 },
                { x: xpos + square / 2, y: ypos - square / 2 + Math.ceil(random() * 6) * step },
                { x: xpos + square / 2 - Math.ceil(random() * 6) * step, y: ypos + square / 2 },
                { x: xpos - square / 2, y: ypos + square / 2 - Math.ceil(random() * 6) * step }
            ];

            beginShape();
            vertex(path[0].x, path[0].y);
            vertex(path[1].x, path[1].y);
            vertex(path[2].x, path[2].y);
            vertex(path[3].x, path[3].y);
            endShape(CLOSE);
            
        }
    }
    
    
    
    
}


