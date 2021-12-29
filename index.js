const canvas = document.getElementById("canvas");

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

canvas.addEventListener('click', handleOnClick);

const canvasRect = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

setInterval(draw, 100)

let items = [];

function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, width);
}

function handleOnClick(event) {
    const mouse = getMousePosition(event);

    console.log(mouse);
}

function getMousePosition(event) {
    return {
        x: event.clientX - canvasRect.x,
        y: event.clientY - canvasRect.y
    }
}