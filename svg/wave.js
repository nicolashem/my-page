
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
twrk.scale({ height: 150 });


//SVG
let svg = {};

svg.nameSpace = "http://www.w3.org/2000/svg";


svg.path = function (ia) {
    
    let output = "M ";
    for (var i = 0; i < ia.length; i++) {
        output += ia[i].x * twrk.res + " " + ia[i].y * twrk.res + " ";
    }
    output += "z";
    
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

//DOM
let dom = {};

//stage
dom.stage = document.createElement("stage");
dom.stage.style.transform = "translateX(" + (twrk.center.x * twrk.res) + "px) translateY(" + (twrk.center.y * twrk.res) + "px)";
dom.stage.id = "stage";
document.body.appendChild(dom.stage);

//svg layer
svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });

let simplex = new SimplexNoise();

//lineRotation
lineRotation = function ({ point, long, rotation }) {
    return [
        { x: point.x, y: point.y },
        { x: point.x + Math.sin(rotation) * long, y: point.y + Math.cos(rotation) * long }
    ];
};

//drawDot
drawDot = function ({ point }) {
    return [
        { x: point.x, y: point.y },
    ];
};

drawTrace = function ({ point }) {
    return [
        { x: point.x, y: point.y },
    ];
};

//drawing
let step = 2;
let step2 = 3;
let position = { x: 170, y: -40 };
let speed = 0.0004;
let p
let q
let tracesArray = []

svg.makeLine({parent: dom.svgLayer, id: "traces",cap: "round", stroke: 0.4, color: "#FF5353", d: ""});
svg.makeLine({parent: dom.svgLayer, id: "dots",cap: "round", stroke: 0.9, color: "#DF380E", d: ""});


function loop(time){
    
    let dotsArray = [];
    
    for (let j = 0; j < 3; j++) {
        
        p = j * simplex.noise3D(j / 20, 1, time * speed) 
        q = j * simplex.noise3D(j / 70, 10, time * speed) 
        
        for (let i = 0; i < 30; i++) {
            let x = -100 + i + q * 7
            let y = simplex.noise3D(i/20, 0, time * speed) * 6 + j * 10 + p
            
            tracesArray.push(drawTrace({
                point: {x: position.x + x * step, y: position.y + y * step2}
            }));
            
            if (tracesArray.length > 4000) {
                tracesArray.shift()
            }
            
            dotsArray.push(drawDot({
                point: {x: position.x + x * step, y: position.y + y * step2}
            }));
        }
        
    }
    
    console.log(tracesArray)
    dom["dots"].setAttributeNS(null, "d", svg.paths(dotsArray));
    dom["traces"].setAttributeNS(null, "d", svg.paths(tracesArray));
    
    requestAnimationFrame(loop);
};

loop(0);


