// Kit completo de habilidades: 10 ataques + 5 defesas por robô.
// Tudo é derivado de forma determinística do id/elemento do robô, então cada
// chassi recebe nomes, efeitos e números diferentes dos demais.

export type EffectType =
  | "burn"
  | "poison"
  | "paralyze"
  | "blind"
  | "weakening"
  | "drain"
  | "damage_reduction"
  | "adrenalin"
  | "hp_regen"
  | "trapped";

export interface SkillEffect {
  type: EffectType;
  power: number;
  turns: number;
  chance: number;
}

export type DefenseKind = "guard" | "repair" | "purge" | "overcharge" | "counter";

export interface DefenseSpec {
  kind: DefenseKind;
  /** % de HP/MP recuperado (repair / overcharge). */
  percent?: number;
  turns: number;
}

export interface Skill {
  id: string;
  name: string;
  kind: "attack" | "defense";
  power: number;
  mp: number;
  vfx: string;
  desc: string;
  effect?: SkillEffect;
  defense?: DefenseSpec;
}

export const VFX = {
  impact: "/vfx/impact.png",
  slash: "/vfx/slash.png",
  explosion: "/vfx/explosion.png",
  heal: "/vfx/heal.png",
  shield: "/vfx/shield.png",
  levelup: "/vfx/levelup.png",
  void: "/vfx/void.png",
  thunder: "/vfx/thunder.png",
} as const;

export const EFFECT_LABEL: Record<EffectType, string> = {
  burn: "queimadura",
  poison: "veneno",
  paralyze: "paralisia",
  blind: "cegueira",
  weakening: "enfraquecimento",
  drain: "dreno de energia",
  damage_reduction: "blindagem",
  adrenalin: "adrenalina",
  hp_regen: "auto-reparo",
  trapped: "aprisionamento",
};

// ------------------------------------------------------------------ RNG
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number): () => number {
  let s = seed || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

function shuffle<T>(list: readonly T[], rand: () => number): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ------------------------------------------------------------- vocabulário
const VERBS = [
  "RAJADA",
  "IMPACTO",
  "VORTICE",
  "ONDA",
  "LANCA",
  "GARRA",
  "PULSO",
  "FURIA",
  "ECLIPSE",
  "TORMENTA",
  "ESTILHACO",
  "JULGAMENTO",
  "DILUVIO",
  "CARGA",
  "ROTOR",
  "ESPIRAL",
  "DETONACAO",
  "ENXAME",
  "CANHAO",
  "MORDIDA",
  "CHICOTE",
  "SENTENCA",
  "FENDA",
  "MERIDIANO",
] as const;

const EPITHETS = [
  "ZERO",
  "OMEGA",
  "PRIMORDIAL",
  "CARMESIM",
  "CROMADO",
  "INFINITO",
  "TITANICO",
  "SOMBRIO",
  "SIDERAL",
  "FINAL",
  "VORAZ",
  "COLOSSAL",
] as const;

const OFFENSIVE_EFFECTS: EffectType[] = [
  "burn",
  "poison",
  "paralyze",
  "blind",
  "weakening",
  "drain",
  "trapped",
];

const DEFENSE_LABEL: Record<DefenseKind, string> = {
  guard: "GUARDA",
  repair: "REPARO",
  purge: "PURGA",
  overcharge: "SOBRECARGA",
  counter: "CONTRA-GOLPE",
};

export interface KitInput {
  id: string;
  element: string;
  /** [básico, forte, especial, defesa] — nomes autorais do blueprint. */
  names: [string, string, string, string];
  effect: SkillEffect;
  vfxStrong: string;
  vfxSpecial: string;
}

interface AtkTier {
  key: string;
  power: number;
  mp: number;
  vfx: string;
  role: "raw" | "effect" | "drain" | "buff" | "ultimate";
}

export function buildKit(input: KitInput): Skill[] {
  const rand = rng(hash(input.id));
  const el = input.element;
  const verbs = shuffle(VERBS, rand);
  const epithets = shuffle(EPITHETS, rand);
  const pool = shuffle(
    OFFENSIVE_EFFECTS.filter((t) => t !== input.effect.type),
    rand,
  );
  const effects: EffectType[] = [input.effect.type, ...pool].slice(0, 6);

  const strongVfx = input.vfxStrong;
  const specialVfx = input.vfxSpecial;

  const tiers: AtkTier[] = [
    { key: "basic", power: 4, mp: 0, vfx: VFX.impact, role: "raw" },
    { key: "strong", power: 7, mp: 7, vfx: strongVfx, role: "raw" },
    { key: "special", power: 5.5, mp: 12, vfx: specialVfx, role: "effect" },
    { key: "quick", power: 3.2, mp: 0, vfx: VFX.slash, role: "raw" },
    { key: "heavy", power: 8.4, mp: 17, vfx: strongVfx, role: "effect" },
    { key: "elemental", power: 6.1, mp: 13, vfx: specialVfx, role: "effect" },
    { key: "pierce", power: 6.7, mp: 15, vfx: VFX.slash, role: "effect" },
    { key: "siphon", power: 5.2, mp: 11, vfx: VFX.void, role: "drain" },
    { key: "overdrive", power: 4.8, mp: 10, vfx: VFX.levelup, role: "buff" },
    { key: "ultimate", power: 10.6, mp: 28, vfx: VFX.explosion, role: "ultimate" },
  ];

  const skills: Skill[] = [];
  let effIndex = 0;

  tiers.forEach((t, i) => {
    const name =
      i === 0
        ? input.names[0]
        : i === 1
          ? input.names[1]
          : i === 2
            ? input.names[2]
            : i % 2 === 0
              ? `${verbs[i]} DE ${el}`
              : `${verbs[i]} ${epithets[i]}`;

    let effect: SkillEffect | undefined;
    let desc = "";

    if (t.role === "raw") {
      desc =
        t.mp === 0
          ? "Golpe direto, sem custo de energia."
          : "Ataque pesado de alto dano bruto.";
    } else if (t.role === "effect") {
      const type = effects[effIndex % effects.length];
      effIndex += 1;
      const base = input.effect;
      effect = {
        type,
        power:
          type === "paralyze" || type === "trapped"
            ? 0
            : Math.round((base.power || 12) * (0.7 + rand() * 0.9) + 6),
        turns: 2 + Math.floor(rand() * 3),
        chance: Math.min(0.9, 0.45 + rand() * 0.4),
      };
      desc = `Ataque de ${el.toLowerCase()} que aplica ${EFFECT_LABEL[type]}.`;
    } else if (t.role === "drain") {
      effect = { type: "drain", power: 12 + Math.round(rand() * 12), turns: 3, chance: 0.85 };
      desc = "Suga a energia do alvo a cada turno.";
    } else if (t.role === "buff") {
      effect = { type: "adrenalin", power: 25 + Math.round(rand() * 25), turns: 3, chance: 1 };
      desc = "Ataque que sobrecarrega os servos e aumenta a força.";
    } else {
      const type = effects[(effIndex + 2) % effects.length];
      effect = {
        type,
        power: type === "paralyze" || type === "trapped" ? 0 : 20 + Math.round(rand() * 14),
        turns: 3 + Math.floor(rand() * 2),
        chance: 0.95,
      };
      desc = `Golpe definitivo devastador com ${EFFECT_LABEL[type]} garantido.`;
    }

    skills.push({
      id: `${input.id}_${t.key}`,
      name,
      kind: "attack",
      power: t.power,
      mp: t.mp,
      vfx: t.vfx,
      desc,
      effect,
    });
  });

  // ------------------------------------------------------------- defesas
  const defKinds: DefenseKind[] = ["guard", "repair", "purge", "overcharge", "counter"];
  const defVerbs = shuffle(VERBS, rand);
  defKinds.forEach((kind, i) => {
    const name = i === 0 ? input.names[3] : `${DEFENSE_LABEL[kind]} ${defVerbs[i + 3]}`;
    let power = 0;
    let mp = 6;
    let desc = "";
    let spec: DefenseSpec = { kind, turns: 2 };
    if (kind === "guard") {
      power = 45 + Math.round(rand() * 15);
      mp = 6;
      spec = { kind, turns: 2 };
      desc = `Postura defensiva: -${power}% de dano por 2 turnos.`;
    } else if (kind === "repair") {
      power = 18;
      mp = 11;
      const pct = 26 + Math.round(rand() * 14);
      spec = { kind, percent: pct, turns: 3 };
      desc = `Repara ${pct}% do HP e ativa auto-reparo por 3 turnos.`;
    } else if (kind === "purge") {
      power = 20;
      mp = 8;
      spec = { kind, turns: 2 };
      desc = "Limpa todos os efeitos negativos e blinda levemente.";
    } else if (kind === "overcharge") {
      power = 0;
      mp = 0;
      const pct = 28 + Math.round(rand() * 16);
      spec = { kind, percent: pct, turns: 3 };
      desc = `Recarrega ${pct}% do MP e entra em adrenalina por 3 turnos.`;
    } else {
      power = 30;
      mp = 12;
      spec = { kind, turns: 2 };
      desc = "Postura de contra-ataque: reduz dano e devolve parte dele.";
    }
    skills.push({
      id: `${input.id}_def_${kind}`,
      name,
      kind: "defense",
      power,
      mp,
      vfx: kind === "repair" ? VFX.heal : kind === "counter" ? VFX.thunder : VFX.shield,
      desc,
      defense: spec,
    });
  });

  return skills;
}

/** Os 4 slots padrão de um robô (usados quando o jogador ainda não montou o kit). */
export function defaultLoadout(skills: Skill[]): string[] {
  const atk = skills.filter((s) => s.kind === "attack");
  const def = skills.filter((s) => s.kind === "defense");
  return [atk[0].id, atk[1].id, atk[2].id, def[0].id];
}

export const MAX_LOADOUT = 4;
