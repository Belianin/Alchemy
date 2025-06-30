import { Item } from "./data";
import { IGame } from "./index";

type SavedData = {
  fields: Item[];
  found: string[];
};

export function initSaves(game: IGame) {
  const saveButton = document.getElementById(
    "save-button"
  ) as HTMLButtonElement;
  const loadButton = document.getElementById(
    "load-button"
  ) as HTMLButtonElement;
  const importSaveButton = document.getElementById(
    "import-save-button"
  ) as HTMLButtonElement;
  const saveInput = document.getElementById(
    "save-export-input"
  ) as HTMLInputElement;
  const saveGameStorageItemName = "alchemy-save";

  loadButton.disabled = !window.localStorage.getItem(saveGameStorageItemName);

  function saveGame() {
    const savedData: SavedData = {
      fields: game.field,
      found: [...game.found],
    };
    window.localStorage.setItem(
      saveGameStorageItemName,
      JSON.stringify(savedData)
    );
    loadButton.disabled = false;
    exportSave();
  }

  function loadGame() {
    const savedData = JSON.parse(
      window.localStorage.getItem(saveGameStorageItemName)
    ) as SavedData;
    const field = savedData.fields;
    const found = new Set<string>(savedData.found);

    game.load(field, found);
  }

  function exportSave() {
    const savedData = window.localStorage.getItem(saveGameStorageItemName);
    saveInput.value = btoa(savedData);
  }

  function importSave() {
    const savedData = saveInput.value;
    if (!savedData) return;

    window.localStorage.setItem(saveGameStorageItemName, atob(savedData));
    loadGame();
  }

  saveButton.onclick = saveGame;
  loadButton.onclick = loadGame;
  importSaveButton.onclick = importSave;
}
