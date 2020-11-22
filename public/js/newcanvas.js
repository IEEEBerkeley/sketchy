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

    function changeColor(color) {
        fill(color);
        stroke(color);
    }

    function drawing() {
        points.push({
            px: pmouseX,
            py: pmouseY,
            x: mouseX,
            y: mouseY,
            brushSize: size,
            brushColor: color,
            brushType: type
        });
    }
    if (type == "brush") {
        color = _("#pen-color").value;
    } else {
        color = 'rgb(255)';
    }
    drawing();
    updated = false;
}

_("#reset-canvas").addEventListener("click", function() {
    points.push({
        brushType: 'reset'
    });
});
_("#undo").addEventListener("click", function() {
    //ctx.undo();
});

// let ctx = drawingContext;
let type = _("#pen-brush").checked ? "brush" : "eraser";
let size = parseInt(_("#pen-size").value);
let color = _("#pen-color").value;
let updated = true;
let points = [];
let newStroke = true;
let strokeCnt = 0;


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
        background(255);
    } else {
        fill(point.brushColor);
        stroke(point.brushColor);
        strokeWeight(point.brushSize);
        line(point.px, point.py, point.x, point.y);
    }
});
/*
seems like a good reference for p5.js undo redo functions
https://www.openprocessing.org/sketch/131411/
*/