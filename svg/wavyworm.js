//CODE
    
let twrk = {};
    
    
//COORDINATES

twrk.scale = function ({ width, height }) {
    if (width) {
        twrk.width = width;
        twrk.res = window.innerWidth / twrk.width;
        twrk.height = window.innerHeight / twrk.res;
    } else if (height) {
        twrk.height = height;
        twrk.res = window.innerHeight / twrk.height;
        twrk.width = window.innerWidth / twrk.res;
    }
    twrk.center = { x: twrk.width / 2, y: twrk.height / 2 };
}
twrk.scale({ height: 120 });

//SVG

let svg = {};

svg.nameSpace = "http://www.w3.org/2000/svg";

svg.path = function (ia) {
    let output = "M ";
    for (var i = 0; i < ia.length; i++) {
        output += ia[i].x * twrk.res + " " + ia[i].y * twrk.res + " ";
    }
    if(ia.length == 1) {
        output += "z";
    }
    return output;
};

svg.paths = function (ia) {
    let output = "";
    for (var i = 0; i < ia.length; i++) {
        output += svg.path(ia[i]);
    }
    return output;
};

svg.makeLayer = function ({ parent, id, x = 0, y = 0 }) {
    dom[id] = document.createElementNS(svg.nameSpace, "svg");
    dom[id].id = id;
    dom[id].style.transform = "translateX(" + (x * twrk.res) + "px) translateY(" + (y * twrk.res) + "px)";
    parent.appendChild(dom[id]);
};

svg.makeLine = function ({ parent, id, d = "", color = "#ff00ff", stroke = 1, cap = "butt", join = "round" }) {
    dom[id] = document.createElementNS(svg.nameSpace, "path");
    dom[id].setAttributeNS(null, "fill", "none");
    dom[id].setAttributeNS(null, "d", d);
    dom[id].setAttributeNS(null, "stroke-width", stroke * twrk.res);
    dom[id].setAttributeNS(null, "stroke", color);
    dom[id].setAttributeNS(null, "stroke-linecap", cap);
    dom[id].setAttributeNS(null, "stroke-join", join);
    dom[id].setAttributeNS(null, "stroke-dasharray", 8)
    dom[id].id = id;
    parent.appendChild(dom[id]);
};

svg.makeShape = function ({ parent, id, d = "", color = "#ff00ff" }) {
    dom[id] = document.createElementNS(svg.nameSpace, "path");
    dom[id].setAttributeNS(null, "fill", color);
    dom[id].setAttributeNS(null, "d", d);
    dom[id].id = id;
    parent.appendChild(dom[id]);
};

//PHYSICS

let physics = {};

physics.makePoint = function({position = {x: 0, y: 0}, drag = 0.97, acceleration = {x: 0, y: 0}, id }) {
    
    output = {};
    output.id = id;
    output.position = position;
    output.drag = drag;
    output.acceleration = acceleration;
    return output;
};

physics.calculate = function({point, force = {x: 0, y: 0}, }){
    point.acceleration = {x: point.acceleration.x * point.drag, y: point.acceleration.y * point.drag};
    point.acceleration = {x: point.acceleration.x + force.x, y: point.acceleration.y + force.y};
    point.position = {x: point.position.x + point.acceleration.x, y: point.position.y + point.acceleration.y};
};

physics.verlet = function({ a, b, distance, stiffness }) {
    
    let difference = {x: a.position.x - b.position.x, y: a.position.y - b.position.y};
    let dot = (difference.x * difference.x) + (difference.y * difference.y);
    
    if (dot == 0) {
        dot = 0.001;
    };
    
    let scalar = (distance - dot) / dot * stiffness * 0.9;
    let move = { x: difference.x * scalar, y: difference.y * scalar };
    
    a.position = { x: a.position.x + move.x, y: a.position.y + move.y };
    b.position = { x: b.position.x - move.x, y: b.position.y - move.y };
};

let dots = [];

for (let i = 0; i < 50; i++) {
    dots.push(physics.makePoint({ 
        id: "dot" + i, 
        position: { x: -50 + Math.random() * 50, y: Math.random() * 10 }
    }));
}

let dots2 = [];

for (let i = 0; i < 50; i++) {
    dots2.push(physics.makePoint({ 
        id: "dot" + i, 
        position: { x: -50 + Math.random() * 50, y: Math.random() * 10 }
    }));
}


//DOM
let dom = {};

//stage
dom.stage = document.createElement("stage");
dom.stage.style.transform = "translateX(" + (twrk.center.x * twrk.res) + "px) translateY(" + (twrk.center.y * twrk.res) + "px)";
dom.stage.id = "stage";
document.body.appendChild(dom.stage);

//svg layer
svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });
svg.makeLine({ parent: dom.svgLayer, id: "rope", join: "bevel", cap: "round", stroke: 0.7, color: "#E3AE19" });
svg.makeLine({ parent: dom.svgLayer, id: "rope2", join: "bevel", cap: "round", stroke: 0.7, color: "#E3AE19" });
svg.makeLine({ parent: dom.svgLayer, id: "circles", stroke: 4, color: "#ff0", cap: "round" });


//SOUND

// let audioCtx = new(window.AudioContext || window.webkitAudioContext)();

// let gainNode1 = audioCtx.createGain();
// let gainNode2 = audioCtx.createGain();
// let gainNode3 = audioCtx.createGain();
// let gainNode4 = audioCtx.createGain();

// let constantNode = audioCtx.createConstantSource();
// constantNode.connect(gainNode1.gain);
// constantNode.connect(gainNode2.gain);
// constantNode.connect(gainNode3.gain);
// constantNode.connect(gainNode4.gain);

// gainNode1.connect(audioCtx.destination);
// gainNode2.connect(audioCtx.destination);
// gainNode3.connect(audioCtx.destination);
// gainNode4.connect(audioCtx.destination);

// let osc1 = audioCtx.createOscillator();
// osc1.type = "sine";
// osc1.frequency.value = 100;    
// osc1.connect(audioCtx.destination);
// osc1.start();

// let osc2 = audioCtx.createOscillator();
// osc2.type = "sine";
// osc2.frequency.value = 100;
// osc2.connect(audioCtx.destination);
// osc2.start();

// let osc3 = audioCtx.createOscillator();
// osc3.type = "sine";
// osc3.frequency.value = 100;
// osc3.connect(audioCtx.destination);
// osc3.start();

// let osc4 = audioCtx.createOscillator();
// osc4.type = "sine";
// osc4.frequency.value = 30;
// osc4.connect(audioCtx.destination);
// osc4.start();



let offset = -50;
let trigger = 1;

let simplex = new SimplexNoise();


//LOOP

function loop(time) {
    
    //circles
    let speed = 400;
    let speed2 = 350
    let size = 14;
    
    let circleLeft = { position: { x: Math.sin(time / speed2) * 7 -50 + offset, y: Math.cos(time / 160) * 10 } };
    let circleBig = { position: { x: Math.sin(time / speed) * size * 2 + 50 + offset, y: Math.cos(time / speed) * size } };
    let circleRight = { position: { x: Math.sin(time / speed2) * 5 -70 + offset, y: Math.cos(time / 160) * 5 } };
    
    
    offset += 0.2 * trigger

    if (offset > 55) {
        trigger = -1.4
    }

    if (offset < -50) {
        trigger = 1
    }

    // osc1.frequency.value = circleLeft.position.y + 80;
    // osc2.frequency.value = circleBig.position.x + 40;
    // osc3.frequency.value = circleRight.position.y + 80;
    
    // gainNode1.gain.value = 1;
    // gainNode2.gain.value = 0;
    // gainNode3.gain.value = 1;
    
    //console.log(gainNode2.gain.value)
    // gainNode3.gain.value = 0.5;
    
    //verlet2
    physics.verlet({ a: circleBig, b: dots2[0], distance: 0, stiffness: 1 });
    for (let i = 0; i < dots2.length-1; i++) {
        physics.verlet({ a: dots2[i], b: dots2[(i+1)], distance: 0, stiffness: 1 });
    }
    
    physics.verlet({ a: dots2[dots2.length-1], b: circleRight, distance: 0, stiffness: 1 });
    
    let collect2 = [];
    
    for (let i = 0; i < dots2.length; i++) {
        let dot2 = dots2[i];
        
        physics.calculate({ point: dot2, force: { x: 0, y: 0 } });
        collect2.push(dot2.position)
    }
    dom.rope2.setAttributeNS(null, "d", svg.path(collect2));
    
    //verlet1
    physics.verlet({ a: circleLeft, b: dots[0], distance: 0, stiffness: 1 });
    for (let i = 0; i < dots.length-1; i++) {
        physics.verlet({ a: dots[i], b: dots[(i+1)], distance: 0, stiffness: 1 });
    }
    
    physics.verlet({ a: dots[dots.length-1], b: circleBig, distance: 0, stiffness: 1 });
    
    let collect = [];
    
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        
        physics.calculate({ point: dot, force: { x: 0, y: 0 } });
        collect.push(dot.position)
    }
    dom.rope.setAttributeNS(null, "d", svg.path(collect));
    
    
    
    
    
    
    
    requestAnimationFrame(loop);
};

loop(0);