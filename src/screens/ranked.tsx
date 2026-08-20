import { useEffect, useMemo, useState } from "react";
import { Icon, Panel, PixelButton } from "@/components/game/pixel";
import { faceUrl, ROBOT_MAP } from "@/game/robots";
import { teamAverageLevel } from "@/game/modes";
import {
  claimRankReward,
  applyRankedMatch,
  claimRankedMission,
  spendItem,
  startNewSeason,
  teamSaves,
  useGame,
} from "@/game/save";
import {
  isPlacing,
  leaderboard,
  matchmake,
  missionList,
  PLACEMENT_MATCHES,
  PROMO_LOSSES,
  PROMO_WINS,
  rankAt,
  rewardList,
  seasonProgressPct,
  statsOf,
  type RankedOpponent,
  type RankedOutcome,
} from "@/game/ranked";
import { BattleScreen } from "@/screens/battle";
import { TopBar } from "@/screens/roster";

type View = "hub" | "brief" | "fight" | "result";
type Tab = "ladder" | "missions" | "rewards" | "history";

/** limite de trocas de oponente por sessão. */
const REROLL_LIMIT = 3;

export function RankedScreen({ onBack }: { onBack: () => void }) {
  const g = useGame();
  const [view, setView] = useState<View>("hub");
  const [tab, setTab] = useState<Tab>("ladder");
  const [opp, setOpp] = useState<RankedOpponent | null>(null);
  const [outcome, setOutcome] = useState<RankedOutcome | null>(null);
  const [rerolls, setRerolls] = useState(0);

  const team = teamSaves(g);
  const r = g.ranked;
  const rank = rankAt(r.rankIndex);
  const placing = isPlacing(r);
  const stats = statsOf(r);
  const missions = missionList(r);
  const missionsReady = missions.filter((m) => m.claimable).length;

  function queue() {
    setOpp(matchmake(r, teamAverageLevel(team)));
    setView("brief");
  }

  function reroll() {
    if (rerolls >= REROLL_LIMIT) return;
    setRerolls((n) => n + 1);
    setOpp(matchmake(r, teamAverageLevel(team)));
  }

  function finishFight(result: "win" | "lose", snapshot?: Record<string, { hp: number; mp: number }>) {
    if (!opp) return;
    const survivors = snapshot
      ? Object.values(snapshot).filter((v) => v.hp > 0).length
      : result === "win"
        ? 1
        : 0;
    const res = applyRankedMatch(result === "win", opp, {
      survivors,
      teamSize: Math.max(1, team.length),
    });
    setOutcome(res);
    setView("result");
  }

  // ------------------------------------------------------------------ luta
  if (view === "fight" && opp) {
    return (
      <BattleScreen
        key={`${opp.pilot}-${r.matches}`}
        arena={opp.stage.arena}
        round={r.matches}
        playerTeam={team}
        enemyTeam={opp.stage.enemies}
        items={g.items}
        label={`RANQUEADO · ${opp.stage.label}`}
        onUseItem={(id) => spendItem(id, 1)}
        onFinish={finishFight}
      />
    );
  }

  if (view === "result" && outcome) {
    return (
      <ResultView
        outcome={outcome}
        onDone={() => {
          setOutcome(null);
          setOpp(null);
          setView("hub");
        }}
        onAgain={() => {
          setOutcome(null);
          setOpp(matchmake(g.ranked, teamAverageLevel(team)));
          setView("brief");
        }}
      />
    );
  }

  if (view === "brief" && opp) {
    return (
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
        <TopBar
          title="BRIEFING DO OPONENTE"
          gold={g.gold}
          onBack={() => {
            setOpp(null);
            setView("hub");
          }}
        />
        <div className="mk-scroll" style={{ flex: 1, padding: 8 }}>
          <div
            style={{
              backgroundImage: "linear-gradient(rgba(4,9,18,0.35), rgba(4,9,18,0.92)), url(/modes/ranked.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              imageRendering: "pixelated",
              border: `2px solid ${opp.rival ? "#ff3b6b" : opp.archetype.color}`,
              boxShadow: opp.rival ? "0 0 0 2px rgba(255,59,107,0.35)" : undefined,
              padding: 8,
              marginBottom: 8,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <img
              src={opp.rival ? faceUrl(opp.robot) : opp.rank.tier.emblem}
              alt=""
              width={54}
              height={54}
              style={{ imageRendering: "pixelated" }}
            />
            <div>
              {opp.rival && (
                <div className="mk-title" style={{ fontSize: 7, color: "#ff3b6b" }}>
                  ⚔ NEMESIS · REVANCHE
                </div>
              )}
              <div className="mk-title" style={{ fontSize: 10, textShadow: "2px 2px 0 #000" }}>
                {opp.pilot}
              </div>
              <div className="mk-title" style={{ fontSize: 7, color: opp.rank.tier.color }}>
                {opp.rank.name} · MMR {opp.mmr}
              </div>
              <div className="mk-title" style={{ fontSize: 6, color: "var(--mk-muted)" }}>
                {opp.stage.label}
              </div>
            </div>
          </div>

          {opp.rival && r.rival && (
            <Panel style={{ marginBottom: 8, borderColor: "#ff3b6b" }}>
              <div className="mk-title" style={{ fontSize: 7, color: "#ff3b6b" }}>
                ELE JA TE VENCEU {r.rival.wins}x
              </div>
              <div style={{ fontSize: 10, color: "var(--mk-muted)" }}>
                Nemesis vem mais forte a cada vitoria. Derrotalo rende ouro extra e PR bonus.
              </div>
            </Panel>
          )}

          <Panel style={{ marginBottom: 8 }}>
            <div className="mk-title" style={{ fontSize: 8, color: opp.archetype.color }}>
              {opp.archetype.name}
            </div>
            <div style={{ fontSize: 10, color: "var(--mk-muted)" }}>{opp.archetype.desc}</div>
            <div className="mk-title" style={{ fontSize: 6, marginTop: 4 }}>
              DIFERENCA DE RANK:{" "}
              <span style={{ color: opp.spread > 0 ? "#ff6b6b" : "#57d76a" }}>
                {opp.spread > 0 ? `+${opp.spread}` : opp.spread}
              </span>
            </div>
          </Panel>

          <div className="mk-title" style={{ fontSize: 8, marginBottom: 4 }}>
            ESQUADRAO INIMIGO
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {opp.stage.enemies.map((e, i) => (
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
            {team.map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: "2px solid rgba(53,226,240,0.4)",
                  background: "rgba(8,18,32,0.7)",
                  padding: 4,
                }}
              >
                <img src={faceUrl(t.id)} alt="" width={28} height={28} style={{ imageRendering: "pixelated" }} />
                <span className="mk-title" style={{ fontSize: 7, flex: 1 }}>
                  {ROBOT_MAP[t.id].name} Lv{t.level}
                </span>
              </div>
            ))}
          </div>

          {team.length === 0 ? (
            <div className="mk-title" style={{ fontSize: 8, color: "var(--mk-hp)" }}>
              ESCALE PELO MENOS UM ROBO
            </div>
          ) : (
            <div style={{ display: "grid", gap: 6 }}>
              <PixelButton onClick={() => setView("fight")}>ENTRAR NA ARENA</PixelButton>
              <button
                type="button"
                className="mk-btn mk-btn-sq"
                disabled={rerolls >= REROLL_LIMIT}
                onClick={reroll}
                style={{ fontSize: 7, padding: 4, width: "100%" }}
              >
                {rerolls >= REROLL_LIMIT
                  ? "SEM TROCAS NESTA SESSAO"
                  : `TROCAR OPONENTE (${REROLL_LIMIT - rerolls})`}
              </button>
            </div>
          )}
          <div style={{ height: 40 }} />
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------- hub
  const rewards = rewardList(r);
  const ladder = leaderboard(r);

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <TopBar title={`RANQUEADO · TEMPORADA ${r.season}`} gold={g.gold} onBack={onBack} />
      <div className="mk-scroll" style={{ flex: 1, padding: 8 }}>
        {/* EMBLEMA */}
        <div
          style={{
            backgroundImage: "linear-gradient(rgba(4,9,18,0.3), rgba(4,9,18,0.92)), url(/modes/ranked.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            imageRendering: "pixelated",
            border: `2px solid ${rank.tier.color}`,
            padding: 10,
            display: "grid",
            placeItems: "center",
            gap: 4,
          }}
        >
          <img
            src={rank.tier.emblem}
            alt={rank.name}
            width={104}
            height={104}
            style={{ imageRendering: "pixelated", filter: `drop-shadow(0 0 6px ${rank.tier.color})` }}
          />
          <div className="mk-title" style={{ fontSize: 12, color: rank.tier.color, textShadow: "2px 2px 0 #000" }}>
            {placing ? "CLASSIFICATORIAS" : rank.name}
          </div>
          <div className="mk-title" style={{ fontSize: 6, color: "var(--mk-muted)", textAlign: "center" }}>
            {placing
              ? `${r.placementsDone}/${PLACEMENT_MATCHES} PARTIDAS · ${r.placementWins} VITORIAS`
              : rank.tier.desc}
          </div>
        </div>

        {/* PR / ESCUDO / PROMO */}
        {!placing && (
          <div style={{ marginTop: 8 }}>
            <PrBar pr={r.pr} max={rank.prToPromote} />
            <div
              className="mk-title"
              style={{ fontSize: 6, display: "flex", justifyContent: "space-between", marginTop: 4 }}
            >
              <span>
                <Icon name="shield" size={10} /> ESCUDO {r.shield}
              </span>
              <span style={{ color: "var(--mk-accent2)" }}>MMR {stats.mmr}</span>
              <span style={{ color: "var(--mk-muted)" }}>TOPO {seasonProgressPct(r)}%</span>
            </div>
          </div>
        )}

        {r.promo && (
          <Panel style={{ marginTop: 8, borderColor: "#ffc43a" }}>
            <div className="mk-title" style={{ fontSize: 8, color: "var(--mk-accent)" }}>
              SERIE DE PROMOCAO — {rankAt(r.promo.targetIndex).name}
            </div>
            <div style={{ display: "flex", gap: 4, marginTop: 6 }}>
              {Array.from({ length: PROMO_WINS + PROMO_LOSSES - 1 }).map((_, i) => {
                const won = i < r.promo!.wins;
                const lost = i >= PROMO_WINS + PROMO_LOSSES - 1 - r.promo!.losses;
                return (
                  <div
                    key={i}
                    className="mk-title"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: 8,
                      padding: 4,
                      border: "2px solid rgba(255,196,58,0.5)",
                      background: won ? "rgba(87,215,106,0.25)" : lost ? "rgba(226,69,58,0.25)" : "rgba(8,18,32,0.8)",
                    }}
                  >
                    {won ? "V" : lost ? "D" : "-"}
                  </div>
                );
              })}
            </div>
            <div className="mk-title" style={{ fontSize: 6, color: "var(--mk-muted)", marginTop: 4 }}>
              MELHOR DE 3 · VENCA {PROMO_WINS} PARA SUBIR DE TIER
            </div>
          </Panel>
        )}

        <div style={{ marginTop: 8 }}>
          <PixelButton onClick={queue} disabled={team.length === 0}>
            {placing ? `CLASSIFICATORIA ${r.placementsDone + 1}/${PLACEMENT_MATCHES}` : "PROCURAR PARTIDA"}
          </PixelButton>
        </div>

        {/* NEMESIS */}
        {r.rival && (
          <Panel style={{ marginTop: 8, borderColor: "#ff3b6b" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img
                src={faceUrl(r.rival.robot)}
                alt=""
                width={40}
                height={40}
                style={{ imageRendering: "pixelated", filter: "drop-shadow(0 0 4px #ff3b6b)" }}
              />
              <div style={{ flex: 1 }}>
                <div className="mk-title" style={{ fontSize: 7, color: "#ff3b6b" }}>
                  NEMESIS ATIVO
                </div>
                <div className="mk-title" style={{ fontSize: 9 }}>
                  {r.rival.pilot}
                </div>
                <div className="mk-title" style={{ fontSize: 6, color: "var(--mk-muted)" }}>
                  {rankAt(r.rival.rankIndex).name} · VENCEU VOCE {r.rival.wins}x
                </div>
              </div>
              <span className="mk-title" style={{ fontSize: 6, color: "var(--mk-muted)", textAlign: "right" }}>
                DERROTADOS
                <br />
                <span style={{ color: "#57d76a", fontSize: 9 }}>{r.nemesisBeaten}</span>
              </span>
            </div>
            <div style={{ fontSize: 10, color: "var(--mk-muted)", marginTop: 4 }}>
              Ele pode reaparecer na fila a qualquer momento. Vence-lo remove o nemesis e paga ouro extra.
            </div>
          </Panel>
        )}

        {/* ESTATISTICAS */}
        <div
          className="mk-title"
          style={{
            fontSize: 6,
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            justifyContent: "space-between",
            marginTop: 8,
            padding: "5px 6px",
            border: "2px solid rgba(53,226,240,0.25)",
            background: "rgba(6,14,26,0.7)",
          }}
        >
          <span>
            V/D <span style={{ color: "var(--mk-accent2)" }}>{r.wins}/{r.losses}</span>
          </span>
          <span>
            WR <span style={{ color: "var(--mk-accent2)" }}>{stats.winrate}%</span>
          </span>
          <span>
            SEQ <span style={{ color: "var(--mk-accent)" }}>{stats.streakLabel}</span>
          </span>
          <span>
            PERFEITAS <span style={{ color: "#57d76a" }}>{stats.flawless}</span>
          </span>
          <span>
            PR MEDIO <span style={{ color: "var(--mk-accent)" }}>{stats.avgDelta}</span>
          </span>
        </div>
        {stats.form.length > 0 && (
          <div style={{ display: "flex", gap: 3, marginTop: 4 }}>
            {stats.form.map((f, i) => (
              <span
                key={i}
                className="mk-title"
                style={{
                  fontSize: 6,
                  padding: "2px 5px",
                  background: f === "W" ? "rgba(87,215,106,0.3)" : "rgba(226,69,58,0.3)",
                  border: `2px solid ${f === "W" ? "#57d76a" : "#e2453a"}`,
                }}
              >
                {f === "W" ? "V" : "D"}
              </span>
            ))}
          </div>
        )}

        {/* ABAS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 4, marginTop: 8 }}>
          {(["ladder", "missions", "rewards", "history"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              className="mk-btn mk-btn-sq"
              onClick={() => setTab(t)}
              style={{ fontSize: 6, padding: 0, borderColor: tab === t ? "var(--mk-accent2)" : undefined }}
            >
              {t === "ladder"
                ? "RANKING"
                : t === "missions"
                  ? `MISSOES${missionsReady > 0 ? ` (${missionsReady})` : ""}`
                  : t === "rewards"
                    ? "PREMIOS"
                    : "HISTORICO"}
            </button>
          ))}
        </div>

        {tab === "missions" && (
          <div style={{ display: "grid", gap: 4, marginTop: 6 }}>
            {missions.map((m) => (
              <div
                key={m.id}
                style={{
                  padding: 5,
                  border: `2px solid ${m.claimable ? "var(--mk-accent)" : "rgba(53,226,240,0.22)"}`,
                  background: m.claimed ? "rgba(8,18,32,0.45)" : "rgba(8,18,32,0.8)",
                  opacity: m.claimed ? 0.6 : 1,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span className="mk-title" style={{ fontSize: 7, flex: 1 }}>
                    {m.name}
                  </span>
                  <span className="mk-title" style={{ fontSize: 7, color: "var(--mk-accent2)" }}>
                    <Icon name="coins" size={10} /> {m.gold}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: "var(--mk-muted)", margin: "2px 0 4px" }}>{m.desc}</div>
                <MissionBar progress={m.progress} goal={m.goal} done={m.done} />
                <button
                  type="button"
                  className="mk-btn mk-btn-sq"
                  disabled={!m.claimable}
                  onClick={() => claimRankedMission(m.id)}
                  style={{ fontSize: 6, padding: 2, width: "100%", marginTop: 4 }}
                >
                  {m.claimed ? "COLETADO" : m.claimable ? "COLETAR" : "EM PROGRESSO"}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "ladder" && (
          <div style={{ display: "grid", gap: 3, marginTop: 6 }}>
            {ladder.map((row, i) => (
              <div
                key={`${row.pilot}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: 4,
                  border: `2px solid ${row.you ? "var(--mk-accent2)" : "rgba(53,226,240,0.22)"}`,
                  background: row.you ? "rgba(255,196,58,0.14)" : "rgba(8,18,32,0.7)",
                }}
              >
                <span className="mk-title" style={{ fontSize: 7, width: 20, color: "var(--mk-muted)" }}>
                  #{i + 1}
                </span>
                <img src={faceUrl(row.robot)} alt="" width={22} height={22} style={{ imageRendering: "pixelated" }} />
                <span className="mk-title" style={{ fontSize: 7, flex: 1 }}>
                  {row.pilot}
                </span>
                <span className="mk-title" style={{ fontSize: 6, color: row.rank.tier.color }}>
                  {row.rank.short}
                </span>
                <span className="mk-title" style={{ fontSize: 7, color: "var(--mk-accent2)" }}>
                  {row.rating}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === "rewards" && (
          <div style={{ display: "grid", gap: 3, marginTop: 6 }}>
            {rewards.map((rw) => (
              <div
                key={rw.index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: 4,
                  border: `2px solid ${rw.claimable ? "var(--mk-accent)" : "rgba(53,226,240,0.2)"}`,
                  background: rw.claimed ? "rgba(8,18,32,0.45)" : "rgba(8,18,32,0.8)",
                  opacity: rw.claimable || rw.claimed ? 1 : 0.55,
                }}
              >
                <img
                  src={rw.rank.tier.emblem}
                  alt=""
                  width={26}
                  height={26}
                  style={{
                    imageRendering: "pixelated",
                    filter: rw.claimable || rw.claimed ? undefined : "grayscale(1) brightness(0.6)",
                  }}
                />
                <span className="mk-title" style={{ fontSize: 7, flex: 1, color: rw.rank.tier.color }}>
                  {rw.rank.name}
                </span>
                <span className="mk-title" style={{ fontSize: 7, color: "var(--mk-accent2)" }}>
                  <Icon name="coins" size={10} /> {rw.gold}
                </span>
                <button
                  type="button"
                  className="mk-btn mk-btn-sq"
                  disabled={!rw.claimable}
                  onClick={() => claimRankReward(rw.index)}
                  style={{ fontSize: 6, padding: 0, width: 54 }}
                >
                  {rw.claimed ? "OK" : rw.claimable ? "PEGAR" : "—"}
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "history" && (
          <div style={{ display: "grid", gap: 3, marginTop: 6 }}>
            {r.history.length === 0 && (
              <div className="mk-title" style={{ fontSize: 7, color: "var(--mk-muted)" }}>
                NENHUMA PARTIDA REGISTRADA
              </div>
            )}
            {r.history.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: 4,
                  border: `2px solid ${h.win ? "rgba(87,215,106,0.5)" : "rgba(226,69,58,0.5)"}`,
                  background: "rgba(8,18,32,0.7)",
                }}
              >
                <span className="mk-title" style={{ fontSize: 7, color: h.win ? "#57d76a" : "#e2453a" }}>
                  {h.win ? "V" : "D"}
                </span>
                <span className="mk-title" style={{ fontSize: 7, flex: 1 }}>
                  {h.opponent}
                </span>
                <span className="mk-title" style={{ fontSize: 6, color: "var(--mk-muted)" }}>
                  {h.kind === "promo" ? "SERIE" : h.kind === "placement" ? "CLASSIF." : h.rankName}
                </span>
                {h.kind === "ranked" && (
                  <span
                    className="mk-title"
                    style={{ fontSize: 7, color: h.delta >= 0 ? "#57d76a" : "#e2453a", width: 34, textAlign: "right" }}
                  >
                    {h.delta >= 0 ? `+${h.delta}` : h.delta}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 10 }}>
          <div className="mk-title" style={{ fontSize: 6, color: "var(--mk-muted)", marginBottom: 4 }}>
            MELHOR RANK: {rankAt(r.bestRankIndex).name} · MELHOR SEQUENCIA: {r.bestStreak}
          </div>
          <button
            type="button"
            className="mk-btn mk-btn-sq"
            onClick={() => {
              if (confirm("Encerrar a temporada e recomeçar as classificatórias?")) startNewSeason();
            }}
            style={{ fontSize: 6, padding: 0, width: "100%" }}
          >
            ENCERRAR TEMPORADA {r.season}
          </button>
        </div>
        <div style={{ height: 56 }} />
      </div>
    </div>
  );
}

function PrBar({ pr, max }: { pr: number; max: number }) {
  const pct = Math.max(0, Math.min(1, pr / max));
  return (
    <div>
      <div
        style={{
          position: "relative",
          height: 14,
          border: "2px solid rgba(53,226,240,0.5)",
          background: "rgba(6,14,26,0.9)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: `${pct * 100}%`,
            background: "linear-gradient(90deg, #35e2f0, #ffc43a)",
            transition: "width 500ms steps(12)",
          }}
        />
        <span
          className="mk-title"
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontSize: 7,
            textShadow: "1px 1px 0 #000",
          }}
        >
          {pr} / {max} PR
        </span>
      </div>
    </div>
  );
}

function MissionBar({ progress, goal, done }: { progress: number; goal: number; done: boolean }) {
  const pct = Math.max(0, Math.min(1, goal > 0 ? progress / goal : 0));
  return (
    <div
      style={{
        position: "relative",
        height: 12,
        border: "2px solid rgba(53,226,240,0.45)",
        background: "rgba(6,14,26,0.9)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${pct * 100}%`,
          background: done ? "linear-gradient(90deg,#57d76a,#ffc43a)" : "linear-gradient(90deg,#35e2f0,#7ad3ff)",
          transition: "width 400ms steps(10)",
        }}
      />
      <span
        className="mk-title"
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontSize: 6,
          textShadow: "1px 1px 0 #000",
        }}
      >
        {progress} / {goal}
      </span>
    </div>
  );
}

function ResultView({
  outcome,
  onDone,
  onAgain,
}: {
  outcome: RankedOutcome;
  onDone: () => void;
  onAgain: () => void;
}) {
  const target = outcome.state.pr;
  const max = outcome.newRank.prToPromote;
  const [shown, setShown] = useState(outcome.prevPr);

  useEffect(() => {
    const id = window.setTimeout(() => setShown(target), 260);
    return () => window.clearTimeout(id);
  }, [target]);

  const headline = useMemo(() => {
    if (outcome.placementDone) return "CLASSIFICADO!";
    if (outcome.promoWon) return "PROMOVIDO!";
    if (outcome.promoLost) return "SERIE PERDIDA";
    if (outcome.promoStarted) return "SERIE DE PROMOCAO!";
    if (outcome.promoted) return "SUBIU DE DIVISAO!";
    if (outcome.demoted) return "REBAIXADO";
    if (outcome.shieldUsed) return "ESCUDO ATIVADO";
    return outcome.delta >= 0 ? "VITORIA RANQUEADA" : "DERROTA";
  }, [outcome]);

  const win = outcome.delta > 0 || outcome.promoWon || outcome.promoted || outcome.placementDone;
  const b = outcome.breakdown;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        padding: 10,
        backgroundImage: "linear-gradient(rgba(4,8,16,0.9), rgba(4,8,16,0.96)), url(/modes/ranked.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
      }}
    >
      <Panel style={{ width: "min(94vw, 400px)", maxHeight: "92vh", overflow: "hidden" }}>
        <div className="mk-scroll" style={{ maxHeight: "84vh", paddingRight: 4 }}>
          <div
            className="mk-title"
            style={{
              fontSize: 12,
              textAlign: "center",
              color: win ? "var(--mk-accent2)" : "var(--mk-hp)",
            }}
          >
            {headline}
          </div>

          <div style={{ display: "grid", placeItems: "center", margin: "8px 0" }}>
            <img
              src={outcome.newRank.tier.emblem}
              alt=""
              width={88}
              height={88}
              style={{
                imageRendering: "pixelated",
                filter: `drop-shadow(0 0 6px ${outcome.newRank.tier.color})`,
              }}
            />
            <div className="mk-title" style={{ fontSize: 9, color: outcome.newRank.tier.color }}>
              {outcome.newRank.name}
            </div>
            {outcome.prevRank.index !== outcome.newRank.index && (
              <div className="mk-title" style={{ fontSize: 6, color: "var(--mk-muted)" }}>
                ANTES: {outcome.prevRank.name}
              </div>
            )}
          </div>

          {outcome.delta !== 0 && (
            <>
              <div
                className="mk-title"
                style={{
                  fontSize: 14,
                  textAlign: "center",
                  marginBottom: 4,
                  color: outcome.delta > 0 ? "#57d76a" : "#e2453a",
                }}
              >
                {outcome.delta > 0 ? `+${outcome.delta}` : outcome.delta} PR
              </div>
              <PrBar pr={shown} max={max} />
              <div style={{ display: "grid", gap: 2, margin: "8px 0" }}>
                <Line label="BASE" value={b.base} />
                <Line label="DIFERENCA DE RANK" value={b.spread} />
                <Line label="SEQUENCIA" value={b.streak} />
                <Line label="DESEMPENHO" value={b.performance} />
                <Line label="NEMESIS" value={b.rival} />
              </div>
            </>
          )}

          {outcome.flawless && (
            <div className="mk-title" style={{ fontSize: 7, color: "#57d76a", textAlign: "center" }}>
              VITORIA PERFEITA — NENHUM ROBO CAIU
            </div>
          )}
          {outcome.shieldUsed && (
            <div className="mk-title" style={{ fontSize: 7, color: "var(--mk-accent)", textAlign: "center" }}>
              ESCUDO DE REBAIXAMENTO ABSORVEU A QUEDA
            </div>
          )}
          {outcome.promoStarted && (
            <div className="mk-title" style={{ fontSize: 7, color: "var(--mk-accent)", textAlign: "center" }}>
              SERIE DE PROMOCAO DESBLOQUEADA
            </div>
          )}

          <div className="mk-title" style={{ fontSize: 8, textAlign: "center", margin: "8px 0" }}>
            <Icon name="coins" size={12} /> OURO +{outcome.gold}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            <PixelButton onClick={onAgain}>OUTRA PARTIDA</PixelButton>
            <PixelButton onClick={onDone}>VOLTAR AO HUB</PixelButton>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function Line({ label, value }: { label: string; value: number }) {
  if (value === 0) return null;
  return (
    <div
      className="mk-title"
      style={{ fontSize: 6, display: "flex", justifyContent: "space-between" }}
    >
      <span style={{ color: "var(--mk-muted)" }}>{label}</span>
      <span style={{ color: value > 0 ? "#57d76a" : "#e2453a" }}>
        {value > 0 ? `+${value}` : value}
      </span>
    </div>
  );
}