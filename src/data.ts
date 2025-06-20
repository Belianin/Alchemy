import itemToTitle from "./data/itemToTitle";

const itemToAnimationFrameCount: Record<string, number> = {
  negative: 4,
  calculator: 5,
  powered_kal: 7,
};

export const textures: Record<string, HTMLImageElement | HTMLImageElement[]> =
  {};

for (let item in itemToTitle) {
  if (itemToAnimationFrameCount[item]) {
    const result = [];
    for (let i = 0; i < itemToAnimationFrameCount[item]; i++) {
      const image = new Image();
      image.src = `./images/${item}_${i}.png`;
      result.push(image);
    }

    textures[item] = result;
  } else {
    const image = new Image();
    image.src = `./images/${item}.png`;

    textures[item] = image;
  }
}

export type Item = {
  x: number;
  y: number;
  id: string;
};

export const initialField: Item[] = [
  {
    x: 200,
    y: 368,
    id: "water",
  },
  {
    x: 300,
    y: 368,
    id: "wind",
  },
  {
    x: 400,
    y: 368,
    id: "negative",
  },
  {
    x: 500,
    y: 368,
    id: "work",
  },
];

export type Recipie = {
  first: keyof typeof itemToTitle;
  second: keyof typeof itemToTitle;
  result: keyof typeof itemToTitle;
};

export const recipies: Recipie[] = [
  {
    first: "negative",
    second: "work",
    result: "money",
  },
  {
    first: "wind",
    second: "money",
    result: "tester",
  },
  {
    first: "money",
    second: "house",
    result: "pivko",
  },
  {
    first: "dm",
    second: "water",
    result: "dm_wet",
  },
  {
    first: "dm_wet",
    second: "wind",
    result: "dm_dead",
  },
  {
    first: "food",
    second: "it",
    result: "persimmon",
  },
  {
    first: "blob",
    second: "forest",
    result: "ants",
  },
  {
    first: "persimmon",
    second: "ants",
    result: "persimmon_with_ants",
  },
  {
    first: "wind",
    second: "water",
    result: "forest",
  },
  {
    first: "cigarettes",
    second: "tester",
    result: "anton",
  },
  {
    first: "negative",
    second: "hat",
    result: "dm",
  },
  {
    first: "money",
    second: "pivko",
    result: "cigarettes",
  },
  {
    first: "dm_dead_eight",
    second: "dm_dead_two",
    result: "portal",
  },
  {
    first: "dm_dead",
    second: "dm_dead",
    result: "dm_dead_two",
  },
  {
    first: "dm_dead_two",
    second: "dm_dead_two",
    result: "dm_dead_four",
  },
  {
    first: "dm_dead_four",
    second: "dm_dead_four",
    result: "dm_dead_eight",
  },
  {
    first: "forest",
    second: "negative",
    result: "wolf",
  },
  {
    first: "wolf",
    second: "wolf",
    result: "wolf_two",
  },
  {
    first: "wolf_two",
    second: "wolf_two",
    result: "wolf_four",
  },
  {
    first: "wolf_four",
    second: "dm",
    result: "wolfpack_1",
  },
  {
    first: "wolfpack_1",
    second: "anton_anteater",
    result: "wolfpack_2",
  },
  {
    first: "wolfpack_2",
    second: "il_blob",
    result: "wolfpack_3",
  },
  {
    first: "wolfpack_3",
    second: "ad",
    result: "wolfpack_4",
  },
  {
    first: "dark_fantasy",
    second: "universe",
    result: "victory",
  },
  {
    first: "anton",
    second: "persimmon_with_ants",
    result: "anton_anteater",
  },
  {
    first: "negative",
    second: "money",
    result: "online_prince",
  },
  {
    first: "money",
    second: "it",
    result: "blob",
  },
  {
    first: "blob",
    second: "lobster",
    result: "blobster",
  },
  {
    first: "anton_hunter",
    second: "swamp",
    result: "frog",
  },
  {
    first: "anton_hunter",
    second: "forest",
    result: "duolingo",
  },
  {
    first: "anton_hunter",
    second: "island",
    result: "lobster",
  },
  {
    first: "water",
    second: "frog",
    result: "il",
  },
  {
    first: "negative",
    second: "water",
    result: "hot_sause",
  },
  {
    first: "hot_sause",
    second: "dream",
    result: "nightmare_potion",
  },
  {
    first: "nightmare_potion",
    second: "il",
    result: "il_sleep",
  },
  {
    first: "il",
    second: "it",
    result: "dream",
  },
  {
    first: "il_sleep",
    second: "blobster",
    result: "il_blob",
  },
  {
    first: "blob",
    second: "money",
    result: "calculator",
  },
  {
    first: "calculator",
    second: "money",
    result: "minus",
  },
  {
    first: "pivko",
    second: "water",
    result: "beer",
  },
  {
    first: "beer",
    second: "minus",
    result: "beer_alkofree",
  },
  {
    first: "it",
    second: "minus",
    result: "1230",
  },
  {
    first: "it",
    second: "1230",
    result: "food",
  },
  {
    first: "forest",
    second: "wind",
    result: "plain",
  },
  {
    first: "plain",
    second: "water",
    result: "island",
  },
  {
    first: "island",
    second: "beer_alkofree",
    result: "gay_island",
  },
  {
    first: "gay_island",
    second: "food",
    result: "kal",
  },
  {
    first: "calculator",
    second: "online_prince",
    result: "calculator_prince",
  },
  {
    first: "calculator_prince",
    second: "portal",
    result: "ad",
  },
  {
    first: "negative",
    second: "wind",
    result: "hat",
  },
  {
    first: "forest",
    second: "food",
    result: "apple",
  },
  {
    first: "island",
    second: "food",
    result: "lemon",
  },
  {
    first: "lemon",
    second: "plain",
    result: "lemongrass",
  },
  {
    first: "lemongrass",
    second: "minus",
    result: "minus_lemongrass",
  },
  {
    first: "apple",
    second: "apple",
    result: "double_apple",
  },
  {
    first: "double_apple",
    second: "minus_lemongrass",
    result: "dust",
  },
  {
    first: "dust",
    second: "kal",
    result: "powered_kal",
  },
  {
    first: "powered_kal",
    second: "dm",
    result: "love",
  },
  {
    first: "love",
    second: "minus",
    result: "minus_love",
  },
  {
    first: "dm",
    second: "beer_alkofree",
    result: "dm_happy",
  },
  {
    first: "minus_love",
    second: "dm_happy",
    result: "dm_sad",
  },
  {
    first: "dm_sad",
    second: "armor",
    result: "dm_armored",
  },
  {
    first: "longsword",
    second: "dm_armored",
    result: "dm_swordsman",
  },
  {
    first: "cross",
    second: "dm_swordsman",
    result: "crusader",
  },
  {
    first: "money",
    second: "money",
    result: "much_money",
  },
  {
    first: "much_money",
    second: "anton",
    result: "car",
  },
  {
    first: "car",
    second: "anton",
    result: "oval",
  },
  {
    first: "oval",
    second: "anton",
    result: "ovalolikiy",
  },
  {
    first: "ovalolikiy",
    second: "tire_keeper",
    result: "adventures",
  },
  {
    first: "crusader",
    second: "tire",
    result: "tire_keeper",
  },
  {
    first: "mine",
    second: "work",
    result: "minecraft",
  },
  {
    first: "bublik_phys",
    second: "istambul",
    result: "evil",
  },
  {
    first: "meat_bublik_live_demon",
    second: "booblick",
    result: "bublik_phys",
  },
  {
    first: "car",
    second: "it",
    result: "underground_parking",
  },
  {
    first: "underground_parking",
    second: "negative",
    result: "booblick",
  },
  {
    first: "minus",
    second: "minus",
    result: "cross",
  },
  {
    first: "anton",
    second: "apple",
    result: "ogr",
  },
  {
    first: "police",
    second: "car",
    result: "penalty",
  },
  // BDDHISM
  {
    first: "minus",
    second: "negative",
    result: "positive",
  },
  {
    first: "positive",
    second: "negative",
    result: "balance",
  },
  {
    first: "tulpa",
    second: "tea_goblin",
    result: "universe",
  },
  {
    first: "dm_dead",
    second: "dm_buddha",
    result: "soul",
  },
  {
    first: "balance",
    second: "fingerprint",
    result: "dm_buddha",
  },
  {
    first: "pivko",
    second: "anton",
    result: "police",
  },
  {
    // double
    first: "dm",
    second: "police",
    result: "fingerprint",
  },
  // PERM
  {
    first: "dm_with_tea",
    second: "ears",
    result: "tea_goblin",
  },
  {
    first: "hat",
    second: "island",
    result: "panama",
  },
  {
    first: "panama",
    second: "nagorny",
    result: "perm_pasport",
  },
  {
    first: "kal",
    second: "booblick",
    result: "cup",
  },
  {
    first: "cup",
    second: "water",
    result: "cup_of_water",
  },
  {
    first: "cup_of_tea",
    second: "cup_of_tea",
    result: "cups_of_tea",
  },
  {
    first: "cups_of_tea",
    second: "dm",
    result: "dm_with_tea",
  },
  {
    first: "dm",
    second: "pivko",
    result: "tea",
  },
  {
    first: "tea",
    second: "cup_of_water",
    result: "cup_of_tea",
  },
  {
    first: "mountains",
    second: "pivko",
    result: "nagorny",
  },
  {
    first: "perm_pasport",
    second: "anton",
    result: "ears",
  },
  // {
  //   first: "it",
  //   second: "work",
  //   result: "real_work",
  // },
  {
    first: "house",
    second: "negative",
    result: "stones",
  },
  {
    first: "plain",
    second: "stones",
    result: "mountains",
  },
  // {
  //   first: "dm",
  //   second: "real_work",
  //   result: "hammer",
  // },
  {
    first: "booblick",
    second: "ears",
    result: "booblic_with_ears",
  },
  {
    first: "soul",
    second: "love",
    result: "tulpa",
  },
  {
    first: "pivko",
    second: "pchsp",
    result: "tavern",
  },
  {
    first: "mountains",
    second: "3-in-line",
    result: "mine",
  },
  {
    first: "orden",
    second: "mine",
    result: "castle",
  },
  {
    first: "work",
    second: "car",
    result: "tire",
  },
  {
    first: "penalty",
    second: "money",
    result: "few_money",
  },
  {
    first: "work",
    second: "apple",
    result: "mashed_apple",
  },
  {
    first: "mashed_apple",
    second: "food",
    result: "pie",
  },
  {
    first: "pie",
    second: "cup_of_tea",
    result: "tea_with_pie",
  },
  {
    first: "ears",
    second: "car",
    result: "music",
  },
  {
    first: "music",
    second: "few_money",
    result: "rep",
  },
  {
    first: "rep",
    second: "wolfpack_4",
    result: "rep_people",
  },
  {
    first: "rep_people",
    second: "3-7",
    result: "band",
  },
  {
    first: "band",
    second: "tea_with_pie",
    result: "pchsp",
  },
  {
    first: "calculator",
    second: "dm_dead_four",
    result: "4",
  },
  {
    first: "4",
    second: "cross",
    result: "4+",
  },
  {
    first: "4",
    second: "minus",
    result: "4-",
  },
  {
    first: "4-",
    second: "1",
    result: "3",
  },
  {
    first: "4+",
    second: "3",
    result: "7",
  },
  {
    first: "7",
    second: "7",
    result: "77",
  },
  {
    first: "77",
    second: "7",
    result: "3-7",
  },
  {
    first: "3",
    second: "3",
    result: "33",
  },
  {
    first: "33",
    second: "3",
    result: "3-in-line",
  },
  {
    first: "fantasy",
    second: "evil",
    result: "dark_fantasy",
  },
  {
    first: "tavern",
    second: "castle",
    result: "fantasy",
  },
  {
    first: "blob",
    second: "work",
    result: "1",
  },
  {
    first: "forest",
    second: "work",
    result: "wood",
  },
  {
    first: "wood",
    second: "work",
    result: "table",
  },
  {
    first: "table",
    second: "minecraft",
    result: "boardgame",
  },
  {
    first: "wood",
    second: "plain",
    result: "house",
  },
  {
    first: "house",
    second: "work",
    result: "it",
  },

  {
    first: "spider",
    second: "spider",
    result: "spiders",
  },
  {
    first: "spiders",
    second: "knife",
    result: "spiders_with_knifes",
  },
  {
    first: "spiders_with_knifes",
    second: "table",
    result: "kitchen",
  },
  {
    first: "house",
    second: "kitchen",
    result: "rest",
  },
  {
    first: "iron",
    second: "wood",
    result: "knife",
  },
  {
    first: "mountains",
    second: "work",
    result: "iron",
  },
  {
    first: "anton",
    second: "rest",
    result: "anton_cook",
  },
  {
    first: "anton_cook",
    second: "knife",
    result: "anton_cook_knife",
  },
  {
    first: "dm",
    second: "rest",
    result: "dm_cook",
  },
  {
    first: "band",
    second: "animals",
    result: "band_zveri",
  },
  {
    first: "anton_cook_knife",
    second: "band_zveri",
    result: "meat",
  },
  {
    first: "meat",
    second: "dm_cook",
    result: "meat_bublik",
  },
  {
    first: "ants",
    second: "negative",
    result: "spider",
  },
  {
    first: "bag",
    second: "dm",
    result: "dm_confused",
  },
  {
    first: "boardgame",
    second: "anton",
    result: "bag",
  },
  {
    first: "forest",
    second: "water",
    result: "swamp",
  },
  {
    first: "bag",
    second: "anton",
    result: "anton_traveler",
  },
  {
    first: "anton_traveler",
    second: "knife_damask",
    result: "anton_hunter",
  },
  {
    first: "knife",
    second: "hot_sause",
    result: "knife_damask",
  },
  {
    first: "house",
    second: "house",
    result: "city",
  },
  {
    first: "city",
    second: "car",
    result: "hotel",
  },
  {
    first: "hat",
    second: "water",
    result: "hat_swimming",
  },
  {
    first: "hotel",
    second: "hat_swimming",
    result: "pool",
  },
  {
    first: "dm_confused",
    second: "duolingo",
    result: "dm_polyglot",
  },
  {
    first: "dm_polyglot",
    second: "perm_pasport",
    result: "dm_traveler",
  },
  {
    first: "dm_traveler",
    second: "istambul",
    result: "dm_islam",
  },
  {
    first: "frog",
    second: "lobster",
    result: "water_animals",
  },
  {
    first: "water_animals",
    second: "duolingo",
    result: "animals",
  },
  {
    first: "pool",
    second: "powered_kal",
    result: "kaif",
  },
  {
    first: "kaif",
    second: "negative",
    result: "antikaif",
  },
  {
    first: "meat_bublik",
    second: "soul",
    result: "meat_bublik_live",
  },
  {
    first: "meat_bublik_live",
    second: "antikaif",
    result: "meat_bublik_live_demon",
  },
  {
    first: "much_money",
    second: "dm",
    result: "armor",
  },
  {
    first: "knife",
    second: "iron",
    result: "sword",
  },
  {
    first: "sword",
    second: "iron",
    result: "longsword",
  },
  {
    first: "animals",
    second: "ad",
    result: "rats",
  },
  {
    first: "rats",
    second: "tavern",
    result: "quest",
  },
  {
    first: "quest",
    second: "adventures",
    result: "exp",
  },
  {
    first: "exp",
    second: "duolingo",
    result: "exp_x2",
  },
  {
    first: "exp_x2",
    second: "adventures",
    result: "adventures_pro",
  },
  {
    first: "adventures_pro",
    second: "dm_islam",
    result: "orden",
  },
  {
    first: "moon_and_stars",
    second: "city",
    result: "istambul",
  },
  {
    first: "dream",
    second: "positive",
    result: "moon_and_stars",
  },
];
