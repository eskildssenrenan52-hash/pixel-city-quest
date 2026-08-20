import { useState } from "react";
import { Icon, Panel, PixelButton, RobotSprite, StatBar } from "@/components/game/pixel";
import { TournamentMap } from "@/components/game/tourmap";
import { fightReward, grantXP, robotMaxXP, type RobotSave } from "@/game/engine";
import {
  addGold,
  addItem,
  addPlayerXP,
  incBattlesWon,
  markTournamentWon,
  spendItem,
  teamSaves,
  unlockRobot,
  updateRobots,
  useGame,
} from "@/game/save";
import { faceUrl, ROBOT_MAP } from "@/game/robots";
import { type TournamentDef } from "@/game/tournaments";
import { BattleScreen } from "@/screens/battle";
import { TopBar } from "@/screens/roster";

type Mode = "list" | "brief" | "fight" | "report";

interface Report {
  tournament: TournamentDef;
  won: boolean;
  gold: number;
  xp: number;
  levelUps: { name: string; level: number }[];
  newRobot?: string;
  item?: string;
  itemQty?: number;
}

export function TournamentsScreen({ onBack }: { onBack: () => void }) {
  const g = useGame();
  const [mode, setMode] = useState<Mode>("list");
  const [tour, setTour] = useState<TournamentDef | null>(null);
  const [fightIndex, setFightIndex] = useState(0);
  const [accum, setAccum] = useState({ gold: 0, xp: 0 });
  const [report, setReport] = useState<Report | null>(null);

  const team = teamSaves(g);

  function enemyTeamFor(t: TournamentDef, index: number): RobotSave[] {
    return t.fights[index].enemies.map((e) => ({
      id: e.id,
      level: e.level,
      xp: 0,
      trained: { str: e.trained, def: e.trained, agl: e.trained },
    }));
  }

  function start(t: TournamentDef) {
    setTour(t);
    setFightIndex(0);
    setAccum({ gold: 0, xp: 0 });
    setMode("brief");
  }

  function distribute(gold: number, xp: number): { name: string; level: number }[] {
    addGold(gold);
    addPlayerXP(xp);
    const levelUps: { name: string; level: number }[] = [];
    const teamIds = new Set(g.team);
    const updated = g.robots.map((r) => {
      if (!teamIds.has(r.id)) return r;
      const res = grantXP(r, xp);
      if (res.levelsGained > 0) {
        levelUps.push({ name: ROBOT_MAP[r.id].name, level: res.save.level });
      }
      return res.save;
    });
    updateRobots(updated);
    return levelUps;
  }

  function finishFight(result: "win" | "lose") {
    if (!tour) return;
    const enemies = enemyTeamFor(tour, fightIndex);
    const earned = enemies.reduce(
      (acc, e) => {
        const r = fightReward(ROBOT_MAP[e.id].ratios, e.level);
        return { gold: acc.gold + r.gold, xp: acc.xp + r.xp };
      },
      { gold: 0, xp: 0 },
    );

    if (result === "lose") {
      const half = { gold: Math.round(earned.gold / 4), xp: Math.round(earned.xp / 4) };
      const levelUps = distribute(half.gold, half.xp); // accum ja foi creditado por luta
      setReport({
        tournament: tour,
        won: false,
        gold: accum.gold + half.gold,
        xp: accum.xp + half.xp,
        levelUps,
      });
      setMode("report");
      return;
    }

    incBattlesWon();
    const isLast = fightIndex >= tour.fights.length - 1;
    if (!isLast) {
      // XP e ouro entram na hora: o time evolui durante o torneio
      distribute(earned.gold, earned.xp);
      setAccum({ gold: accum.gold + earned.gold, xp: accum.xp + earned.xp });
      setFightIndex(fightIndex + 1);
      setMode("brief");
      return;
    }

    const firstTime = !g.wonTournaments.includes(tour.id);
    const bonusGold = firstTime ? tour.reward.gold : tour.replayGold;
    const bonusXp = firstTime ? tour.reward.xp : Math.round(tour.reward.xp / 1.6);
    const totalGold = accum.gold + earned.gold + bonusGold;
    const totalXp = accum.xp + earned.xp + bonusXp;
    // accum ja foi creditado luta por luta
    const levelUps = distribute(earned.gold + bonusGold, earned.xp + bonusXp);
    let newRobot: string | undefined;
    if (firstTime && tour.reward.robot) {
      if (unlockRobot(tour.reward.robot)) newRobot = tour.reward.robot;
    }
    if (firstTime && tour.reward.item) {
      addItem(tour.reward.item, tour.reward.itemQty ?? 1);
    }
    markTournamentWon(tour.id);
    setReport({
      tournament: tour,
      won: true,
      gold: totalGold,
      xp: totalXp,
      levelUps,
      newRobot,
      item: firstTime ? tour.reward.item : undefined,
      itemQty: tour.reward.itemQty,
    });
    setMode("report");
  }

  if (mode === "fight" && tour) {
    return (
      <BattleScreen
        key={`${tour.id}-${fightIndex}`}
        arena={tour.arena}
        round={fightIndex}
        playerTeam={team}
        enemyTeam={enemyTeamFor(tour, fightIndex)}
        items={g.items}
        label={`${tour.name} · ${tour.fights[fightIndex].name}`}
        onUseItem={(id) => spendItem(id, 1)}
        onFinish={finishFight}
      />
    );
  }

  if (mode === "report" && report) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          padding: 10,
          backgroundImage: "linear-gradient(rgba(4,8,16,0.88), rgba(4,8,16,0.94)), url(/ui/bg_menu.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          imageRendering: "pixelated",
        }}
      >
        <Panel style={{ width: "min(94vw, 400px)" }}>
          <div
            className="mk-title"
            style={{
              fontSize: 12,
              textAlign: "center",
              color: report.won ? "var(--mk-accent2)" : "var(--mk-hp)",
            }}
          >
            {report.won ? "CAMPEAO!" : "ELIMINADO"}
          </div>
          <div
            className="mk-title"
            style={{ fontSize: 7, textAlign: "center", color: "var(--mk-muted)", marginTop: 3 }}
          >
            {report.tournament.name}
          </div>
          <div style={{ margin: "10px 0", display: "grid", gap: 4 }}>
            <Line icon="coins" text={`OURO +${report.gold}`} />
            <Line icon="star" text={`XP +${report.xp}`} />
            {report.levelUps.map((l) => (
              <Line key={l.name} icon="arrowup" text={`${l.name} SUBIU PARA Lv${l.level}`} />
            ))}
            {report.item && (
              <Line icon="check" text={`${report.item.toUpperCase()} x${report.itemQty ?? 1}`} />
            )}
          </div>
          {report.newRobot && (
            <div style={{ display: "grid", placeItems: "center", marginBottom: 8 }}>
              <RobotSprite robotId={report.newRobot} clip="enter" size={112} fps={4} />
              <div className="mk-title" style={{ fontSize: 9, color: "var(--mk-accent)" }}>
                {ROBOT_MAP[report.newRobot].name} SE JUNTOU!
              </div>
            </div>
          )}
          <PixelButton
            onClick={() => {
              setReport(null);
              setMode("list");
            }}
          >
            VOLTAR AO MAPA
          </PixelButton>
        </Panel>
      </div>
    );
  }

  if (mode === "brief" && tour) {
    const fight = tour.fights[fightIndex];
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
        <TopBar title={tour.name} gold={g.gold} onBack={() => setMode("list")} />
        <div className="mk-scroll" style={{ flex: 1, padding: 8 }}>
          <div className="mk-title" style={{ fontSize: 9, marginBottom: 2 }}>
            LUTA {fightIndex + 1}/{tour.fights.length} — {fight.name}
          </div>
          <div style={{ fontSize: 10, color: "var(--mk-muted)", marginBottom: 8 }}>
            {tour.desc}
          </div>

          <div className="mk-title" style={{ fontSize: 8, marginBottom: 4 }}>
            ADVERSARIOS
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {fight.enemies.map((e, i) => (
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
            {team.map((r) => (
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
                <StatBar kind="xp" value={r.xp} max={robotMaxXP(r.level)} width={90} showText={false} />
              </div>
            ))}
          </div>

          <PixelButton onClick={() => setMode("fight")}>LUTAR!</PixelButton>
        </div>
      </div>
    );
  }

  return (
    <TournamentMap
      playerLevel={g.playerLevel}
      won={g.wonTournaments}
      teamEmpty={team.length === 0}
      gold={g.gold}
      onBack={onBack}
      onEnter={start}
    />
  );
}

function Line({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="mk-title" style={{ fontSize: 7, display: "flex", alignItems: "center", gap: 5 }}>
      <Icon name={icon} size={12} />
      {text}
    </div>
  );
}
