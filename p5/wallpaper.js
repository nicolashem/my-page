
let button;
let button1;

// let colorSwitch = false;

let colorPicker;
let colorPicker2;

let distance = 70;
let cellsX = 7;
let cellsY = 10;
let offset = -cellsX/2 * distance



///////////////////////////////////////////////////////


function saveImage() {
  saveCanvas('wallpaper', 'jpg');
}

// function colorizer() {
//   colorSwitch = !colorSwitch;
// }

function setup() {

  const cnv = createCanvas(600, 800);
  cnv.parent('p5-canvas-id')

  colorMode(HSL)

  colorPicker = createColorPicker('#000000');
  colorPicker.position(20, height + 5);

  colorPicker2 = createColorPicker('#EEEEEE');
  colorPicker2.position(20, height-50);

  // button = createButton('color on/off');
  // button.mousePressed(colorizer);
  // button.parent('menu-id')
  // button.addClass('button');


  slider = createSlider(1, 400, 50);
  slider.parent('menu-id')
  slider.addClass('slider');

  slider2 = createSlider(0, 200, 10);
  slider2.parent('menu-id')
  slider2.addClass('slider');

  slider3 = createSlider(0, 20, 10);
  slider3.parent('menu-id')
  slider3.addClass('slider');

  slider4 = createSlider(0, 200, 50);
  slider4.parent('menu-id')
  slider4.addClass('slider');

  slider5 = createSlider(1, 15, 8);
  slider5.parent('menu-id')
  slider5.addClass('slider');

  slider6 = createSlider(1, 20, 10);
  slider6.parent('menu-id')
  slider6.addClass('slider');

  slider7 = createSlider(-300, 300, 0);
  slider7.parent('menu-id')
  slider7.addClass('slider');

  slider8 = createSlider(-500, 500, 0);
  slider8.parent('menu-id')
  slider8.addClass('slider');

  slider9 = createSlider(0, 0.1, 0, 0.01);
  slider9.parent('menu-id')
  slider9.addClass('slider');

  slider10 = createSlider(1, 100, 1);
  slider10.parent('menu-id')
  slider10.addClass('slider');

  slider11 = createSlider(1, 60, 1);
  slider11.parent('menu-id')
  slider11.addClass('slider');


  button1 = createButton('save image');
  button1.mousePressed(saveImage);
  button1.parent('menu-id')
  button1.addClass('button');



}

function draw() {

  noFill()
  
  ///////////////////////sliders////////////////////////
  
  let val1 = slider.value();
  let diceStep = slider2.value();
  let randomS = slider3.value();
  distance = slider4.value();
  cellsX = slider5.value();
  cellsY = slider6.value();
  let translX = slider7.value();
  let translY = slider8.value();
  let val9 = slider9.value();

  let val10 = slider10.value();
  
  let strokeW = slider11.value();

  ///////////////////////////////////////////////////

  background(colorPicker2.color());

  ///////////////////////////////////////////////////

  randomSeed(randomS)
  translate(translX,translY)
  strokeWeight(strokeW)

  // push()
  // translate(width/2, height/2)
  // pop()
  // rotate(val9)
 
  
  let square = 50;
  square = val1;
  
  let sizes = [0, 0, square, square * 0.9, square * 0.8, square * 0.7, square * 0.6, square * 0.5, square * 0.4, square * 0.3, square * 0.2, square * 0.1];

  rotate(val9)
  for(let x = 0; x < cellsX; x++){
    for(let y = 0; y < cellsY; y++){
            
      let xpos = 375 + offset + x * distance
      let ypos = 420 + offset + y * distance
      rotate(val9)


        for(let z = 0; z < sizes.length; z++) {

          let dice = Math.floor(random() * sizes.length);

          let dice2 = random() * diceStep
          let dice3 = random() * diceStep
          let dice4 = random() * diceStep
          let dice5 = random() * diceStep
          let dice6 = random() * diceStep
          let dice7 = random() * diceStep
          let dice8 = random() * diceStep

          blob = sizes[dice];

          // if (!colorSwitch){
          //   stroke(0,0,0)
            
          // } else if (colorSwitch){
          //   stroke(colorPicker.color());
          // }

          stroke(colorPicker.color())

          
          let path = [
            {x: xpos - blob / 2 - dice2, y: ypos - blob / 2 - dice2},
            {x: xpos + blob / 2 - dice3, y: ypos - blob / 2 - dice4},
            {x: xpos + blob / 2 - dice5, y: ypos + blob / 2 - dice6},
            {x: xpos - blob / 2 - dice7, y: ypos + blob / 2 - dice8}
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

    
                

}
          
          
          