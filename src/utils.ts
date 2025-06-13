import { Item } from "./data";
import { spriteSize } from "./index";

export const isIntersect = (item: Item, otherItem: Item) => {
  return !(
    item.x + spriteSize <= otherItem.x ||
    otherItem.x + spriteSize < item.x ||
    item.y + spriteSize < otherItem.y ||
    otherItem.y + spriteSize < item.y
  );
};
