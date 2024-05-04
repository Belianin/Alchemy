
export const itemToTitle = {
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
    "il": "Илюша",
    "il_sleep": "Илюша спит",
    "il_blob": "Илюха Блобстер",
    "dream": "Сон",
    "hot_sause": "Острый соус",
    "nightmare_potion": "Зелье кошмаров",
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
    "ogr": "Огрызок",
    // budh
    "balance": "Баланс",
    "positive": "Позитив",
    // perm
    "tea_goblin": "Чайный гоблин",
    "universe": "Вселенная",
    "tulpa": "Тульпа",
    "soul": "Душа",
    "ears": "Уши!",
    "dm_with_tea": "ДМ с чаем",
    "cups_of_tea": "Много чая",
    "cup_of_tea": "Кружка чая",
    "cup_of_water": "Кружка воды",
    "cup": "Кружка",
    "panama": "Панама",
    "perm_pasport": "Паспорт пермяка",
    "tea": "Чай",
    "mountains": "Горы",
    "nagorny": "Нагорный",
    "real_work": "Настоящая работа",
    "stones": "Камни",
    "hammer": "Молоток",
    "booblic_with_ears": 'Бублик с ушами',
    // fantasy,
    "tire": 'Колесо',
    "minecraft": "Майнкрафт",
    "castle": "Замок",
    "tire_keeper": "Хранитель Диска",
    "tavern": "Таверна",
    "mine": "Шахта",
    "buddha": "Будда",
    "fingerprint": "Отпечаток",
    "police": "Полиция",
    "penalty": "Штраф",
    "few_money": "Мало денег",
    "mashed_apple": 'Яблоко всмятку',
    "pie": 'Пирог',
    "tea_with_pie": "Чай с пирогами",
    "music": 'Музыка',
    "rep": "Репбаза",
    "rep_people": "Люди на репбазе",
    "band": "Группа",
    "pchsp": "Настоящая группа",
    "3-7": "Три топора",
    "1": "1",
    "4": "4",
    "4+": "4+",
    "4-": "4-",
    "3": "3",
    "33": "33",
    "7": "7",
    "77": "77",
    "3-in-line": "Три-в-ряд",
    "dark_fantasy": "Тёмное фентези",
    "fantasy": "Фентези",
} as const

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
    id: string
}

export const initialField: Item[] = [
    {
        x: 200,
        y: 400,
        id: "water"
    },
    {
        x: 300,
        y: 400,
        id: "wind"
    },
    {
        x: 400,
        y: 400,
        id: "negative"
    },
    {
        x: 500,
        y: 400,
        id: "work"
    }
]

export type Recipie = {
    first: keyof typeof itemToTitle,
    second: keyof typeof itemToTitle,
    result: keyof typeof itemToTitle
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
        first: "food",
        second: "work",
        result: "persimmon"
    },
    {
        first: "blob",
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
        first: "dark_fantasy",
        second: "universe",
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
        second: "food",
        result: "lobster"
    },
    {
        first: "water",
        second: "frog",
        result: "il"
    },
    {
        first: "negative",
        second: "water",
        result: "hot_sause"
    },
    {
        first: "hot_sause",
        second: "dream",
        result: "nightmare_potion"
    },
    {
        first: "nightmare_potion",
        second: "il",
        result: "il_sleep"
    },
    {
        first: "il",
        second: "work",
        result: "dream"
    },
    {
        first: "il_sleep",
        second: "blobster",
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
        second: "tire_keeper",
        result: "orden"
    },
    {
        first: "crusader",
        second: "tire",
        result: "tire_keeper"
    },
    {
        first: "mine",
        second: "hammer",
        result: "minecraft"
    },
    {
        first: "minecraft",
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
    },
    {
        first: 'police',
        second: 'car',
        result: 'penalty'
    },
    // BDDHISM
    {
        first: "minus",
        second: "negative",
        result: "positive"
    },
    {
        first: "positive",
        second: "negative",
        result: "balance"
    },
    {
        first: "tulpa",
        second: "tea_goblin",
        result: 'universe'
    },
    {
        first: "dm_dead",
        second: "buddha",
        result: "soul"
    },
    {
        first: 'balance',
        second: 'fingerprint',
        result: 'buddha'
    },
    {
        first: 'pivko',
        second: 'anton',
        result: 'police'
    },
    {
        // double
        first: 'dm',
        second: 'police',
        result: 'fingerprint'
    },
    // PERM
    {
        first: "dm_with_tea",
        second: "ears",
        result: "tea_goblin"
    },
    {
        first: "hat",
        second: "island",
        result: "panama"
    },
    {
        first: "panama",
        second: "nagorny",
        result: "perm_pasport"
    },
    {
        first: "kal",
        second: "booblick",
        result: "cup"
    },
    {
        first: "cup",
        second: "water",
        result: "cup_of_water"
    },
    {
        first: "cup_of_tea",
        second: "cup_of_tea",
        result: "cups_of_tea"
    },
    {
        first: "cups_of_tea",
        second: "dm",
        result: "dm_with_tea"
    },
    {
        first: "dm",
        second: "pivko",
        result: "tea"
    },
    {
        first: "tea",
        second: "cup_of_water",
        result: "cup_of_tea"
    },
    {
        first: 'mountains',
        second: 'pivko',
        result: 'nagorny'
    },
    {
        first: 'perm_pasport',
        second: 'anton',
        result: 'ears'
    },
    {
        first: 'work',
        second: 'work',
        result: 'real_work'
    },
    {
        first: 'work',
        second: 'hammer',
        result: 'stones'
    },
    {
        first: 'plain',
        second: 'stones',
        result: 'mountains'
    },
    {
        first: 'dm',
        second: 'real_work',
        result: 'hammer'
    },
    {
        first: 'booblick',
        second: 'ears',
        result: 'booblic_with_ears'
    },
    {
        first: 'soul',
        second: 'love',
        result: 'tulpa'
    },
    {
        first: "pivko",
        second: "pchsp",
        result: 'tavern'
    },
    {
        first: "mountains",
        second: "3-in-line",
        result: 'mine'
    },
    {
        first: 'orden',
        second: 'mine',
        result: 'castle'
    },
    {
        first: 'hammer',
        second: 'car',
        result: 'tire'
    },
    {
        first: 'penalty',
        second: 'money',
        result: 'few_money'
    }, 
    {
        first: 'hammer',
        second: 'apple',
        result: 'mashed_apple'
    },
    {
        first: 'mashed_apple',
        second: 'food',
        result: 'pie'
    },
    {
        first: 'pie',
        second: 'cup_of_tea',
        result: 'tea_with_pie'
    },
    {
        first: 'ears',
        second: 'car',
        result: 'music'
    },
    {
        first: 'music',
        second: 'few_money',
        result: 'rep'
    },
    {
        first: 'rep',
        second: 'wolfpack_4',
        result: 'rep_people'
    },
    {
        first: 'rep_people',
        second: '3-7',
        result: 'band'
    },
    {
        first: 'band',
        second: 'tea_with_pie',
        result: 'pchsp'
    },
    {
        first: 'calculator',
        second: 'dm_dead_four',
        result: '4'
    },
    {
        first: '4',
        second: 'cross',
        result: '4+'
    },
    {
        first: '4',
        second: 'minus',
        result: '4-'
    },
    {
        first: '4-',
        second: '1',
        result: '3'
    },
    {
        first: '4+',
        second: '3',
        result: '7'
    },
    {
        first: '7',
        second: '7',
        result: '77'
    },
    {
        first: '77',
        second: '7',
        result: '3-7'
    },
    {
        first: '3',
        second: '3',
        result: '33'
    },
    {
        first: '33',
        second: '3',
        result: '3-in-line'
    },
    {
        first: 'fantasy',
        second: 'evil',
        result: 'dark_fantasy'
    },
    {
        first: 'tavern',
        second: 'castle',
        result: 'fantasy'
    },
    {
        first: 'blob',
        second: 'hammer',
        result: '1'
    },
];