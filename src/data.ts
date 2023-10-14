
export const itemToTitle: Record<string, string> = {
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
    "anton_anteater": "Антоша Муравьед",
    "calculator": "Калькулятор",
    "beer": "Пиво",
    "beer_alkofree": "Безалкогольное пиво",
    "minus": "Минус",
    "1230": "12:30",
    "food": "Еда",
    "plain": "Поле",
    "island": "Остров",
    "gay_island": "Гей-Остров",
    "kal": "Кал",
    "hat": "Шапка",
    "ad": "АД",
    "calculator_prince": "Принц-калькулятор",
    "lemon": "Лемон",
    "lemongrass": "Лемограс",
    "minus_lemongrass": "Минус лемонграс",
    "apple": "Яблочко",
    "double_apple": "Двойное яблочко",
    "dust": "Смесь",
    "powered_kal": "Заряженный кал",
    "minus_love": "Минус любовь",
    "love": "Любовь",
    "dm_sad": "Грустный ДМ",
    "dm_happy": "Счастилвый ДМ",
    "evil": "Зло",
    "booblick": "Бублик",
    "underground_parking": "Поздемная парковка",
    "car": "Машина",
    "oval": "Овал",
    "orden": "Орден",
    "ovalolikiy": "Овалоликий",
    "much_money": "Много денег",
    "cross": "Крест",
    "crusader": "Крестоносец",
    "ogr": "Огрызок"
}

const itemToAnimationFrameCount: Record<string, number> = {
    "negative": 4,
    "calculator": 5,
    "powered_kal": 7
}

export const textures: Record<string, HTMLImageElement | HTMLImageElement[]> = {};

for (let item in itemToTitle) {

    if (itemToAnimationFrameCount[item]) {
        const result = [];
        for (let i = 0; i < itemToAnimationFrameCount[item]; i++) {

            const image = new Image();
            image.src = `./images/${item}_${i}.png`
            result.push(image);
        }
    
        textures[item] = result;
    }
    else {
        const image = new Image();
        image.src = `./images/${item}.png`
    
        textures[item] = image;
    }
}

export type Item = {
    x: number,
    y: number,
    id: string,
    isEternal?: boolean,
    startX?: number,
    startY?: number
}

export const initialField: Item[] = [
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

export type Recipie = {
    first: string,
    second: string,
    result: string,
    found?: boolean
}

export const recipies: Recipie[] = [
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
        first: "cigarettes",
        second: "tester",
        result: "anton"
    },
    {
        first: "negative",
        second: "hat",
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
        second: "ad",
        result: "wolfpack_4"
    },
    {
        first: "wolfpack_4",
        second: "evil",
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
    {
        first: "blob",
        second: "money",
        result: "calculator"
    },
    {
        first: "calculator",
        second: "money",
        result: "minus"
    },
    {
        first: "pivko",
        second: "water",
        result: "beer"
    },
    {
        first: "beer",
        second: "minus",
        result: "beer_alkofree"
    },
    {
        first: "work",
        second: "minus",
        result: "1230"
    },
    {
        first: "work",
        second: "1230",
        result: "food"
    },
    {
        first: "forest",
        second: "wind",
        result: "plain"
    },
    {
        first: "plain",
        second: "water",
        result: "island"
    },
    {
        first: "island",
        second: "beer_alkofree",
        result: "gay_island"
    },
    {
        first: "gay_island",
        second: "food",
        result: "kal"
    },
    {
        first: "calculator",
        second: "online_prince",
        result: "calculator_prince"
    },
    {
        first: "calculator_prince",
        second: "portal",
        result: "ad"
    },
    {
        first: "negative",
        second: "wind",
        result: "hat"
    },
    {
        first: "forest",
        second: "food",
        result: "apple"
    },
    {
        first: "island",
        second: "food",
        result: "lemon"
    },
    {
        first: "lemon",
        second: "plain",
        result: "lemongrass"
    },
    {
        first: "lemongrass",
        second: "minus",
        result: "minus_lemongrass"
    },
    {
        first: "apple",
        second: "apple",
        result: "double_apple"
    },
    {
        first: "double_apple",
        second: "minus_lemongrass",
        result: "dust"
    },
    {
        first: "dust",
        second: "kal",
        result: "powered_kal"
    },
    {
        first: "powered_kal",
        second: "dm",
        result: "love"
    },
    {
        first: "love",
        second: "minus",
        result: "minus_love"
    },
    {
        first: "dm",
        second: "beer_alkofree",
        result: "dm_happy"
    },
    {
        first: "minus_love",
        second: "dm_happy",
        result: "dm_sad"
    },
    {
        first: "cross",
        second: "dm_sad",
        result: "crusader"
    },
    {
        first: "money",
        second: "money",
        result: "much_money"
    },
    {
        first: "much_money",
        second: "anton",
        result: "car"
    },
    {
        first: "car",
        second: "anton",
        result: "oval"
    },
    {
        first: "oval",
        second: "anton",
        result: "ovalolikiy"
    },
    {
        first: "ovalolikiy",
        second: "crusader",
        result: "orden"
    },
    {
        first: "orden",
        second: "booblick",
        result: "evil"
    },
    {
        first: "car",
        second: "work",
        result: "underground_parking"
    },
    {
        first: "underground_parking",
        second: "negative",
        result: "booblick"
    },
    {
        first: "minus",
        second: "minus",
        result: "cross"
    },
    {
        first: "anton",
        second: "apple",
        result: "ogr"
    }
];