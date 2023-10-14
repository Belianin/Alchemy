import { Item, Recipie, initialField, recipies as initialRecipies, itemToTitle, textures } from './data';
import { initSaves } from './saves';

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

const spriteSize = 64;

export interface IGame {
    field: Item[],
    recipies: Recipie[],
    found: Set<string>,
    load(items: Item[], found: Set<string>): void
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
        canvas.addEventListener('mousemove', this.handleMove.bind(this));
        canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        canvas.addEventListener('mouseup', this.handleMouseLeave.bind(this));

        this.ctx = canvas.getContext("2d");
        this.tick = 0;

        setInterval(this.draw.bind(this), 40)
    }

    load(items: Item[], found: Set<string>) {
        console.log('Loaded')
        console.log(items)
        this.field = items;
        this.found = found;

        this.leftRecipiesCountMap = {};
        for (let recipie of this.recipies) {
            this.leftRecipiesCountMap[recipie.first] = this.leftRecipiesCountMap[recipie.first] ? this.leftRecipiesCountMap[recipie.first] + 1 : 1;
            this.leftRecipiesCountMap[recipie.second] = this.leftRecipiesCountMap[recipie.second] ? this.leftRecipiesCountMap[recipie.second] + 1 : 1;
        }
        for (let foundItem of found) {
            const recipie = this.recipies.find(x => x.result === foundItem);
            this.leftRecipiesCountMap[recipie.first]--;
            this.leftRecipiesCountMap[recipie.second]--;

            
            const p = document.createElement("p");
            p.innerText = `${itemToTitle[recipie.first]} + ${itemToTitle[recipie.second]} = ${itemToTitle[recipie.result]}`

            document.getElementById("recipies").appendChild(p);
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
            if (true)  
                this.ctx.fillText((this.leftRecipiesCountMap[item.id] || 0).toString(), item.x, item.y + spriteSize + 24);
        }
    }

    handleMove(event: MouseEvent) {
        if (!this.selectedItem)
            return;
    
        const mouse = this.getMousePosition(event);
        this.selectedItem.x = mouse.x - spriteSize / 2;
        this.selectedItem.y = mouse.y - spriteSize / 2;
    }
    
    handleMouseLeave(event: MouseEvent) {
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
                        this.leftRecipiesCountMap[recipe.first]--;
                        this.leftRecipiesCountMap[recipe.second]--;
    
                        const p = document.createElement("p");
                        p.innerText = `${itemToTitle[recipe.first]} + ${itemToTitle[recipe.second]} = ${itemToTitle[recipe.result]}`
    
                        document.getElementById("recipies").appendChild(p);
                    }
    
                    this.field = this.field.filter(i => i.isEternal || (i !== item && i !== this.selectedItem));
    
                    if (item.isEternal) {
                        this.field.push({
                            x: item.x,
                            y: item.y - spriteSize - 16,
                            id: recipe.result
                        })
                    }
                    else {
                        this.field.push({
                            x: this.selectedItem.x,
                            y: this.selectedItem.y,
                            id: recipe.result
                        })
                    }
    
                    break craft_search;
                }
            }
        }
    
        if (this.selectedItem.isEternal) {
            this.selectedItem.x = this.selectedItem.startX;
            this.selectedItem.y = this.selectedItem.startY;
        }
        this.selectedItem = null;
    }
    
    handleOnClick(event: MouseEvent) {
        const mouse = this.getMousePosition(event);
        console.log(mouse);
    
        for (let item of this.field) {
            if (item.x <= mouse.x && item.x + spriteSize >= mouse.x &&
                item.y <= mouse.y && item.y + spriteSize >= mouse.y) {
                    this.selectedItem = item;
                break;
            }
        }
    }
    
    getMousePosition(event: MouseEvent) {
        
        const canvasRect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - canvasRect.left,
            y: event.clientY - canvasRect.top
        }
    }
}

export const game = new Game(initialRecipies);
game.load(initialField, new Set<string>());
initSaves(game);