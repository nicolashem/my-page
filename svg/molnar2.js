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
    output += "z";

    return output;
};

svg.makeLayer = function ({ parent, id, x = 0, y = 0 }) {
    dom[id] = document.createElementNS(svg.nameSpace, "svg");
    dom[id].id = id;
    dom[id].style.transform = "translateX(" + (x * twrk.res) + "px) translateY(" + (y * twrk.res) + "px)";
    parent.appendChild(dom[id]);
};

svg.makeLine = function ({ parent, id, d = "", color = "#fff", stroke = 1, cap = "butt", join = "round" }) {
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

svg.makeShape = function ({ parent, id, d = "", color = "#fff" }) {
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

//drawing
//svg.makeShape({ parent: dom.svgLayer, id: "form", stroke: 1, color: "#f00", d: svg.path([{ x: -30, y: -50 }, { x: 50, y: 30 }, { x: -50, y: 30 }]) })
//svg.makeLine({ parent: dom.svgLayer, id: "linie", stroke: 1, color: "#f0f", d: svg.path([{ x: -50, y: -50 }, { x: 50, y: 30 }]) })
//svg.makeLine({ parent: dom.svgLayer, id: "punkt", cap: "round", stroke: 10, color: "#ff0", d: svg.path([{ x: -30, y: -30 }]) })

let square = 20;
let distance = 2;
let cells = 10;
let offset = -cells/2 * distance
let sizes = [square, square * 0.9, square * 0.8];

//nested loop
for(let x = 0; x < cells; x++){
    for(let y = 0; y < cells; y++){
        
        let xpos = offset + x * distance
        let ypos = offset + y * distance

        let dice = Math.ceil(Math.random() * 3);
        let step = square / 5

        let path = [
            {x: xpos - square / 2 + Math.ceil(Math.random() * 6) * step, y: ypos - square / 2 },
            {x: xpos + square / 2, y: ypos + square / 2 + Math.ceil(Math.random() * 6) * step },
            {x: xpos + square / 2 - Math.ceil(Math.random() * 6) * step, y: ypos + square / 2 },
            {x: xpos - square / 2, y: ypos + square / 2 - Math.ceil(Math.random() * 6) * step }
        ];

        svg.makeLine({parent: dom.svgLayer, id: "punkt", cap: "round", stroke: 0.2, color: "#fff", d: svg.path(path)})

    }
}