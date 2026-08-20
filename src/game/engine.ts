import { AI_STATS_REDUCTION, GENERAL, ROBOT_STATS } from "./config";
import type { Ratios, RobotDef, Skill } from "./robots";

export interface TrainedStats {
  str: number;
  def: number;
  agl: number;
}

export interface RobotSave {
  id: string;
  level: number;
  xp: number;
  trained: TrainedStats;
  /** 4 habilidades escolhidas para a partida. */
  loadout?: string[];
}

export interface FullStats {
  hp: number;
  mp: number;
  str: number;
  def: number;
  agl: number;
}

// XP -------------------------------------------------------------------------
export function robotMaxXP(level: number): number {
  return Math.trunc(0.8 * (level + 1) ** 3);
}

export function playerMaxXP(level: number): number {
  return Math.trunc(0.8 * (level + 1) ** 3) * 3;
}

// STATS ----------------------------------------------------------------------
function statValue(base: number, delta: number, level: number, ratio: number): number {
  return Math.trunc((base + (level - 1) * delta + level / 2) * (ratio / 100));
}

export function baseStats(ratios: Ratios, level: number): FullStats {
  const s = ROBOT_STATS;
  return {
    hp: statValue(s.baseHP, s.deltaHP, level, ratios.hp),
    mp: statValue(s.baseMP, s.deltaMP, level, ratios.mp),
    str: statValue(s.baseSTR, s.deltaSTR, level, ratios.str),
    def: statValue(s.baseDEF, s.deltaDEF, level, ratios.def),
    agl: statValue(s.baseAGL, s.deltaAGL, level, ratios.ag),
  };
}

export function maxTrained(ratios: Ratios, level: number): TrainedStats {
  const s = ROBOT_STATS;
  return {
    str: Math.trunc((level * s.trainingDeltaSTR + level / 2) * (ratios.str / 100)),
    def: Math.trunc((level * s.trainingDeltaDEF + level / 2) * (ratios.def / 100)),
    agl: Math.trunc((level * s.trainingDeltaAGL + level / 2) * (ratios.ag / 100)),
  };
}

export function totalStats(def: RobotDef, save: RobotSave, aiControlled = false): FullStats {
  const base = baseStats(def.ratios, save.level);
  let out: FullStats = {
    hp: base.hp,
    mp: base.mp,
    str: base.str + save.trained.str,
    def: base.def + save.trained.def,
    agl: base.agl + save.trained.agl,
  };
  if (aiControlled) {
    const band =
      AI_STATS_REDUCTION.find((b) => save.level <= b.upToLevel) ??
      AI_STATS_REDUCTION[AI_STATS_REDUCTION.length - 1];
    const k = 1 - band.reduction;
    out = {
      hp: Math.max(1, Math.trunc(out.hp * k)),
      mp: Math.max(1, Math.trunc(out.mp * k)),
      str: Math.max(1, Math.trunc(out.str * k)),
      def: Math.max(1, Math.trunc(out.def * k)),
      agl: Math.max(1, Math.trunc(out.agl * k)),
    };
  }
  return out;
}

// COMBATE --------------------------------------------------------------------
export function evasionChance(attackerAgl: number, victimAgl: number): number {
  const raw = (victimAgl - attackerAgl) / 2 / 100 + GENERAL.evasion_base_chance;
  return Math.min(Math.max(raw, 0), GENERAL.evasion_max_chance);
}

export function criticalChance(attackerAgl: number, victimAgl: number): number {
  const raw = (attackerAgl - victimAgl) / 2 / 100 + GENERAL.critical_base_chance;
  return Math.min(Math.max(raw, 0), GENERAL.critical_max_chance);
}

export function computeDamage(args: {
  attackerStr: number;
  attackerLevel: number;
  victimDef: number;
  skillPower: number;
  critical: boolean;
  damageReduction: number;
}): number {
  let dmg =
    args.attackerStr *
    ((1 + (args.attackerLevel - 1) * 0.1) / Math.max(1, args.victimDef)) *
    args.skillPower;
  if (args.critical) {
    dmg = dmg * GENERAL.critical_multiplier + GENERAL.critical_base_damage;
  }
  dmg *= (100 - args.damageReduction) / 100;
  return Math.max(1, Math.round(dmg));
}

export function fightReward(
  ratios: Ratios,
  level: number,
): { gold: number; xp: number } {
  return {
    gold: Math.round((ratios.mv * level * 1.5) / 1),
    xp: Math.round((ratios.xv * level * 1.5) / 3) + 2,
  };
}

export function grantXP(
  save: RobotSave,
  amount: number,
): { save: RobotSave; levelsGained: number } {
  let { level, xp } = save;
  let gained = 0;
  xp += amount;
  while (level < GENERAL.max_level && xp >= robotMaxXP(level)) {
    xp -= robotMaxXP(level);
    level += 1;
    gained += 1;
  }
  if (level >= GENERAL.max_level) xp = Math.min(xp, robotMaxXP(GENERAL.max_level) - 1);
  return { save: { ...save, level, xp }, levelsGained: gained };
}

export function skillUsable(skill: Skill, mp: number): boolean {
  return mp >= skill.mp;
}
