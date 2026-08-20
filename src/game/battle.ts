import { ITEM_MAP } from "./config";
import {
  computeDamage,
  criticalChance,
  evasionChance,
  totalStats,
  type RobotSave,
} from "./engine";
import { ROBOT_MAP, type EffectType, type Skill } from "./robots";
import { defaultLoadout, MAX_LOADOUT } from "./skills";

export type Side = "player" | "enemy";

export interface ActiveEffect {
  type: EffectType;
  power: number;
  turns: number;
}

export interface Fighter {
  uid: string;
  robotId: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  str: number;
  def: number;
  agl: number;
  effects: ActiveEffect[];
  ai: boolean;
  /** ids das 4 habilidades levadas para a partida. */
  skillIds: string[];
  /** turnos restantes de postura de contra-ataque. */
  counter: number;
}

/** Escolhe um kit de 4 habilidades para um robô controlado pela IA. */
export function aiLoadout(robotId: string, seed: number): string[] {
  const kit = ROBOT_MAP[robotId].skills;
  const atk = kit.filter((s) => s.kind === "attack");
  const def = kit.filter((s) => s.kind === "defense");
  const pick = <T,>(list: T[], n: number, salt: number): T[] => {
    const out: T[] = [];
    const pool = [...list];
    let s2 = (seed + salt * 7919) % 2147483647 || 7;
    while (out.length < n && pool.length > 0) {
      s2 = (s2 * 48271) % 2147483647;
      out.push(pool.splice(s2 % pool.length, 1)[0]);
    }
    return out;
  };
  return [atk[0].id, ...pick(atk.slice(1), 2, 1).map((s) => s.id), ...pick(def, 1, 2).map((s) => s.id)];
}

export interface BattleSide {
  fighters: Fighter[];
  active: number;
  items: Record<string, number>;
}

export type Phase = "intro" | "menu" | "resolving" | "forced_swap" | "over";

export interface Battle {
  arena: string;
  turn: number;
  phase: Phase;
  result: "win" | "lose" | null;
  player: BattleSide;
  enemy: BattleSide;
  log: string[];
}

export type BattleAction =
  | { kind: "skill"; skillId: string }
  | { kind: "item"; itemId: string; targetIndex: number }
  | { kind: "swap"; index: number };

export type BattleEvent =
  | { t: "msg"; text: string }
  | { t: "clip"; side: Side; clip: "attack" | "damage" | "guard" | "enter" | "idle" }
  | { t: "vfx"; side: Side; url: string }
  | { t: "float"; side: Side; text: string; tone: "dmg" | "crit" | "heal" | "miss" | "info" }
  | { t: "sync"; battle: Battle }
  | { t: "faint"; side: Side }
  | { t: "end"; result: "win" | "lose" };

export function makeFighter(save: RobotSave, ai: boolean, uid: string): Fighter {
  const def = ROBOT_MAP[save.id];
  const st = totalStats(def, save, ai);
  const kitIds = new Set(def.skills.map((s) => s.id));
  const chosen = [
    ...new Set((save.loadout ?? []).filter((id) => kitIds.has(id))),
  ].slice(0, MAX_LOADOUT);
  const fallback = ai
    ? aiLoadout(save.id, save.level * 31 + save.id.length * 17)
    : defaultLoadout(def.skills);
  // kits parciais são completados com o padrão em vez de descartados
  const skillIds =
    chosen.length === MAX_LOADOUT
      ? chosen
      : [...chosen, ...fallback.filter((id) => !chosen.includes(id))].slice(0, MAX_LOADOUT);
  return {
    uid,
    robotId: save.id,
    name: def.name,
    level: save.level,
    hp: st.hp,
    maxHp: st.hp,
    mp: st.mp,
    maxMp: st.mp,
    str: st.str,
    def: st.def,
    agl: st.agl,
    effects: [],
    ai,
    skillIds,
    counter: 0,
  };
}

/** Habilidades realmente disponíveis para o lutador nesta partida. */
export function fighterSkills(f: Fighter): Skill[] {
  const kit = ROBOT_MAP[f.robotId].skills;
  return f.skillIds
    .map((id) => kit.find((s) => s.id === id))
    .filter((s): s is Skill => Boolean(s));
}

export function createBattle(args: {
  arena: string;
  playerTeam: RobotSave[];
  enemyTeam: RobotSave[];
  items: Record<string, number>;
}): Battle {
  return {
    arena: args.arena,
    turn: 1,
    phase: "intro",
    result: null,
    player: {
      fighters: args.playerTeam.map((s, i) => makeFighter(s, false, `p${i}`)),
      active: 0,
      items: { ...args.items },
    },
    enemy: {
      fighters: args.enemyTeam.map((s, i) => makeFighter(s, true, `e${i}`)),
      active: 0,
      items: {},
    },
    log: [],
  };
}

function clone(b: Battle): Battle {
  return structuredClone(b);
}

export function activeOf(b: Battle, side: Side): Fighter {
  const s = b[side];
  return s.fighters[s.active];
}

function alive(f: Fighter): boolean {
  return f.hp > 0;
}

function sumEffect(f: Fighter, type: EffectType): number {
  return f.effects.filter((e) => e.type === type).reduce((a, e) => a + e.power, 0);
}

function hasEffect(f: Fighter, type: EffectType): boolean {
  return f.effects.some((e) => e.type === type);
}

function effectiveStr(f: Fighter): number {
  const adr = sumEffect(f, "adrenalin");
  const weak = Math.min(60, sumEffect(f, "weakening"));
  return Math.max(1, Math.round((f.str * (100 + adr) * (100 - weak)) / 10000));
}

function damageReduction(f: Fighter): number {
  return Math.min(80, sumEffect(f, "damage_reduction"));
}

function skillOf(f: Fighter, skillId: string): Skill {
  const s = ROBOT_MAP[f.robotId].skills.find((x) => x.id === skillId);
  return s ?? ROBOT_MAP[f.robotId].skills[0];
}

function applyEffect(target: Fighter, type: EffectType, power: number, turns: number) {
  const existing = target.effects.find((e) => e.type === type);
  if (existing) {
    existing.turns = Math.max(existing.turns, turns);
    existing.power = Math.max(existing.power, power);
  } else {
    target.effects.push({ type, power, turns });
  }
}

const EFFECT_NAME: Record<EffectType, string> = {
  burn: "QUEIMANDO",
  poison: "ENVENENADO",
  paralyze: "PARALISADO",
  blind: "CEGO",
  weakening: "ENFRAQUECIDO",
  drain: "DRENADO",
  damage_reduction: "BLINDADO",
  adrenalin: "ADRENALINA",
  hp_regen: "REPARO",
  trapped: "PRESO",
};

export function effectLabel(type: EffectType): string {
  return EFFECT_NAME[type];
}

// ---------------------------------------------------------------- IA
export function chooseAIAction(b: Battle): BattleAction {
  const me = activeOf(b, "enemy");
  const foe = activeOf(b, "player");
  const skills = fighterSkills(me);
  const usable = skills.filter((s) => me.mp >= s.mp);
  const hpPct = me.hp / me.maxHp;

  // troca defensiva quando muito ferido e há reserva saudável
  const bench = b.enemy.fighters
    .map((f, i) => ({ f, i }))
    .filter((x) => x.i !== b.enemy.active && alive(x.f) && x.f.hp / x.f.maxHp > 0.6);
  if (hpPct < 0.2 && bench.length > 0 && Math.random() < 0.35 && !hasEffect(me, "trapped")) {
    return { kind: "swap", index: bench[0].i };
  }

  const guard = usable.find((s) => s.kind === "defense");
  if (guard && hpPct < 0.35 && !hasEffect(me, "damage_reduction") && Math.random() < 0.45) {
    return { kind: "skill", skillId: guard.id };
  }

  const special = usable.find((s) => s.effect);
  if (special && !hasEffect(foe, special.effect!.type) && Math.random() < 0.4) {
    return { kind: "skill", skillId: special.id };
  }
  const strong = usable.find((s) => s.kind === "attack" && s.power > 1.4);
  if (strong && Math.random() < 0.6) return { kind: "skill", skillId: strong.id };
  return { kind: "skill", skillId: skills[0].id };
}

// ---------------------------------------------------------------- resolução
interface Ctx {
  b: Battle;
  events: BattleEvent[];
}

function push(ctx: Ctx, e: BattleEvent) {
  ctx.events.push(e);
}

function sync(ctx: Ctx) {
  push(ctx, { t: "sync", battle: clone(ctx.b) });
}

function msg(ctx: Ctx, text: string) {
  ctx.b.log.push(text);
  push(ctx, { t: "msg", text });
}

function other(side: Side): Side {
  return side === "player" ? "enemy" : "player";
}

function doAttack(ctx: Ctx, side: Side, skill: Skill) {
  const atk = activeOf(ctx.b, side);
  const vicSide = other(side);
  const vic = activeOf(ctx.b, vicSide);
  atk.mp = Math.max(0, atk.mp - skill.mp);
  msg(ctx, `${atk.name} usa ${skill.name}!`);
  push(ctx, { t: "clip", side, clip: "attack" });

  const blind = sumEffect(atk, "blind") / 100;
  const evade = Math.min(0.85, evasionChance(atk.agl, vic.agl) + blind);
  if (Math.random() < evade) {
    push(ctx, { t: "float", side: vicSide, text: "ERROU", tone: "miss" });
    msg(ctx, `${vic.name} desviou!`);
    sync(ctx);
    return;
  }

  const crit = Math.random() < criticalChance(atk.agl, vic.agl);
  const dmg = computeDamage({
    attackerStr: effectiveStr(atk),
    attackerLevel: atk.level,
    victimDef: vic.def,
    skillPower: skill.power,
    critical: crit,
    damageReduction: damageReduction(vic),
  });
  vic.hp = Math.max(0, vic.hp - dmg);
  push(ctx, { t: "vfx", side: vicSide, url: skill.vfx });
  push(ctx, { t: "clip", side: vicSide, clip: "damage" });
  push(ctx, {
    t: "float",
    side: vicSide,
    text: crit ? `CRITICO -${dmg}` : `-${dmg}`,
    tone: crit ? "crit" : "dmg",
  });
  if (crit) msg(ctx, "Golpe critico!");

  if (vic.counter > 0 && vic.hp > 0) {
    const back = Math.max(1, Math.round(dmg * 0.35));
    atk.hp = Math.max(0, atk.hp - back);
    push(ctx, { t: "vfx", side, url: "/vfx/thunder.png" });
    push(ctx, { t: "float", side, text: `CONTRA -${back}`, tone: "crit" });
    msg(ctx, `${vic.name} revidou o golpe!`);
  }

  if (skill.effect && vic.hp > 0 && Math.random() < skill.effect.chance) {
    const ef = skill.effect;
    if (ef.type === "hp_regen" || ef.type === "adrenalin" || ef.type === "damage_reduction") {
      applyEffect(atk, ef.type, ef.power, ef.turns);
      push(ctx, { t: "float", side, text: EFFECT_NAME[ef.type], tone: "info" });
      msg(ctx, `${atk.name}: ${EFFECT_NAME[ef.type]}`);
    } else {
      applyEffect(vic, ef.type, ef.power, ef.turns);
      push(ctx, { t: "float", side: vicSide, text: EFFECT_NAME[ef.type], tone: "info" });
      msg(ctx, `${vic.name} esta ${EFFECT_NAME[ef.type]}!`);
    }
  }
  sync(ctx);
}

function doDefense(ctx: Ctx, side: Side, skill: Skill) {
  const f = activeOf(ctx.b, side);
  f.mp = Math.max(0, f.mp - skill.mp);
  const spec = skill.defense ?? { kind: "guard" as const, turns: 2 };
  msg(ctx, `${f.name} usa ${skill.name}!`);
  push(ctx, { t: "clip", side, clip: "guard" });
  push(ctx, { t: "vfx", side, url: skill.vfx });

  if (spec.kind === "guard") {
    applyEffect(f, "damage_reduction", skill.power, spec.turns);
    push(ctx, { t: "float", side, text: `-${skill.power}% DANO`, tone: "info" });
  } else if (spec.kind === "repair") {
    const heal = Math.round((f.maxHp * (spec.percent ?? 30)) / 100);
    f.hp = Math.min(f.maxHp, f.hp + heal);
    applyEffect(f, "hp_regen", 6, spec.turns);
    push(ctx, { t: "float", side, text: `+${heal}`, tone: "heal" });
  } else if (spec.kind === "purge") {
    const had = f.effects.length;
    f.effects = f.effects.filter(
      (e) => e.type === "adrenalin" || e.type === "damage_reduction" || e.type === "hp_regen",
    );
    applyEffect(f, "damage_reduction", skill.power, spec.turns);
    push(ctx, { t: "float", side, text: had ? "PURIFICADO" : "BLINDADO", tone: "heal" });
  } else if (spec.kind === "overcharge") {
    const gain = Math.round((f.maxMp * (spec.percent ?? 30)) / 100);
    f.mp = Math.min(f.maxMp, f.mp + gain);
    applyEffect(f, "adrenalin", 30, spec.turns);
    push(ctx, { t: "float", side, text: `+${gain} MP`, tone: "info" });
  } else {
    applyEffect(f, "damage_reduction", skill.power, spec.turns);
    f.counter = spec.turns + 1;
    push(ctx, { t: "float", side, text: "CONTRA-GOLPE", tone: "info" });
  }
  sync(ctx);
}

function doItem(ctx: Ctx, side: Side, itemId: string, targetIndex: number) {
  const s = ctx.b[side];
  const item = ITEM_MAP[itemId];
  if (!item || (s.items[itemId] ?? 0) <= 0) return;
  const target = s.fighters[targetIndex] ?? s.fighters[s.active];
  s.items[itemId] = (s.items[itemId] ?? 0) - 1;
  const ef = item.effect;
  if (ef.kind === "heal" && target.hp > 0) {
    const amount = Math.round((target.maxHp * ef.percent) / 100);
    target.hp = Math.min(target.maxHp, target.hp + amount);
    push(ctx, { t: "vfx", side, url: "/vfx/heal.png" });
    push(ctx, { t: "float", side, text: `+${amount}`, tone: "heal" });
  } else if (ef.kind === "mp") {
    const amount = Math.round((target.maxMp * ef.percent) / 100);
    target.mp = Math.min(target.maxMp, target.mp + amount);
    push(ctx, { t: "float", side, text: `+${amount} MP`, tone: "info" });
  } else if (ef.kind === "revive" && target.hp <= 0) {
    target.hp = Math.round((target.maxHp * ef.percent) / 100);
    target.effects = [];
    push(ctx, { t: "vfx", side, url: "/vfx/levelup.png" });
    push(ctx, { t: "float", side, text: "REATIVADO", tone: "heal" });
  } else if (ef.kind === "buff") {
    applyEffect(target, ef.type, ef.power, ef.turns);
    push(ctx, { t: "vfx", side, url: "/vfx/shield.png" });
    push(ctx, { t: "float", side, text: EFFECT_NAME[ef.type], tone: "info" });
  } else if (ef.kind === "purify") {
    target.effects = target.effects.filter(
      (e) => e.type === "adrenalin" || e.type === "damage_reduction" || e.type === "hp_regen",
    );
    push(ctx, { t: "vfx", side, url: "/vfx/heal.png" });
    push(ctx, { t: "float", side, text: "PURIFICADO", tone: "heal" });
  }
  msg(ctx, `${side === "player" ? "Voce" : "Inimigo"} usou ${item.name}.`);
  sync(ctx);
}

function doSwap(ctx: Ctx, side: Side, index: number) {
  const s = ctx.b[side];
  const target = s.fighters[index];
  if (!target || !alive(target) || index === s.active) return;
  const current = s.fighters[s.active];
  if (hasEffect(current, "trapped") && alive(current)) {
    msg(ctx, `${current.name} esta preso e nao pode sair!`);
    sync(ctx);
    return;
  }
  s.active = index;
  msg(ctx, `${target.name} entra em campo!`);
  push(ctx, { t: "clip", side, clip: "enter" });
  sync(ctx);
}

function runAction(ctx: Ctx, side: Side, action: BattleAction) {
  const actor = activeOf(ctx.b, side);
  if (!alive(actor)) return;
  if (hasEffect(actor, "paralyze") && action.kind === "skill") {
    msg(ctx, `${actor.name} esta paralisado e perdeu o turno!`);
    push(ctx, { t: "float", side, text: "PARALISADO", tone: "info" });
    sync(ctx);
    return;
  }
  if (action.kind === "skill") {
    const skill = skillOf(actor, action.skillId);
    if (actor.mp < skill.mp) {
      msg(ctx, `${actor.name} sem energia para ${skill.name}.`);
      sync(ctx);
      return;
    }
    if (skill.kind === "defense") doDefense(ctx, side, skill);
    else doAttack(ctx, side, skill);
  } else if (action.kind === "item") {
    doItem(ctx, side, action.itemId, action.targetIndex);
  } else {
    doSwap(ctx, side, action.index);
  }
}

function tickEffects(ctx: Ctx, side: Side) {
  const f = activeOf(ctx.b, side);
  if (!alive(f)) return;
  for (const e of f.effects) {
    if (e.type === "burn" || e.type === "poison") {
      const dmg = Math.max(1, Math.round((f.maxHp * e.power) / 100 / 2) + e.power);
      f.hp = Math.max(0, f.hp - dmg);
      push(ctx, { t: "float", side, text: `-${dmg} ${EFFECT_NAME[e.type]}`, tone: "dmg" });
    } else if (e.type === "hp_regen") {
      const heal = Math.max(1, Math.round((f.maxHp * e.power) / 100));
      f.hp = Math.min(f.maxHp, f.hp + heal);
      push(ctx, { t: "float", side, text: `+${heal}`, tone: "heal" });
    } else if (e.type === "drain") {
      const loss = Math.max(1, Math.round((f.maxMp * e.power) / 100));
      f.mp = Math.max(0, f.mp - loss);
    }
    e.turns -= 1;
  }
  f.effects = f.effects.filter((e) => e.turns > 0);
  if (f.counter > 0) f.counter -= 1;
  sync(ctx);
}

function handleFaints(ctx: Ctx) {
  for (const side of ["player", "enemy"] as Side[]) {
    const s = ctx.b[side];
    const f = s.fighters[s.active];
    if (alive(f)) continue;
    msg(ctx, `${f.name} foi desativado!`);
    push(ctx, { t: "vfx", side, url: "/vfx/explosion.png" });
    push(ctx, { t: "faint", side });
    const next = s.fighters.findIndex((x) => alive(x));
    if (next >= 0) {
      if (side === "enemy") {
        s.active = next;
        msg(ctx, `${s.fighters[next].name} entra em campo!`);
        push(ctx, { t: "clip", side, clip: "enter" });
      } else {
        ctx.b.phase = "forced_swap";
      }
    }
    sync(ctx);
  }
}

function checkEnd(ctx: Ctx) {
  const playerAlive = ctx.b.player.fighters.some(alive);
  const enemyAlive = ctx.b.enemy.fighters.some(alive);
  if (!enemyAlive) {
    ctx.b.phase = "over";
    ctx.b.result = "win";
    msg(ctx, "VITORIA!");
    push(ctx, { t: "end", result: "win" });
  } else if (!playerAlive) {
    ctx.b.phase = "over";
    ctx.b.result = "lose";
    msg(ctx, "DERROTA...");
    push(ctx, { t: "end", result: "lose" });
  }
  sync(ctx);
}

function priority(action: BattleAction): number {
  if (action.kind === "item") return 3;
  if (action.kind === "swap") return 2;
  return 1;
}

export function resolveTurn(
  battle: Battle,
  playerAction: BattleAction,
): { battle: Battle; events: BattleEvent[] } {
  const ctx: Ctx = { b: clone(battle), events: [] };
  ctx.b.phase = "resolving";
  const enemyAction = chooseAIAction(ctx.b);

  const steps: { side: Side; action: BattleAction }[] = [
    { side: "player", action: playerAction },
    { side: "enemy", action: enemyAction },
  ];
  const order = steps.sort((a, b) => {
    const dp = priority(b.action) - priority(a.action);
    if (dp !== 0) return dp;
    return activeOf(ctx.b, b.side).agl - activeOf(ctx.b, a.side).agl;
  });


  for (const step of order) {
    if (ctx.b.result) break;
    runAction(ctx, step.side, step.action);
    handleFaints(ctx);
    checkEnd(ctx);
    if (ctx.b.result) break;
  }

  if (!ctx.b.result) {
    tickEffects(ctx, "player");
    tickEffects(ctx, "enemy");
    handleFaints(ctx);
    checkEnd(ctx);
  }

  if (!ctx.b.result) {
    ctx.b.turn += 1;
    if ((ctx.b.phase as string) !== "forced_swap") ctx.b.phase = "menu";
    sync(ctx);
  }

  return { battle: ctx.b, events: ctx.events };
}

export function applyForcedSwap(
  battle: Battle,
  index: number,
): { battle: Battle; events: BattleEvent[] } {
  const ctx: Ctx = { b: clone(battle), events: [] };
  const s = ctx.b.player;
  if (s.fighters[index] && alive(s.fighters[index])) {
    s.active = index;
    ctx.b.phase = "menu";
    msg(ctx, `${s.fighters[index].name} entra em campo!`);
    push(ctx, { t: "clip", side: "player", clip: "enter" });
  }
  sync(ctx);
  return { battle: ctx.b, events: ctx.events };
}
