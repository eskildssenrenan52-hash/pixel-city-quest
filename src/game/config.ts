// Balanceamento — estrutura e fórmulas replicadas do jogo original
// (Ben 10 Campeões Galácticos: general / alienStats / ratios / ai_reduction).

export const GENERAL = {
  critical_multiplier: 1.5,
  critical_base_damage: 5,
  critical_base_chance: 0.05,
  critical_max_chance: 0.35,
  evasion_base_chance: 0.05,
  evasion_max_chance: 0.3,
  max_level: 99,
  swap_costs_turn: true,
} as const;

export const ROBOT_STATS = {
  baseHP: 45,
  baseMP: 24,
  baseSTR: 12,
  baseDEF: 12,
  baseAGL: 12,
  deltaHP: 13,
  deltaMP: 5,
  deltaSTR: 3,
  deltaDEF: 3,
  deltaAGL: 3,
  trainingDeltaSTR: 2,
  trainingDeltaDEF: 2,
  trainingDeltaAGL: 2,
} as const;

// Redução aplicada aos stats dos robôs controlados pela IA, por faixa de nível.
export const AI_STATS_REDUCTION: { upToLevel: number; reduction: number }[] = [
  { upToLevel: 5, reduction: 0.25 },
  { upToLevel: 12, reduction: 0.18 },
  { upToLevel: 25, reduction: 0.12 },
  { upToLevel: 45, reduction: 0.08 },
  { upToLevel: 99, reduction: 0.05 },
];

export const TRAIN_COST_PER_POINT = 12; // ouro * nível do robô

export type ItemId =
  | "repair_kit"
  | "mega_repair"
  | "energy_cell"
  | "revive_core"
  | "shield_chip"
  | "power_chip"
  | "purifier"
  | "capsule";

export interface ItemDef {
  id: ItemId;
  name: string;
  desc: string;
  icon: string;
  price: number;
  battle: boolean;
  effect:
    | { kind: "heal"; percent: number }
    | { kind: "mp"; percent: number }
    | { kind: "revive"; percent: number }
    | { kind: "buff"; type: "damage_reduction" | "adrenalin"; power: number; turns: number }
    | { kind: "purify" }
    | { kind: "capsule" };
}

export const ITEMS: ItemDef[] = [
  {
    id: "repair_kit",
    name: "KIT DE REPARO",
    desc: "Restaura 40% do HP do robô ativo.",
    icon: "/ui/icon_heart.png",
    price: 120,
    battle: true,
    effect: { kind: "heal", percent: 40 },
  },
  {
    id: "mega_repair",
    name: "MEGA REPARO",
    desc: "Restaura 100% do HP do robô ativo.",
    icon: "/ui/icon_drop.png",
    price: 420,
    battle: true,
    effect: { kind: "heal", percent: 100 },
  },
  {
    id: "energy_cell",
    name: "CELULA DE ENERGIA",
    desc: "Restaura 60% do MP do robô ativo.",
    icon: "/ui/icon_battery.png",
    price: 150,
    battle: true,
    effect: { kind: "mp", percent: 60 },
  },
  {
    id: "revive_core",
    name: "NUCLEO DE REVIVER",
    desc: "Reativa um robô caído com 50% de HP.",
    icon: "/ui/icon_skull.png",
    price: 600,
    battle: true,
    effect: { kind: "revive", percent: 50 },
  },
  {
    id: "shield_chip",
    name: "CHIP DE ESCUDO",
    desc: "-45% de dano recebido por 3 turnos.",
    icon: "/ui/icon_shield.png",
    price: 260,
    battle: true,
    effect: { kind: "buff", type: "damage_reduction", power: 45, turns: 3 },
  },
  {
    id: "power_chip",
    name: "CHIP DE FORCA",
    desc: "+35% de força por 3 turnos.",
    icon: "/ui/icon_fist.png",
    price: 300,
    battle: true,
    effect: { kind: "buff", type: "adrenalin", power: 35, turns: 3 },
  },
  {
    id: "purifier",
    name: "PURIFICADOR",
    desc: "Remove todos os efeitos negativos.",
    icon: "/ui/icon_check.png",
    price: 180,
    battle: true,
    effect: { kind: "purify" },
  },
  {
    id: "capsule",
    name: "CAPSULA MECHA",
    desc: "Contém um robô aleatório ainda não recrutado.",
    icon: "/ui/icon_star.png",
    price: 1500,
    battle: false,
    effect: { kind: "capsule" },
  },
];

export const ITEM_MAP: Record<string, ItemDef> = Object.fromEntries(
  ITEMS.map((i) => [i.id, i]),
);
