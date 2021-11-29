
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

svg.dot = function (io) {
    return "M " + io.x * twrk.res + " " + io.y * twrk.res + " z";
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

//drawing
let step = 1.8;
let position = { x: -50, y: -50 };

let resolution = 0.05;
let amplification = 2;
let amplificationSize = 2.9;

let strokeW = 0.01
let strokeVar = + 0.001

let colorsArray = ["#DF4A4A", "#6495ED", "#00FFFF", "#1E90FF", "#ADD8E6"]

svg.makeLine({
    parent: dom.svgLayer,
    id: "dots", 
    cap: "round", 
    stroke: 0, 
    color: "#176DC8", 
    d: ""
});

function loop(zeit){
    
    let dotsArray = "";
    let numDots = 40
    
    for(let y = 0; y < numDots; y++) {
        
        for(let x = 0; x < numDots; x++) {
            
            let noiseX = simplex.noise2D(x * resolution + zeit/4000, y * resolution) * amplification;
            let noiseY = simplex.noise2D(y * resolution + zeit/4000+10, x * resolution) * amplification;

            dotsArray += svg.dot({x: position.x + x * step + noiseX, y: position.y + y * step + noiseY});
            
            dom["dots"].setAttributeNS(null, "stroke-width", strokeW);
        
            strokeW = simplex.noise2D(x * resolution + zeit/2000, y * resolution) * amplificationSize + 9;
            
        }
    }
    

    dom["dots"].setAttribute("d", dotsArray);
    
    requestAnimationFrame(loop);
};

loop(0);

