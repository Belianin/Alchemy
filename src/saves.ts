import { IGame } from "./index";
import { Item, Recipie } from "./data";

type SavedData = {
    fields: Item[],
    found: string[]
}

export function initSaves(game: IGame) {
    const saveButton = document.getElementById('save-button') as HTMLButtonElement;
    const loadButton = document.getElementById('load-button') as HTMLButtonElement;
    const saveGameStorageItemName = "alchemy-save";

    loadButton.disabled = !window.localStorage.getItem(saveGameStorageItemName);

    function saveGame() {
        const savedData: SavedData = {
            fields: game.field,
            found: [...game.found]
        };
        window.localStorage.setItem(saveGameStorageItemName, JSON.stringify(savedData))
        loadButton.disabled = false;
    }

    function loadGame() {
        const savedData = JSON.parse(window.localStorage.getItem(saveGameStorageItemName)) as SavedData;
        const field = savedData.fields;
        const found = new Set<string>(savedData.found)
        
        game.load(field, found)
    }

    saveButton.onclick = saveGame;
    loadButton.onclick = loadGame;
}