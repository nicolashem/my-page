var score = 0
let x;
let y;
let speedX = 2;
let speedY = 6;
let d=20; // Ball Diameter
let t=19; // Trace Diameter
let batWidth=200;
let originalbatWidth=batWidth;
let batHeight=15;
let batGap=70; // Variable für den Abstand unter dem Schläger (könnten wir später für mehr Schwierigkeit randomisieren :D )
let speedGainFactor = 1.15; // Damits immer schwieriger wird, muahahaha
let originalSpeedX = speedX;
let originalSpeedY = speedY;
let traces = [] //enthält die vergangenen Positionen vom Ball
let traceLength = 10 //Länge der Ballspur

function setup() {
  createCanvas(windowWidth,windowHeight-400);
    x = random(0,width);
    y = random(0,height/2);
    noStroke();
}

function mousePressed(){
  loop();
}

function draw() {
  // Background
  background(0);
  fill(255);

  //Schläger
  rect(mouseX-batWidth/2,height-batGap,batWidth,batHeight,7)

  //Letzte Positionen des Balls in traces speichern
  let traceX = x
  let traceY = y
  traces.push({x: traceX, y: traceY})
  if (traces.length>traceLength){
    traces.shift()
  }

  // Ballspur zeichnen
  let R = 255
  let G = 180
  let B = 0
  let transp = 0
  for (let i = 0; i < traces.length; i += 1) {
    fill(R,G,B,transp);
    ellipse(traces[i].x+random(-1.2,1.2), traces[i].y+random(1,2), t)
    transp=transp+i+20
    G-=16
    }

  // Springender Ball
  fill(255);
  ellipse(x,y,d,d);
 
  x += speedX;
  y += speedY;

  if (x<0+d/2 || x>width-d/2){
    speedX = speedX*-1
  }
  
  // Ball prallt jetzt nur noch vom oberen Bildrand ab
  if (y<0+d/2){
    speedY = speedY*-1
  }

  // Ball prallt vom Schläger ab, wenn er ihn am rand trifft schräg.
  if (x>mouseX-batWidth/2 && x<mouseX+batWidth/2 && y>height-batGap-batHeight){
    let v = sqrt(speedX**2+speedY**2); // Berechnet Geschwindigkeit
    let posFactor = (x-mouseX)/batWidth*2; //-1 links, 0 mitte, 1 rechts
    let sY = -speedY*speedGainFactor;
    let sX = 10*posFactor*speedGainFactor; // extremere Winkel am Schlägerrand
    speedX = sX*v/sqrt(sX**2+sY**2)*speedGainFactor; //Proportionalisierung und Erhöhung der Geschwindigkeit
    speedY = sY*v/sqrt(sX**2+sY**2)*speedGainFactor; //Proportionalisierung und Erhöhung der Geschwindigkeit
    score +=1
    
    //Schläger verkleinert sich
    if (score!==0 && score%5==0 && batWidth>60){
      batWidth-=25
    }
  }

  // Ball fliegt raus
  if (y>height - batGap){
    traces.length=0 //damit die Traces vom letzten Ball gelöscht werden
    noLoop(); //stoppt den draw-loop
    
    //pause screen
    background(0);
    textSize(30);
    text("GAME OVER",width/2-100,height/2-32);
    text("SCORE: "+ score, width/2-100,height/2);
    if (score>25){
      textSize(20);
      text("you're the pong god!",width/2-100,height/2+40);
      } else if (score>16){
      textSize(15);
      text("that was pretty decent!",width/2-100,height/2+40);
      } else {
      textSize(20);
      text("you can do better than that...",width/2-100,height/2+40);
    }


    textSize(15);
    text("click to start again",width/2-100,height/2+70)
    
    //neuer Ball
    x = random(0,width);
    y = random(0,height/2);
    fill(255,255,255,80);
    ellipse(x,y,d,d);

    //Werte zurücksetzen
    score = 0;
    speedX = originalSpeedX;
    speedY = originalSpeedY;
    batWidth = originalbatWidth;
  }

  //Update von Mike
  // Love the traces und den sich verkleinernden Schläger
  // Habe einen alternativen Code für den Abprallwinkel gemacht, jetzt gibt's vielfältigere
  // und extremere Winkel.
  // Habe den Code zum Verkleinern zum Richtungswechsel getan, gefällt mir irgendwie besser dort.

  //Update von Nicolas
  //
  //Schlägersize vergrössert, verkleinert sich nach +7 score, bis zu einem bestimmten Wert
  //Traces vom Ball hinzugefügt
  //Motivational Text am Ende ;)
  //
  //woop woop!

  //Update von Mike
  //Scoring hinzugefüt
  //Stop bei Ballverlust
  //Geschwindigkeit wird laufend erhöht (je nachdem wo der ball trifft, gibt auch andere Flugbahnen)
  // trifft der Ball den Rand des Schläger springt er anders ab.
  
  //Update von Nicolas
  //
  //Ball prallt jetzt vom Schläger ab
  //Ball kann unten rausfliegen
  //Sobald der Ball rausfliegt, wird ein neuer generiert
  //Possible next steps: Delay beim Generieren eines neuen Balls; Update Scoreboard; mehr Schwierigkeit! :D
  //
  //Viel Spass!

  //Grundidee von Mike
  //Y-Bedingung auf Zeile 34 ändern so dass Ball am Schläger abprallt (mouseY+/- batWidth/2)
  // herausfinden ob Ball den Schläger verpasst hat (y=pageWidth)
  //Fancy Things machen, z.B. Random Speed, Abprallwinkel, Intelligente Computergegner*in


  //Score
  textSize(24);
  text("Score: " + score, 10, 25);

}
