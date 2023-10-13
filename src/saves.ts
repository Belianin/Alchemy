import { IGame } from "./index";
import { Item, Recipie } from "./data";

type SavedData = {
    fields: Item[],
    recipies: Recipie[]
}

export function initSaves(game: IGame) {
    const saveButton = document.getElementById('save-button') as HTMLButtonElement;
    const loadButton = document.getElementById('load-button') as HTMLButtonElement;
    const saveGameStorageItemName = "alchemy-save";

    loadButton.disabled = !window.localStorage.getItem(saveGameStorageItemName);

    function saveGame() {
        const savedData: SavedData = {
            fields: game.field,
            recipies: game.recipies
        };
        window.localStorage.setItem(saveGameStorageItemName, JSON.stringify(savedData))
        loadButton.disabled = false;
    }

    function loadGame() {
        const savedData = JSON.parse(window.localStorage.getItem(saveGameStorageItemName)) as SavedData;
        const field = savedData.fields;
        const recipies = savedData.recipies
        
        game.load(recipies, field)
    }

    saveButton.onclick = saveGame;
    loadButton.onclick = loadGame;
}