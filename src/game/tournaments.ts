import type { ItemId } from "./config";
import { EXTRA_TOURNAMENTS } from "./tournaments_extra";

export interface EnemyEntry {
  id: string;
  level: number;
  trained: number; // pontos em cada atributo treinado
}

export interface FightInfo {
  name: string;
  enemies: EnemyEntry[];
}

export interface TournamentDef {
  id: string;
  name: string;
  arena: string;
  desc: string;
  requiredLevel: number;
  fights: FightInfo[];
  reward: {
    gold: number;
    xp: number;
    robot?: string;
    item?: ItemId;
    itemQty?: number;
  };
  replayGold: number;
  /** Elemento tematico — usado no filtro do mapa. */
  element?: string;
  /** Sprite da construcao no mapa espacial. */
  station?: string;
  /** Posicao no mapa espacial (mundo 3600x2400). */
  x?: number;
  y?: number;
}

const CORE_TOURNAMENTS: TournamentDef[] = [
  {
    id: "dojo",
    name: "COPA DOJO",
    arena: "dojo",
    desc: "Torneio de estreia no dojo de treinamento. Adversários leves.",
    requiredLevel: 1,
    fights: [
      { name: "SPARRING 1", enemies: [{ id: "terrabyte", level: 1, trained: 0 }] },
      {
        name: "SPARRING 2",
        enemies: [
          { id: "acidra", level: 2, trained: 1 },
          { id: "ironmonk", level: 2, trained: 1 },
        ],
      },
      {
        name: "SEMIFINAL",
        enemies: [
          { id: "quartzine", level: 3, trained: 2 },
          { id: "ferrovax", level: 3, trained: 2 },
        ],
      },
      {
        name: "FINAL — MESTRE DO DOJO",
        enemies: [
          { id: "ironmonk", level: 4, trained: 3 },
          { id: "hydroknight", level: 4, trained: 3 },
          { id: "terrabyte", level: 5, trained: 4 },
        ],
      },
    ],
    reward: { gold: 900, xp: 120, robot: "ironmonk", item: "repair_kit", itemQty: 3 },
    replayGold: 220,
    element: "TERRA",
    station: "station_dojo_1",
    x: 400,
    y: 110,
  },
  {
    id: "volcano",
    name: "COPA VULCAO",
    arena: "volcano",
    desc: "Arena de magma. Robôs de fogo e blindagem pesada.",
    requiredLevel: 6,
    fights: [
      {
        name: "QUARTAS",
        enemies: [
          { id: "emberfox", level: 6, trained: 0 },
          { id: "acidra", level: 6, trained: 0 },
        ],
      },
      {
        name: "SEMIFINAL",
        enemies: [
          { id: "ferrovax", level: 7, trained: 1 },
          { id: "stormfang", level: 7, trained: 1 },
          { id: "terrabyte", level: 7, trained: 1 },
        ],
      },
      {
        name: "FINAL — PYROKAISER",
        enemies: [
          { id: "emberfox", level: 8, trained: 2 },
          { id: "titanox", level: 8, trained: 2 },
          { id: "pyrokaiser", level: 9, trained: 3 },
        ],
      },
    ],
    reward: { gold: 2200, xp: 380, robot: "pyrokaiser", item: "shield_chip", itemQty: 2 },
    replayGold: 620,
    element: "FOGO",
    station: "station_volcano_1",
    x: 1050,
    y: 110,
  },
  {
    id: "orbital",
    name: "COPA ORBITAL",
    arena: "orbital",
    desc: "Estação em órbita. Especialistas em energia e gravidade.",
    requiredLevel: 12,
    fights: [
      {
        name: "OITAVAS",
        enemies: [
          { id: "gravitus", level: 12, trained: 0 },
          { id: "chronowake", level: 12, trained: 0 },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          { id: "magnavore", level: 13, trained: 1 },
          { id: "voltronin", level: 13, trained: 1 },
          { id: "quartzine", level: 13, trained: 1 },
        ],
      },
      {
        name: "SEMIFINAL",
        enemies: [
          { id: "zephyrblade", level: 14, trained: 2 },
          { id: "nebulon", level: 14, trained: 2 },
          { id: "gravitus", level: 14, trained: 2 },
        ],
      },
      {
        name: "FINAL — NEBULON PRIME",
        enemies: [
          { id: "chronowake", level: 15, trained: 3 },
          { id: "magnavore", level: 15, trained: 3 },
          { id: "nebulon", level: 15, trained: 3 },
          { id: "titanox", level: 16, trained: 4 },
        ],
      },
    ],
    reward: { gold: 5200, xp: 900, robot: "nebulon", item: "energy_cell", itemQty: 4 },
    replayGold: 1400,
    element: "COSMICO",
    station: "station_orbital_1",
    x: 1700,
    y: 110,
  },
  {
    id: "frozen",
    name: "COPA CONGELADA",
    arena: "frozen",
    desc: "Planície de gelo. Controle de status e resistência extrema.",
    requiredLevel: 20,
    fights: [
      {
        name: "QUARTAS",
        enemies: [
          { id: "cryolance", level: 20, trained: 0 },
          { id: "hydroknight", level: 20, trained: 0 },
          { id: "quartzine", level: 20, trained: 0 },
        ],
      },
      {
        name: "SEMIFINAL",
        enemies: [
          { id: "bioreaper", level: 21, trained: 1 },
          { id: "stormfang", level: 21, trained: 1 },
          { id: "titanox", level: 21, trained: 1 },
        ],
      },
      {
        name: "FINAL — RAINHA DO GELO",
        enemies: [
          { id: "cryolance", level: 22, trained: 2 },
          { id: "nullshade", level: 22, trained: 2 },
          { id: "gravitus", level: 22, trained: 2 },
          { id: "aurorion", level: 23, trained: 3 },
        ],
      },
    ],
    reward: { gold: 11000, xp: 2100, robot: "nullshade", item: "mega_repair", itemQty: 3 },
    replayGold: 3000,
    element: "GELO",
    station: "station_frozen_1",
    x: 2350,
    y: 110,
  },
  {
    id: "sky",
    name: "COPA CELESTE",
    arena: "sky",
    desc: "Arena flutuante dos campeões. Só os melhores chegam aqui.",
    requiredLevel: 30,
    fights: [
      {
        name: "OITAVAS",
        enemies: [
          { id: "zephyrblade", level: 30, trained: 0 },
          { id: "emberfox", level: 30, trained: 0 },
          { id: "acidra", level: 30, trained: 0 },
        ],
      },
      {
        name: "QUARTAS",
        enemies: [
          { id: "magnavore", level: 31, trained: 1 },
          { id: "bioreaper", level: 31, trained: 1 },
          { id: "hydroknight", level: 31, trained: 1 },
        ],
      },
      {
        name: "SEMIFINAL",
        enemies: [
          { id: "pyrokaiser", level: 32, trained: 2 },
          { id: "chronowake", level: 32, trained: 2 },
          { id: "titanox", level: 32, trained: 2 },
          { id: "cryolance", level: 32, trained: 2 },
        ],
      },
      {
        name: "FINAL — CAMPEAO MECHA",
        enemies: [
          { id: "nullshade", level: 33, trained: 3 },
          { id: "nebulon", level: 33, trained: 3 },
          { id: "voltronin", level: 33, trained: 3 },
          { id: "aurorion", level: 34, trained: 4 },
        ],
      },
    ],
    reward: { gold: 26000, xp: 5200, robot: "magnavore", item: "revive_core", itemQty: 3 },
    replayGold: 7000,
    element: "LUZ",
    station: "station_sky_1",
    x: 3000,
    y: 110,
  },
];

export const TOURNAMENTS: TournamentDef[] = [...CORE_TOURNAMENTS, ...EXTRA_TOURNAMENTS];

export const MAP_WIDTH = 3600;
export const MAP_HEIGHT = 2600;

export const TOURNAMENT_MAP: Record<string, TournamentDef> = Object.fromEntries(
  TOURNAMENTS.map((t) => [t.id, t]),
);
