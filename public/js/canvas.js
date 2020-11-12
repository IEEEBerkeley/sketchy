const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;  // Or whatever frontend wants
canvas.height = 500; // Or whatever frontend wants
const socket = io();
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)); // Asynchronous sleep

let data = new Queue();

let painting = false;

async function startPosition(e) {
    if (painting === false) {
        socket.emit('draw', {
            'x1': e.clientX,
            'y1': e.clientY,
            'x2': e.clientX,
            'y2': e.clientY,
            'start': true
        });
    }
    await sleep(10);
    painting = true;
}

function finishedPosition() {
    painting = false;
    ctx.beginPath();
}

async function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 10;
    ctx.lineCap = 'round';

    let delta = {'start': false};

    delta['x1'] = e.clientX;
    delta['y1'] = e.clientY;
    ctx.lineTo(delta['x1'], delta['y1']);
    ctx.stroke();
    ctx.beginPath();
    delta['x2'] = e.clientX;
    delta['y2'] = e.clientY;
    ctx.moveTo(delta['x2'], delta['y2']);

    socket.emit('draw', delta);

    await sleep(10);
}

socket.on('draw', in_delta => {
    data.enqueue(in_delta)
})

async function draw_queue() {
    if (data.isEmpty()) return;
    
    let in_delta = data.dequeue();
    let x1 = in_delta['x1'];
    let y1 = in_delta['y1'];
    let x2 = in_delta['x2'];
    let y2 = in_delta['y2'];
    let start = in_delta['start'];
    if (start) {
        ctx.moveTo(x2, y2);
        ctx.beginPath();
    }
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2, y2);
}

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);

setInterval(draw_queue, 10);