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

svg.pathSoft = function (ia) {
    ia.unshift(ia[0]);
    let output = "M ";
    for (let i = 1; i < ia.length; i++) {
        output += (ia[i - 1].x + ia[i].x) / 2 * twrk.res + "," + (ia[i - 1].y + ia[i].y) / 2 * twrk.res + " Q";
        output += ia[i].x * twrk.res + "," + ia[i].y * twrk.res + " ";
    }
    output += ia[ia.length - 1].x * twrk.res + "," + ia[ia.length - 1].y * twrk.res + " ";
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
    
physics.verlet = function ({ a, b, distance, stiffness, iterations }) {
    for (let i = 0; i < iterations; i++) {
        let difference = { x: a.position.x - b.position.x, y: a.position.y - b.position.y };
        let dot = Math.sqrt((difference.x * difference.x) + (difference.y * difference.y));

        if (dot == 0) dot = 0.001;

        let scalar = (distance - dot) / dot * stiffness * 0.5;
        let move = { x: difference.x * scalar, y: difference.y * scalar };

        a.position = { x: a.position.x + move.x, y: a.position.y + move.y };
        b.position = { x: b.position.x - move.x, y: b.position.y - move.y };
    }
};

physics.verletStart = function ({ a, b, distance, stiffness, iterations }) {
    for (let i = 0; i < iterations; i++) {
        let difference = { x: a.position.x - b.position.x, y: a.position.y - b.position.y };
        let dot = Math.sqrt((difference.x * difference.x) + (difference.y * difference.y));

        if (dot == 0) dot = 0.001;

        let scalar = (distance - dot) / dot * stiffness * 0.5;
        let move = { x: difference.x * scalar, y: difference.y * scalar };

        //a.position = { x: a.position.x + move.x, y: a.position.y + move.y };
        b.position = { x: b.position.x - move.x, y: b.position.y - move.y };
    }
};


//DOM
let dom = {};

//stage
dom.stage = document.createElement("stage");
dom.stage.style.transform = "translateX(" + (twrk.center.x * twrk.res) + "px) translateY(" + (twrk.center.y * twrk.res) + "px)";
dom.stage.id = "stage";
document.body.appendChild(dom.stage);

//svg layer
svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });
svg.makeLine({ parent: dom.svgLayer, id: "ropeworm", join: "bevel", cap: "round", stroke: 0.1, color: "#fff" });
svg.makeLine({ parent: dom.svgLayer, id: "ropeworm2", join: "bevel", cap: "round", stroke: 0.1, color: "#fff" });
svg.makeLine({ parent: dom.svgLayer, id: "ropeworm3", join: "bevel", cap: "round", stroke: 0.1, color: "#fff" });
svg.makeLine({ parent: dom.svgLayer, id: "ropeworm4", join: "bevel", cap: "round", stroke: 0.1, color: "#fff" });
svg.makeLine({ parent: dom.svgLayer, id: "circle", stroke: 4, color: "#fff", cap: "round" });


let test = [];
for (let i = 0; i < 40; i++) {
test.push(physics.makePoint({ id: "blob" + i, drag: 1, position: { x: -5 + Math.random() * 10, y: -50 + Math.random() * 8 } }));
}
test[0].noPhysics = true;

let test2 = [];
for (let i = 0; i < 60; i++) {
test2.push(physics.makePoint({ id: "blob" + i, drag: 1, position: { x: -45 + Math.random() * 20, y: -50 + Math.random() * 20 } }));
}

let test3 = [];
for (let i = 0; i < 70; i++) {
    test3.push(physics.makePoint({ id: "blob" + i, drag: 1, position: { x: 30 + Math.random(), y: -40 + Math.random() } }));
}

let test4 = [];
for (let i = 0; i < 23; i++) {
    test4.push(physics.makePoint({ id: "blob" + i, drag: 1, position: { x: 60 + Math.sin(i*3), y: Math.cos(i*5) } }));
}

let simplex = new SimplexNoise();


//LOOP
////////////

let speedwolle = 100;
let scaling = 900;
let xpos = 0;
let xpos2 = 0;
let ypos = 0;
let ypos2 = 0;
let ypos3 = 0;
let xpos3 = -20;
let ypos4 = 0;
let xpos4 = -20;
let ypos5 = 0;
let xpos6 = 60;
let ypos6 = 0;

function loop(time) {

    ////////////////mitte/////////
    //////////////////////////////

    test[0].position = {x: 0 , y: -80};

    for (let i = 1; i < 100; i++){
        test[test.length - 1].position = {x: xpos2 , y: ypos2};
        ypos2 += 10 * i
    }

    let dist = 10;
    let stiff = 0.01;

    physics.verletStart({ a: test[0], b: test[1], distance: dist, stiffness: stiff, iterations: 10 });

    for (let i = 1; i < test.length - 1; i++) {
        physics.verlet({ a: test[i], b: test[i + 1], distance: dist, stiffness: stiff, iterations: 10 });
        stiff += 0.001;
    }

    let collect = [];
    for (let i = 0; i < test.length-1; i++) {
        if(!test[i].noPhysics){
        physics.calculate({ point: test[i], force: { x: 0, y: 0.005 } });
        }
        collect.push(test[i].position);
    }

    dom.ropeworm.setAttributeNS(null, "d", svg.pathSoft(collect));
    
    ///////////links//////////
    //////////////////////////

    let stiff2 = 0.9;
    let dist2 = 10;
    
    for (let i = 1; i < 100; i++){
        test2[0].position = {x: xpos3 , y: ypos3};
        ypos3 -= 1;
    }

    for (let i = 0; i < test2.length - 2; i++) {
        physics.verlet({ a: test2[i], b: test2[i + 1], distance: dist2, stiffness: stiff2, iterations: 10 });
        stiff += 0.001;
    }

    let collect2 = [];

    for (let i = 0; i < test2.length-1; i++) {
        physics.calculate({ point: test2[i], force: { x: 0, y: 0.004 } });
        collect2.push(test2[i].position);
    }

    test2[test2.length - 1].position = {x: -40 , y: 50};

    dom.ropeworm2.setAttributeNS(null, "d", svg.pathSoft(collect2));
    

    ///////////rechts/////////
    //////////////////////////


    for (let i = 1; i < 100; i++){
        test3[0].position = {x: xpos4 , y: ypos4};
        ypos4 -= 2 * i
    }

    for (let i = 1; i < 100; i++){
        test3[test3.length - 1].position = {x: xpos4 , y: ypos5};
        ypos5 += 2 * i
    }

    let dist3 = 30;
    let stiff3 = 0.01;

    for (let i = 0; i < test3.length - 1; i++) {
        physics.verlet({ a: test3[i], b: test3[i + 1], distance: dist3, stiffness: stiff3, iterations: 10 });
        stiff3 += 0.001;
    }

    let collect3 = [];
    for (let i = 0; i < test3.length-1; i++) {
        physics.calculate({ point: test3[i], force: { x: 0, y: 0.004 } });
        collect3.push(test3[i].position);
    }

    dom.ropeworm3.setAttributeNS(null, "d", svg.pathSoft(collect3));


    /////////ganzrechts//////
    /////////////////////////

    for (let i = 1; i < 100; i++){
        test4[0].position = {x: xpos6 , y: ypos6};
        ypos6 -= 2 * i
    }

    for (let i = 1; i < 100; i++){
        test4[test4.length - 1].position = {x: xpos6 , y: ypos6};
        ypos6 += 2 * i
    }

    let dist4 = 30;
    let stiff4 = 0.01;

    for (let i = 0; i < test4.length - 1; i++) {
        physics.verlet({ a: test4[i], b: test4[i + 1], distance: dist4, stiffness: stiff4, iterations: 10 });
        stiff4 += 0.001;
    }

    let collect4 = [];
    for (let i = 0; i < test4.length-1; i++) {
        physics.calculate({ point: test4[i], force: { x: 0, y: 0.004 } });
        collect4.push(test4[i].position);
    }

    dom.ropeworm4.setAttributeNS(null, "d", svg.pathSoft(collect4));


    requestAnimationFrame(loop);
};

loop(0);