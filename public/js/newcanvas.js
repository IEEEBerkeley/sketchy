/**
 * 
 * @author Arthur Deng
 * 
 * This JS file handles the canvas application. 
 * Features supported:
 * - undo
 * - redo
 * - reset
 * - change colour
 * - change brush size
 * - erase
 */
function _(selector) {
    return document.querySelector(selector);
}


function setup() {
    let canvas = createCanvas(650, 540);
    canvas.parent("canvas-wrapper");
    background(255);
}

function mouseDragged() {
    type = _("#pen-brush").checked ? "brush" : "eraser";
    size = parseInt(_("#pen-size").value);
    if (type == "brush") {
        color = _("#pen-color").value;
    } else {
        color = 'rgb(255)';
    }
    points.push({
        px: pmouseX,
        py: pmouseY,
        x: mouseX,
        y: mouseY,
        brushSize: size,
        brushColor: color,
        brushType: type,
        stroke: strokeCnt
    });
    updated = false;
    undoSave = [];
}

let type = _("#pen-brush").checked ? "brush" : "eraser";
let size = parseInt(_("#pen-size").value);
let color = _("#pen-color").value;
let updated = true;
let points = [];
let undoSave = [];
let newStroke = false;
let strokeCnt = 0;

_("#reset-canvas").addEventListener("click", function() {
    socket.emit('draw', {
        "point": {
            brushType: 'reset'
        }
    });
});

_("#undo").addEventListener("click", function() {
    socket.emit('draw', {
        "point": {
            brushType: 'undo'
        }
    });
});

_("#redo").addEventListener("click", function() {
    if (undoSave.length == 0) {
        return;
    }
    let redoPoints = [];
    let point = undoSave.pop();
    let stroke = point.stroke;
    while (undoSave.length > 0 && point.stroke == stroke) {
        redoPoints.push(point);
        point = undoSave.pop();
    }
    if (undoSave.length > 0) undoSave.push(point); //add the last point back in
    console.log(redoPoints);
    socket.emit('draw', {
        "point": {
            brushType: 'redo',
            redoData: redoPoints
        }
    });
})

function undo() {
    if (points.size == 0) {
        return;
    }
    let point = points.pop();
    //console.log("STROKE COUNT" + strokeCnt + "   " + point.stroke);
    let last = point.stroke;

    while (points.length > 0 && point.stroke == last) {
        undoSave.push(point);
        point = points.pop();
    }
    if (points.length > 0 && point.brushType != 'reset') {
        points.push(point); //add the last point back in
    }
    //redraws the whole canvas
    background(255);
    drawPoints(points);
}

function redo(point) {
    let redoData = point.redoData;
    console.log(redoData);
    drawPoints(redoData);
    points = points.concat(redoData);
}

function drawPoints(points) {
    for (let i = 0; i < points.length; i++) {
        point = points[i];
        stroke(point.brushColor);
        strokeWeight(point.brushSize);
        line(point.px, point.py, point.x, point.y);
    }
}


function mousePressed() {
    strokeCnt++;
}

setInterval(function() {
    if (updated) return;
    socket.emit('draw', {
        "point": points[points.length - 1]
    });
    updated = true;
}, 10);

socket.on('draw', (data) => {
    let point = data.point;
    if (point.brushType == 'reset') {
        points.push(point);
        background(255);
    } else if (point.brushType == 'undo') {
        undo();
    } else if (point.brushType == 'redo') {
        console.log("check");
        redo(point);
    } else {
        points.push(point)
        stroke(point.brushColor);
        strokeWeight(point.brushSize);
        line(point.px, point.py, point.x, point.y);
    }
});
/*
seems like a good reference for p5.js undo redo functions
https://www.openprocessing.org/sketch/131411/
*/