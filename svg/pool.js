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
        //twrk.center = { x: twrk.width, y: twrk.height };
    }
    twrk.scale({ height: 160 });


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

    svg.dot = function (io) {


return "M " + io.x * twrk.res + " " + io.y * twrk.res + " z";
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
    let time = {};
    let step = 2;
    let position = { x: -50, y: -50 };

    let resolution = 0.1;
    let amplification = 4;
    let amplificationSize = 1.2;

    let strokeW = 0.1
    let strokeVar = + 0.001

    let colors = ["#6495ED", "#00FFFF", "#1E90FF", "#ADD8E6"]

    svg.makeLine({parent: dom.svgLayer, id: "dots", cap: "round", stroke: 0.5, color: "#ADD8E6", d: ""});
  
    function loop(sowieso){

        time.now = sowieso;

        let dotsArray = "";

        let numDots = 50


        for(let y = 0; y < numDots; y++) {
            
            for(let x = 0; x < numDots; x++) {

                let noiseX = simplex.noise2D(x * resolution + time.now/6000, y * resolution) * amplification;
                let noiseY = simplex.noise2D(y * resolution + time.now/6000+10, x * resolution) * amplification;
                dotsArray += svg.dot({x: position.x + x * step + noiseX, y: position.y + y * step + noiseY});
                
                dom["dots"].setAttributeNS(null, "stroke-width", strokeW);
                //dom["dots"].setAttributeNS(null, "color", colors[10]);
                //strokeW = (Math.sin(time.now/600)* 2) + 5.2;

                strokeW = simplex.noise2D(x * resolution + time.now/6000, y * resolution) * amplificationSize + 4;
                //console.log(strokeW)

            }
        }

        dom["dots"].setAttribute("d", dotsArray);
    
        requestAnimationFrame(loop);
    };

    loop(0);