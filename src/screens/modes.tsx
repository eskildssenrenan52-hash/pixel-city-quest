import { useState } from "react";
import { Icon, Panel, PixelButton, RobotSprite, StatBar } from "@/components/game/pixel";
import { fightReward, grantXP, robotMaxXP, type RobotSave } from "@/game/engine";
import {
  babelStage,
  bossStage,
  chaosStage,
  MODES,
  quickStage,
  rollMutator,
  survivalStage,
  teamAverageLevel,
  type ModeDef,
  type ModeId,
  type Mutator,
  type StageSetup,
} from "@/game/modes";
import { faceUrl, ROBOT_MAP } from "@/game/robots";
import {
  addGold,
  addPlayerXP,
  incBattlesWon,
  setModeProgress,
  spendItem,
  teamSaves,
  updateRobots,
  useGame,
} from "@/game/save";
import { BattleScreen } from "@/screens/battle";
import { TopBar } from "@/screens/roster";

type View = "list" | "brief" | "fight" | "report";
type Carry = Record<string, { hp: number; mp: number }>;

interface Run {
  mode: ModeDef;
  step: number; // andar / onda / índice de chefe
  stage: StageSetup;
  carry: Carry;
  gold: number;
  xp: number;
  mutator?: Mutator;
}

interface Report {
  mode: ModeDef;
  won: boolean;
  title: string;
  detail: string;
  gold: number;
  xp: number;
  levelUps: { name: string; level: number }[];
}

const REST: Record<ModeId, number> = {
  quick: 1,
  babel: 0.18,
  survival: 0.25,
  bossrush: 0.1,
  chaos: 0,
};

export function ModesScreen({ onBack }: { onBack: () => void }) {
  const g = useGame();
  const [view, setView] = useState<View>("list");
  const [run, setRun] = useState<Run | null>(null);
  const [report, setReport] = useState<Report | null>(null);

  const team = teamSaves(g);
  const teamLevel = teamAverageLevel(team);

  function stageFor(mode: ModeDef, step: number, mutator?: Mutator): StageSetup {
    if (mode.id === "babel") return babelStage(step, teamLevel);
    if (mode.id === "survival") return survivalStage(step, teamLevel);
    if (mode.id === "bossrush") return bossStage(step - 1, teamLevel);
    if (mode.id === "chaos") return chaosStage(teamLevel, mutator ?? rollMutator());
    return quickStage(teamLevel);
  }

  function start(mode: ModeDef) {
    const mutator = mode.id === "chaos" ? rollMutator() : undefined;
    const step = mode.id === "babel" ? g.modes.babelFloor : 1;
    const carry: Carry =
      mutator !== undefined
        ? Object.fromEntries(team.map((r) => [r.id, { hp: mutator.playerHp, mp: mutator.playerMp }]))
        : {};
    setRun({
      mode,
      step,
      stage: stageFor(mode, step, mutator),
      carry,
      gold: 0,
      xp: 0,
      mutator,
    });
    setView("brief");
  }

  function distribute(gold: number, xp: number): { name: string; level: number }[] {
    addGold(gold);
    addPlayerXP(xp);
    const levelUps: { name: string; level: number }[] = [];
    const teamIds = new Set(g.team);
    updateRobots(
      g.robots.map((r) => {
        if (!teamIds.has(r.id)) return r;
        const res = grantXP(r, xp);
        if (res.levelsGained > 0) levelUps.push({ name: ROBOT_MAP[r.id].name, level: res.save.level });
        return res.save;
      }),
    );
    return levelUps;
  }

  function stageReward(stage: StageSetup) {
    const base = stage.enemies.reduce(
      (acc, e) => {
        const r = fightReward(ROBOT_MAP[e.id].ratios, e.level);
        return { gold: acc.gold + r.gold, xp: acc.xp + r.xp };
      },
      { gold: 0, xp: 0 },
    );
    return {
      gold: Math.round(base.gold * stage.reward),
      xp: Math.round(base.xp * stage.reward),
    };
  }

  function endRun(won: boolean, title: string, detail: string, gold: number, xp: number, ups: { name: string; level: number }[]) {
    setReport({ mode: run!.mode, won, title, detail, gold, xp, levelUps: ups });
    setRun(null);
    setView("report");
  }

  function finishFight(result: "win" | "lose", snapshot?: Record<string, { hp: number; mp: number }>) {
    if (!run) return;
    const earned = stageReward(run.stage);
    const mode = run.mode;

    if (result === "lose") {
      const ups = distribute(Math.round(earned.gold / 4), Math.round(earned.xp / 4));
      if (mode.id === "babel") setModeProgress({ babelFloor: 1 });
      endRun(
        false,
        "DERROTADO",
        mode.id === "babel"
          ? `Você caiu no andar ${run.step}. A torre reinicia do andar 1.`
          : `Você resistiu até ${run.stage.label}.`,
        run.gold + Math.round(earned.gold / 4),
        run.xp + Math.round(earned.xp / 4),
        ups,
      );
      return;
    }

    incBattlesWon();
    const ups = distribute(earned.gold, earned.xp);
    const totalGold = run.gold + earned.gold;
    const totalXp = run.xp + earned.xp;

    // recuperação parcial entre etapas
    const rest = REST[mode.id];
    const carry: Carry = Object.fromEntries(
      Object.entries(snapshot ?? {}).map(([id, v]) => [
        id,
        { hp: Math.min(1, v.hp > 0 ? v.hp + rest : 0), mp: Math.min(1, v.mp + rest) },
      ]),
    );

    if (mode.id === "quick" || mode.id === "chaos") {
      setModeProgress(
        mode.id === "quick"
          ? { quickWins: g.modes.quickWins + 1 }
          : { chaosWins: g.modes.chaosWins + 1 },
      );
      endRun(true, "VITORIA!", `${mode.name} concluída.`, totalGold, totalXp, ups);
      return;
    }

    if (mode.id === "bossrush") {
      if (run.step >= 3) {
        setModeProgress({ bossRushBest: Math.max(g.modes.bossRushBest, 3) });
        endRun(true, "CACADA COMPLETA!", "Os três chefes caíram.", totalGold, totalXp, ups);
        return;
      }
      setModeProgress({ bossRushBest: Math.max(g.modes.bossRushBest, run.step) });
    }

    if (mode.id === "babel") {
      setModeProgress({
        babelFloor: run.step + 1,
        babelBest: Math.max(g.modes.babelBest, run.step),
      });
    }
    if (mode.id === "survival") {
      setModeProgress({ survivalBest: Math.max(g.modes.survivalBest, run.step) });
    }

    const next = run.step + 1;
    setRun({ ...run, step: next, stage: stageFor(mode, next, run.mutator), carry, gold: totalGold, xp: totalXp });
    setView("brief");
  }

  // -------------------------------------------------------------- render
  if (view === "fight" && run) {
    return (
      <BattleScreen
        key={`${run.mode.id}-${run.step}`}
        arena={run.stage.arena}
        round={run.step}
        playerTeam={team}
        enemyTeam={run.stage.enemies}
        items={g.items}
        startState={Object.keys(run.carry).length ? run.carry : undefined}
        label={`${run.mode.name} · ${run.stage.label}`}
        onUseItem={(id) => spendItem(id, 1)}
        onFinish={finishFight}
      />
    );
  }

  if (view === "report" && report) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: 10,
          backgroundImage: `linear-gradient(rgba(4,8,16,0.9), rgba(4,8,16,0.95)), url(${report.mode.art})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "pixelated",
        }}
      >
        <Panel style={{ width: "min(94vw, 400px)" }}>
          <div
            className="mk-title"
            style={{
              fontSize: 13,
              textAlign: "center",
              color: report.won ? "var(--mk-accent2)" : "var(--mk-hp)",
            }}
          >
            {report.title}
          </div>
          <div
            className="mk-title"
            style={{ fontSize: 7, textAlign: "center", color: "var(--mk-muted)", marginTop: 4 }}
          >
            {report.mode.name}
          </div>
          <div style={{ fontSize: 10, color: "var(--mk-muted)", margin: "8px 0" }}>
            {report.detail}
          </div>
          <div style={{ display: "grid", gap: 4, marginBottom: 8 }}>
            <ReportLine icon="coins" text={`OURO +${report.gold}`} />
            <ReportLine icon="star" text={`XP +${report.xp}`} />
            {report.levelUps.map((l) => (
              <ReportLine key={l.name} icon="arrowup" text={`${l.name} SUBIU PARA Lv${l.level}`} />
            ))}
          </div>
          <PixelButton
            onClick={() => {
              setReport(null);
              setView("list");
            }}
          >
            VOLTAR AOS MODOS
          </PixelButton>
        </Panel>
      </div>
    );
  }

  if (view === "brief" && run) {
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
        <TopBar
          title={run.mode.name}
          gold={g.gold}
          onBack={() => {
            setRun(null);
            setView("list");
          }}
        />
        <div className="mk-scroll" style={{ flex: 1, padding: 8 }}>
          <div
            style={{
              height: 96,
              backgroundImage: `linear-gradient(rgba(4,9,18,0.3), rgba(4,9,18,0.92)), url(${run.mode.art})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              imageRendering: "pixelated",
              border: `2px solid ${run.mode.accent}`,
              display: "flex",
              alignItems: "flex-end",
              padding: 6,
              marginBottom: 8,
            }}
          >
            <span className="mk-title" style={{ fontSize: 10, color: run.mode.accent }}>
              {run.stage.label}
            </span>
          </div>

          {run.mutator && (
            <Panel style={{ marginBottom: 8 }}>
              <div className="mk-title" style={{ fontSize: 8, color: "var(--mk-accent2)" }}>
                MUTACAO: {run.mutator.name}
              </div>
              <div style={{ fontSize: 10, color: "var(--mk-muted)" }}>{run.mutator.desc}</div>
            </Panel>
          )}

          <div className="mk-title" style={{ fontSize: 8, marginBottom: 4 }}>
            ADVERSARIOS
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {run.stage.enemies.map((e, i) => (
              <div
                key={`${e.id}-${i}`}
                style={{
                  border: "2px solid rgba(226,69,58,0.5)",
                  background: "rgba(28,10,14,0.7)",
                  padding: 4,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <img src={faceUrl(e.id)} alt="" width={40} height={40} style={{ imageRendering: "pixelated" }} />
                <span className="mk-title" style={{ fontSize: 6 }}>
                  {ROBOT_MAP[e.id].name}
                </span>
                <span className="mk-title" style={{ fontSize: 6, color: "var(--mk-accent2)" }}>
                  Lv{e.level}
                </span>
              </div>
            ))}
          </div>

          <div className="mk-title" style={{ fontSize: 8, marginBottom: 4 }}>
            SUA EQUIPE
          </div>
          <div style={{ display: "grid", gap: 4, marginBottom: 10 }}>
            {team.map((r) => {
              const c = run.carry[r.id];
              return (
                <div
                  key={r.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    border: "2px solid rgba(53,226,240,0.4)",
                    background: "rgba(8,18,32,0.7)",
                    padding: 4,
                  }}
                >
                  <img src={faceUrl(r.id)} alt="" width={28} height={28} style={{ imageRendering: "pixelated" }} />
                  <span className="mk-title" style={{ fontSize: 7, flex: 1 }}>
                    {ROBOT_MAP[r.id].name} Lv{r.level}
                  </span>
                  <span className="mk-title" style={{ fontSize: 7, color: c && c.hp < 1 ? "var(--mk-hp)" : "var(--mk-accent2)" }}>
                    {c ? `${Math.round(c.hp * 100)}% HP` : "100% HP"}
                  </span>
                </div>
              );
            })}
          </div>

          {team.length === 0 ? (
            <div className="mk-title" style={{ fontSize: 8, color: "var(--mk-hp)" }}>
              ESCALE PELO MENOS UM ROBO
            </div>
          ) : (
            <PixelButton onClick={() => setView("fight")}>LUTAR!</PixelButton>
          )}
          <div style={{ height: 40 }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <TopBar title="MODOS DE JOGO" gold={g.gold} onBack={onBack} />
      <div className="mk-scroll" style={{ flex: 1, padding: 8 }}>
        <div className="mk-title" style={{ fontSize: 7, color: "var(--mk-muted)", marginBottom: 6 }}>
          TORRE {g.modes.babelBest} ANDARES · ONDAS {g.modes.survivalBest} · RAPIDAS {g.modes.quickWins}
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          {MODES.map((m) => {
            const locked = g.playerLevel < m.requiredLevel;
            return (
              <button
                key={m.id}
                type="button"
                disabled={locked}
                onClick={() => start(m)}
                style={{
                  textAlign: "left",
                  padding: 0,
                  border: `2px solid ${locked ? "rgba(60,80,104,0.5)" : m.accent}`,
                  background: "rgba(6,12,22,0.9)",
                  cursor: locked ? "not-allowed" : "pointer",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 92,
                    backgroundImage: `linear-gradient(rgba(4,9,18,0.15), rgba(4,9,18,0.9)), url(${m.art})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    imageRendering: "pixelated",
                    filter: locked ? "grayscale(1) brightness(0.5)" : undefined,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    padding: 6,
                  }}
                >
                  <span className="mk-title" style={{ fontSize: 11, textShadow: "2px 2px 0 #000" }}>
                    {m.name}
                  </span>
                  <span className="mk-title" style={{ fontSize: 6, color: m.accent }}>
                    {locked ? `PILOTO Lv${m.requiredLevel}` : m.tagline}
                  </span>
                </div>
                <div style={{ padding: 6, fontSize: 10, color: "var(--mk-muted)" }}>{m.desc}</div>
                {m.id === "babel" && !locked && (
                  <div className="mk-title" style={{ fontSize: 7, padding: "0 6px 6px", color: m.accent }}>
                    PROXIMO: ANDAR {g.modes.babelFloor} · RECORDE {g.modes.babelBest}
                  </div>
                )}
                {m.id === "bossrush" && !locked && (
                  <div className="mk-title" style={{ fontSize: 7, padding: "0 6px 6px", color: m.accent }}>
                    CHEFES DERRUBADOS: {g.modes.bossRushBest}/3
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 10 }}>
          <div className="mk-title" style={{ fontSize: 8, marginBottom: 4 }}>
            EQUIPE ATUAL
          </div>
          <div style={{ display: "grid", gap: 4 }}>
            {team.map((r) => (
              <div
                key={r.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: "2px solid rgba(53,226,240,0.35)",
                  background: "rgba(8,18,32,0.7)",
                  padding: 4,
                }}
              >
                <RobotSprite robotId={r.id} clip="idle" size={34} fps={4} />
                <span className="mk-title" style={{ fontSize: 7, flex: 1 }}>
                  {ROBOT_MAP[r.id].name} Lv{r.level}
                </span>
                <StatBar kind="xp" value={r.xp} max={robotMaxXP(r.level)} width={80} showText={false} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 56 }} />
      </div>
    </div>
  );
}

function ReportLine({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="mk-title" style={{ fontSize: 8 }}>
      <Icon name={icon} size={12} /> {text}
    </div>
  );
}
