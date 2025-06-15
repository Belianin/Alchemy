import {
  Item,
  Recipie,
  initialField,
  recipies as initialRecipies,
  recipies,
  textures,
} from "./data";
import itemToTitle from "./data/itemToTitle";
import { initSaves } from "./saves";
import { isIntersect } from "./utils";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const width = 800;
const height = 800;

canvas.width = width;
canvas.height = height;

let showKnown = true;

const getRecepieText = (recipie: Recipie) =>
  `${itemToTitle[recipie.first]} + ${itemToTitle[recipie.second]} = ${
    itemToTitle[recipie.result]
  }`;

// const showLeftInput = document.getElementById('show-count-left') as HTMLInputElement;
// const showKnownInput = document.getElementById('show-known') as HTMLInputElement;

// showKnownInput.onchange = e => {
//     const knownElement = document.getElementById('recipies');
//     knownElement.hidden = !((e.target as any).checked as boolean)
// }
// showLeftInput.onchange = e => {
//     showKnown = (e.target as any).checked as boolean
// }

const knownElements = document.getElementById("found-elements");
// window.addEventListener("resize", (e) => {
//   knownElements.style.width = `${
//     64 * Math.ceil(knownElements.offsetWidth / 64)
//   }px`;
// });

function discoverElement(name: string, onclick: (name: string) => void) {
  const result = document.createElement("div");
  result.style.position = "relative";
  result.className = "found-element";
  result.id = `element-${name}`;

  const image = createElementImage(name);
  image.id = `${name}_img`;
  image.style.width = `${spriteSize}px`;
  image.style.height = `${spriteSize}px`;
  image.style.display = "block";
  image.addEventListener("dragstart", (e) => {
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    e.dataTransfer.setData("text/plain", JSON.stringify({ name, x, y }));
  });
  result.appendChild(image);

  const text = document.createElement("span");
  text.innerText = itemToTitle[name];
  //   text.style.position = "absolute";
  //   text.style.left = "0";
  //   text.style.top = `${spriteSize}px`;
  text.style.fontSize = "12px";
  result.appendChild(text);
  result.onclick = () => onclick(name);
  result.ontouchstart = () => onclick(name);

  const recipie = recipies.find((x) => x.result === name);
  if (recipie) {
    result.className = (result.className || "") + " tooltip";
    const tooltip = document.createElement("div");
    tooltip.className = "tooltiptext";
    tooltip.innerText = getRecepieText(recipie);
    result.appendChild(tooltip);
  }

  knownElements.appendChild(result);

  // const sorted = Array.from(knownElements.children).sort((a, b) => {
  //   const aOpacity = a.classList.contains("discovered");
  //   const bOpacity = b.classList.contains("discovered");
  //   for (let x of a.classList) {
  //     console.log(x);
  //   }

  //   if (aOpacity == bOpacity) return a.id.localeCompare(b.id) * 0.5;

  //   if (aOpacity) return -1;
  //   return 1;
  // });
  // knownElements.replaceChildren(...sorted);
}

function createElementImage(name: string): HTMLElement {
  const result = textures[name];
  if (Array.isArray(result)) return result[0];

  return result;
}

export const spriteSize = 64;

export interface IGame {
  field: Item[];
  recipies: Recipie[];
  found: Set<string>;
  load(items: Item[], found: Set<string>): void;
}

interface Position {
  clientX: number;
  clientY: number;
}

class Game implements IGame {
  field: Item[];
  recipies: Recipie[];
  found: Set<string>;
  private ctx: CanvasRenderingContext2D;
  private selectedItem: Item | null;
  private leftRecipiesCountMap: Record<string, number>;
  private tick: number;

  constructor(recipies: Recipie[]) {
    this.field = [];
    this.recipies = recipies;
    this.selectedItem = null;
    this.leftRecipiesCountMap = {};
    this.found = new Set<string>();

    canvas.addEventListener("mousedown", this.handleOnClick.bind(this));
    canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    canvas.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
    canvas.addEventListener("mouseup", this.handleMouseLeave.bind(this));

    canvas.addEventListener("touchstart", this.handleOnTouch.bind(this));
    canvas.addEventListener("touchmove", this.handleTouchMove.bind(this));
    canvas.addEventListener("touchend", this.handleMouseLeave.bind(this));
    canvas.addEventListener("drop", this.handleDrop.bind(this));
    canvas.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.tick = 0;

    setInterval(this.draw.bind(this), 40);
  }

  handleDrop(e: DragEvent) {
    e.preventDefault();
    console.log(e);

    const element = JSON.parse(e.dataTransfer.getData("text/plain"));

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left - element.x;
    const y = e.clientY - rect.top - element.y;

    const item = this.spawnElement(element.name, x, y);
    this.selectedItem = item;
    this.handleMouseLeave();
  }

  spawnElement(element: string, x?: number, y?: number) {
    x = x || Math.random() * (width - spriteSize);
    y = y || Math.random() * (height - spriteSize);

    const result = {
      id: element,
      x,
      y,
    };

    this.field = [result, ...this.field];

    return result;
  }

  discoverRecpie(name: string) {
    discoverElement(name, this.spawnElement.bind(this));
    const recipie = this.recipies.find((x) => x.result === name);
    this.leftRecipiesCountMap[recipie.first]--;
    if (recipie.first !== recipie.second)
      this.leftRecipiesCountMap[recipie.second]--;

    if (showKnown) {
      if (
        this.leftRecipiesCountMap[recipie.first] === 0 &&
        document.getElementById(`element-${recipie.first}`)
      )
        document
          .getElementById(`element-${recipie.first}`)
          .classList.add("discovered");
      if (
        this.leftRecipiesCountMap[recipie.second] === 0 &&
        document.getElementById(`element-${recipie.second}`)
      )
        document
          .getElementById(`element-${recipie.second}`)
          .classList.add("discovered");
    }
  }

  load(items: Item[], found: Set<string>) {
    console.log("Loaded");
    console.log(items);
    this.field = items;
    this.found = found;

    this.leftRecipiesCountMap = {};
    for (let recipie of this.recipies) {
      if (recipie.first === recipie.second)
        // todo property isDouble?
        this.leftRecipiesCountMap[recipie.first] = this.leftRecipiesCountMap[
          recipie.first
        ]
          ? this.leftRecipiesCountMap[recipie.first] + 1
          : 1;
      else {
        this.leftRecipiesCountMap[recipie.first] = this.leftRecipiesCountMap[
          recipie.first
        ]
          ? this.leftRecipiesCountMap[recipie.first] + 1
          : 1;
        this.leftRecipiesCountMap[recipie.second] = this.leftRecipiesCountMap[
          recipie.second
        ]
          ? this.leftRecipiesCountMap[recipie.second] + 1
          : 1;
      }
    }

    discoverElement("water", this.spawnElement.bind(this));
    discoverElement("wind", this.spawnElement.bind(this));
    discoverElement("negative", this.spawnElement.bind(this));
    discoverElement("work", this.spawnElement.bind(this));

    for (let foundItem of found) {
      this.discoverRecpie(foundItem);
    }
  }

  draw() {
    this.tick = (this.tick + 1) % 100;
    this.ctx.fillStyle = "#fffbe0";
    this.ctx.fillRect(0, 0, width, width);

    this.ctx.fillStyle = "black";
    for (let i = this.field.length - 1; i >= 0; i--) {
      const item = this.field[i];
      const texture = textures[item.id];
      const resultTexture = Array.isArray(texture)
        ? texture[Math.floor(this.tick * 0.2) % texture.length]
        : texture;

      this.ctx.drawImage(resultTexture, item.x, item.y);
      const title = itemToTitle[item.id];
      const textSize = this.ctx.measureText(title);

      const text = showKnown
        ? `${itemToTitle[item.id]} ${this.leftRecipiesCountMap[item.id] || ""}`
        : itemToTitle[item.id];

      this.ctx.font = "12px Consolas"; // todo перенести?
      this.ctx.fillText(
        text,
        item.x + (spriteSize / 2 - textSize.width / 2),
        item.y + spriteSize + 12
      );
    }
  }

  handleMouseMove(event: MouseEvent) {
    this.handleMove(event);
  }

  handleTouchMove(event: TouchEvent) {
    this.handleMove(event.touches[0]);
  }

  handleMove(pos: Position) {
    if (!this.selectedItem) return;

    const mouse = this.getPosition(pos);
    this.selectedItem.x = mouse.x - spriteSize / 2;
    this.selectedItem.y = mouse.y - spriteSize / 2;
  }

  handleMouseLeave() {
    if (!this.selectedItem) return;

    const result = this.tryFindRecipe();
    if (result) {
      const [item, recipe] = result;
      if (!this.found.has(recipe.result)) {
        this.found.add(recipe.result);
        this.discoverRecpie(recipe.result);
      }

      this.field = [
        {
          x: this.selectedItem.x,
          y: this.selectedItem.y,
          id: recipe.result,
        },
        ...this.field.filter((i) => i !== item && i !== this.selectedItem),
      ];
    } else {
      this.field = [
        this.selectedItem,
        ...this.field.filter((x) => x != this.selectedItem),
      ];
    }

    this.selectedItem = null;
  }

  tryFindRecipe(): [Item, Recipie] | undefined {
    for (let item of this.field) {
      if (item === this.selectedItem || !isIntersect(item, this.selectedItem))
        continue;

      const recipe = this.canCraft(this.selectedItem.id, item.id);
      if (recipe) return [item, recipe];
    }
  }

  canCraft(itemId: string, otherItemId: string) {
    return this.recipies.find(
      (recipe) =>
        (recipe.first === otherItemId && recipe.second === itemId) ||
        (recipe.second === otherItemId && recipe.first === itemId)
    );
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
      if (
        item.x <= mouse.x &&
        item.x + spriteSize >= mouse.x &&
        item.y <= mouse.y &&
        item.y + spriteSize >= mouse.y
      ) {
        this.selectedItem = item;
        break;
      }
    }
  }

  getPosition(event: Position) {
    const canvasRect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - canvasRect.left,
      y: event.clientY - canvasRect.top,
    };
  }
}

export const game = new Game(initialRecipies);
(window as any).game = game;
game.load(initialField, new Set<string>());
initSaves(game);

document.getElementById("clear-button").onclick = () => (game.field = []);
// document.getElementById("dot-button").onclick = () =>
//   console.log(convertToDot(recipies));
