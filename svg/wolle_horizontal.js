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
 
 physics.verletworm = function ({ a, b, distance, stiffness, iterations }) {
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

     //make physics dots
     physics.makeDots = function ({ parent, amount = 10, drag = 0.4 }) {
     for (let i = 0; i < amount; i++) {
         parent.push(physics.makePoint({
             id: "dot" + i,
             position: { x: -50 + Math.random() * 50, y: Math.random() * 100 },
             drag: drag
         }));
     }
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
 svg.makeLine({ parent: dom.svgLayer, id: "rope", join: "bevel", cap: "round", stroke: 0.3, color: "#fff" });
 svg.makeLine({ parent: dom.svgLayer, id: "rope2", join: "bevel", cap: "round", stroke: 0.3, color: "#fff" });

 svg.makeLine({ parent: dom.svgLayer, id: "circles", stroke: 4, color: "#ff0", cap: "round" });

 svg.makeLine({ parent: dom.svgLayer, id: "ropeworm", join: "bevel", cap: "round", stroke: 0.1, color: "#fff" });
 svg.makeLine({ parent: dom.svgLayer, id: "circlesworm", stroke: 0.5, color: "#f00", cap: "round" });
 

 let test = [];
 for (let i = 0; i < 70; i++) {
     test.push(physics.makePoint({ id: "blob" + i, drag: 1, position: { x: -25 + Math.random() * 70, y: -20 + Math.random() * 40 } }));
 }

 let offset = -50;
 let trigger = 1;

 let simplex = new SimplexNoise();


 //LOOP
 ////////////
 
 function loop(time) {
     

     //wolle
     ///////////

     let speedwolle = 100;
     let scaling = 900;
     let xpos = 0;
     let xpos2 = 0;
     let ypos = 0;
     let ypos2 = 0;

   

     for (let i = 1; i < 100; i++){
         test[0].position = {x: xpos , y: - Math.sin(time / speedwolle) * scaling};
         xpos -= 10 * i
     }

     for (let i = 1; i < 100; i++){
         test[test.length - 1].position = {x: xpos2 , y: ypos2};
         xpos2 += 10 * i
     }
 
     let dist = 70;
     let stiff = 0.01;

     for (let i = 0; i < test.length - 1; i++) {
         physics.verletworm({ a: test[i], b: test[i + 1], distance: dist, stiffness: stiff, iterations: 10 });
         stiff += 0.001;
     }

     let leer = [];
     for (let i = 0; i < test.length-1; i++) {
         physics.calculate({ point: test[i], force: { x: 0, y: 0 } });
         leer.push(test[i].position);
     }

     dom.ropeworm.setAttributeNS(null, "d", svg.pathSoft(leer));


     
     
     
     requestAnimationFrame(loop);
 };
 
 loop(0);
 
 
 
 