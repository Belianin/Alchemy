import { Item, Recipie, initialField, recipies as initialRecipies, itemToTitle, recipies, textures } from './data';
import { initSaves } from './saves';
//import Viva from './vivagraph'

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

let showKnown = true;

// const showLeftInput = document.getElementById('show-count-left') as HTMLInputElement;
// const showKnownInput = document.getElementById('show-known') as HTMLInputElement;

// showKnownInput.onchange = e => {
//     const knownElement = document.getElementById('recipies');
//     knownElement.hidden = !((e.target as any).checked as boolean)
// }
// showLeftInput.onchange = e => {
//     showKnown = (e.target as any).checked as boolean
// }

const knownElements = document.getElementById('found-element');

function discoverElement(name: string, onclick: (name: string) => void) {

    const result = document.createElement('div');;
    result.style.position = 'relative'

    const image = createElementImage(name);
    image.id = `${name}_img`;
    image.style.width = `${spriteSize}px`;
    image.style.height = `${spriteSize}px`;
    result.appendChild(image)

    const text = document.createElement('span');
    text.innerText = itemToTitle[name];
    text.style.position = 'absolute'
    text.style.left = '0'
    text.style.top = `${spriteSize}px`;
    text.style.fontSize = '12px'
    result.appendChild(text)
    result.onclick = () => onclick(name);
    result.ontouchstart = () => onclick(name);

    knownElements.appendChild(result);
}

function createElementImage(name: string): HTMLElement {

    const result = textures[name];
    if (Array.isArray(result))
        return result[0];

    return result;
}

const spriteSize = 64;

export interface IGame {
    field: Item[],
    recipies: Recipie[],
    found: Set<string>,
    load(items: Item[], found: Set<string>): void
}

interface Position {
    clientX: number,
    clientY: number
}

class Game implements IGame {
    field: Item[];
    recipies: Recipie[];
    found: Set<string>;
    private ctx: CanvasRenderingContext2D
    private selectedItem: Item | null
    private leftRecipiesCountMap: Record<string, number>
    private tick: number;

    constructor(recipies: Recipie[]) {
        this.field = [];
        this.recipies = recipies;
        this.selectedItem = null;
        this.leftRecipiesCountMap = {};
        this.found = new Set<string>();
        
        canvas.addEventListener('mousedown', this.handleOnClick.bind(this));
        canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        canvas.addEventListener('mouseup', this.handleMouseLeave.bind(this));
        
        canvas.addEventListener('touchstart', this.handleOnTouch.bind(this));
        canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        canvas.addEventListener('touchend', this.handleMouseLeave.bind(this));

        this.ctx = canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false
        this.tick = 0;

        setInterval(this.draw.bind(this), 40)
    }

    spawnElement(element: string) {
        const x = Math.random() * (width - spriteSize);
        const y = Math.random() * (height - spriteSize);

        this.field.push({
            id: element,
            x,
            y,
        })
    }

    discoverRecpie(name: string) {
        
        discoverElement(name, this.spawnElement.bind(this));

        const recipie = this.recipies.find(x => x.result === name);
        this.leftRecipiesCountMap[recipie.first]--;
        if (recipie.first !== recipie.second)
            this.leftRecipiesCountMap[recipie.second]--;

        if (showKnown) {
            if (this.leftRecipiesCountMap[recipie.first] === 0 && document.getElementById(`${recipie.first}_img`))
                document.getElementById(`${recipie.first}_img`).style.opacity = '0.2';
            if (this.leftRecipiesCountMap[recipie.second] === 0 && document.getElementById(`${recipie.second}_img`))
                document.getElementById(`${recipie.second}_img`).style.opacity = '0.2';
        }

        const p = document.createElement("p");
        p.innerText = `${itemToTitle[recipie.first]} + ${itemToTitle[recipie.second]} = ${itemToTitle[recipie.result]}`

        document.getElementById("recipies").appendChild(p);

        // graph.addNode(recipie.result, {url : `/images/${recipie.result}.png`})
        // graph.addLink(recipie.first, recipie.result)
        // graph.addLink(recipie.second, recipie.result)
    }

    load(items: Item[], found: Set<string>) {
        console.log('Loaded')
        console.log(items)
        this.field = items;
        this.found = found;

        this.leftRecipiesCountMap = {};
        for (let recipie of this.recipies) {
            if (recipie.first === recipie.second) // todo property isDouble?
                this.leftRecipiesCountMap[recipie.first] = this.leftRecipiesCountMap[recipie.first] ? this.leftRecipiesCountMap[recipie.first] + 1 : 1;
            else {
                this.leftRecipiesCountMap[recipie.first] = this.leftRecipiesCountMap[recipie.first] ? this.leftRecipiesCountMap[recipie.first] + 1 : 1;
                this.leftRecipiesCountMap[recipie.second] = this.leftRecipiesCountMap[recipie.second] ? this.leftRecipiesCountMap[recipie.second] + 1 : 1;
            }
        }

        discoverElement('water', this.spawnElement.bind(this));
        discoverElement('wind', this.spawnElement.bind(this));
        discoverElement('negative', this.spawnElement.bind(this));
        discoverElement('work', this.spawnElement.bind(this));

        for (let foundItem of found) {
            this.discoverRecpie(foundItem)
        }

    }

    draw() {
        this.tick = (this.tick + 1) % 100;
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, width, width);
    
        this.ctx.fillStyle = 'black';
        for (let item of this.field) {

            const texture = textures[item.id];
            const resultTexture = Array.isArray(texture)
                ? texture[Math.floor(this.tick * 0.2) % texture.length]
                : texture;

            this.ctx.drawImage(resultTexture, item.x, item.y);
            this.ctx.fillText(itemToTitle[item.id], item.x, item.y + spriteSize + 12);
            if (showKnown)  
                this.ctx.fillText((this.leftRecipiesCountMap[item.id] || 0).toString(), item.x, item.y + spriteSize + 24);

        }
    }

    handleMouseMove(event: MouseEvent) {
        this.handleMove(event);
    }

    handleTouchMove(event: TouchEvent) {
        this.handleMove(event.touches[0]);
    }

    handleMove(pos: Position) {
        if (!this.selectedItem)
            return;
    
        const mouse = this.getPosition(pos);
        this.selectedItem.x = mouse.x - spriteSize / 2;
        this.selectedItem.y = mouse.y - spriteSize / 2;
    }

    handleMouseLeave() {
        if (!this.selectedItem)
            return;
    
        craft_search: for (let item of this.field) {
            if (item === this.selectedItem)
                continue;
    
            if (item.x + spriteSize <= this.selectedItem.x || this.selectedItem.x + spriteSize < item.x ||
                item.y + spriteSize < this.selectedItem.y || this.selectedItem.y + spriteSize < item.y)
                continue;
    
            console.log(`Found intersection with ${item.id}`)
    
            for (let recipe of this.recipies) {
                if (recipe.first === this.selectedItem.id && recipe.second === item.id ||
                    recipe.second === this.selectedItem.id && recipe.first === item.id) {
    
                    if (!this.found.has(recipe.result)) {
                        this.found.add(recipe.result);
                        this.discoverRecpie(recipe.result)
                    }
    
                    this.field = this.field.filter(i => i !== item && i !== this.selectedItem);
    
                    this.field.push({
                        x: this.selectedItem.x,
                        y: this.selectedItem.y,
                        id: recipe.result
                    })
                    
    
                    break craft_search;
                }
            }
        }
    
        this.selectedItem = null;
    }
    
    handleOnClick(event: MouseEvent) {
        this.handleClick(event);
    }

    handleOnTouch(event: TouchEvent) {
        this.handleClick(event.touches[0]);
    }
    
    handleClick(pos: Position) {
        const mouse = this.getPosition(pos);
        console.log(mouse);
    
        for (let item of this.field) {
            if (item.x <= mouse.x && item.x + spriteSize >= mouse.x &&
                item.y <= mouse.y && item.y + spriteSize >= mouse.y) {
                    this.selectedItem = item;
                break;
            }
        }
    }

    getPosition(event: Position) {
        const canvasRect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - canvasRect.left,
            y: event.clientY - canvasRect.top
        }
    }
}

export const game = new Game(initialRecipies);
(window as any).game = game;
game.load(initialField, new Set<string>());
initSaves(game);

document.getElementById('clear-button').onclick = () => game.field = [];

// var graph = Viva.Graph.graph();

// graph.addNode('water', {url : `/images/water.png`})
// graph.addNode('wind', {url : `/images/wind.png`})
// graph.addNode('negative', {url : `/images/negative_0.png`})
// graph.addNode('work', {url : `/images/work.png`})

// // for (let recipe of recipies) {
// //     graph.addNode(recipe.result, {url : `/images/${recipe.result}.png`})
// //     graph.addLink(recipe.first, recipe.result)
// //     graph.addLink(recipe.second, recipe.result)
// // }
 
// var graphics = Viva.Graph.View.svgGraphics();
// graphics.node(function(node) {
//        // The function is called every time renderer needs a ui to display node
//         if (node?.data?.url)
//             return Viva.Graph.svg('image')
//                     .attr('width', 64)
//                     .attr('height', 64)
//                     .link(node.data.url); // node.data holds custom object passed to graph.addNode();
//         return Viva.Graph.svg('image')
//         .attr('width', 64)
//         .attr('height', 64)
//         .color('red')
//     });

// var layout = Viva.Graph.Layout.forceDirected(graph, {
//     springLength : 200,
//     springCoeff : 0.0005,
//     dragCoeff : 0.02,
//     gravity : -4.0
//     });
// // specify where it should be rendered:
// var renderer = Viva.Graph.View.renderer(graph, {
//   container: document.getElementById('graph'),
//   graphics,
//   layout
// });
// renderer.run()