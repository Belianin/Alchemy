const canvas = document.getElementById("canvas");

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

const spriteSize = 64;

canvas.addEventListener('mousedown', handleOnClick);
canvas.addEventListener('mousemove', handleMove);
canvas.addEventListener('mouseleave', handleMouseLeave);
canvas.addEventListener('mouseup', handleMouseLeave);

const canvasRect = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");

setInterval(draw, 40)

const itemToTitle = {
    "forest": "Лес",
    "negative": "Негатив",
    "work": "Работа",
    "money": "Деньги",
    "water": "Влага",
    "wind": "Ветер",
    "tester": "Тестировщик",
    "pivko": "Пив&ко",
    "anton": "Антоша",
    "ants": "Муравьи",
    "cigarettes": "Сигареты",
    "dm": "Дядя Миша",
    "dm_dead": "Мертвый Дядя Миша",
    "dm_dead_eight": "Восемь мертвых Дядей Миш",
    "dm_dead_four": "Четвыре мертвых Дяди Мишей",
    "dm_dead_six": "Шесть мертвых Дядей Миш",
    "dm_dead_two": "Два метрвых Дяди Миши",
    "dm_dressed": "Одетый Дядя Миша",
    "dm_wet": "Влажный Дядя Миша",
    "persimmon": "Хурма",
    "persimmon_with_ants": "Хурма с муравьями",
    "portal": "Портвл в Ад",
    "wolf": "Волк",
    "wolf_two": "Два волка",
    "wolf_four": "Четыре волка",
    "blob": "Blob",
    "lobster": "Лобствер",
    "blobster": "Блобстер",
    "frog": "Жаба",
    "il_blob": "Илюха Блобстер",
    "wolfpack_1": "Дядя Миша и три волка",
    "wolfpack_2": "Антоша, Дядя миша и два волка",
    "wolfpack_3": "Блобстер, Антоша, Дядя миша и волк",
    "wolfpack_4": "Стая",
    "victory": "Победа",
    "online_prince": "Онлайн-принц",
    "anton_anteater": "Антоша Муравьед"
}

const recipies = [
    {
        first: "negative",
        second: "work",
        result: "money"
    },
    {
        first: "wind",
        second: "money",
        result: "tester"
    },
    {
        first: "money",
        second: "water",
        result: "pivko"
    },
    {
        first: "dm",
        second: "water",
        result: "dm_wet"
    },
    {
        first: "dm_wet",
        second: "wind",
        result: "dm_dead"
    },
    {
        first: "tester",
        second: "work",
        result: "persimmon"
    },
    {
        first: "tester",
        second: "forest",
        result: "ants"
    },
    {
        first: "persimmon",
        second: "ants",
        result: "persimmon_with_ants"
    },
    {
        first: "work",
        second: "water",
        result: "forest"
    },
    {
        first: "dm_wet",
        second: "wind",
        result: "dm_dead4"
    },
    {
        first: "cigarettes",
        second: "tester",
        result: "anton"
    },
    {
        first: "negative",
        second: "tester",
        result: "dm"
    },
    {
        first: "ants",
        second: "persimmon",
        result: "persimmon_with_ants"
    },
    {
        first: "money",
        second: "pivko",
        result: "cigarettes"
    },
    {
        first: "dm_dead_six",
        second: "dm_dead_four",
        result: "portal"
    },
    {
        first: "dm_dead_eight",
        second: "dm_dead_two",
        result: "portal"
    },
    {
        first: "dm_dead",
        second: "dm_dead",
        result: "dm_dead_two"
    },
    {
        first: "dm_dead_two",
        second: "dm_dead_two",
        result: "dm_dead_four"
    },
    {
        first: "dm_dead_two",
        second: "dm_dead_four",
        result: "dm_dead_six"
    },
    {
        first: "dm_dead_six",
        second: "dm_dead_two",
        result: "dm_dead_eight"
    },
    {
        first: "dm_dead_four",
        second: "dm_dead_four",
        result: "dm_dead_eight"
    },
    {
        first: "forest",
        second: "negative",
        result: "wolf"
    },
    {
        first: "wolf",
        second: "wolf",
        result: "wolf_two"
    },
    {
        first: "wolf_two",
        second: "wolf_two",
        result: "wolf_four"
    },
    {
        first: "wolf_four",
        second: "dm",
        result: "wolfpack_1"
    },
    {
        first: "wolfpack_1",
        second: "anton_anteater",
        result: "wolfpack_2"
    },
    {
        first: "wolfpack_2",
        second: "il_blob",
        result: "wolfpack_3"
    },
    {
        first: "wolfpack_3",
        second: "online_prince",
        result: "wolfpack_4"
    },
    {
        first: "wolfpack_4",
        second: "portal",
        result: "victory"
    },
    {
        first: "anton",
        second: "persimmon_with_ants",
        result: "anton_anteater"
    },
    {
        first: "negative",
        second: "money",
        result: "online_prince"
    },
    {
        first: "money",
        second: "work",
        result: "blob"
    },
    {
        first: "blob",
        second: "lobster",
        result: "blobster"
    },
    {
        first: "forest",
        second: "water",
        result: "frog"
    },
    {
        first: "frog",
        second: "water",
        result: "lobster"
    },
    {
        first: "blobster",
        second: "frog",
        result: "il_blob"
    },
];

const textures = {};

for (let item in itemToTitle) {

    const image = new Image();
    image.src = `./images/${item}.png`

    textures[item] = image;
}

let field = [
    {
        x: 200,
        y: 400,
        id: "water",
        isEternal: true,
        startX: 200,
        startY: 400
    },
    {
        x: 300,
        y: 400,
        id: "wind",
        isEternal: true,
        startX: 300,
        startY: 400
    },
    {
        x: 400,
        y: 400,
        id: "negative",
        isEternal: true,
        startX: 400,
        startY: 400
    },
    {
        x: 500,
        y: 400,
        id: "work",
        isEternal: true,
        startX: 500,
        startY: 400
    }
]

function draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, width);

    ctx.fillStyle = 'black';
    for (let item of field) {
        ctx.drawImage(textures[item.id], item.x, item.y);
        ctx.fillText(itemToTitle[item.id], item.x, item.y + spriteSize + 12);
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

function handleMouseLeave(event) {
    if (!selectedItem)
        return;

    craft_search: for (let item of field) {
        if (item === selectedItem)
            continue;

        if (item.x + spriteSize <= selectedItem.x || selectedItem.x + spriteSize < item.x ||
            item.y + spriteSize < selectedItem.y || selectedItem.y + spriteSize < item.y)
            continue;

        console.log(`Found intersection with ${item.id}`)

        for (let recipe of recipies) {
            if (recipe.first === selectedItem.id && recipe.second === item.id ||
                recipe.second === selectedItem.id && recipe.first === item.id) {

                if (!recipe.found) {
                    recipe.found = true;

                    const p = document.createElement("p");
                    p.innerText = `${itemToTitle[recipe.first]} + ${itemToTitle[recipe.second]} = ${itemToTitle[recipe.result]}`

                    document.getElementById("recipies").appendChild(p);
                }

                field = field.filter(i => i.isEternal || (i !== item && i !== selectedItem));

                if (item.isEternal) {
                    field.push({
                        x: item.x,
                        y: item.y - spriteSize - 16,
                        id: recipe.result
                    })
                }
                else {
                    field.push({
                        x: selectedItem.x,
                        y: selectedItem.y,
                        id: recipe.result
                    })
                }

                break craft_search;
            }
        }
    }

    if (selectedItem.isEternal) {
        selectedItem.x = selectedItem.startX;
        selectedItem.y = selectedItem.startY;
    }
    selectedItem = null;
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