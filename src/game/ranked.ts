import type { RobotSave } from "./engine";
import { randomEnemyTeam, type StageSetup } from "./modes";
import { ROBOT_MAP, ROBOTS } from "./robots";

// ---------------------------------------------------------------- estrutura
export interface RankTier {
  id: string;
  name: string;
  color: string;
  emblem: string;
  /** tiers apex não têm divisões. */
  apex?: boolean;
  desc: string;
}

export const TIERS: RankTier[] = [
  { id: "sucata", name: "SUCATA", color: "#8a7b6b", emblem: "/ranks/sucata.png", desc: "Ferro-velho do circuito. Todo campeão começa aqui." },
  { id: "ferro", name: "FERRO", color: "#9aa4b0", emblem: "/ranks/ferro.png", desc: "Chassi remendado, mas já aguenta pancada." },
  { id: "bronze", name: "BRONZE", color: "#c9803f", emblem: "/ranks/bronze.png", desc: "Pilotos que já entendem o ritmo do turno." },
  { id: "prata", name: "PRATA", color: "#cfd8e3", emblem: "/ranks/prata.png", desc: "Loadouts afiados e leitura de energia." },
  { id: "ouro", name: "OURO", color: "#ffc43a", emblem: "/ranks/ouro.png", desc: "Circuito profissional. Erro custa a série." },
  { id: "platina", name: "PLATINA", color: "#35e2f0", emblem: "/ranks/platina.png", desc: "Elite regional, reatores calibrados." },
  { id: "diamante", name: "DIAMANTE", color: "#7ad3ff", emblem: "/ranks/diamante.png", desc: "Menos de 1% dos pilotos chega aqui." },
  { id: "mestre", name: "MESTRE", color: "#a97bff", emblem: "/ranks/mestre.png", desc: "Domínio total do kit de 4 habilidades." },
  { id: "graomestre", name: "GRAO-MESTRE", color: "#ff5ea8", emblem: "/ranks/graomestre.png", apex: true, desc: "Apex. Só se sobe destruindo outro apex." },
  { id: "lenda", name: "LENDA", color: "#ff8a3a", emblem: "/ranks/lenda.png", apex: true, desc: "Nome gravado no núcleo da arena." },
  { id: "singularidade", name: "SINGULARIDADE", color: "#ffffff", emblem: "/ranks/singularidade.png", apex: true, desc: "O topo absoluto do servidor." },
];

export const TIER_MAP: Record<string, RankTier> = Object.fromEntries(
  TIERS.map((t) => [t.id, t]),
);

export interface RankDef {
  index: number;
  tier: RankTier;
  division: number; // 0 = apex
  name: string;
  short: string;
  /** PR necessários para promover a partir deste rank. */
  prToPromote: number;
  /** ouro pago ao alcançar o rank pela primeira vez na temporada. */
  reward: number;
  /** nível relativo do adversário. */
  power: number;
  /** primeiro rank de um tier (entrada exige série de promoção). */
  tierEntry: boolean;
}

const DIV_LABEL = ["", "I", "II", "III"];

function buildRanks(): RankDef[] {
  const out: RankDef[] = [];
  for (const tier of TIERS) {
    const divisions = tier.apex ? [0] : [3, 2, 1];
    divisions.forEach((division, di) => {
      const index = out.length;
      out.push({
        index,
        tier,
        division,
        name: tier.apex ? tier.name : `${tier.name} ${DIV_LABEL[division]}`,
        short: tier.apex ? tier.name.slice(0, 3) : `${tier.name.slice(0, 3)}${DIV_LABEL[division]}`,
        prToPromote: tier.apex ? 250 : 100,
        reward: 120 + index * 95 + (tier.apex ? 1500 : 0),
        power: index,
        tierEntry: di === 0,
      });
    });
  }
  return out;
}

export const RANKS: RankDef[] = buildRanks();
export const TOP_RANK = RANKS.length - 1;
export const PLACEMENT_MATCHES = 5;
/** série de promoção entre tiers: melhor de 3. */
export const PROMO_WINS = 2;
export const PROMO_LOSSES = 2;

export function rankAt(index: number): RankDef {
  return RANKS[Math.max(0, Math.min(TOP_RANK, index))] as RankDef;
}

export function nextTierEntry(index: number): RankDef | null {
  for (let i = index + 1; i <= TOP_RANK; i += 1) {
    const r = rankAt(i);
    if (r.tierEntry) return r;
  }
  return null;
}

// -------------------------------------------------------------- arquétipos
export interface Archetype {
  id: string;
  name: string;
  desc: string;
  /** ajuste de quantidade de inimigos. */
  count: number;
  /** ajuste de nível. */
  level: number;
  /** treino extra dos inimigos. */
  trained: number;
  color: string;
}

export const ARCHETYPES: Archetype[] = [
  { id: "aggro", name: "ESQUADRAO AGRESSOR", desc: "Poucos chassis, mas absurdamente fortes. Trocas rápidas e letais.", count: -1, level: 3, trained: 2, color: "#ff5b4d" },
  { id: "horde", name: "MATILHA", desc: "Muitos alvos mais fracos: sobrecarrega sua energia com o volume.", count: 1, level: -2, trained: 0, color: "#57d76a" },
  { id: "bastion", name: "MURALHA", desc: "Blindagem pesada e reparo constante. Lutas longas de desgaste.", count: 0, level: 1, trained: 4, color: "#7ad3ff" },
  { id: "tactic", name: "CELULA TATICA", desc: "Composição equilibrada, treinada para punir erro de turno.", count: 0, level: 0, trained: 2, color: "#35e2f0" },
  { id: "prototype", name: "PROTOTIPO", desc: "Chassi experimental raro escoltado por unidades de teste.", count: 0, level: 2, trained: 3, color: "#a97bff" },
];

// ------------------------------------------------------------------- estado
export interface RankedMatchLog {
  win: boolean;
  delta: number;
  opponent: string;
  rankName: string;
  /** rótulo curto do contexto: RANQUEADA, SERIE, CLASSIF. */
  kind: "ranked" | "promo" | "placement";
  mvp?: string;
}

export interface PromoSeries {
  targetIndex: number;
  wins: number;
  losses: number;
}

/** Nêmesis: piloto que te venceu e volta a aparecer na fila. */
export interface RivalState {
  pilot: string;
  rankIndex: number;
  robot: string;
  /** vitórias dele sobre você. */
  wins: number;
  /** suas vitórias sobre ele. */
  losses: number;
}

export interface RankedState {
  season: number;
  placementsDone: number;
  placementWins: number;
  rankIndex: number;
  pr: number;
  /** MMR oculto usado no matchmaking. */
  mmr: number;
  /** escudo de rebaixamento: partidas de proteção restantes no piso do rank. */
  shield: number;
  wins: number;
  losses: number;
  streak: number;
  bestStreak: number;
  bestRankIndex: number;
  claimed: number[];
  history: RankedMatchLog[];
  promo: PromoSeries | null;
  /** partidas jogadas na temporada (usado no ritmo de recompensa). */
  matches: number;
  /** vitórias perfeitas (sem perder nenhum robô). */
  flawless: number;
  seasonStartedAt: number;
  /** missões da temporada já coletadas. */
  missionsClaimed: string[];
  /** nêmesis atual da temporada. */
  rival: RivalState | null;
  /** nêmesis derrotados na revanche. */
  nemesisBeaten: number;
}

export function initialRanked(): RankedState {
  return {
    season: 1,
    placementsDone: 0,
    placementWins: 0,
    rankIndex: 0,
    pr: 0,
    mmr: 450,
    shield: 0,
    wins: 0,
    losses: 0,
    streak: 0,
    bestStreak: 0,
    bestRankIndex: 0,
    claimed: [],
    history: [],
    promo: null,
    matches: 0,
    flawless: 0,
    seasonStartedAt: Date.now(),
    missionsClaimed: [],
    rival: null,
    nemesisBeaten: 0,
  };
}

/** Garante todos os campos ao ler um save antigo. */
export function normalizeRanked(raw: unknown): RankedState {
  const base = initialRanked();
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Partial<RankedState>;
  const rankIndex = Math.max(0, Math.min(TOP_RANK, Math.round(r.rankIndex ?? 0)));
  return {
    ...base,
    ...r,
    rankIndex,
    pr: Math.max(0, Math.round(r.pr ?? 0)),
    mmr: Math.max(0, Math.round(r.mmr ?? rankIndex * 100 + (r.pr ?? 0) + 450)),
    claimed: Array.isArray(r.claimed) ? r.claimed.filter((n) => typeof n === "number") : [],
    history: Array.isArray(r.history) ? r.history.slice(0, 12) : [],
    promo: r.promo && typeof r.promo === "object" ? r.promo : null,
    missionsClaimed: Array.isArray(r.missionsClaimed)
      ? r.missionsClaimed.filter((s) => typeof s === "string")
      : [],
    rival: r.rival && typeof r.rival === "object" ? r.rival : null,
    nemesisBeaten: Math.max(0, Math.round(r.nemesisBeaten ?? 0)),
  };
}

export function isPlacing(r: RankedState): boolean {
  return r.placementsDone < PLACEMENT_MATCHES;
}

/** rating público (rank + PR) usado no leaderboard. */
export function ratingOf(r: RankedState): number {
  return r.rankIndex * 100 + r.pr;
}

// ------------------------------------------------------------ matchmaking
const ADJ = [
  "VOLT", "NOVA", "OMEGA", "KRON", "ZENIT", "HELIO", "ORBE", "DRAKO", "AXION", "VERTEX",
  "PYRA", "NIMBO", "SOLDA", "TITAN", "ECLIP", "RUNIK", "ZERO", "FUROR", "PRISMA", "MAGNO",
];
const SUF = ["X", "-7", " PRIME", " MK2", "OR", "ON", " ZR", "ATOR", " NEO", "IX"];

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function pilotName(seed: string): string {
  const h = hash(seed);
  return `${ADJ[h % ADJ.length]}${SUF[(h >> 5) % SUF.length]}`;
}

export interface RankedOpponent {
  pilot: string;
  rank: RankDef;
  /** diferença de rank (positivo = adversário mais forte). */
  spread: number;
  archetype: Archetype;
  /** MMR estimado do adversário. */
  mmr: number;
  stage: StageSetup;
  /** rótulo do contexto da partida. */
  context: "ranked" | "promo" | "placement";
  /** true quando o oponente é o seu nêmesis. */
  rival: boolean;
  /** chassi usado como retrato do piloto. */
  robot: string;
}

const RANKED_ARENAS = ["dojo", "orbital", "sky", "frozen", "volcano"];

function rarityFor(index: number): "gold" | "silver" | undefined {
  if (index >= 21) return "gold";
  if (index >= 12) return "silver";
  return undefined;
}

function clampRank(i: number): number {
  return Math.max(0, Math.min(TOP_RANK, i));
}

/**
 * Sorteia um oponente próximo do rank atual (±2 divisões).
 * Em série de promoção o adversário vem do tier alvo — sempre mais duro.
 */
export function matchmake(r: RankedState, teamLevel: number): RankedOpponent {
  const placing = isPlacing(r);
  const promo = !placing && r.promo ? r.promo : null;
  // nêmesis só aparece em partida ranqueada comum.
  const rival = !placing && !promo && r.rival && Math.random() < 0.4 ? r.rival : null;

  const base = placing
    ? clampRank(3 + r.placementsDone * 2)
    : promo
      ? promo.targetIndex
      : r.rankIndex;

  // ±2 divisões, enviesado para cima quando o MMR está acima do rank exibido.
  const mmrBias = Math.max(-1, Math.min(1, Math.round((r.mmr - (ratingOf(r) + 450)) / 90)));
  const spreadRoll = Math.round((Math.random() - 0.45) * 4) + (promo ? 1 : mmrBias);
  const index = rival ? clampRank(Math.max(rival.rankIndex, r.rankIndex)) : clampRank(base + spreadRoll);
  const rank = rankAt(index);
  const diff = index - (placing ? base : promo ? r.rankIndex : r.rankIndex);

  const arche = ARCHETYPES[hash(`${index}-${r.matches}-${Math.random()}`) % ARCHETYPES.length] as Archetype;
  const baseCount = index >= 18 ? 4 : index >= 9 ? 3 : index >= 3 ? 2 : 1;
  const count = Math.max(1, Math.min(4, baseCount + arche.count));
  const level = Math.max(
    1,
    teamLevel + Math.round(index * 0.4) + diff + arche.level + (rival ? 1 + rival.wins : 0),
  );
  const rarity = arche.id === "prototype" ? "gold" : rarityFor(index);
  const enemies = randomEnemyTeam({
    level,
    count,
    trained: Math.floor(index / 3) + arche.trained + (rival ? rival.wins : 0),
    ...(rarity ? { rarity: rarity as "gold" | "silver" } : {}),
  });

  return {
    pilot: rival ? rival.pilot : pilotName(`${index}-${Date.now()}-${Math.random()}`),
    rank,
    spread: diff,
    archetype: arche,
    mmr: index * 100 + 450 + (hash(`m${index}`) % 90) + (rival ? 40 : 0),
    context: placing ? "placement" : promo ? "promo" : "ranked",
    rival: !!rival,
    robot: rival
      ? rival.robot
      : ((enemies[0] as RobotSave | undefined)?.id ??
        (ROBOTS[hash(`r${index}`) % ROBOTS.length] as { id: string }).id),
    stage: {
      label: placing
        ? `CLASSIFICATORIA ${r.placementsDone + 1}/${PLACEMENT_MATCHES}`
        : promo
          ? `SERIE DE PROMOCAO — ${rankAt(promo.targetIndex).name}`
          : rival
            ? `NEMESIS — ${rival.pilot}`
            : rank.name,
      arena: RANKED_ARENAS[index % RANKED_ARENAS.length] as string,
      enemies,
      reward: 1.35 + index * 0.1 + (promo ? 0.5 : 0),
    },
  };
}

export function opponentPreview(opp: RankedOpponent): string[] {
  return opp.stage.enemies.map((e: RobotSave) => ROBOT_MAP[e.id]?.name ?? e.id);
}

// ------------------------------------------------------------------- pontos
export interface MatchPerf {
  /** robôs seus que sobreviveram. */
  survivors: number;
  teamSize: number;
  /** turnos que a luta durou (opcional). */
  turns?: number;
}

export interface PrBreakdown {
  base: number;
  spread: number;
  streak: number;
  performance: number;
  rival: number;
  total: number;
}

export interface RankedOutcome {
  state: RankedState;
  delta: number;
  breakdown: PrBreakdown;
  promoted: boolean;
  demoted: boolean;
  shieldUsed: boolean;
  placementDone: boolean;
  promoStarted: boolean;
  promoWon: boolean;
  promoLost: boolean;
  flawless: boolean;
  newRank: RankDef;
  prevRank: RankDef;
  prevPr: number;
  gold: number;
}

function perfScore(p?: MatchPerf): number {
  if (!p || p.teamSize <= 0) return 0;
  const alive = Math.max(0, Math.min(1, p.survivors / p.teamSize));
  const fast = p.turns !== undefined ? Math.max(0, 1 - p.turns / 18) : 0.3;
  return alive * 0.7 + fast * 0.3;
}

function gainBreakdown(spread: number, streak: number, isRival: boolean, p?: MatchPerf): PrBreakdown {
  const base = 20;
  const sp = spread * 6;
  const st = Math.min(12, Math.max(0, streak) * 3);
  const pf = Math.round(perfScore(p) * 10);
  const rv = isRival ? 8 : 0;
  const total = Math.max(9, Math.min(56, Math.round(base + sp + st + pf + rv)));
  return { base, spread: sp, streak: st, performance: pf, rival: rv, total };
}

function lossBreakdown(spread: number, streak: number, isRival: boolean, p?: MatchPerf): PrBreakdown {
  const base = -19;
  const sp = spread * 5; // perder para alguém mais forte dói menos
  const st = -Math.min(10, Math.max(0, -streak) * 2);
  const pf = Math.round(perfScore(p) * 6); // resistir bem reduz a perda
  const rv = isRival ? -3 : 0;
  const total = -Math.max(5, Math.min(40, Math.round(-(base + sp + st + pf + rv))));
  return { base, spread: sp, streak: st, performance: pf, rival: rv, total };
}

function pushLog(next: RankedState, log: RankedMatchLog) {
  next.history = [log, ...next.history].slice(0, 12);
}

function eloShift(win: boolean, myMmr: number, oppMmr: number): number {
  const expected = 1 / (1 + 10 ** ((oppMmr - myMmr) / 220));
  return Math.round(32 * ((win ? 1 : 0) - expected));
}

export function applyMatch(
  r: RankedState,
  win: boolean,
  opp: RankedOpponent,
  perf?: MatchPerf,
): RankedOutcome {
  const next: RankedState = { ...r, history: [...r.history], claimed: [...r.claimed] };
  const prevRank = rankAt(r.rankIndex);
  const flawless = win && !!perf && perf.survivors >= perf.teamSize && perf.teamSize > 0;

  next.matches = r.matches + 1;
  next.mmr = Math.max(100, r.mmr + eloShift(win, r.mmr, opp.mmr));
  if (flawless) next.flawless = r.flawless + 1;

  const empty: PrBreakdown = { base: 0, spread: 0, streak: 0, performance: 0, rival: 0, total: 0 };

  // ---------------- nêmesis: quem te vence volta para a revanche
  if (!isPlacing(r) && !r.promo) {
    if (opp.rival && r.rival) {
      next.rival = win ? null : { ...r.rival, wins: Math.min(4, r.rival.wins + 1) };
      if (win) next.nemesisBeaten = r.nemesisBeaten + 1;
    } else if (!win) {
      next.rival = {
        pilot: opp.pilot,
        rankIndex: opp.rank.index,
        robot: opp.robot,
        wins: 1,
        losses: 0,
      };
    }
  }

  // ---------------- classificatórias
  if (isPlacing(r)) {
    next.placementsDone = r.placementsDone + 1;
    next.placementWins = r.placementWins + (win ? 1 : 0);
    next.wins = r.wins + (win ? 1 : 0);
    next.losses = r.losses + (win ? 0 : 1);
    next.streak = win ? Math.max(1, r.streak + 1) : Math.min(-1, r.streak - 1);
    const done = next.placementsDone >= PLACEMENT_MATCHES;
    if (done) {
      // posicionamento usa vitórias + MMR acumulado nas 5 lutas.
      const fromMmr = Math.round((next.mmr - 450) / 100);
      next.rankIndex = clampRank(1 + next.placementWins * 2 + Math.max(-1, Math.min(2, fromMmr)));
      next.pr = 45;
      next.shield = 3;
      next.bestRankIndex = Math.max(next.bestRankIndex, next.rankIndex);
    }
    pushLog(next, {
      win,
      delta: 0,
      opponent: opp.pilot,
      rankName: opp.rank.name,
      kind: "placement",
    });
    return {
      state: next,
      delta: 0,
      breakdown: empty,
      promoted: false,
      demoted: false,
      shieldUsed: false,
      placementDone: done,
      promoStarted: false,
      promoWon: false,
      promoLost: false,
      flawless,
      newRank: rankAt(next.rankIndex),
      prevRank,
      prevPr: r.pr,
      gold: (win ? 110 : 35) + (flawless ? 40 : 0),
    };
  }

  // ---------------- série de promoção em andamento
  if (r.promo) {
    const promo: PromoSeries = { ...r.promo };
    if (win) {
      promo.wins += 1;
      next.wins = r.wins + 1;
      next.streak = r.streak >= 0 ? r.streak + 1 : 1;
    } else {
      promo.losses += 1;
      next.losses = r.losses + 1;
      next.streak = r.streak <= 0 ? r.streak - 1 : -1;
    }

    let promoWon = false;
    let promoLost = false;
    if (promo.wins >= PROMO_WINS) {
      promoWon = true;
      next.promo = null;
      next.rankIndex = clampRank(promo.targetIndex);
      next.pr = 35;
      next.shield = 3;
    } else if (promo.losses >= PROMO_LOSSES) {
      promoLost = true;
      next.promo = null;
      next.pr = Math.round(rankAt(r.rankIndex).prToPromote * 0.6);
      next.shield = Math.max(r.shield, 1);
    } else {
      next.promo = promo;
    }

    next.bestRankIndex = Math.max(r.bestRankIndex, next.rankIndex);
    next.bestStreak = Math.max(r.bestStreak, next.streak);
    pushLog(next, {
      win,
      delta: 0,
      opponent: opp.pilot,
      rankName: opp.rank.name,
      kind: "promo",
    });

    return {
      state: next,
      delta: 0,
      breakdown: empty,
      promoted: promoWon,
      demoted: false,
      shieldUsed: false,
      placementDone: false,
      promoStarted: false,
      promoWon,
      promoLost,
      flawless,
      newRank: rankAt(next.rankIndex),
      prevRank,
      prevPr: r.pr,
      gold: Math.round((win ? 240 : 70) + next.rankIndex * 18 + (flawless ? 60 : 0)),
    };
  }

  // ---------------- partida ranqueada normal
  const streak = r.streak;
  const breakdown = win
    ? gainBreakdown(opp.spread, streak, opp.rival, perf)
    : lossBreakdown(opp.spread, streak, opp.rival, perf);
  const delta = breakdown.total;

  let rankIndex = r.rankIndex;
  let pr = r.pr + delta;
  let promoted = false;
  let demoted = false;
  let shieldUsed = false;
  let promoStarted = false;
  let shield = r.shield;

  if (win) {
    next.wins = r.wins + 1;
    next.streak = streak >= 0 ? streak + 1 : 1;
    let guard = 0;
    while (pr >= rankAt(rankIndex).prToPromote && rankIndex < TOP_RANK && guard < 40) {
      guard += 1;
      const target = clampRank(rankIndex + 1);
      // entrada em novo tier exige série de promoção (melhor de 3)
      if (rankAt(target).tierEntry) {
        pr = rankAt(rankIndex).prToPromote;
        next.promo = { targetIndex: target, wins: 0, losses: 0 };
        promoStarted = true;
        break;
      }
      pr -= rankAt(rankIndex).prToPromote;
      rankIndex = target;
      promoted = true;
      shield = 3;
    }
    if (rankIndex >= TOP_RANK) pr = Math.min(pr, 9999);
  } else {
    next.losses = r.losses + 1;
    next.streak = streak <= 0 ? streak - 1 : -1;
    if (pr < 0) {
      if (shield > 0) {
        shield -= 1;
        shieldUsed = true;
        pr = 0;
      } else if (rankIndex > 0) {
        rankIndex -= 1;
        pr = Math.max(0, rankAt(rankIndex).prToPromote - 30);
        demoted = true;
        shield = 1;
      } else {
        pr = 0;
      }
    }
  }

  next.rankIndex = rankIndex;
  next.pr = Math.max(0, pr);
  next.shield = shield;
  next.bestRankIndex = Math.max(r.bestRankIndex, rankIndex);
  next.bestStreak = Math.max(r.bestStreak, next.streak);
  pushLog(next, {
    win,
    delta,
    opponent: opp.pilot,
    rankName: opp.rank.name,
    kind: "ranked",
  });

  return {
    state: next,
    delta,
    breakdown,
    promoted,
    demoted,
    shieldUsed,
    placementDone: false,
    promoStarted,
    promoWon: false,
    promoLost: false,
    flawless,
    newRank: rankAt(rankIndex),
    prevRank,
    prevPr: r.pr,
    gold: Math.round(
      (win ? 150 : 45) + rankIndex * 16 + (flawless ? 50 : 0) + (win && opp.rival ? 120 : 0),
    ),
  };
}

// ------------------------------------------------------------- recompensas
export interface RankReward {
  index: number;
  rank: RankDef;
  gold: number;
  claimable: boolean;
  claimed: boolean;
}

export function rewardList(r: RankedState): RankReward[] {
  return RANKS.map((rank) => ({
    index: rank.index,
    rank,
    gold: rank.reward,
    claimed: r.claimed.includes(rank.index),
    claimable: r.bestRankIndex >= rank.index && !r.claimed.includes(rank.index),
  }));
}

export function claimableGold(r: RankedState): number {
  return rewardList(r)
    .filter((x) => x.claimable)
    .reduce((a, x) => a + x.gold, 0);
}

/** Marca uma recompensa como coletada e devolve o ouro concedido. */
export function claimReward(r: RankedState, index: number): { state: RankedState; gold: number } {
  const item = rewardList(r).find((x) => x.index === index);
  if (!item || !item.claimable) return { state: r, gold: 0 };
  return { state: { ...r, claimed: [...r.claimed, index] }, gold: item.gold };
}

// ------------------------------------------------------------- estatísticas
export interface RankedMission {
  id: string;
  name: string;
  desc: string;
  progress: number;
  goal: number;
  gold: number;
  done: boolean;
  claimed: boolean;
  claimable: boolean;
}

/** Missões da temporada — objetivos de longo prazo com recompensa em ouro. */
export function missionList(r: RankedState): RankedMission[] {
  const defs: { id: string; name: string; desc: string; progress: number; goal: number; gold: number }[] = [
    {
      id: "matches10",
      name: "VETERANO DA FILA",
      desc: "Dispute 10 partidas ranqueadas na temporada",
      progress: r.matches,
      goal: 10,
      gold: 320,
    },
    {
      id: "streak3",
      name: "EMBALADO",
      desc: "Alcance 3 vitorias seguidas",
      progress: Math.max(r.bestStreak, Math.max(0, r.streak)),
      goal: 3,
      gold: 400,
    },
    {
      id: "flawless3",
      name: "SEM UM ARRANHAO",
      desc: "Conquiste 3 vitorias perfeitas",
      progress: r.flawless,
      goal: 3,
      gold: 520,
    },
    {
      id: "rank4",
      name: "ELITE DE OURO",
      desc: "Chegue ao rank Ouro ou acima",
      progress: Math.min(r.bestRankIndex, 4),
      goal: 4,
      gold: 700,
    },
    {
      id: "nemesis",
      name: "CACA AO NEMESIS",
      desc: "Derrote um nemesis na revanche",
      progress: r.nemesisBeaten,
      goal: 1,
      gold: 450,
    },
  ];
  return defs.map((d) => {
    const done = d.progress >= d.goal;
    const claimed = r.missionsClaimed.includes(d.id);
    return { ...d, progress: Math.min(d.progress, d.goal), done, claimed, claimable: done && !claimed };
  });
}

export function claimMission(r: RankedState, id: string): { state: RankedState; gold: number } {
  const m = missionList(r).find((x) => x.id === id);
  if (!m || !m.claimable) return { state: r, gold: 0 };
  return { state: { ...r, missionsClaimed: [...r.missionsClaimed, id] }, gold: m.gold };
}

export interface RankedStats {
  played: number;
  winrate: number;
  streakLabel: string;
  form: ("W" | "L")[];
  avgDelta: number;
  flawless: number;
  mmr: number;
}

export function statsOf(r: RankedState): RankedStats {
  const played = r.wins + r.losses;
  const deltas = r.history.filter((h) => h.kind === "ranked");
  const avg = deltas.length
    ? Math.round(deltas.reduce((a, h) => a + h.delta, 0) / deltas.length)
    : 0;
  return {
    played,
    winrate: played ? Math.round((r.wins / played) * 100) : 0,
    streakLabel:
      r.streak > 0 ? `${r.streak} VITORIAS` : r.streak < 0 ? `${-r.streak} DERROTAS` : "—",
    form: r.history.slice(0, 8).map((h) => (h.win ? "W" : "L")),
    avgDelta: avg,
    flawless: r.flawless,
    mmr: r.mmr,
  };
}

// -------------------------------------------------------------- leaderboard
export interface LadderRow {
  pilot: string;
  rating: number;
  rank: RankDef;
  robot: string;
  wins: number;
  you?: boolean;
}

export function leaderboard(r: RankedState, size = 14): LadderRow[] {
  const rows: LadderRow[] = [];
  const top = TOP_RANK * 100 + 220;
  for (let i = 0; i < size; i += 1) {
    const seed = `s${r.season}-${i}`;
    const h = hash(seed);
    const rating = Math.max(200, top - i * (60 + (h % 45)));
    rows.push({
      pilot: pilotName(seed),
      rating,
      rank: rankAt(Math.floor(rating / 100)),
      robot: (ROBOTS[h % ROBOTS.length] as { id: string }).id,
      wins: 40 + (h % 260),
    });
  }
  const mine = ratingOf(r);
  rows.push({
    pilot: "VOCE",
    rating: mine,
    rank: rankAt(r.rankIndex),
    robot: "aurorion",
    wins: r.wins,
    you: true,
  });
  return rows.sort((a, b) => b.rating - a.rating);
}

export function seasonProgressPct(r: RankedState): number {
  return Math.max(
    0,
    Math.min(100, Math.round((ratingOf(r) / (TOP_RANK * 100 + 250)) * 100)),
  );
}

/** Reset suave de temporada: mantém histórico de recorde, recua o rank. */
export function newSeason(r: RankedState): RankedState {
  const base = initialRanked();
  return {
    ...base,
    season: r.season + 1,
    mmr: Math.round(450 + (r.mmr - 450) * 0.6),
    bestRankIndex: 0,
    bestStreak: 0,
    seasonStartedAt: Date.now(),
  };
}
