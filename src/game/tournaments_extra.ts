import type { TournamentDef } from "./tournaments";

// Gerado por assets/gen_tournaments.py — 1 torneio por robo novo.
export const EXTRA_TOURNAMENTS: TournamentDef[] = [
  {
    id: "t_dunecrawler",
    name: "COPA DUNE CRAWLER",
    arena: "dojo",
    element: "AREIA",
    desc: "Circuito de Areia — enfrente DUNE CRAWLER na final e conquiste seu chassi.",
    requiredLevel: 1,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "bioreaper",
            level: 1,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "titanox",
            level: 2,
            trained: 1,
          },
          {
            id: "cryolance",
            level: 2,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — DUNE CRAWLER",
        enemies: [
          {
            id: "nebulon",
            level: 3,
            trained: 2,
          },
          {
            id: "bioreaper",
            level: 3,
            trained: 2,
          },
          {
            id: "bioreaper",
            level: 3,
            trained: 2,
          },
          {
            id: "dunecrawler",
            level: 4,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 900,
      xp: 120,
      robot: "dunecrawler",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 234,
    station: "station_dojo_1",
    x: 309,
    y: 245,
  },
  {
    id: "t_ironsentinel",
    name: "COPA IRON SENTINEL",
    arena: "dojo",
    element: "FERRO",
    desc: "Circuito de Ferro — enfrente IRON SENTINEL na final e conquiste seu chassi.",
    requiredLevel: 1,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "zephyrblade",
            level: 1,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "nullshade",
            level: 2,
            trained: 1,
          },
          {
            id: "zephyrblade",
            level: 2,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — IRON SENTINEL",
        enemies: [
          {
            id: "zephyrblade",
            level: 3,
            trained: 2,
          },
          {
            id: "nullshade",
            level: 3,
            trained: 2,
          },
          {
            id: "dunecrawler",
            level: 3,
            trained: 2,
          },
          {
            id: "ironsentinel",
            level: 4,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 900,
      xp: 120,
      robot: "ironsentinel",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 234,
    station: "station_dojo_3",
    x: 550,
    y: 250,
  },
  {
    id: "t_grimsprocket",
    name: "COPA GRIM SPROCKET",
    arena: "volcano",
    element: "RUINA",
    desc: "Circuito de Ruina — enfrente GRIM SPROCKET na final e conquiste seu chassi.",
    requiredLevel: 2,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "zephyrblade",
            level: 2,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "pyrokaiser",
            level: 3,
            trained: 1,
          },
          {
            id: "stormfang",
            level: 3,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — GRIM SPROCKET",
        enemies: [
          {
            id: "stormfang",
            level: 4,
            trained: 2,
          },
          {
            id: "acidra",
            level: 4,
            trained: 2,
          },
          {
            id: "ironmonk",
            level: 4,
            trained: 2,
          },
          {
            id: "grimsprocket",
            level: 5,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 1585,
      xp: 257,
      robot: "grimsprocket",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 412,
    station: "station_volcano_1",
    x: 848,
    y: 264,
  },
  {
    id: "t_basaltguard",
    name: "COPA BASALT GUARD",
    arena: "volcano",
    element: "OBSIDIANA",
    desc: "Circuito de Obsidiana — enfrente BASALT GUARD na final e conquiste seu chassi.",
    requiredLevel: 3,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "terrabyte",
            level: 3,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "grimsprocket",
            level: 4,
            trained: 1,
          },
          {
            id: "grimsprocket",
            level: 4,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — BASALT GUARD",
        enemies: [
          {
            id: "grimsprocket",
            level: 5,
            trained: 2,
          },
          {
            id: "pyrokaiser",
            level: 5,
            trained: 2,
          },
          {
            id: "grimsprocket",
            level: 5,
            trained: 2,
          },
          {
            id: "basaltguard",
            level: 6,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 2310,
      xp: 402,
      robot: "basaltguard",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 601,
    station: "station_volcano_3",
    x: 1171,
    y: 293,
  },
  {
    id: "t_cinderhound",
    name: "COPA CINDERHOUND",
    arena: "volcano",
    element: "BRASA",
    desc: "Circuito de Brasa — enfrente CINDERHOUND na final e conquiste seu chassi.",
    requiredLevel: 3,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "basaltguard",
            level: 3,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "grimsprocket",
            level: 4,
            trained: 1,
          },
          {
            id: "basaltguard",
            level: 4,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — CINDERHOUND",
        enemies: [
          {
            id: "pyrokaiser",
            level: 5,
            trained: 2,
          },
          {
            id: "bioreaper",
            level: 5,
            trained: 2,
          },
          {
            id: "basaltguard",
            level: 5,
            trained: 2,
          },
          {
            id: "cinderhound",
            level: 6,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 2310,
      xp: 402,
      robot: "cinderhound",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 601,
    station: "station_volcano_1",
    x: 1423,
    y: 235,
  },
  {
    id: "t_cloudpiercer",
    name: "COPA CLOUD PIERCER",
    arena: "sky",
    element: "NUVEM",
    desc: "Circuito de Nuvem — enfrente CLOUD PIERCER na final e conquiste seu chassi.",
    requiredLevel: 4,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "chronowake",
            level: 4,
            trained: 0,
          },
          {
            id: "nullshade",
            level: 4,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "quartzine",
            level: 5,
            trained: 1,
          },
          {
            id: "pyrokaiser",
            level: 5,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — CLOUD PIERCER",
        enemies: [
          {
            id: "magnavore",
            level: 6,
            trained: 2,
          },
          {
            id: "ferrovax",
            level: 6,
            trained: 2,
          },
          {
            id: "aurorion",
            level: 6,
            trained: 2,
          },
          {
            id: "cloudpiercer",
            level: 7,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 3055,
      xp: 551,
      robot: "cloudpiercer",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 794,
    station: "station_sky_2",
    x: 1675,
    y: 231,
  },
  {
    id: "t_emberwing",
    name: "COPA EMBERWING",
    arena: "volcano",
    element: "FOGO",
    desc: "Circuito de Fogo — enfrente EMBERWING na final e conquiste seu chassi.",
    requiredLevel: 5,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "dunecrawler",
            level: 5,
            trained: 0,
          },
          {
            id: "cinderhound",
            level: 5,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cinderhound",
            level: 6,
            trained: 1,
          },
          {
            id: "grimsprocket",
            level: 6,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — EMBERWING",
        enemies: [
          {
            id: "cinderhound",
            level: 7,
            trained: 2,
          },
          {
            id: "grimsprocket",
            level: 7,
            trained: 2,
          },
          {
            id: "bioreaper",
            level: 7,
            trained: 2,
          },
          {
            id: "emberwing",
            level: 8,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 3825,
      xp: 705,
      robot: "emberwing",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 994,
    station: "station_volcano_3",
    x: 1899,
    y: 288,
  },
  {
    id: "t_acidbloom",
    name: "COPA ACIDBLOOM",
    arena: "frozen",
    element: "ACIDO",
    desc: "Circuito de Acido — enfrente ACIDBLOOM na final e conquiste seu chassi.",
    requiredLevel: 5,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "terrabyte",
            level: 5,
            trained: 0,
          },
          {
            id: "cloudpiercer",
            level: 5,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "ironsentinel",
            level: 6,
            trained: 1,
          },
          {
            id: "voltronin",
            level: 6,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — ACIDBLOOM",
        enemies: [
          {
            id: "stormfang",
            level: 7,
            trained: 2,
          },
          {
            id: "emberfox",
            level: 7,
            trained: 2,
          },
          {
            id: "ironmonk",
            level: 7,
            trained: 2,
          },
          {
            id: "acidbloom",
            level: 8,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 3825,
      xp: 705,
      robot: "acidbloom",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 994,
    station: "station_frozen_3",
    x: 2224,
    y: 232,
  },
  {
    id: "t_aridfang",
    name: "COPA ARID FANG",
    arena: "dojo",
    element: "DESERTO",
    desc: "Circuito de Deserto — enfrente ARID FANG na final e conquiste seu chassi.",
    requiredLevel: 6,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "terrabyte",
            level: 6,
            trained: 0,
          },
          {
            id: "ironsentinel",
            level: 6,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "dunecrawler",
            level: 7,
            trained: 1,
          },
          {
            id: "dunecrawler",
            level: 7,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — ARID FANG",
        enemies: [
          {
            id: "dunecrawler",
            level: 8,
            trained: 2,
          },
          {
            id: "ironsentinel",
            level: 8,
            trained: 2,
          },
          {
            id: "hydroknight",
            level: 8,
            trained: 2,
          },
          {
            id: "aridfang",
            level: 9,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 4605,
      xp: 861,
      robot: "aridfang",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 1197,
    station: "station_dojo_1",
    x: 2514,
    y: 268,
  },
  {
    id: "t_cometfang",
    name: "COPA COMETFANG",
    arena: "volcano",
    element: "METEORO",
    desc: "Circuito de Meteoro — enfrente COMETFANG na final e conquiste seu chassi.",
    requiredLevel: 7,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cinderhound",
            level: 7,
            trained: 0,
          },
          {
            id: "gravitus",
            level: 7,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "emberwing",
            level: 8,
            trained: 1,
          },
          {
            id: "basaltguard",
            level: 8,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — COMETFANG",
        enemies: [
          {
            id: "acidra",
            level: 9,
            trained: 2,
          },
          {
            id: "basaltguard",
            level: 9,
            trained: 2,
          },
          {
            id: "cinderhound",
            level: 9,
            trained: 2,
          },
          {
            id: "cometfang",
            level: 10,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 5400,
      xp: 1020,
      robot: "cometfang",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 1404,
    station: "station_volcano_1",
    x: 2773,
    y: 230,
  },
  {
    id: "t_toxinvore",
    name: "COPA TOXINVORE",
    arena: "frozen",
    element: "TOXINA",
    desc: "Circuito de Toxina — enfrente TOXINVORE na final e conquiste seu chassi.",
    requiredLevel: 8,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "aurorion",
            level: 8,
            trained: 0,
          },
          {
            id: "acidbloom",
            level: 8,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "voltronin",
            level: 9,
            trained: 1,
          },
          {
            id: "acidbloom",
            level: 9,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — TOXINVORE",
        enemies: [
          {
            id: "acidbloom",
            level: 10,
            trained: 2,
          },
          {
            id: "acidbloom",
            level: 10,
            trained: 2,
          },
          {
            id: "acidbloom",
            level: 10,
            trained: 2,
          },
          {
            id: "toxinvore",
            level: 11,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 6210,
      xp: 1182,
      robot: "toxinvore",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 1615,
    station: "station_frozen_3",
    x: 3013,
    y: 275,
  },
  {
    id: "t_rustpriest",
    name: "COPA RUST PRIEST",
    arena: "volcano",
    element: "FERRUGEM",
    desc: "Circuito de Ferrugem — enfrente RUST PRIEST na final e conquiste seu chassi.",
    requiredLevel: 8,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "ironsentinel",
            level: 8,
            trained: 0,
          },
          {
            id: "cometfang",
            level: 8,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "grimsprocket",
            level: 9,
            trained: 1,
          },
          {
            id: "basaltguard",
            level: 9,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — RUST PRIEST",
        enemies: [
          {
            id: "cometfang",
            level: 10,
            trained: 2,
          },
          {
            id: "toxinvore",
            level: 10,
            trained: 2,
          },
          {
            id: "cometfang",
            level: 10,
            trained: 2,
          },
          {
            id: "rustpriest",
            level: 11,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 6210,
      xp: 1182,
      robot: "rustpriest",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 1615,
    station: "station_volcano_1",
    x: 3254,
    y: 226,
  },
  {
    id: "t_coralshiv",
    name: "COPA CORAL SHIV",
    arena: "frozen",
    element: "RECIFE",
    desc: "Circuito de Recife — enfrente CORAL SHIV na final e conquiste seu chassi.",
    requiredLevel: 9,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "toxinvore",
            level: 9,
            trained: 0,
          },
          {
            id: "ironmonk",
            level: 9,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "acidbloom",
            level: 10,
            trained: 1,
          },
          {
            id: "ironmonk",
            level: 10,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — CORAL SHIV",
        enemies: [
          {
            id: "acidbloom",
            level: 11,
            trained: 2,
          },
          {
            id: "acidbloom",
            level: 11,
            trained: 2,
          },
          {
            id: "emberfox",
            level: 11,
            trained: 2,
          },
          {
            id: "coralshiv",
            level: 12,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 7025,
      xp: 1345,
      robot: "coralshiv",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 1826,
    station: "station_frozen_2",
    x: 3268,
    y: 480,
  },
  {
    id: "t_snowreaver",
    name: "COPA SNOW REAVER",
    arena: "frozen",
    element: "NEVE",
    desc: "Circuito de Neve — enfrente SNOW REAVER na final e conquiste seu chassi.",
    requiredLevel: 10,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "toxinvore",
            level: 10,
            trained: 0,
          },
          {
            id: "nullshade",
            level: 10,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "coralshiv",
            level: 11,
            trained: 1,
          },
          {
            id: "coralshiv",
            level: 11,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — SNOW REAVER",
        enemies: [
          {
            id: "coralshiv",
            level: 12,
            trained: 2,
          },
          {
            id: "toxinvore",
            level: 12,
            trained: 2,
          },
          {
            id: "acidbloom",
            level: 12,
            trained: 2,
          },
          {
            id: "snowreaver",
            level: 13,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 7855,
      xp: 1511,
      robot: "snowreaver",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 2042,
    station: "station_frozen_2",
    x: 3033,
    y: 519,
  },
  {
    id: "t_emberlash",
    name: "COPA EMBERLASH",
    arena: "volcano",
    element: "BRASA",
    desc: "Circuito de Brasa — enfrente EMBERLASH na final e conquiste seu chassi.",
    requiredLevel: 11,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cometfang",
            level: 11,
            trained: 0,
          },
          {
            id: "grimsprocket",
            level: 11,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cinderhound",
            level: 12,
            trained: 1,
          },
          {
            id: "cometfang",
            level: 12,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — EMBERLASH",
        enemies: [
          {
            id: "voltronin",
            level: 13,
            trained: 2,
          },
          {
            id: "emberwing",
            level: 13,
            trained: 2,
          },
          {
            id: "basaltguard",
            level: 13,
            trained: 2,
          },
          {
            id: "emberlash",
            level: 14,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 8690,
      xp: 1678,
      robot: "emberlash",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 2259,
    station: "station_volcano_3",
    x: 2733,
    y: 523,
  },
  {
    id: "t_sporeherald",
    name: "COPA SPORE HERALD",
    arena: "dojo",
    element: "BIO",
    desc: "Circuito de Bio — enfrente SPORE HERALD na final e conquiste seu chassi.",
    requiredLevel: 12,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "ferrovax",
            level: 12,
            trained: 0,
          },
          {
            id: "ironsentinel",
            level: 12,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "ironsentinel",
            level: 13,
            trained: 1,
          },
          {
            id: "snowreaver",
            level: 13,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — SPORE HERALD",
        enemies: [
          {
            id: "dunecrawler",
            level: 14,
            trained: 2,
          },
          {
            id: "aurorion",
            level: 14,
            trained: 2,
          },
          {
            id: "gravitus",
            level: 14,
            trained: 2,
          },
          {
            id: "sporeherald",
            level: 15,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 9530,
      xp: 1846,
      robot: "sporeherald",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 2478,
    station: "station_dojo_1",
    x: 2467,
    y: 476,
  },
  {
    id: "t_mossknight",
    name: "COPA MOSS KNIGHT",
    arena: "dojo",
    element: "SELVA",
    desc: "Circuito de Selva — enfrente MOSS KNIGHT na final e conquiste seu chassi.",
    requiredLevel: 12,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "ironsentinel",
            level: 12,
            trained: 0,
          },
          {
            id: "dunecrawler",
            level: 12,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "bioreaper",
            level: 13,
            trained: 1,
          },
          {
            id: "sporeherald",
            level: 13,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — MOSS KNIGHT",
        enemies: [
          {
            id: "aridfang",
            level: 14,
            trained: 2,
          },
          {
            id: "ferrovax",
            level: 14,
            trained: 2,
          },
          {
            id: "aridfang",
            level: 14,
            trained: 2,
          },
          {
            id: "mossknight",
            level: 15,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 9530,
      xp: 1846,
      robot: "mossknight",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 2478,
    station: "station_dojo_3",
    x: 2250,
    y: 498,
  },
  {
    id: "t_terraforge",
    name: "COPA TERRAFORGE",
    arena: "dojo",
    element: "TERRA",
    desc: "Circuito de Terra — enfrente TERRAFORGE na final e conquiste seu chassi.",
    requiredLevel: 13,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "zephyrblade",
            level: 13,
            trained: 0,
          },
          {
            id: "chronowake",
            level: 13,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "mossknight",
            level: 14,
            trained: 1,
          },
          {
            id: "aridfang",
            level: 14,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — TERRAFORGE",
        enemies: [
          {
            id: "pyrokaiser",
            level: 15,
            trained: 2,
          },
          {
            id: "ironsentinel",
            level: 15,
            trained: 2,
          },
          {
            id: "ironsentinel",
            level: 15,
            trained: 2,
          },
          {
            id: "terraforge",
            level: 16,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 10380,
      xp: 2016,
      robot: "terraforge",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 2699,
    station: "station_dojo_2",
    x: 1938,
    y: 518,
  },
  {
    id: "t_mireclad",
    name: "COPA MIRECLAD",
    arena: "frozen",
    element: "PANTANO",
    desc: "Circuito de Pantano — enfrente MIRECLAD na final e conquiste seu chassi.",
    requiredLevel: 14,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "acidbloom",
            level: 14,
            trained: 0,
          },
          {
            id: "aridfang",
            level: 14,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "coralshiv",
            level: 15,
            trained: 1,
          },
          {
            id: "coralshiv",
            level: 15,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — MIRECLAD",
        enemies: [
          {
            id: "acidbloom",
            level: 16,
            trained: 2,
          },
          {
            id: "mossknight",
            level: 16,
            trained: 2,
          },
          {
            id: "acidbloom",
            level: 16,
            trained: 2,
          },
          {
            id: "mireclad",
            level: 17,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 11235,
      xp: 2187,
      robot: "mireclad",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 2921,
    station: "station_frozen_3",
    x: 1703,
    y: 522,
  },
  {
    id: "t_windshear",
    name: "COPA WINDSHEAR",
    arena: "sky",
    element: "VENTO",
    desc: "Circuito de Vento — enfrente WINDSHEAR na final e conquiste seu chassi.",
    requiredLevel: 15,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "bioreaper",
            level: 15,
            trained: 0,
          },
          {
            id: "cloudpiercer",
            level: 15,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cloudpiercer",
            level: 16,
            trained: 1,
          },
          {
            id: "cloudpiercer",
            level: 16,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — WINDSHEAR",
        enemies: [
          {
            id: "cloudpiercer",
            level: 17,
            trained: 2,
          },
          {
            id: "cloudpiercer",
            level: 17,
            trained: 2,
          },
          {
            id: "cloudpiercer",
            level: 17,
            trained: 2,
          },
          {
            id: "windshear",
            level: 18,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 12100,
      xp: 2360,
      robot: "windshear",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 3146,
    station: "station_sky_1",
    x: 1386,
    y: 546,
  },
  {
    id: "t_amberlock",
    name: "COPA AMBERLOCK",
    arena: "frozen",
    element: "AMBAR",
    desc: "Circuito de Ambar — enfrente AMBERLOCK na final e conquiste seu chassi.",
    requiredLevel: 16,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "coralshiv",
            level: 16,
            trained: 0,
          },
          {
            id: "coralshiv",
            level: 16,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "coralshiv",
            level: 17,
            trained: 1,
          },
          {
            id: "snowreaver",
            level: 17,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — AMBERLOCK",
        enemies: [
          {
            id: "hydroknight",
            level: 18,
            trained: 2,
          },
          {
            id: "snowreaver",
            level: 18,
            trained: 2,
          },
          {
            id: "acidbloom",
            level: 18,
            trained: 2,
          },
          {
            id: "amberlock",
            level: 19,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 12965,
      xp: 2533,
      robot: "amberlock",
      item: "repair_kit",
      itemQty: 3,
    },
    replayGold: 3371,
    station: "station_frozen_1",
    x: 1174,
    y: 507,
  },
  {
    id: "t_gridrunner",
    name: "COPA GRIDRUNNER",
    arena: "orbital",
    element: "NEON",
    desc: "Circuito de Neon — enfrente GRIDRUNNER na final e conquiste seu chassi.",
    requiredLevel: 17,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "pyrokaiser",
            level: 17,
            trained: 0,
          },
          {
            id: "nebulon",
            level: 17,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "chronowake",
            level: 18,
            trained: 1,
          },
          {
            id: "cloudpiercer",
            level: 18,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — GRIDRUNNER",
        enemies: [
          {
            id: "titanox",
            level: 19,
            trained: 2,
          },
          {
            id: "coralshiv",
            level: 19,
            trained: 2,
          },
          {
            id: "zephyrblade",
            level: 19,
            trained: 2,
          },
          {
            id: "gridrunner",
            level: 20,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 13840,
      xp: 2708,
      robot: "gridrunner",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 3598,
    station: "station_orbital_1",
    x: 856,
    y: 525,
  },
  {
    id: "t_quarrybreaker",
    name: "COPA QUARRY BREAKER",
    arena: "dojo",
    element: "TERRA",
    desc: "Circuito de Terra — enfrente QUARRY BREAKER na final e conquiste seu chassi.",
    requiredLevel: 18,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "grimsprocket",
            level: 18,
            trained: 0,
          },
          {
            id: "mossknight",
            level: 18,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "terraforge",
            level: 19,
            trained: 1,
          },
          {
            id: "amberlock",
            level: 19,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — QUARRY BREAKER",
        enemies: [
          {
            id: "voltronin",
            level: 20,
            trained: 2,
          },
          {
            id: "dunecrawler",
            level: 20,
            trained: 2,
          },
          {
            id: "mossknight",
            level: 20,
            trained: 2,
          },
          {
            id: "quarrybreaker",
            level: 21,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 14720,
      xp: 2884,
      robot: "quarrybreaker",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 3827,
    station: "station_dojo_1",
    x: 560,
    y: 534,
  },
  {
    id: "t_glacierjaw",
    name: "COPA GLACIER JAW",
    arena: "frozen",
    element: "GELO",
    desc: "Circuito de Gelo — enfrente GLACIER JAW na final e conquiste seu chassi.",
    requiredLevel: 19,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "coralshiv",
            level: 19,
            trained: 0,
          },
          {
            id: "mireclad",
            level: 19,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "quartzine",
            level: 20,
            trained: 1,
          },
          {
            id: "snowreaver",
            level: 20,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — GLACIER JAW",
        enemies: [
          {
            id: "acidbloom",
            level: 21,
            trained: 2,
          },
          {
            id: "toxinvore",
            level: 21,
            trained: 2,
          },
          {
            id: "amberlock",
            level: 21,
            trained: 2,
          },
          {
            id: "glacierjaw",
            level: 22,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 15605,
      xp: 3061,
      robot: "glacierjaw",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 4057,
    station: "station_frozen_1",
    x: 341,
    y: 534,
  },
  {
    id: "t_prismvector",
    name: "COPA PRISM VECTOR",
    arena: "frozen",
    element: "CRISTAL",
    desc: "Circuito de Cristal — enfrente PRISM VECTOR na final e conquiste seu chassi.",
    requiredLevel: 19,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "amberlock",
            level: 19,
            trained: 0,
          },
          {
            id: "mireclad",
            level: 19,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "rustpriest",
            level: 20,
            trained: 1,
          },
          {
            id: "sporeherald",
            level: 20,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — PRISM VECTOR",
        enemies: [
          {
            id: "amberlock",
            level: 21,
            trained: 2,
          },
          {
            id: "snowreaver",
            level: 21,
            trained: 2,
          },
          {
            id: "terraforge",
            level: 21,
            trained: 2,
          },
          {
            id: "prismvector",
            level: 22,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 15605,
      xp: 3061,
      robot: "prismvector",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 4057,
    station: "station_frozen_1",
    x: 337,
    y: 781,
  },
  {
    id: "t_forgeheart",
    name: "COPA FORGE HEART",
    arena: "volcano",
    element: "FORJA",
    desc: "Circuito de Forja — enfrente FORGE HEART na final e conquiste seu chassi.",
    requiredLevel: 20,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cinderhound",
            level: 20,
            trained: 0,
          },
          {
            id: "pyrokaiser",
            level: 20,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "grimsprocket",
            level: 21,
            trained: 1,
          },
          {
            id: "grimsprocket",
            level: 21,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — FORGE HEART",
        enemies: [
          {
            id: "cometfang",
            level: 22,
            trained: 2,
          },
          {
            id: "basaltguard",
            level: 22,
            trained: 2,
          },
          {
            id: "grimsprocket",
            level: 22,
            trained: 2,
          },
          {
            id: "forgeheart",
            level: 23,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 16490,
      xp: 3238,
      robot: "forgeheart",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 4287,
    station: "station_volcano_2",
    x: 580,
    y: 794,
  },
  {
    id: "t_cosmoveil",
    name: "COPA COSMOVEIL",
    arena: "orbital",
    element: "COSMICO",
    desc: "Circuito de Cosmico — enfrente COSMOVEIL na final e conquiste seu chassi.",
    requiredLevel: 21,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "sporeherald",
            level: 21,
            trained: 0,
          },
          {
            id: "stormfang",
            level: 21,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "emberlash",
            level: 22,
            trained: 1,
          },
          {
            id: "ironmonk",
            level: 22,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — COSMOVEIL",
        enemies: [
          {
            id: "gridrunner",
            level: 23,
            trained: 2,
          },
          {
            id: "gridrunner",
            level: 23,
            trained: 2,
          },
          {
            id: "gridrunner",
            level: 23,
            trained: 2,
          },
          {
            id: "cosmoveil",
            level: 24,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 17385,
      xp: 3417,
      robot: "cosmoveil",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 4520,
    station: "station_orbital_2",
    x: 837,
    y: 799,
  },
  {
    id: "t_bonemarshal",
    name: "COPA BONE MARSHAL",
    arena: "dojo",
    element: "OSSO",
    desc: "Circuito de Osso — enfrente BONE MARSHAL na final e conquiste seu chassi.",
    requiredLevel: 22,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "dunecrawler",
            level: 22,
            trained: 0,
          },
          {
            id: "stormfang",
            level: 22,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "ironsentinel",
            level: 23,
            trained: 1,
          },
          {
            id: "terraforge",
            level: 23,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — BONE MARSHAL",
        enemies: [
          {
            id: "aridfang",
            level: 24,
            trained: 2,
          },
          {
            id: "ironsentinel",
            level: 24,
            trained: 2,
          },
          {
            id: "mossknight",
            level: 24,
            trained: 2,
          },
          {
            id: "bonemarshal",
            level: 25,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 18280,
      xp: 3596,
      robot: "bonemarshal",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 4753,
    station: "station_dojo_2",
    x: 1114,
    y: 761,
  },
  {
    id: "t_neondrifter",
    name: "COPA NEON DRIFTER",
    arena: "orbital",
    element: "NEON",
    desc: "Circuito de Neon — enfrente NEON DRIFTER na final e conquiste seu chassi.",
    requiredLevel: 23,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cosmoveil",
            level: 23,
            trained: 0,
          },
          {
            id: "acidra",
            level: 23,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "gridrunner",
            level: 24,
            trained: 1,
          },
          {
            id: "chronowake",
            level: 24,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — NEON DRIFTER",
        enemies: [
          {
            id: "cosmoveil",
            level: 25,
            trained: 2,
          },
          {
            id: "coralshiv",
            level: 25,
            trained: 2,
          },
          {
            id: "stormfang",
            level: 25,
            trained: 2,
          },
          {
            id: "neondrifter",
            level: 26,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 19180,
      xp: 3776,
      robot: "neondrifter",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 4987,
    station: "station_orbital_2",
    x: 1400,
    y: 758,
  },
  {
    id: "t_vulcanargo",
    name: "COPA VULCAN ARGO",
    arena: "volcano",
    element: "VULCAO",
    desc: "Circuito de Vulcao — enfrente VULCAN ARGO na final e conquiste seu chassi.",
    requiredLevel: 24,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "aridfang",
            level: 24,
            trained: 0,
          },
          {
            id: "emberwing",
            level: 24,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "forgeheart",
            level: 25,
            trained: 1,
          },
          {
            id: "forgeheart",
            level: 25,
            trained: 1,
          },
        ],
      },
      {
        name: "FINAL — VULCAN ARGO",
        enemies: [
          {
            id: "emberwing",
            level: 26,
            trained: 2,
          },
          {
            id: "cometfang",
            level: 26,
            trained: 2,
          },
          {
            id: "ferrovax",
            level: 26,
            trained: 2,
          },
          {
            id: "vulcanargo",
            level: 27,
            trained: 3,
          },
        ],
      },
    ],
    reward: {
      gold: 20085,
      xp: 3957,
      robot: "vulcanargo",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 5222,
    station: "station_volcano_3",
    x: 1682,
    y: 757,
  },
  {
    id: "t_hailstriker",
    name: "COPA HAILSTRIKER",
    arena: "frozen",
    element: "NEVE",
    desc: "Circuito de Neve — enfrente HAILSTRIKER na final e conquiste seu chassi.",
    requiredLevel: 25,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "mireclad",
            level: 25,
            trained: 0,
          },
          {
            id: "quarrybreaker",
            level: 25,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "prismvector",
            level: 26,
            trained: 1,
          },
          {
            id: "prismvector",
            level: 26,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "toxinvore",
            level: 27,
            trained: 2,
          },
          {
            id: "gridrunner",
            level: 27,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — HAILSTRIKER",
        enemies: [
          {
            id: "emberwing",
            level: 28,
            trained: 3,
          },
          {
            id: "coralshiv",
            level: 28,
            trained: 3,
          },
          {
            id: "prismvector",
            level: 28,
            trained: 3,
          },
          {
            id: "hailstriker",
            level: 29,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 20995,
      xp: 4139,
      robot: "hailstriker",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 5459,
    station: "station_frozen_2",
    x: 1952,
    y: 754,
  },
  {
    id: "t_heliondriver",
    name: "COPA HELION DRIVER",
    arena: "sky",
    element: "SOL",
    desc: "Circuito de Sol — enfrente HELION DRIVER na final e conquiste seu chassi.",
    requiredLevel: 26,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "windshear",
            level: 26,
            trained: 0,
          },
          {
            id: "windshear",
            level: 26,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cloudpiercer",
            level: 27,
            trained: 1,
          },
          {
            id: "windshear",
            level: 27,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "windshear",
            level: 28,
            trained: 2,
          },
          {
            id: "windshear",
            level: 28,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — HELION DRIVER",
        enemies: [
          {
            id: "neondrifter",
            level: 29,
            trained: 3,
          },
          {
            id: "cinderhound",
            level: 29,
            trained: 3,
          },
          {
            id: "windshear",
            level: 29,
            trained: 3,
          },
          {
            id: "heliondriver",
            level: 30,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 21910,
      xp: 4322,
      robot: "heliondriver",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 5697,
    station: "station_sky_3",
    x: 2200,
    y: 741,
  },
  {
    id: "t_sandwyrm",
    name: "COPA SANDWYRM",
    arena: "dojo",
    element: "AREIA",
    desc: "Circuito de Areia — enfrente SANDWYRM na final e conquiste seu chassi.",
    requiredLevel: 27,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "ironsentinel",
            level: 27,
            trained: 0,
          },
          {
            id: "mossknight",
            level: 27,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "ironsentinel",
            level: 28,
            trained: 1,
          },
          {
            id: "ironsentinel",
            level: 28,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "mossknight",
            level: 29,
            trained: 2,
          },
          {
            id: "terraforge",
            level: 29,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — SANDWYRM",
        enemies: [
          {
            id: "hydroknight",
            level: 30,
            trained: 3,
          },
          {
            id: "aridfang",
            level: 30,
            trained: 3,
          },
          {
            id: "quarrybreaker",
            level: 30,
            trained: 3,
          },
          {
            id: "sandwyrm",
            level: 31,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 22825,
      xp: 4505,
      robot: "sandwyrm",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 5934,
    station: "station_dojo_2",
    x: 2456,
    y: 740,
  },
  {
    id: "t_bogtyrant",
    name: "COPA BOG TYRANT",
    arena: "frozen",
    element: "PANTANO",
    desc: "Circuito de Pantano — enfrente BOG TYRANT na final e conquiste seu chassi.",
    requiredLevel: 28,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "glacierjaw",
            level: 28,
            trained: 0,
          },
          {
            id: "glacierjaw",
            level: 28,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "mireclad",
            level: 29,
            trained: 1,
          },
          {
            id: "cloudpiercer",
            level: 29,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "amberlock",
            level: 30,
            trained: 2,
          },
          {
            id: "prismvector",
            level: 30,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — BOG TYRANT",
        enemies: [
          {
            id: "mireclad",
            level: 31,
            trained: 3,
          },
          {
            id: "snowreaver",
            level: 31,
            trained: 3,
          },
          {
            id: "acidbloom",
            level: 31,
            trained: 3,
          },
          {
            id: "bogtyrant",
            level: 32,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 23745,
      xp: 4689,
      robot: "bogtyrant",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 6174,
    station: "station_frozen_2",
    x: 2753,
    y: 787,
  },
  {
    id: "t_biolattice",
    name: "COPA BIOLATTICE",
    arena: "dojo",
    element: "BIO",
    desc: "Circuito de Bio — enfrente BIOLATTICE na final e conquiste seu chassi.",
    requiredLevel: 29,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "mossknight",
            level: 29,
            trained: 0,
          },
          {
            id: "quarrybreaker",
            level: 29,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "terraforge",
            level: 30,
            trained: 1,
          },
          {
            id: "terraforge",
            level: 30,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "aridfang",
            level: 31,
            trained: 2,
          },
          {
            id: "prismvector",
            level: 31,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — BIOLATTICE",
        enemies: [
          {
            id: "aridfang",
            level: 32,
            trained: 3,
          },
          {
            id: "hailstriker",
            level: 32,
            trained: 3,
          },
          {
            id: "ironsentinel",
            level: 32,
            trained: 3,
          },
          {
            id: "biolattice",
            level: 33,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 24665,
      xp: 4873,
      robot: "biolattice",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 6413,
    station: "station_dojo_3",
    x: 3057,
    y: 764,
  },
  {
    id: "t_vireoblade",
    name: "COPA VIREO BLADE",
    arena: "dojo",
    element: "JADE",
    desc: "Circuito de Jade — enfrente VIREO BLADE na final e conquiste seu chassi.",
    requiredLevel: 30,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "bonemarshal",
            level: 30,
            trained: 0,
          },
          {
            id: "mossknight",
            level: 30,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "dunecrawler",
            level: 31,
            trained: 1,
          },
          {
            id: "cinderhound",
            level: 31,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "dunecrawler",
            level: 32,
            trained: 2,
          },
          {
            id: "terraforge",
            level: 32,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — VIREO BLADE",
        enemies: [
          {
            id: "sandwyrm",
            level: 33,
            trained: 3,
          },
          {
            id: "bonemarshal",
            level: 33,
            trained: 3,
          },
          {
            id: "dunecrawler",
            level: 33,
            trained: 3,
          },
          {
            id: "vireoblade",
            level: 34,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 25590,
      xp: 5058,
      robot: "vireoblade",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 6653,
    station: "station_dojo_1",
    x: 3322,
    y: 765,
  },
  {
    id: "t_solstitia",
    name: "COPA SOLSTITIA",
    arena: "orbital",
    element: "ECLIPSE",
    desc: "Circuito de Eclipse — enfrente SOLSTITIA na final e conquiste seu chassi.",
    requiredLevel: 31,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "gridrunner",
            level: 31,
            trained: 0,
          },
          {
            id: "gridrunner",
            level: 31,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cosmoveil",
            level: 32,
            trained: 1,
          },
          {
            id: "gridrunner",
            level: 32,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "gridrunner",
            level: 33,
            trained: 2,
          },
          {
            id: "gridrunner",
            level: 33,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — SOLSTITIA",
        enemies: [
          {
            id: "gridrunner",
            level: 34,
            trained: 3,
          },
          {
            id: "gridrunner",
            level: 34,
            trained: 3,
          },
          {
            id: "neondrifter",
            level: 34,
            trained: 3,
          },
          {
            id: "solstitia",
            level: 35,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 26520,
      xp: 5244,
      robot: "solstitia",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 6895,
    station: "station_orbital_3",
    x: 3248,
    y: 1048,
  },
  {
    id: "t_ruinwarden",
    name: "COPA RUIN WARDEN",
    arena: "volcano",
    element: "RUINA",
    desc: "Circuito de Ruina — enfrente RUIN WARDEN na final e conquiste seu chassi.",
    requiredLevel: 32,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "forgeheart",
            level: 32,
            trained: 0,
          },
          {
            id: "rustpriest",
            level: 32,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "toxinvore",
            level: 33,
            trained: 1,
          },
          {
            id: "basaltguard",
            level: 33,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "cinderhound",
            level: 34,
            trained: 2,
          },
          {
            id: "cometfang",
            level: 34,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — RUIN WARDEN",
        enemies: [
          {
            id: "cinderhound",
            level: 35,
            trained: 3,
          },
          {
            id: "rustpriest",
            level: 35,
            trained: 3,
          },
          {
            id: "vulcanargo",
            level: 35,
            trained: 3,
          },
          {
            id: "ruinwarden",
            level: 36,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 27455,
      xp: 5431,
      robot: "ruinwarden",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 7138,
    station: "station_volcano_3",
    x: 2978,
    y: 996,
  },
  {
    id: "t_lunargeist",
    name: "COPA LUNAR GEIST",
    arena: "orbital",
    element: "LUA",
    desc: "Circuito de Lua — enfrente LUNAR GEIST na final e conquiste seu chassi.",
    requiredLevel: 33,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "gridrunner",
            level: 33,
            trained: 0,
          },
          {
            id: "solstitia",
            level: 33,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "neondrifter",
            level: 34,
            trained: 1,
          },
          {
            id: "solstitia",
            level: 34,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "solstitia",
            level: 35,
            trained: 2,
          },
          {
            id: "neondrifter",
            level: 35,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — LUNAR GEIST",
        enemies: [
          {
            id: "solstitia",
            level: 36,
            trained: 3,
          },
          {
            id: "neondrifter",
            level: 36,
            trained: 3,
          },
          {
            id: "gridrunner",
            level: 36,
            trained: 3,
          },
          {
            id: "lunargeist",
            level: 37,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 28390,
      xp: 5618,
      robot: "lunargeist",
      item: "energy_cell",
      itemQty: 3,
    },
    replayGold: 7381,
    station: "station_orbital_1",
    x: 2747,
    y: 977,
  },
  {
    id: "t_resinjudge",
    name: "COPA RESIN JUDGE",
    arena: "frozen",
    element: "AMBAR",
    desc: "Circuito de Ambar — enfrente RESIN JUDGE na final e conquiste seu chassi.",
    requiredLevel: 34,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "emberfox",
            level: 34,
            trained: 0,
          },
          {
            id: "sporeherald",
            level: 34,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cryolance",
            level: 35,
            trained: 1,
          },
          {
            id: "neondrifter",
            level: 35,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "prismvector",
            level: 36,
            trained: 2,
          },
          {
            id: "vulcanargo",
            level: 36,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — RESIN JUDGE",
        enemies: [
          {
            id: "bogtyrant",
            level: 37,
            trained: 3,
          },
          {
            id: "snowreaver",
            level: 37,
            trained: 3,
          },
          {
            id: "toxinvore",
            level: 37,
            trained: 3,
          },
          {
            id: "resinjudge",
            level: 38,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 29325,
      xp: 5805,
      robot: "resinjudge",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 7624,
    station: "station_frozen_1",
    x: 2455,
    y: 970,
  },
  {
    id: "t_voidcaller",
    name: "COPA VOIDCALLER",
    arena: "orbital",
    element: "VAZIO",
    desc: "Circuito de Vazio — enfrente VOIDCALLER na final e conquiste seu chassi.",
    requiredLevel: 35,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "gridrunner",
            level: 35,
            trained: 0,
          },
          {
            id: "cosmoveil",
            level: 35,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "lunargeist",
            level: 36,
            trained: 1,
          },
          {
            id: "ironsentinel",
            level: 36,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "neondrifter",
            level: 37,
            trained: 2,
          },
          {
            id: "amberlock",
            level: 37,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — VOIDCALLER",
        enemies: [
          {
            id: "cosmoveil",
            level: 38,
            trained: 3,
          },
          {
            id: "gridrunner",
            level: 38,
            trained: 3,
          },
          {
            id: "lunargeist",
            level: 38,
            trained: 3,
          },
          {
            id: "voidcaller",
            level: 39,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 30265,
      xp: 5993,
      robot: "voidcaller",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 7869,
    station: "station_orbital_2",
    x: 2223,
    y: 1027,
  },
  {
    id: "t_ringwarden",
    name: "COPA RING WARDEN",
    arena: "orbital",
    element: "ANEL",
    desc: "Circuito de Anel — enfrente RING WARDEN na final e conquiste seu chassi.",
    requiredLevel: 36,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cosmoveil",
            level: 36,
            trained: 0,
          },
          {
            id: "voidcaller",
            level: 36,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "ironmonk",
            level: 37,
            trained: 1,
          },
          {
            id: "voltronin",
            level: 37,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "terrabyte",
            level: 38,
            trained: 2,
          },
          {
            id: "ruinwarden",
            level: 38,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — RING WARDEN",
        enemies: [
          {
            id: "emberfox",
            level: 39,
            trained: 3,
          },
          {
            id: "coralshiv",
            level: 39,
            trained: 3,
          },
          {
            id: "cosmoveil",
            level: 39,
            trained: 3,
          },
          {
            id: "ringwarden",
            level: 40,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 31210,
      xp: 6182,
      robot: "ringwarden",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 8115,
    station: "station_orbital_3",
    x: 1903,
    y: 1049,
  },
  {
    id: "t_tundrakeeper",
    name: "COPA TUNDRA KEEPER",
    arena: "frozen",
    element: "TUNDRA",
    desc: "Circuito de Tundra — enfrente TUNDRA KEEPER na final e conquiste seu chassi.",
    requiredLevel: 37,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "amberlock",
            level: 37,
            trained: 0,
          },
          {
            id: "prismvector",
            level: 37,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "resinjudge",
            level: 38,
            trained: 1,
          },
          {
            id: "toxinvore",
            level: 38,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "snowreaver",
            level: 39,
            trained: 2,
          },
          {
            id: "coralshiv",
            level: 39,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — TUNDRA KEEPER",
        enemies: [
          {
            id: "acidbloom",
            level: 40,
            trained: 3,
          },
          {
            id: "bogtyrant",
            level: 40,
            trained: 3,
          },
          {
            id: "snowreaver",
            level: 40,
            trained: 3,
          },
          {
            id: "tundrakeeper",
            level: 41,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 32155,
      xp: 6371,
      robot: "tundrakeeper",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 8360,
    station: "station_frozen_2",
    x: 1681,
    y: 1049,
  },
  {
    id: "t_stratoveil",
    name: "COPA STRATOVEIL",
    arena: "sky",
    element: "NUVEM",
    desc: "Circuito de Nuvem — enfrente STRATOVEIL na final e conquiste seu chassi.",
    requiredLevel: 38,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "voidcaller",
            level: 38,
            trained: 0,
          },
          {
            id: "heliondriver",
            level: 38,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "windshear",
            level: 39,
            trained: 1,
          },
          {
            id: "cloudpiercer",
            level: 39,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "cloudpiercer",
            level: 40,
            trained: 2,
          },
          {
            id: "windshear",
            level: 40,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — STRATOVEIL",
        enemies: [
          {
            id: "heliondriver",
            level: 41,
            trained: 3,
          },
          {
            id: "ruinwarden",
            level: 41,
            trained: 3,
          },
          {
            id: "heliondriver",
            level: 41,
            trained: 3,
          },
          {
            id: "stratoveil",
            level: 42,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 33105,
      xp: 6561,
      robot: "stratoveil",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 8607,
    station: "station_sky_3",
    x: 1368,
    y: 1031,
  },
  {
    id: "t_venomcarapace",
    name: "COPA VENOM CARAPACE",
    arena: "frozen",
    element: "TOXINA",
    desc: "Circuito de Toxina — enfrente VENOM CARAPACE na final e conquiste seu chassi.",
    requiredLevel: 39,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "mossknight",
            level: 39,
            trained: 0,
          },
          {
            id: "hailstriker",
            level: 39,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "acidbloom",
            level: 40,
            trained: 1,
          },
          {
            id: "amberlock",
            level: 40,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "coralshiv",
            level: 41,
            trained: 2,
          },
          {
            id: "cloudpiercer",
            level: 41,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — VENOM CARAPACE",
        enemies: [
          {
            id: "acidbloom",
            level: 42,
            trained: 3,
          },
          {
            id: "tundrakeeper",
            level: 42,
            trained: 3,
          },
          {
            id: "glacierjaw",
            level: 42,
            trained: 3,
          },
          {
            id: "venomcarapace",
            level: 43,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 34055,
      xp: 6751,
      robot: "venomcarapace",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 8854,
    station: "station_frozen_3",
    x: 1173,
    y: 986,
  },
  {
    id: "t_hexweaver",
    name: "COPA HEXWEAVER",
    arena: "orbital",
    element: "GRAFENO",
    desc: "Circuito de Grafeno — enfrente HEXWEAVER na final e conquiste seu chassi.",
    requiredLevel: 40,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "gridrunner",
            level: 40,
            trained: 0,
          },
          {
            id: "cosmoveil",
            level: 40,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "ringwarden",
            level: 41,
            trained: 1,
          },
          {
            id: "gridrunner",
            level: 41,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "ringwarden",
            level: 42,
            trained: 2,
          },
          {
            id: "stratoveil",
            level: 42,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — HEXWEAVER",
        enemies: [
          {
            id: "cosmoveil",
            level: 43,
            trained: 3,
          },
          {
            id: "heliondriver",
            level: 43,
            trained: 3,
          },
          {
            id: "mossknight",
            level: 43,
            trained: 3,
          },
          {
            id: "hexweaver",
            level: 44,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 35005,
      xp: 6941,
      robot: "hexweaver",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 9101,
    station: "station_orbital_2",
    x: 835,
    y: 1003,
  },
  {
    id: "t_noxfeather",
    name: "COPA NOXFEATHER",
    arena: "dojo",
    element: "SOMBRA",
    desc: "Circuito de Sombra — enfrente NOXFEATHER na final e conquiste seu chassi.",
    requiredLevel: 41,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "ironsentinel",
            level: 41,
            trained: 0,
          },
          {
            id: "zephyrblade",
            level: 41,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "bonemarshal",
            level: 42,
            trained: 1,
          },
          {
            id: "aridfang",
            level: 42,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "vireoblade",
            level: 43,
            trained: 2,
          },
          {
            id: "neondrifter",
            level: 43,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — NOXFEATHER",
        enemies: [
          {
            id: "quarrybreaker",
            level: 44,
            trained: 3,
          },
          {
            id: "bonemarshal",
            level: 44,
            trained: 3,
          },
          {
            id: "sandwyrm",
            level: 44,
            trained: 3,
          },
          {
            id: "noxfeather",
            level: 45,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 35965,
      xp: 7133,
      robot: "noxfeather",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 9351,
    station: "station_dojo_3",
    x: 616,
    y: 1011,
  },
  {
    id: "t_meteorpunch",
    name: "COPA METEOR PUNCH",
    arena: "volcano",
    element: "METEORO",
    desc: "Circuito de Meteoro — enfrente METEOR PUNCH na final e conquiste seu chassi.",
    requiredLevel: 42,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cinderhound",
            level: 42,
            trained: 0,
          },
          {
            id: "cryolance",
            level: 42,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "bogtyrant",
            level: 43,
            trained: 1,
          },
          {
            id: "forgeheart",
            level: 43,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "emberlash",
            level: 44,
            trained: 2,
          },
          {
            id: "hailstriker",
            level: 44,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — METEOR PUNCH",
        enemies: [
          {
            id: "forgeheart",
            level: 45,
            trained: 3,
          },
          {
            id: "forgeheart",
            level: 45,
            trained: 3,
          },
          {
            id: "ruinwarden",
            level: 45,
            trained: 3,
          },
          {
            id: "meteorpunch",
            level: 46,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 36920,
      xp: 7324,
      robot: "meteorpunch",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 9599,
    station: "station_volcano_2",
    x: 322,
    y: 1010,
  },
  {
    id: "t_aquabastion",
    name: "COPA AQUA BASTION",
    arena: "frozen",
    element: "AGUA",
    desc: "Circuito de Agua — enfrente AQUA BASTION na final e conquiste seu chassi.",
    requiredLevel: 43,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cometfang",
            level: 43,
            trained: 0,
          },
          {
            id: "emberlash",
            level: 43,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "glacierjaw",
            level: 44,
            trained: 1,
          },
          {
            id: "acidbloom",
            level: 44,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "toxinvore",
            level: 45,
            trained: 2,
          },
          {
            id: "sandwyrm",
            level: 45,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — AQUA BASTION",
        enemies: [
          {
            id: "venomcarapace",
            level: 46,
            trained: 3,
          },
          {
            id: "prismvector",
            level: 46,
            trained: 3,
          },
          {
            id: "ringwarden",
            level: 46,
            trained: 3,
          },
          {
            id: "aquabastion",
            level: 47,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 37880,
      xp: 7516,
      robot: "aquabastion",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 9849,
    station: "station_frozen_2",
    x: 296,
    y: 1296,
  },
  {
    id: "t_scrapbaron",
    name: "COPA SCRAP BARON",
    arena: "volcano",
    element: "FERRUGEM",
    desc: "Circuito de Ferrugem — enfrente SCRAP BARON na final e conquiste seu chassi.",
    requiredLevel: 44,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cometfang",
            level: 44,
            trained: 0,
          },
          {
            id: "vulcanargo",
            level: 44,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "biolattice",
            level: 45,
            trained: 1,
          },
          {
            id: "forgeheart",
            level: 45,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "quarrybreaker",
            level: 46,
            trained: 2,
          },
          {
            id: "emberlash",
            level: 46,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — SCRAP BARON",
        enemies: [
          {
            id: "cinderhound",
            level: 47,
            trained: 3,
          },
          {
            id: "ironmonk",
            level: 47,
            trained: 3,
          },
          {
            id: "emberwing",
            level: 47,
            trained: 3,
          },
          {
            id: "scrapbaron",
            level: 48,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 38845,
      xp: 7709,
      robot: "scrapbaron",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 10100,
    station: "station_volcano_3",
    x: 626,
    y: 1225,
  },
  {
    id: "t_junglemaw",
    name: "COPA JUNGLE MAW",
    arena: "dojo",
    element: "SELVA",
    desc: "Circuito de Selva — enfrente JUNGLE MAW na final e conquiste seu chassi.",
    requiredLevel: 45,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "aridfang",
            level: 45,
            trained: 0,
          },
          {
            id: "quartzine",
            level: 45,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "terraforge",
            level: 46,
            trained: 1,
          },
          {
            id: "noxfeather",
            level: 46,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "dunecrawler",
            level: 47,
            trained: 2,
          },
          {
            id: "hailstriker",
            level: 47,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — JUNGLE MAW",
        enemies: [
          {
            id: "dunecrawler",
            level: 48,
            trained: 3,
          },
          {
            id: "terraforge",
            level: 48,
            trained: 3,
          },
          {
            id: "emberfox",
            level: 48,
            trained: 3,
          },
          {
            id: "junglemaw",
            level: 49,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 39810,
      xp: 7902,
      robot: "junglemaw",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 10351,
    station: "station_dojo_1",
    x: 820,
    y: 1255,
  },
  {
    id: "t_cindercrown",
    name: "COPA CINDER CROWN",
    arena: "volcano",
    element: "CINZAS",
    desc: "Circuito de Cinzas — enfrente CINDER CROWN na final e conquiste seu chassi.",
    requiredLevel: 46,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "emberlash",
            level: 46,
            trained: 0,
          },
          {
            id: "basaltguard",
            level: 46,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "ruinwarden",
            level: 47,
            trained: 1,
          },
          {
            id: "meteorpunch",
            level: 47,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "emberwing",
            level: 48,
            trained: 2,
          },
          {
            id: "cinderhound",
            level: 48,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — CINDER CROWN",
        enemies: [
          {
            id: "basaltguard",
            level: 49,
            trained: 3,
          },
          {
            id: "cometfang",
            level: 49,
            trained: 3,
          },
          {
            id: "windshear",
            level: 49,
            trained: 3,
          },
          {
            id: "cindercrown",
            level: 50,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 40775,
      xp: 8095,
      robot: "cindercrown",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 10602,
    station: "station_volcano_1",
    x: 1171,
    y: 1270,
  },
  {
    id: "t_gloomtide",
    name: "COPA GLOOMTIDE",
    arena: "orbital",
    element: "ABISSO",
    desc: "Circuito de Abisso — enfrente GLOOMTIDE na final e conquiste seu chassi.",
    requiredLevel: 47,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "hexweaver",
            level: 47,
            trained: 0,
          },
          {
            id: "lunargeist",
            level: 47,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cloudpiercer",
            level: 48,
            trained: 1,
          },
          {
            id: "nebulon",
            level: 48,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "voidcaller",
            level: 49,
            trained: 2,
          },
          {
            id: "solstitia",
            level: 49,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — GLOOMTIDE",
        enemies: [
          {
            id: "voidcaller",
            level: 50,
            trained: 3,
          },
          {
            id: "neondrifter",
            level: 50,
            trained: 3,
          },
          {
            id: "ruinwarden",
            level: 50,
            trained: 3,
          },
          {
            id: "gloomtide",
            level: 51,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 41745,
      xp: 8289,
      robot: "gloomtide",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 10854,
    station: "station_orbital_2",
    x: 1395,
    y: 1229,
  },
  {
    id: "t_obsidianfist",
    name: "COPA OBSIDIAN FIST",
    arena: "volcano",
    element: "OBSIDIANA",
    desc: "Circuito de Obsidiana — enfrente OBSIDIAN FIST na final e conquiste seu chassi.",
    requiredLevel: 48,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cometfang",
            level: 48,
            trained: 0,
          },
          {
            id: "aridfang",
            level: 48,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "scrapbaron",
            level: 49,
            trained: 1,
          },
          {
            id: "gloomtide",
            level: 49,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "cryolance",
            level: 50,
            trained: 2,
          },
          {
            id: "stormfang",
            level: 50,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — OBSIDIAN FIST",
        enemies: [
          {
            id: "meteorpunch",
            level: 51,
            trained: 3,
          },
          {
            id: "quartzine",
            level: 51,
            trained: 3,
          },
          {
            id: "vireoblade",
            level: 51,
            trained: 3,
          },
          {
            id: "obsidianfist",
            level: 52,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 42715,
      xp: 8483,
      robot: "obsidianfist",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 11106,
    station: "station_volcano_2",
    x: 1630,
    y: 1248,
  },
  {
    id: "t_lumenblade",
    name: "COPA LUMEN BLADE",
    arena: "sky",
    element: "LUZ",
    desc: "Circuito de Luz — enfrente LUMEN BLADE na final e conquiste seu chassi.",
    requiredLevel: 49,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cosmoveil",
            level: 49,
            trained: 0,
          },
          {
            id: "cloudpiercer",
            level: 49,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "stratoveil",
            level: 50,
            trained: 1,
          },
          {
            id: "stratoveil",
            level: 50,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "grimsprocket",
            level: 51,
            trained: 2,
          },
          {
            id: "stratoveil",
            level: 51,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — LUMEN BLADE",
        enemies: [
          {
            id: "windshear",
            level: 52,
            trained: 3,
          },
          {
            id: "windshear",
            level: 52,
            trained: 3,
          },
          {
            id: "voltronin",
            level: 52,
            trained: 3,
          },
          {
            id: "lumenblade",
            level: 53,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 43690,
      xp: 8678,
      robot: "lumenblade",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 11359,
    station: "station_sky_3",
    x: 1957,
    y: 1298,
  },
  {
    id: "t_gravitide",
    name: "COPA GRAVITIDE",
    arena: "orbital",
    element: "GRAVIDADE",
    desc: "Circuito de Gravidade — enfrente GRAVITIDE na final e conquiste seu chassi.",
    requiredLevel: 50,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "gloomtide",
            level: 50,
            trained: 0,
          },
          {
            id: "gloomtide",
            level: 50,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "hailstriker",
            level: 51,
            trained: 1,
          },
          {
            id: "lunargeist",
            level: 51,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "glacierjaw",
            level: 52,
            trained: 2,
          },
          {
            id: "voidcaller",
            level: 52,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — GRAVITIDE",
        enemies: [
          {
            id: "gridrunner",
            level: 53,
            trained: 3,
          },
          {
            id: "ruinwarden",
            level: 53,
            trained: 3,
          },
          {
            id: "voidcaller",
            level: 53,
            trained: 3,
          },
          {
            id: "gravitide",
            level: 54,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 44665,
      xp: 8873,
      robot: "gravitide",
      item: "shield_chip",
      itemQty: 2,
    },
    replayGold: 11613,
    station: "station_orbital_2",
    x: 2173,
    y: 1269,
  },
  {
    id: "t_nebulaseer",
    name: "COPA NEBULA SEER",
    arena: "orbital",
    element: "NEBULOSA",
    desc: "Circuito de Nebulosa — enfrente NEBULA SEER na final e conquiste seu chassi.",
    requiredLevel: 51,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "scrapbaron",
            level: 51,
            trained: 0,
          },
          {
            id: "gridrunner",
            level: 51,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cosmoveil",
            level: 52,
            trained: 1,
          },
          {
            id: "obsidianfist",
            level: 52,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "tundrakeeper",
            level: 53,
            trained: 2,
          },
          {
            id: "hexweaver",
            level: 53,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — NEBULA SEER",
        enemies: [
          {
            id: "noxfeather",
            level: 54,
            trained: 3,
          },
          {
            id: "gridrunner",
            level: 54,
            trained: 3,
          },
          {
            id: "ringwarden",
            level: 54,
            trained: 3,
          },
          {
            id: "nebulaseer",
            level: 55,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 45640,
      xp: 9068,
      robot: "nebulaseer",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 11866,
    station: "station_orbital_1",
    x: 2519,
    y: 1232,
  },
  {
    id: "t_neutronmaul",
    name: "COPA NEUTRON MAUL",
    arena: "orbital",
    element: "PULSAR",
    desc: "Circuito de Pulsar — enfrente NEUTRON MAUL na final e conquiste seu chassi.",
    requiredLevel: 52,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "lunargeist",
            level: 52,
            trained: 0,
          },
          {
            id: "bonemarshal",
            level: 52,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "gloomtide",
            level: 53,
            trained: 1,
          },
          {
            id: "solstitia",
            level: 53,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "emberlash",
            level: 54,
            trained: 2,
          },
          {
            id: "gridrunner",
            level: 54,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — NEUTRON MAUL",
        enemies: [
          {
            id: "voltronin",
            level: 55,
            trained: 3,
          },
          {
            id: "gridrunner",
            level: 55,
            trained: 3,
          },
          {
            id: "cosmoveil",
            level: 55,
            trained: 3,
          },
          {
            id: "neutronmaul",
            level: 56,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 46620,
      xp: 9264,
      robot: "neutronmaul",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 12121,
    station: "station_orbital_2",
    x: 2785,
    y: 1265,
  },
  {
    id: "t_stormlance",
    name: "COPA STORMLANCE",
    arena: "sky",
    element: "TEMPESTADE",
    desc: "Circuito de Tempestade — enfrente STORMLANCE na final e conquiste seu chassi.",
    requiredLevel: 53,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "toxinvore",
            level: 53,
            trained: 0,
          },
          {
            id: "lumenblade",
            level: 53,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cloudpiercer",
            level: 54,
            trained: 1,
          },
          {
            id: "meteorpunch",
            level: 54,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "stratoveil",
            level: 55,
            trained: 2,
          },
          {
            id: "chronowake",
            level: 55,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — STORMLANCE",
        enemies: [
          {
            id: "gravitus",
            level: 56,
            trained: 3,
          },
          {
            id: "bonemarshal",
            level: 56,
            trained: 3,
          },
          {
            id: "cloudpiercer",
            level: 56,
            trained: 3,
          },
          {
            id: "stormlance",
            level: 57,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 47600,
      xp: 9460,
      robot: "stormlance",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 12376,
    station: "station_sky_2",
    x: 3047,
    y: 1269,
  },
  {
    id: "t_thunderoni",
    name: "COPA THUNDER ONI",
    arena: "sky",
    element: "TROVAO",
    desc: "Circuito de Trovao — enfrente THUNDER ONI na final e conquiste seu chassi.",
    requiredLevel: 54,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "hydroknight",
            level: 54,
            trained: 0,
          },
          {
            id: "stormlance",
            level: 54,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "stratoveil",
            level: 55,
            trained: 1,
          },
          {
            id: "heliondriver",
            level: 55,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "lumenblade",
            level: 56,
            trained: 2,
          },
          {
            id: "stratoveil",
            level: 56,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — THUNDER ONI",
        enemies: [
          {
            id: "stormlance",
            level: 57,
            trained: 3,
          },
          {
            id: "heliondriver",
            level: 57,
            trained: 3,
          },
          {
            id: "sporeherald",
            level: 57,
            trained: 3,
          },
          {
            id: "thunderoni",
            level: 58,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 48580,
      xp: 9656,
      robot: "thunderoni",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 12631,
    station: "station_sky_1",
    x: 3278,
    y: 1243,
  },
  {
    id: "t_shadowfang",
    name: "COPA SHADOWFANG",
    arena: "dojo",
    element: "SOMBRA",
    desc: "Circuito de Sombra — enfrente SHADOWFANG na final e conquiste seu chassi.",
    requiredLevel: 55,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "sporeherald",
            level: 55,
            trained: 0,
          },
          {
            id: "aridfang",
            level: 55,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "ironsentinel",
            level: 56,
            trained: 1,
          },
          {
            id: "mireclad",
            level: 56,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "mossknight",
            level: 57,
            trained: 2,
          },
          {
            id: "sandwyrm",
            level: 57,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — SHADOWFANG",
        enemies: [
          {
            id: "noxfeather",
            level: 58,
            trained: 3,
          },
          {
            id: "dunecrawler",
            level: 58,
            trained: 3,
          },
          {
            id: "quarrybreaker",
            level: 58,
            trained: 3,
          },
          {
            id: "shadowfang",
            level: 59,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 49565,
      xp: 9853,
      robot: "shadowfang",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 12887,
    station: "station_dojo_2",
    x: 3265,
    y: 1521,
  },
  {
    id: "t_magnashrike",
    name: "COPA MAGNASHRIKE",
    arena: "orbital",
    element: "MAGNETISMO",
    desc: "Circuito de Magnetismo — enfrente MAGNASHRIKE na final e conquiste seu chassi.",
    requiredLevel: 56,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "gridrunner",
            level: 56,
            trained: 0,
          },
          {
            id: "solstitia",
            level: 56,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cometfang",
            level: 57,
            trained: 1,
          },
          {
            id: "ironmonk",
            level: 57,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "voidcaller",
            level: 58,
            trained: 2,
          },
          {
            id: "hailstriker",
            level: 58,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — MAGNASHRIKE",
        enemies: [
          {
            id: "neondrifter",
            level: 59,
            trained: 3,
          },
          {
            id: "biolattice",
            level: 59,
            trained: 3,
          },
          {
            id: "ringwarden",
            level: 59,
            trained: 3,
          },
          {
            id: "magnashrike",
            level: 60,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 50555,
      xp: 10051,
      robot: "magnashrike",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 13144,
    station: "station_orbital_1",
    x: 3022,
    y: 1504,
  },
  {
    id: "t_blastfurnace",
    name: "COPA BLAST FURNACE",
    arena: "volcano",
    element: "FORJA",
    desc: "Circuito de Forja — enfrente BLAST FURNACE na final e conquiste seu chassi.",
    requiredLevel: 57,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "rustpriest",
            level: 57,
            trained: 0,
          },
          {
            id: "meteorpunch",
            level: 57,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "pyrokaiser",
            level: 58,
            trained: 1,
          },
          {
            id: "cometfang",
            level: 58,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "ruinwarden",
            level: 59,
            trained: 2,
          },
          {
            id: "forgeheart",
            level: 59,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — BLAST FURNACE",
        enemies: [
          {
            id: "aquabastion",
            level: 60,
            trained: 3,
          },
          {
            id: "vulcanargo",
            level: 60,
            trained: 3,
          },
          {
            id: "basaltguard",
            level: 60,
            trained: 3,
          },
          {
            id: "blastfurnace",
            level: 61,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 51540,
      xp: 10248,
      robot: "blastfurnace",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 13400,
    station: "station_volcano_1",
    x: 2779,
    y: 1541,
  },
  {
    id: "t_eventhorizon",
    name: "COPA EVENT HORIZON",
    arena: "orbital",
    element: "BURACO NEGRO",
    desc: "Circuito de Buraco Negro — enfrente EVENT HORIZON na final e conquiste seu chassi.",
    requiredLevel: 58,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "aquabastion",
            level: 58,
            trained: 0,
          },
          {
            id: "gridrunner",
            level: 58,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "gridrunner",
            level: 59,
            trained: 1,
          },
          {
            id: "solstitia",
            level: 59,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "hexweaver",
            level: 60,
            trained: 2,
          },
          {
            id: "scrapbaron",
            level: 60,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — EVENT HORIZON",
        enemies: [
          {
            id: "gravitide",
            level: 61,
            trained: 3,
          },
          {
            id: "magnashrike",
            level: 61,
            trained: 3,
          },
          {
            id: "neondrifter",
            level: 61,
            trained: 3,
          },
          {
            id: "eventhorizon",
            level: 62,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 52530,
      xp: 10446,
      robot: "eventhorizon",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 13658,
    station: "station_orbital_2",
    x: 2468,
    y: 1543,
  },
  {
    id: "t_maelstromfist",
    name: "COPA MAELSTROM FIST",
    arena: "frozen",
    element: "AGUA",
    desc: "Circuito de Agua — enfrente MAELSTROM FIST na final e conquiste seu chassi.",
    requiredLevel: 60,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "venomcarapace",
            level: 60,
            trained: 0,
          },
          {
            id: "tundrakeeper",
            level: 60,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "toxinvore",
            level: 61,
            trained: 1,
          },
          {
            id: "nebulaseer",
            level: 61,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "hydroknight",
            level: 62,
            trained: 2,
          },
          {
            id: "bogtyrant",
            level: 62,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — MAELSTROM FIST",
        enemies: [
          {
            id: "venomcarapace",
            level: 63,
            trained: 3,
          },
          {
            id: "resinjudge",
            level: 63,
            trained: 3,
          },
          {
            id: "resinjudge",
            level: 63,
            trained: 3,
          },
          {
            id: "maelstromfist",
            level: 64,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 54515,
      xp: 10843,
      robot: "maelstromfist",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 14174,
    station: "station_frozen_2",
    x: 2176,
    y: 1542,
  },
  {
    id: "t_eclipsar",
    name: "COPA ECLIPSAR",
    arena: "orbital",
    element: "ECLIPSE",
    desc: "Circuito de Eclipse — enfrente ECLIPSAR na final e conquiste seu chassi.",
    requiredLevel: 61,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "hexweaver",
            level: 61,
            trained: 0,
          },
          {
            id: "eventhorizon",
            level: 61,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "stormlance",
            level: 62,
            trained: 1,
          },
          {
            id: "lunargeist",
            level: 62,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "gravitide",
            level: 63,
            trained: 2,
          },
          {
            id: "ringwarden",
            level: 63,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — ECLIPSAR",
        enemies: [
          {
            id: "gridrunner",
            level: 64,
            trained: 3,
          },
          {
            id: "hexweaver",
            level: 64,
            trained: 3,
          },
          {
            id: "gloomtide",
            level: 64,
            trained: 3,
          },
          {
            id: "eclipsar",
            level: 65,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 55510,
      xp: 11042,
      robot: "eclipsar",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 14433,
    station: "station_orbital_1",
    x: 1969,
    y: 1476,
  },
  {
    id: "t_frostmonarch",
    name: "COPA FROST MONARCH",
    arena: "frozen",
    element: "GELO",
    desc: "Circuito de Gelo — enfrente FROST MONARCH na final e conquiste seu chassi.",
    requiredLevel: 62,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "maelstromfist",
            level: 62,
            trained: 0,
          },
          {
            id: "venomcarapace",
            level: 62,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "chronowake",
            level: 63,
            trained: 1,
          },
          {
            id: "tundrakeeper",
            level: 63,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "prismvector",
            level: 64,
            trained: 2,
          },
          {
            id: "tundrakeeper",
            level: 64,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — FROST MONARCH",
        enemies: [
          {
            id: "amberlock",
            level: 65,
            trained: 3,
          },
          {
            id: "amberlock",
            level: 65,
            trained: 3,
          },
          {
            id: "magnavore",
            level: 65,
            trained: 3,
          },
          {
            id: "frostmonarch",
            level: 66,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 56505,
      xp: 11241,
      robot: "frostmonarch",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 14691,
    station: "station_frozen_3",
    x: 1687,
    y: 1532,
  },
  {
    id: "t_pyreconclave",
    name: "COPA PYRE CONCLAVE",
    arena: "volcano",
    element: "FOGO",
    desc: "Circuito de Fogo — enfrente PYRE CONCLAVE na final e conquiste seu chassi.",
    requiredLevel: 63,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "scrapbaron",
            level: 63,
            trained: 0,
          },
          {
            id: "vulcanargo",
            level: 63,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cindercrown",
            level: 64,
            trained: 1,
          },
          {
            id: "venomcarapace",
            level: 64,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "eventhorizon",
            level: 65,
            trained: 2,
          },
          {
            id: "cometfang",
            level: 65,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — PYRE CONCLAVE",
        enemies: [
          {
            id: "basaltguard",
            level: 66,
            trained: 3,
          },
          {
            id: "forgeheart",
            level: 66,
            trained: 3,
          },
          {
            id: "hexweaver",
            level: 66,
            trained: 3,
          },
          {
            id: "pyreconclave",
            level: 67,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 57505,
      xp: 11441,
      robot: "pyreconclave",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 14951,
    station: "station_volcano_1",
    x: 1439,
    y: 1516,
  },
  {
    id: "t_seraphcircuit",
    name: "COPA SERAPH CIRCUIT",
    arena: "sky",
    element: "LUZ",
    desc: "Circuito de Luz — enfrente SERAPH CIRCUIT na final e conquiste seu chassi.",
    requiredLevel: 64,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "lumenblade",
            level: 64,
            trained: 0,
          },
          {
            id: "lumenblade",
            level: 64,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cloudpiercer",
            level: 65,
            trained: 1,
          },
          {
            id: "stratoveil",
            level: 65,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "lumenblade",
            level: 66,
            trained: 2,
          },
          {
            id: "thunderoni",
            level: 66,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — SERAPH CIRCUIT",
        enemies: [
          {
            id: "cloudpiercer",
            level: 67,
            trained: 3,
          },
          {
            id: "cloudpiercer",
            level: 67,
            trained: 3,
          },
          {
            id: "lumenblade",
            level: 67,
            trained: 3,
          },
          {
            id: "seraphcircuit",
            level: 68,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 58505,
      xp: 11641,
      robot: "seraphcircuit",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 15211,
    station: "station_sky_1",
    x: 1105,
    y: 1489,
  },
  {
    id: "t_ashenrevenant",
    name: "COPA ASHEN REVENANT",
    arena: "volcano",
    element: "CINZAS",
    desc: "Circuito de Cinzas — enfrente ASHEN REVENANT na final e conquiste seu chassi.",
    requiredLevel: 65,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "basaltguard",
            level: 65,
            trained: 0,
          },
          {
            id: "meteorpunch",
            level: 65,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "obsidianfist",
            level: 66,
            trained: 1,
          },
          {
            id: "biolattice",
            level: 66,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "vulcanargo",
            level: 67,
            trained: 2,
          },
          {
            id: "cinderhound",
            level: 67,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — ASHEN REVENANT",
        enemies: [
          {
            id: "basaltguard",
            level: 68,
            trained: 3,
          },
          {
            id: "vulcanargo",
            level: 68,
            trained: 3,
          },
          {
            id: "vulcanargo",
            level: 68,
            trained: 3,
          },
          {
            id: "ashenrevenant",
            level: 69,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 59505,
      xp: 11841,
      robot: "ashenrevenant",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 15471,
    station: "station_volcano_3",
    x: 875,
    y: 1526,
  },
  {
    id: "t_voidsingularity",
    name: "COPA VOID SINGULARITY",
    arena: "orbital",
    element: "BURACO NEGRO",
    desc: "Circuito de Buraco Negro — enfrente VOID SINGULARITY na final e conquiste seu chassi.",
    requiredLevel: 66,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "gravitide",
            level: 66,
            trained: 0,
          },
          {
            id: "emberwing",
            level: 66,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "zephyrblade",
            level: 67,
            trained: 1,
          },
          {
            id: "gridrunner",
            level: 67,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "cosmoveil",
            level: 68,
            trained: 2,
          },
          {
            id: "gridrunner",
            level: 68,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — VOID SINGULARITY",
        enemies: [
          {
            id: "neondrifter",
            level: 69,
            trained: 3,
          },
          {
            id: "nebulaseer",
            level: 69,
            trained: 3,
          },
          {
            id: "neutronmaul",
            level: 69,
            trained: 3,
          },
          {
            id: "voidsingularity",
            level: 70,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 60505,
      xp: 12041,
      robot: "voidsingularity",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 15731,
    station: "station_orbital_1",
    x: 557,
    y: 1477,
  },
  {
    id: "t_quantumecho",
    name: "COPA QUANTUM ECHO",
    arena: "orbital",
    element: "QUANTUM",
    desc: "Circuito de Quantum — enfrente QUANTUM ECHO na final e conquiste seu chassi.",
    requiredLevel: 67,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "magnashrike",
            level: 67,
            trained: 0,
          },
          {
            id: "gridrunner",
            level: 67,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cometfang",
            level: 68,
            trained: 1,
          },
          {
            id: "nebulaseer",
            level: 68,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "neutronmaul",
            level: 69,
            trained: 2,
          },
          {
            id: "magnashrike",
            level: 69,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — QUANTUM ECHO",
        enemies: [
          {
            id: "gridrunner",
            level: 70,
            trained: 3,
          },
          {
            id: "gravitide",
            level: 70,
            trained: 3,
          },
          {
            id: "neutronmaul",
            level: 70,
            trained: 3,
          },
          {
            id: "quantumecho",
            level: 71,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 61510,
      xp: 12242,
      robot: "quantumecho",
      item: "mega_repair",
      itemQty: 3,
    },
    replayGold: 15993,
    station: "station_orbital_3",
    x: 360,
    y: 1514,
  },
  {
    id: "t_seraphimvoid",
    name: "COPA SERAPHIM VOID",
    arena: "orbital",
    element: "VAZIO",
    desc: "Circuito de Vazio — enfrente SERAPHIM VOID na final e conquiste seu chassi.",
    requiredLevel: 68,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "ashenrevenant",
            level: 68,
            trained: 0,
          },
          {
            id: "cosmoveil",
            level: 68,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "gravitide",
            level: 69,
            trained: 1,
          },
          {
            id: "gravitide",
            level: 69,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "gloomtide",
            level: 70,
            trained: 2,
          },
          {
            id: "eclipsar",
            level: 70,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — SERAPHIM VOID",
        enemies: [
          {
            id: "neutronmaul",
            level: 71,
            trained: 3,
          },
          {
            id: "ironsentinel",
            level: 71,
            trained: 3,
          },
          {
            id: "lunargeist",
            level: 71,
            trained: 3,
          },
          {
            id: "seraphimvoid",
            level: 72,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 62515,
      xp: 12443,
      robot: "seraphimvoid",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 16254,
    station: "station_orbital_2",
    x: 358,
    y: 1784,
  },
  {
    id: "t_orbitalmarshal",
    name: "COPA ORBITAL MARSHAL",
    arena: "orbital",
    element: "ANEL",
    desc: "Circuito de Anel — enfrente ORBITAL MARSHAL na final e conquiste seu chassi.",
    requiredLevel: 69,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "voidcaller",
            level: 69,
            trained: 0,
          },
          {
            id: "gravitide",
            level: 69,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "eventhorizon",
            level: 70,
            trained: 1,
          },
          {
            id: "gravitide",
            level: 70,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "obsidianfist",
            level: 71,
            trained: 2,
          },
          {
            id: "pyrokaiser",
            level: 71,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — ORBITAL MARSHAL",
        enemies: [
          {
            id: "gridrunner",
            level: 72,
            trained: 3,
          },
          {
            id: "bioreaper",
            level: 72,
            trained: 3,
          },
          {
            id: "neondrifter",
            level: 72,
            trained: 3,
          },
          {
            id: "orbitalmarshal",
            level: 73,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 63525,
      xp: 12645,
      robot: "orbitalmarshal",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 16516,
    station: "station_orbital_2",
    x: 600,
    y: 1782,
  },
  {
    id: "t_titanbulwark",
    name: "COPA TITAN BULWARK",
    arena: "dojo",
    element: "TITA",
    desc: "Circuito de Tita — enfrente TITAN BULWARK na final e conquiste seu chassi.",
    requiredLevel: 71,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "bonemarshal",
            level: 71,
            trained: 0,
          },
          {
            id: "emberfox",
            level: 71,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "dunecrawler",
            level: 72,
            trained: 1,
          },
          {
            id: "obsidianfist",
            level: 72,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "noxfeather",
            level: 73,
            trained: 2,
          },
          {
            id: "sporeherald",
            level: 73,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — TITAN BULWARK",
        enemies: [
          {
            id: "sporeherald",
            level: 74,
            trained: 3,
          },
          {
            id: "terraforge",
            level: 74,
            trained: 3,
          },
          {
            id: "ironsentinel",
            level: 74,
            trained: 3,
          },
          {
            id: "titanbulwark",
            level: 75,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 65545,
      xp: 13049,
      robot: "titanbulwark",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 17042,
    station: "station_dojo_2",
    x: 862,
    y: 1759,
  },
  {
    id: "t_terminuscore",
    name: "COPA TERMINUS CORE",
    arena: "orbital",
    element: "QUANTUM",
    desc: "Circuito de Quantum — enfrente TERMINUS CORE na final e conquiste seu chassi.",
    requiredLevel: 72,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "voidsingularity",
            level: 72,
            trained: 0,
          },
          {
            id: "gridrunner",
            level: 72,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "neutronmaul",
            level: 73,
            trained: 1,
          },
          {
            id: "voidcaller",
            level: 73,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "cosmoveil",
            level: 74,
            trained: 2,
          },
          {
            id: "mireclad",
            level: 74,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — TERMINUS CORE",
        enemies: [
          {
            id: "gloomtide",
            level: 75,
            trained: 3,
          },
          {
            id: "ruinwarden",
            level: 75,
            trained: 3,
          },
          {
            id: "voidsingularity",
            level: 75,
            trained: 3,
          },
          {
            id: "terminuscore",
            level: 76,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 66555,
      xp: 13251,
      robot: "terminuscore",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 17304,
    station: "station_orbital_3",
    x: 1125,
    y: 1762,
  },
  {
    id: "t_boneorchestra",
    name: "COPA BONE ORCHESTRA",
    arena: "dojo",
    element: "OSSO",
    desc: "Circuito de Osso — enfrente BONE ORCHESTRA na final e conquiste seu chassi.",
    requiredLevel: 73,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "junglemaw",
            level: 73,
            trained: 0,
          },
          {
            id: "vireoblade",
            level: 73,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "junglemaw",
            level: 74,
            trained: 1,
          },
          {
            id: "titanbulwark",
            level: 74,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "sandwyrm",
            level: 75,
            trained: 2,
          },
          {
            id: "biolattice",
            level: 75,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — BONE ORCHESTRA",
        enemies: [
          {
            id: "mossknight",
            level: 76,
            trained: 3,
          },
          {
            id: "tundrakeeper",
            level: 76,
            trained: 3,
          },
          {
            id: "forgeheart",
            level: 76,
            trained: 3,
          },
          {
            id: "boneorchestra",
            level: 77,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 67570,
      xp: 13454,
      robot: "boneorchestra",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 17568,
    station: "station_dojo_2",
    x: 1419,
    y: 1774,
  },
  {
    id: "t_ironmonarch",
    name: "COPA IRON MONARCH",
    arena: "dojo",
    element: "FERRO",
    desc: "Circuito de Ferro — enfrente IRON MONARCH na final e conquiste seu chassi.",
    requiredLevel: 74,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "sandwyrm",
            level: 74,
            trained: 0,
          },
          {
            id: "dunecrawler",
            level: 74,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "vireoblade",
            level: 75,
            trained: 1,
          },
          {
            id: "obsidianfist",
            level: 75,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "noxfeather",
            level: 76,
            trained: 2,
          },
          {
            id: "quarrybreaker",
            level: 76,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — IRON MONARCH",
        enemies: [
          {
            id: "terraforge",
            level: 77,
            trained: 3,
          },
          {
            id: "maelstromfist",
            level: 77,
            trained: 3,
          },
          {
            id: "boneorchestra",
            level: 77,
            trained: 3,
          },
          {
            id: "ironmonarch",
            level: 78,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 68580,
      xp: 13656,
      robot: "ironmonarch",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 17831,
    station: "station_dojo_1",
    x: 1667,
    y: 1793,
  },
  {
    id: "t_mirageblade",
    name: "COPA MIRAGE BLADE",
    arena: "dojo",
    element: "DESERTO",
    desc: "Circuito de Deserto — enfrente MIRAGE BLADE na final e conquiste seu chassi.",
    requiredLevel: 75,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "aridfang",
            level: 75,
            trained: 0,
          },
          {
            id: "gridrunner",
            level: 75,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "vireoblade",
            level: 76,
            trained: 1,
          },
          {
            id: "lumenblade",
            level: 76,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "mossknight",
            level: 77,
            trained: 2,
          },
          {
            id: "mossknight",
            level: 77,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — MIRAGE BLADE",
        enemies: [
          {
            id: "terraforge",
            level: 78,
            trained: 3,
          },
          {
            id: "vireoblade",
            level: 78,
            trained: 3,
          },
          {
            id: "ruinwarden",
            level: 78,
            trained: 3,
          },
          {
            id: "mirageblade",
            level: 79,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 69600,
      xp: 13860,
      robot: "mirageblade",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 18096,
    station: "station_dojo_1",
    x: 1972,
    y: 1726,
  },
  {
    id: "t_crystallux",
    name: "COPA CRYSTALLUX",
    arena: "frozen",
    element: "CRISTAL",
    desc: "Circuito de Cristal — enfrente CRYSTALLUX na final e conquiste seu chassi.",
    requiredLevel: 76,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "magnavore",
            level: 76,
            trained: 0,
          },
          {
            id: "hailstriker",
            level: 76,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "vireoblade",
            level: 77,
            trained: 1,
          },
          {
            id: "tundrakeeper",
            level: 77,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "venomcarapace",
            level: 78,
            trained: 2,
          },
          {
            id: "toxinvore",
            level: 78,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — CRYSTALLUX",
        enemies: [
          {
            id: "amberlock",
            level: 79,
            trained: 3,
          },
          {
            id: "scrapbaron",
            level: 79,
            trained: 3,
          },
          {
            id: "sporeherald",
            level: 79,
            trained: 3,
          },
          {
            id: "crystallux",
            level: 80,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 70615,
      xp: 14063,
      robot: "crystallux",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 18360,
    station: "station_frozen_1",
    x: 2171,
    y: 1769,
  },
  {
    id: "t_tempestcrown",
    name: "COPA TEMPEST CROWN",
    arena: "sky",
    element: "TEMPESTADE",
    desc: "Circuito de Tempestade — enfrente TEMPEST CROWN na final e conquiste seu chassi.",
    requiredLevel: 77,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "stratoveil",
            level: 77,
            trained: 0,
          },
          {
            id: "stratoveil",
            level: 77,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "noxfeather",
            level: 78,
            trained: 1,
          },
          {
            id: "windshear",
            level: 78,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "thunderoni",
            level: 79,
            trained: 2,
          },
          {
            id: "thunderoni",
            level: 79,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — TEMPEST CROWN",
        enemies: [
          {
            id: "cloudpiercer",
            level: 80,
            trained: 3,
          },
          {
            id: "lumenblade",
            level: 80,
            trained: 3,
          },
          {
            id: "seraphcircuit",
            level: 80,
            trained: 3,
          },
          {
            id: "tempestcrown",
            level: 81,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 71635,
      xp: 14267,
      robot: "tempestcrown",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 18625,
    station: "station_sky_2",
    x: 2446,
    y: 1721,
  },
  {
    id: "t_stelladrake",
    name: "COPA STELLADRAKE",
    arena: "orbital",
    element: "COSMICO",
    desc: "Circuito de Cosmico — enfrente STELLADRAKE na final e conquiste seu chassi.",
    requiredLevel: 78,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "solstitia",
            level: 78,
            trained: 0,
          },
          {
            id: "titanox",
            level: 78,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "cosmoveil",
            level: 79,
            trained: 1,
          },
          {
            id: "magnashrike",
            level: 79,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "eclipsar",
            level: 80,
            trained: 2,
          },
          {
            id: "resinjudge",
            level: 80,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — STELLADRAKE",
        enemies: [
          {
            id: "eventhorizon",
            level: 81,
            trained: 3,
          },
          {
            id: "stormfang",
            level: 81,
            trained: 3,
          },
          {
            id: "magnashrike",
            level: 81,
            trained: 3,
          },
          {
            id: "stelladrake",
            level: 82,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 72655,
      xp: 14471,
      robot: "stelladrake",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 18890,
    station: "station_orbital_1",
    x: 2778,
    y: 1778,
  },
  {
    id: "t_graphenex",
    name: "COPA GRAPHENEX",
    arena: "orbital",
    element: "GRAFENO",
    desc: "Circuito de Grafeno — enfrente GRAPHENEX na final e conquiste seu chassi.",
    requiredLevel: 79,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "neutronmaul",
            level: 79,
            trained: 0,
          },
          {
            id: "gloomtide",
            level: 79,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "voidcaller",
            level: 80,
            trained: 1,
          },
          {
            id: "stelladrake",
            level: 80,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "seraphcircuit",
            level: 81,
            trained: 2,
          },
          {
            id: "eclipsar",
            level: 81,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — GRAPHENEX",
        enemies: [
          {
            id: "voidcaller",
            level: 82,
            trained: 3,
          },
          {
            id: "cosmoveil",
            level: 82,
            trained: 3,
          },
          {
            id: "bonemarshal",
            level: 82,
            trained: 3,
          },
          {
            id: "graphenex",
            level: 83,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 73675,
      xp: 14675,
      robot: "graphenex",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 19156,
    station: "station_orbital_1",
    x: 3021,
    y: 1762,
  },
  {
    id: "t_reefsovereign",
    name: "COPA REEF SOVEREIGN",
    arena: "frozen",
    element: "RECIFE",
    desc: "Circuito de Recife — enfrente REEF SOVEREIGN na final e conquiste seu chassi.",
    requiredLevel: 81,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "stormlance",
            level: 81,
            trained: 0,
          },
          {
            id: "toxinvore",
            level: 81,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "crystallux",
            level: 82,
            trained: 1,
          },
          {
            id: "tundrakeeper",
            level: 82,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "aridfang",
            level: 83,
            trained: 2,
          },
          {
            id: "nebulaseer",
            level: 83,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — REEF SOVEREIGN",
        enemies: [
          {
            id: "crystallux",
            level: 84,
            trained: 3,
          },
          {
            id: "coralshiv",
            level: 84,
            trained: 3,
          },
          {
            id: "voltronin",
            level: 84,
            trained: 3,
          },
          {
            id: "reefsovereign",
            level: 85,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 75720,
      xp: 15084,
      robot: "reefsovereign",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 19687,
    station: "station_frozen_1",
    x: 3303,
    y: 1789,
  },
  {
    id: "t_magnetarfist",
    name: "COPA MAGNETAR FIST",
    arena: "orbital",
    element: "MAGNETISMO",
    desc: "Circuito de Magnetismo — enfrente MAGNETAR FIST na final e conquiste seu chassi.",
    requiredLevel: 82,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "graphenex",
            level: 82,
            trained: 0,
          },
          {
            id: "ironsentinel",
            level: 82,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "neondrifter",
            level: 83,
            trained: 1,
          },
          {
            id: "quantumecho",
            level: 83,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "stelladrake",
            level: 84,
            trained: 2,
          },
          {
            id: "cosmoveil",
            level: 84,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — MAGNETAR FIST",
        enemies: [
          {
            id: "graphenex",
            level: 85,
            trained: 3,
          },
          {
            id: "eclipsar",
            level: 85,
            trained: 3,
          },
          {
            id: "stratoveil",
            level: 85,
            trained: 3,
          },
          {
            id: "magnetarfist",
            level: 86,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 76745,
      xp: 15289,
      robot: "magnetarfist",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 19954,
    station: "station_orbital_2",
    x: 3275,
    y: 1987,
  },
  {
    id: "t_nullpriest",
    name: "COPA NULL PRIEST",
    arena: "orbital",
    element: "VAZIO",
    desc: "Circuito de Vazio — enfrente NULL PRIEST na final e conquiste seu chassi.",
    requiredLevel: 83,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "eclipsar",
            level: 83,
            trained: 0,
          },
          {
            id: "cosmoveil",
            level: 83,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "eventhorizon",
            level: 84,
            trained: 1,
          },
          {
            id: "eventhorizon",
            level: 84,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "orbitalmarshal",
            level: 85,
            trained: 2,
          },
          {
            id: "magnashrike",
            level: 85,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — NULL PRIEST",
        enemies: [
          {
            id: "lunargeist",
            level: 86,
            trained: 3,
          },
          {
            id: "gloomtide",
            level: 86,
            trained: 3,
          },
          {
            id: "ringwarden",
            level: 86,
            trained: 3,
          },
          {
            id: "nullpriest",
            level: 87,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 77770,
      xp: 15494,
      robot: "nullpriest",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 20220,
    station: "station_orbital_3",
    x: 3055,
    y: 2002,
  },
  {
    id: "t_plasmawraith",
    name: "COPA PLASMA WRAITH",
    arena: "volcano",
    element: "PLASMA",
    desc: "Circuito de Plasma — enfrente PLASMA WRAITH na final e conquiste seu chassi.",
    requiredLevel: 84,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "blastfurnace",
            level: 84,
            trained: 0,
          },
          {
            id: "rustpriest",
            level: 84,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "emberlash",
            level: 85,
            trained: 1,
          },
          {
            id: "ruinwarden",
            level: 85,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "pyreconclave",
            level: 86,
            trained: 2,
          },
          {
            id: "cindercrown",
            level: 86,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — PLASMA WRAITH",
        enemies: [
          {
            id: "vulcanargo",
            level: 87,
            trained: 3,
          },
          {
            id: "cindercrown",
            level: 87,
            trained: 3,
          },
          {
            id: "blastfurnace",
            level: 87,
            trained: 3,
          },
          {
            id: "plasmawraith",
            level: 88,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 78800,
      xp: 15700,
      robot: "plasmawraith",
      item: "power_chip",
      itemQty: 2,
    },
    replayGold: 20488,
    station: "station_volcano_3",
    x: 2720,
    y: 2028,
  },
  {
    id: "t_chronofracture",
    name: "COPA CHRONOFRACTURE",
    arena: "orbital",
    element: "TEMPO",
    desc: "Circuito de Tempo — enfrente CHRONOFRACTURE na final e conquiste seu chassi.",
    requiredLevel: 85,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "magnetarfist",
            level: 85,
            trained: 0,
          },
          {
            id: "orbitalmarshal",
            level: 85,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "vulcanargo",
            level: 86,
            trained: 1,
          },
          {
            id: "cosmoveil",
            level: 86,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "voidcaller",
            level: 87,
            trained: 2,
          },
          {
            id: "nebulaseer",
            level: 87,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — CHRONOFRACTURE",
        enemies: [
          {
            id: "magnetarfist",
            level: 88,
            trained: 3,
          },
          {
            id: "graphenex",
            level: 88,
            trained: 3,
          },
          {
            id: "voltronin",
            level: 88,
            trained: 3,
          },
          {
            id: "chronofracture",
            level: 89,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 79825,
      xp: 15905,
      robot: "chronofracture",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 20754,
    station: "station_orbital_1",
    x: 2478,
    y: 2002,
  },
  {
    id: "t_zephyrhalo",
    name: "COPA ZEPHYR HALO",
    arena: "sky",
    element: "VENTO",
    desc: "Circuito de Vento — enfrente ZEPHYR HALO na final e conquiste seu chassi.",
    requiredLevel: 86,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "magnashrike",
            level: 86,
            trained: 0,
          },
          {
            id: "heliondriver",
            level: 86,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "windshear",
            level: 87,
            trained: 1,
          },
          {
            id: "stratoveil",
            level: 87,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "stormfang",
            level: 88,
            trained: 2,
          },
          {
            id: "heliondriver",
            level: 88,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — ZEPHYR HALO",
        enemies: [
          {
            id: "windshear",
            level: 89,
            trained: 3,
          },
          {
            id: "heliondriver",
            level: 89,
            trained: 3,
          },
          {
            id: "heliondriver",
            level: 89,
            trained: 3,
          },
          {
            id: "zephyrhalo",
            level: 90,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 80855,
      xp: 16111,
      robot: "zephyrhalo",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 21022,
    station: "station_sky_3",
    x: 2239,
    y: 1999,
  },
  {
    id: "t_permafrostmk",
    name: "COPA PERMAFROST MK",
    arena: "frozen",
    element: "TUNDRA",
    desc: "Circuito de Tundra — enfrente PERMAFROST MK na final e conquiste seu chassi.",
    requiredLevel: 87,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "toxinvore",
            level: 87,
            trained: 0,
          },
          {
            id: "heliondriver",
            level: 87,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "seraphcircuit",
            level: 88,
            trained: 1,
          },
          {
            id: "maelstromfist",
            level: 88,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "emberlash",
            level: 89,
            trained: 2,
          },
          {
            id: "prismvector",
            level: 89,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — PERMAFROST MK",
        enemies: [
          {
            id: "mireclad",
            level: 90,
            trained: 3,
          },
          {
            id: "stratoveil",
            level: 90,
            trained: 3,
          },
          {
            id: "crystallux",
            level: 90,
            trained: 3,
          },
          {
            id: "permafrostmk",
            level: 91,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 81885,
      xp: 16317,
      robot: "permafrostmk",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 21290,
    station: "station_frozen_2",
    x: 1978,
    y: 1994,
  },
  {
    id: "t_voltcarnyx",
    name: "COPA VOLTCARNYX",
    arena: "sky",
    element: "TROVAO",
    desc: "Circuito de Trovao — enfrente VOLTCARNYX na final e conquiste seu chassi.",
    requiredLevel: 89,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "bioreaper",
            level: 89,
            trained: 0,
          },
          {
            id: "thunderoni",
            level: 89,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "zephyrhalo",
            level: 90,
            trained: 1,
          },
          {
            id: "coralshiv",
            level: 90,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "boneorchestra",
            level: 91,
            trained: 2,
          },
          {
            id: "lumenblade",
            level: 91,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — VOLTCARNYX",
        enemies: [
          {
            id: "heliondriver",
            level: 92,
            trained: 3,
          },
          {
            id: "lumenblade",
            level: 92,
            trained: 3,
          },
          {
            id: "tempestcrown",
            level: 92,
            trained: 3,
          },
          {
            id: "voltcarnyx",
            level: 93,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 83955,
      xp: 16731,
      robot: "voltcarnyx",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 21828,
    station: "station_sky_1",
    x: 1709,
    y: 1988,
  },
  {
    id: "t_jadearbiter",
    name: "COPA JADE ARBITER",
    arena: "dojo",
    element: "JADE",
    desc: "Circuito de Jade — enfrente JADE ARBITER na final e conquiste seu chassi.",
    requiredLevel: 90,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "frostmonarch",
            level: 90,
            trained: 0,
          },
          {
            id: "mossknight",
            level: 90,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "junglemaw",
            level: 91,
            trained: 1,
          },
          {
            id: "snowreaver",
            level: 91,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "hailstriker",
            level: 92,
            trained: 2,
          },
          {
            id: "solstitia",
            level: 92,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — JADE ARBITER",
        enemies: [
          {
            id: "titanbulwark",
            level: 93,
            trained: 3,
          },
          {
            id: "magnetarfist",
            level: 93,
            trained: 3,
          },
          {
            id: "hailstriker",
            level: 93,
            trained: 3,
          },
          {
            id: "jadearbiter",
            level: 94,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 84985,
      xp: 16937,
      robot: "jadearbiter",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 22096,
    station: "station_dojo_1",
    x: 1359,
    y: 2010,
  },
  {
    id: "t_mirrorclad",
    name: "COPA MIRRORCLAD",
    arena: "frozen",
    element: "ESPELHO",
    desc: "Circuito de Espelho — enfrente MIRRORCLAD na final e conquiste seu chassi.",
    requiredLevel: 91,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "prismvector",
            level: 91,
            trained: 0,
          },
          {
            id: "bogtyrant",
            level: 91,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "maelstromfist",
            level: 92,
            trained: 1,
          },
          {
            id: "reefsovereign",
            level: 92,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "permafrostmk",
            level: 93,
            trained: 2,
          },
          {
            id: "toxinvore",
            level: 93,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — MIRRORCLAD",
        enemies: [
          {
            id: "reefsovereign",
            level: 94,
            trained: 3,
          },
          {
            id: "venomcarapace",
            level: 94,
            trained: 3,
          },
          {
            id: "dunecrawler",
            level: 94,
            trained: 3,
          },
          {
            id: "mirrorclad",
            level: 95,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 86025,
      xp: 17145,
      robot: "mirrorclad",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 22366,
    station: "station_frozen_1",
    x: 1103,
    y: 2023,
  },
  {
    id: "t_solarixprime",
    name: "COPA SOLARIX PRIME",
    arena: "sky",
    element: "SOL",
    desc: "Circuito de Sol — enfrente SOLARIX PRIME na final e conquiste seu chassi.",
    requiredLevel: 92,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "windshear",
            level: 92,
            trained: 0,
          },
          {
            id: "lumenblade",
            level: 92,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "heliondriver",
            level: 93,
            trained: 1,
          },
          {
            id: "cryolance",
            level: 93,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "stratoveil",
            level: 94,
            trained: 2,
          },
          {
            id: "windshear",
            level: 94,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — SOLARIX PRIME",
        enemies: [
          {
            id: "shadowfang",
            level: 95,
            trained: 3,
          },
          {
            id: "cloudpiercer",
            level: 95,
            trained: 3,
          },
          {
            id: "sporeherald",
            level: 95,
            trained: 3,
          },
          {
            id: "solarixprime",
            level: 96,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 87060,
      xp: 17352,
      robot: "solarixprime",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 22636,
    station: "station_sky_1",
    x: 899,
    y: 1976,
  },
  {
    id: "t_abyssalord",
    name: "COPA ABYSSA LORD",
    arena: "orbital",
    element: "ABISSO",
    desc: "Circuito de Abisso — enfrente ABYSSA LORD na final e conquiste seu chassi.",
    requiredLevel: 93,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "solstitia",
            level: 93,
            trained: 0,
          },
          {
            id: "gloomtide",
            level: 93,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "eclipsar",
            level: 94,
            trained: 1,
          },
          {
            id: "chronofracture",
            level: 94,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "gridrunner",
            level: 95,
            trained: 2,
          },
          {
            id: "ringwarden",
            level: 95,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — ABYSSA LORD",
        enemies: [
          {
            id: "graphenex",
            level: 96,
            trained: 3,
          },
          {
            id: "shadowfang",
            level: 96,
            trained: 3,
          },
          {
            id: "gridrunner",
            level: 96,
            trained: 3,
          },
          {
            id: "abyssalord",
            level: 97,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 88100,
      xp: 17560,
      robot: "abyssalord",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 22906,
    station: "station_orbital_2",
    x: 560,
    y: 2031,
  },
  {
    id: "t_aetherloom",
    name: "COPA AETHER LOOM",
    arena: "orbital",
    element: "NEBULOSA",
    desc: "Circuito de Nebulosa — enfrente AETHER LOOM na final e conquiste seu chassi.",
    requiredLevel: 94,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "ironmonk",
            level: 94,
            trained: 0,
          },
          {
            id: "emberwing",
            level: 94,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "pyreconclave",
            level: 95,
            trained: 1,
          },
          {
            id: "abyssalord",
            level: 95,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "hailstriker",
            level: 96,
            trained: 2,
          },
          {
            id: "ringwarden",
            level: 96,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — AETHER LOOM",
        enemies: [
          {
            id: "amberlock",
            level: 97,
            trained: 3,
          },
          {
            id: "nullpriest",
            level: 97,
            trained: 3,
          },
          {
            id: "hailstriker",
            level: 97,
            trained: 3,
          },
          {
            id: "aetherloom",
            level: 98,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 89135,
      xp: 17767,
      robot: "aetherloom",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 23175,
    station: "station_orbital_3",
    x: 303,
    y: 2033,
  },
  {
    id: "t_quicksilverr",
    name: "COPA QUICKSILVER",
    arena: "frozen",
    element: "ESPELHO",
    desc: "Circuito de Espelho — enfrente QUICKSILVER na final e conquiste seu chassi.",
    requiredLevel: 96,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "permafrostmk",
            level: 96,
            trained: 0,
          },
          {
            id: "voidcaller",
            level: 96,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "frostmonarch",
            level: 97,
            trained: 1,
          },
          {
            id: "tundrakeeper",
            level: 97,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "venomcarapace",
            level: 98,
            trained: 2,
          },
          {
            id: "acidbloom",
            level: 98,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — QUICKSILVER",
        enemies: [
          {
            id: "mireclad",
            level: 99,
            trained: 3,
          },
          {
            id: "frostmonarch",
            level: 99,
            trained: 3,
          },
          {
            id: "cosmoveil",
            level: 99,
            trained: 3,
          },
          {
            id: "quicksilverr",
            level: 99,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 91220,
      xp: 18184,
      robot: "quicksilverr",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 23717,
    station: "station_frozen_2",
    x: 360,
    y: 2250,
  },
  {
    id: "t_ravenousbloom",
    name: "COPA RAVENOUS BLOOM",
    arena: "dojo",
    element: "BIO",
    desc: "Circuito de Bio — enfrente RAVENOUS BLOOM na final e conquiste seu chassi.",
    requiredLevel: 97,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "bonemarshal",
            level: 97,
            trained: 0,
          },
          {
            id: "heliondriver",
            level: 97,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "ironmonk",
            level: 98,
            trained: 1,
          },
          {
            id: "ringwarden",
            level: 98,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "titanbulwark",
            level: 99,
            trained: 2,
          },
          {
            id: "biolattice",
            level: 99,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — RAVENOUS BLOOM",
        enemies: [
          {
            id: "aetherloom",
            level: 100,
            trained: 3,
          },
          {
            id: "sandwyrm",
            level: 100,
            trained: 3,
          },
          {
            id: "quarrybreaker",
            level: 100,
            trained: 3,
          },
          {
            id: "ravenousbloom",
            level: 99,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 92260,
      xp: 18392,
      robot: "ravenousbloom",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 23988,
    station: "station_dojo_1",
    x: 578,
    y: 2284,
  },
  {
    id: "t_lavabastion",
    name: "COPA LAVA BASTION",
    arena: "volcano",
    element: "VULCAO",
    desc: "Circuito de Vulcao — enfrente LAVA BASTION na final e conquiste seu chassi.",
    requiredLevel: 98,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "cinderhound",
            level: 98,
            trained: 0,
          },
          {
            id: "scrapbaron",
            level: 98,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "amberlock",
            level: 99,
            trained: 1,
          },
          {
            id: "obsidianfist",
            level: 99,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "ashenrevenant",
            level: 100,
            trained: 2,
          },
          {
            id: "grimsprocket",
            level: 100,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — LAVA BASTION",
        enemies: [
          {
            id: "meteorpunch",
            level: 101,
            trained: 3,
          },
          {
            id: "rustpriest",
            level: 101,
            trained: 3,
          },
          {
            id: "toxinvore",
            level: 101,
            trained: 3,
          },
          {
            id: "lavabastion",
            level: 99,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 93305,
      xp: 18601,
      robot: "lavabastion",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 24259,
    station: "station_volcano_1",
    x: 851,
    y: 2298,
  },
  {
    id: "t_pulsarcore",
    name: "COPA PULSAR CORE",
    arena: "orbital",
    element: "PULSAR",
    desc: "Circuito de Pulsar — enfrente PULSAR CORE na final e conquiste seu chassi.",
    requiredLevel: 99,
    fights: [
      {
        name: "PRELIMINAR",
        enemies: [
          {
            id: "meteorpunch",
            level: 99,
            trained: 0,
          },
          {
            id: "ringwarden",
            level: 99,
            trained: 0,
          },
        ],
      },
      {
        name: "OITAVAS",
        enemies: [
          {
            id: "voidsingularity",
            level: 100,
            trained: 1,
          },
          {
            id: "stelladrake",
            level: 100,
            trained: 1,
          },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          {
            id: "seraphimvoid",
            level: 101,
            trained: 2,
          },
          {
            id: "basaltguard",
            level: 101,
            trained: 2,
          },
        ],
      },
      {
        name: "FINAL — PULSAR CORE",
        enemies: [
          {
            id: "gloomtide",
            level: 102,
            trained: 3,
          },
          {
            id: "aetherloom",
            level: 102,
            trained: 3,
          },
          {
            id: "eclipsar",
            level: 102,
            trained: 3,
          },
          {
            id: "pulsarcore",
            level: 99,
            trained: 4,
          },
        ],
      },
    ],
    reward: {
      gold: 94350,
      xp: 18810,
      robot: "pulsarcore",
      item: "revive_core",
      itemQty: 2,
    },
    replayGold: 24531,
    station: "station_orbital_2",
    x: 1132,
    y: 2255,
  },
];
