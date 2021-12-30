const canvas = document.getElementById("canvas");

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

const spriteSize = 64;

canvas.addEventListener('mousedown', handleOnClick);
canvas.addEventListener('mousemove', handleMove);
canvas.addEventListener('mouseleave', () => selectedItem = null);
canvas.addEventListener('mouseup', () => selectedItem = null);

const canvasRect = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

setInterval(draw, 40)

let items = [
    {
        x: 100,
        y: 100,
        id: "forest",
        title: "Лес"
    },
    {
        x: 200,
        y: 150,
        id: "money",
        title: "Деньги"
    }
];

const textures = {};

for (let item of items) {

    const image = new Image();
    image.src = `./images/${item.id}.png`

    textures[item.id] = image;
}

let field = [
    {
        x: 100,
        y: 100,
        id: "forest",
        title: "Лес"
    },
    {
        x: 200,
        y: 150,
        id: "money",
        title: "Деньги"
    }
]

function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, width);

    ctx.fillStyle = 'black';
    for (let item of field) {
        ctx.drawImage(textures[item.id], item.x, item.y);
        ctx.fillText(item.title, item.x, item.y + spriteSize + 12);
    }
}

let selectedItem = null;

function handleMove(event) {
    if (!selectedItem)
        return;

    const mouse = getMousePosition(event);
    selectedItem.x = mouse.x - spriteSize / 2;
    selectedItem.y = mouse.y - spriteSize / 2;
}

function handleOnClick(event) {
    const mouse = getMousePosition(event);

    for (let item of field) {
        if (item.x <= mouse.x && item.x + spriteSize >= mouse.x &&
            item.y <= mouse.y && item.y + spriteSize >= mouse.y) {
            selectedItem = item;
            break;
        }
    }
}

function getMousePosition(event) {
    return {
        x: event.clientX - canvasRect.x,
        y: event.clientY - canvasRect.y
    }
}