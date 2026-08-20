import type { RobotSave } from "./engine";
import { ROBOTS, ROBOT_MAP } from "./robots";

export type ModeId = "quick" | "babel" | "survival" | "bossrush" | "chaos";

export interface ModeDef {
  id: ModeId;
  name: string;
  tagline: string;
  desc: string;
  art: string;
  arena: string;
  accent: string;
  /** Nível mínimo de piloto. */
  requiredLevel: number;
}

export const MODES: ModeDef[] = [
  {
    id: "quick",
    name: "PARTIDA RAPIDA",
    tagline: "1 LUTA · 2 MINUTOS",
    desc: "Sorteia um desafiante do circuito no seu nível. Entra, luta, leva ouro na hora.",
    art: "/modes/quick.png",
    arena: "dojo",
    accent: "#35e2f0",
    requiredLevel: 1,
  },
  {
    id: "babel",
    name: "TORRE DE BABEL",
    tagline: "ANDARES INFINITOS",
    desc: "Suba andar por andar sem reparo total: o dano acumula. A cada 5 andares surge um guardião.",
    art: "/modes/babel.png",
    arena: "sky",
    accent: "#ffc43a",
    requiredLevel: 3,
  },
  {
    id: "survival",
    name: "SOBREVIVENCIA",
    tagline: "ONDAS SEM FIM",
    desc: "Ondas cada vez maiores. Entre elas você recupera só um pouco de HP e MP.",
    art: "/modes/survival.png",
    arena: "volcano",
    accent: "#e2453a",
    requiredLevel: 5,
  },
  {
    id: "bossrush",
    name: "CACADA DE CHEFES",
    tagline: "3 LENDAS SEGUIDAS",
    desc: "Três campeões dourados em sequência, sem intervalo de reparo. Recompensa máxima.",
    art: "/modes/bossrush.png",
    arena: "orbital",
    accent: "#a97bff",
    requiredLevel: 10,
  },
  {
    id: "chaos",
    name: "ARENA CAOTICA",
    tagline: "REGRAS SORTEADAS",
    desc: "Uma mutação diferente a cada entrada: energia infinita, corrosão, gravidade zero...",
    art: "/modes/chaos.png",
    arena: "frozen",
    accent: "#57d76a",
    requiredLevel: 8,
  },
];

export const MODE_MAP: Record<ModeId, ModeDef> = Object.fromEntries(
  MODES.map((m) => [m.id, m]),
) as Record<ModeId, ModeDef>;

// ---------------------------------------------------------------- mutadores
export interface Mutator {
  id: string;
  name: string;
  desc: string;
  enemyLevelBonus: number;
  enemyCount: number;
  playerHp: number; // fração inicial
  playerMp: number;
  goldMult: number;
}

export const MUTATORS: Mutator[] = [
  {
    id: "overload",
    name: "SOBRECARGA TOTAL",
    desc: "Todos entram com energia cheia, mas os inimigos vêm 3 níveis acima.",
    enemyLevelBonus: 3,
    enemyCount: 3,
    playerHp: 1,
    playerMp: 1,
    goldMult: 1.6,
  },
  {
    id: "corrosion",
    name: "CHUVA CORROSIVA",
    desc: "A arena corroeu seus chassis: você começa com 70% de HP.",
    enemyLevelBonus: 1,
    enemyCount: 3,
    playerHp: 0.7,
    playerMp: 1,
    goldMult: 1.8,
  },
  {
    id: "blackout",
    name: "APAGAO",
    desc: "Reatores instáveis: você começa com 40% de MP.",
    enemyLevelBonus: 0,
    enemyCount: 3,
    playerHp: 1,
    playerMp: 0.4,
    goldMult: 1.7,
  },
  {
    id: "horde",
    name: "HORDA",
    desc: "Quatro adversários de uma vez, mas cada um mais fraco.",
    enemyLevelBonus: -2,
    enemyCount: 4,
    playerHp: 1,
    playerMp: 1,
    goldMult: 2,
  },
  {
    id: "zerog",
    name: "GRAVIDADE ZERO",
    desc: "Duelo relâmpago: dois campeões dourados, energia cheia.",
    enemyLevelBonus: 2,
    enemyCount: 2,
    playerHp: 1,
    playerMp: 1,
    goldMult: 1.9,
  },
];

// ------------------------------------------------------------------- helpers
function pick<T>(list: T[], rand: () => number): T {
  return list[Math.floor(rand() * list.length)] as T;
}

function rand(): number {
  return Math.random();
}

export function teamAverageLevel(team: RobotSave[]): number {
  if (team.length === 0) return 1;
  return Math.max(1, Math.round(team.reduce((a, r) => a + r.level, 0) / team.length));
}

function enemySave(id: string, level: number, trained: number): RobotSave {
  return {
    id,
    level: Math.max(1, Math.round(level)),
    xp: 0,
    trained: { str: trained, def: trained, agl: trained },
  };
}

export function randomEnemyTeam(args: {
  level: number;
  count: number;
  trained?: number;
  rarity?: "gold" | "silver" | "bronze";
}): RobotSave[] {
  const pool = args.rarity ? ROBOTS.filter((r) => r.rarity === args.rarity) : ROBOTS;
  const used = new Set<string>();
  const out: RobotSave[] = [];
  let guard = 0;
  while (out.length < args.count && guard < 200) {
    guard += 1;
    const def = pick(pool, rand);
    if (used.has(def.id)) continue;
    used.add(def.id);
    const jitter = Math.round((rand() - 0.5) * 2);
    out.push(enemySave(def.id, args.level + jitter, args.trained ?? 0));
  }
  return out;
}

export interface StageSetup {
  label: string;
  arena: string;
  enemies: RobotSave[];
  /** multiplicador de ouro/XP da etapa. */
  reward: number;
  boss?: boolean;
}

const ARENAS = ["dojo", "volcano", "orbital", "sky", "frozen"];

/** Configura o andar N da Torre de Babel. */
export function babelStage(floor: number, teamLevel: number): StageSetup {
  const boss = floor % 5 === 0;
  const level = teamLevel + Math.floor(floor * 0.8);
  const count = boss ? 4 : Math.min(4, 1 + Math.floor(floor / 3));
  const enemies = randomEnemyTeam({
    level,
    count,
    trained: Math.floor(floor / 2),
    rarity: boss ? "gold" : undefined,
  });
  return {
    label: boss ? `ANDAR ${floor} — GUARDIAO` : `ANDAR ${floor}`,
    arena: ARENAS[floor % ARENAS.length] as string,
    enemies,
    reward: boss ? 2.5 + floor * 0.12 : 1 + floor * 0.08,
    boss,
  };
}

/** Configura a onda N da Sobrevivência. */
export function survivalStage(wave: number, teamLevel: number): StageSetup {
  const level = teamLevel + Math.floor(wave * 0.6);
  const count = Math.min(4, 1 + Math.floor(wave / 2));
  return {
    label: `ONDA ${wave}`,
    arena: "volcano",
    enemies: randomEnemyTeam({ level, count, trained: Math.floor(wave / 3) }),
    reward: 1 + wave * 0.1,
  };
}

/** Configura o chefe N (1-3) da Caçada de Chefes. */
export function bossStage(index: number, teamLevel: number): StageSetup {
  const level = teamLevel + 2 + index * 3;
  return {
    label: `CHEFE ${index + 1}/3`,
    arena: "orbital",
    enemies: randomEnemyTeam({
      level,
      count: index === 2 ? 3 : 2,
      trained: 3 + index * 2,
      rarity: "gold",
    }),
    reward: 2 + index,
    boss: true,
  };
}

export function quickStage(teamLevel: number): StageSetup {
  const count = 1 + Math.floor(Math.random() * 3);
  return {
    label: "DESAFIANTE",
    arena: ARENAS[Math.floor(Math.random() * ARENAS.length)] as string,
    enemies: randomEnemyTeam({ level: teamLevel, count, trained: 1 }),
    reward: 1.15,
  };
}

export function chaosStage(teamLevel: number, mutator: Mutator): StageSetup {
  return {
    label: mutator.name,
    arena: "frozen",
    enemies: randomEnemyTeam({
      level: teamLevel + mutator.enemyLevelBonus,
      count: mutator.enemyCount,
      trained: 2,
      rarity: mutator.id === "zerog" ? "gold" : undefined,
    }),
    reward: mutator.goldMult,
  };
}

export function rollMutator(): Mutator {
  return MUTATORS[Math.floor(Math.random() * MUTATORS.length)] as Mutator;
}

export function enemyNames(stage: StageSetup): string[] {
  return stage.enemies.map((e) => ROBOT_MAP[e.id]?.name ?? e.id);
}
