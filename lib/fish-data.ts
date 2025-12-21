export interface Fish {
    id: string
    name_es: string
    name_en: string
    rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
    icon: string
    description_es: string
    description_en: string
    location: "freshwater" | "saltwater" | "any"
}

export const FISH_DATA: Fish[] = [
    {
        id: "bass",
        name_es: "Percha",
        name_en: "Bass",
        rarity: "common",
        icon: "🐟",
        description_es: "Un pez muy común en ríos y lagos.",
        description_en: "A very common fish found in rivers and lakes.",
        location: "freshwater",
    },
    {
        id: "salmon",
        name_es: "Salmón",
        name_en: "Salmon",
        rarity: "uncommon",
        icon: "🍣",
        description_es: "Conocido por saltar contra la corriente.",
        description_en: "Known for jumping against the current.",
        location: "freshwater",
    },
    {
        id: "clownfish",
        name_es: "Pez Payaso",
        name_en: "Clownfish",
        rarity: "rare",
        icon: "🐠",
        description_es: "Vive entre anémonas en el mar.",
        description_en: "Lives among anemones in the sea.",
        location: "saltwater",
    },
    {
        id: "shark",
        name_es: "Tiburón",
        name_en: "Shark",
        rarity: "epic",
        icon: "🦈",
        description_es: "El depredador definitivo de los océanos.",
        description_en: "The ultimate predator of the oceans.",
        location: "saltwater",
    },
    {
        id: "golden_whale",
        name_es: "Ballena Dorada",
        name_en: "Golden Whale",
        rarity: "legendary",
        icon: "🐋",
        description_es: "Una criatura mítica que brilla bajo el agua.",
        description_en: "A mythical creature that glows underwater.",
        location: "any",
    },
    {
        id: "axolotl",
        name_es: "Ajolote",
        name_en: "Axolotl",
        rarity: "rare",
        icon: "🦄",
        description_es: "Una criatura adorable de aguas dulces.",
        description_en: "An adorable freshwater creature.",
        location: "freshwater",
    },
    {
        id: "octopus",
        name_es: "Pulpo",
        name_en: "Octopus",
        rarity: "uncommon",
        icon: "🐙",
        description_es: "Tiene ocho brazos y mucha inteligencia.",
        description_en: "Has eight arms and lots of intelligence.",
        location: "saltwater",
    },
    {
        id: "crab",
        name_es: "Cangrejo",
        name_en: "Crab",
        rarity: "common",
        icon: "🦀",
        description_es: "Camina de lado por la playa.",
        description_en: "Walks sideways along the beach.",
        location: "saltwater",
    },
]
