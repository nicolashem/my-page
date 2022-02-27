

let square = 100;
let distance = 120;
let cells = 6;
let offset = -cells / 2 * distance + distance * .5;
let sizes = [square, square * 0.75, square * .5];


function setup() {
    const cnv = createCanvas(600, 800);
    cnv.parent('p5-canvas-id')

    slider = createSlider(0, 100, 50);
    slider.parent('menu-id')
    slider.addClass('slider');

    slider2 = createSlider(10, 200, 50);
    slider2.parent('menu-id')
    slider2.addClass('slider');

    slider3 = createSlider(1, 20, 6, 1);
    slider3.parent('menu-id')
    slider3.addClass('slider');

    slider4 = createSlider(1, 60, 1, 1);
    slider4.parent('menu-id')
    slider4.addClass('slider');

    slider5 = createSlider(1, 20, 1, 1);
    slider5.parent('menu-id')
    slider5.addClass('slider');

    slider6 = createSlider(1, 800, 0, 1);
    slider6.parent('menu-id')
    slider6.addClass('slider');

    slider7 = createSlider(1, 800, 0, 1);
    slider7.parent('menu-id')
    slider7.addClass('slider');
    
}

function draw() {
    
    let val1 = slider.value();
    let val2 = slider2.value();
    let val3 = slider3.value();
    let val4 = slider4.value();
    let val5 = slider5.value();
    let val6 = slider6.value();
    let val7 = slider7.value();

    noFill();
    strokeWeight(val4);
    stroke(255)

    scale(val5);

    square = val2;
    cells = val3;

    randomSeed(val1);

    background(0);

    translate(val6, val7)


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


