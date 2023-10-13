
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
    "anton_anteater": "Антоша Муравьед"
}

export const textures: Record<string, HTMLImageElement> = {};

for (let item in itemToTitle) {

    const image = new Image();
    image.src = `./images/${item}.png`

    textures[item] = image;
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