import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArenaBackdrop,
  Icon,
  Panel,
  PixelButton,
  RobotSprite,
  StatBar,
  VfxSprite,
} from "@/components/game/pixel";
import {
  activeOf,
  applyForcedSwap,
  createBattle,
  effectLabel,
  fighterSkills,
  resolveTurn,
  type Battle,
  type BattleAction,
  type BattleEvent,
  type Side,
} from "@/game/battle";
import { ITEM_MAP } from "@/game/config";
import type { RobotSave } from "@/game/engine";
import { faceUrl, ROBOT_MAP } from "@/game/robots";

type Clip = "idle" | "attack" | "damage" | "guard" | "enter";
type Menu = "root" | "skills" | "items" | "swap";

interface Float {
  key: number;
  side: Side;
  text: string;
  tone: string;
}

const TONE_COLOR: Record<string, string> = {
  dmg: "#ff5b4d",
  crit: "#ffb43a",
  heal: "#57d76a",
  miss: "#cfe4ff",
  info: "#35e2f0",
};

export function BattleScreen({
  arena,
  round,
  playerTeam,
  enemyTeam,
  items,
  label,
  onFinish,
  onUseItem,
  startState,
}: {
  arena: string;
  round?: number;
  playerTeam: RobotSave[];
  enemyTeam: RobotSave[];
  items: Record<string, number>;
  label: string;
  onFinish: (
    result: "win" | "lose",
    snapshot?: Record<string, { hp: number; mp: number }>,
  ) => void;
  onUseItem: (itemId: string) => void;
  /** HP/MP herdados de uma luta anterior (Torre de Babel, sobrevivência...). */
  startState?: Record<string, { hp: number; mp: number }>;
}) {
  const [battle, setBattle] = useState<Battle>(() => {
    const b = createBattle({ arena, playerTeam, enemyTeam, items });
    if (startState) {
      for (const f of b.player.fighters) {
        const st = startState[f.robotId];
        if (!st) continue;
        f.hp = Math.max(0, Math.min(f.maxHp, Math.round(f.maxHp * st.hp)));
        f.mp = Math.max(0, Math.min(f.maxMp, Math.round(f.maxMp * st.mp)));
      }
      const first = b.player.fighters.findIndex((f) => f.hp > 0);
      b.player.active = first >= 0 ? first : 0;
    }
    return b;
  });
  const [queue, setQueue] = useState<BattleEvent[]>([]);
  const [clips, setClips] = useState<Record<Side, Clip>>({ player: "enter", enemy: "enter" });
  const [vfx, setVfx] = useState<{ side: Side; url: string; key: number } | null>(null);
  const [floats, setFloats] = useState<Float[]>([]);
  const [message, setMessage] = useState(`${label} — LUTAR!`);
  const [menu, setMenu] = useState<Menu>("root");
  const [shakeSide, setShakeSide] = useState<Side | null>(null);
  const keyRef = useRef(0);

  const busy = queue.length > 0;
  const pActive = activeOf(battle, "player");
  const eActive = activeOf(battle, "enemy");
  const pSkills = fighterSkills(pActive);
  const pGuard = pSkills.find((s) => s.kind === "defense") ?? pSkills[pSkills.length - 1];

  useEffect(() => {
    const id = window.setTimeout(() => {
      setClips({ player: "idle", enemy: "idle" });
      setBattle((b) => ({ ...b, phase: b.phase === "intro" ? "menu" : b.phase }));
    }, 1100);
    return () => window.clearTimeout(id);
  }, []);

  const nextFloat = useCallback((side: Side, text: string, tone: string) => {
    keyRef.current += 1;
    const key = keyRef.current;
    setFloats((f) => [...f, { key, side, text, tone }]);
    window.setTimeout(() => setFloats((f) => f.filter((x) => x.key !== key)), 900);
  }, []);

  // playback dos eventos
  useEffect(() => {
    if (queue.length === 0) return;
    const ev = queue[0];
    let delay = 260;
    if (ev.t === "msg") {
      setMessage(ev.text);
      delay = 520;
    } else if (ev.t === "clip") {
      setClips((c) => ({ ...c, [ev.side]: ev.clip as Clip }));
      delay = ev.clip === "enter" ? 700 : 480;
      window.setTimeout(() => setClips((c) => ({ ...c, [ev.side]: "idle" })), delay - 60);
    } else if (ev.t === "vfx") {
      keyRef.current += 1;
      setVfx({ side: ev.side, url: ev.url, key: keyRef.current });
      setShakeSide(ev.side);
      window.setTimeout(() => setShakeSide(null), 260);
      delay = 360;
    } else if (ev.t === "float") {
      nextFloat(ev.side, ev.text, ev.tone);
      delay = 380;
    } else if (ev.t === "sync") {
      setBattle(ev.battle);
      delay = 60;
    } else if (ev.t === "faint") {
      delay = 620;
    } else if (ev.t === "end") {
      delay = 500;
    }
    const id = window.setTimeout(() => setQueue((q) => q.slice(1)), delay);
    return () => window.clearTimeout(id);
  }, [queue, nextFloat]);

  const act = useCallback(
    (action: BattleAction) => {
      if (busy || battle.phase !== "menu") return;
      setMenu("root");
      if (action.kind === "item") onUseItem(action.itemId);
      const res = resolveTurn(battle, action);
      setQueue(res.events);
    },
    [battle, busy, onUseItem],
  );

  const forcedSwap = useCallback(
    (index: number) => {
      const res = applyForcedSwap(battle, index);
      setQueue(res.events);
    },
    [battle],
  );

  const ownedItems = useMemo(
    () => Object.entries(battle.player.items).filter(([, q]) => q > 0),
    [battle.player.items],
  );

  const over = battle.phase === "over" && !busy;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <ArenaBackdrop arena={arena} round={round} />

      {/* HUD superior */}
      <div style={{ position: "absolute", top: 8, left: 8, right: 8, display: "flex", gap: 8 }}>
        <FighterHud
          side="player"
          name={pActive.name}
          hp={pActive.hp}
          maxHp={pActive.maxHp}
          mp={pActive.mp}
          maxMp={pActive.maxMp}
          level={pActive.level}
          robotId={pActive.robotId}
          effects={pActive.effects.map((e) => effectLabel(e.type))}
          team={battle.player.fighters.map((f) => ({ id: f.robotId, alive: f.hp > 0 }))}
        />
        <FighterHud
          side="enemy"
          name={eActive.name}
          hp={eActive.hp}
          maxHp={eActive.maxHp}
          mp={eActive.mp}
          maxMp={eActive.maxMp}
          level={eActive.level}
          robotId={eActive.robotId}
          effects={eActive.effects.map((e) => effectLabel(e.type))}
          team={battle.enemy.fighters.map((f) => ({ id: f.robotId, alive: f.hp > 0 }))}
        />
      </div>

      {/* Palco */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "44%",
          height: 180,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "0 6vw",
        }}
      >
        <Stage
          side="player"
          robotId={pActive.robotId}
          clip={clips.player}
          flip={false}
          dim={pActive.hp <= 0}
          shake={shakeSide === "player"}
          vfx={vfx?.side === "player" ? vfx : null}
          floats={floats.filter((f) => f.side === "player")}
        />
        <Stage
          side="enemy"
          robotId={eActive.robotId}
          clip={clips.enemy}
          flip
          dim={eActive.hp <= 0}
          shake={shakeSide === "enemy"}
          vfx={vfx?.side === "enemy" ? vfx : null}
          floats={floats.filter((f) => f.side === "enemy")}
        />
      </div>

      {/* Caixa de mensagem + menu */}
      <div style={{ position: "absolute", left: 6, right: 6, bottom: 38 }}>
        <Panel variant="strip" className="mk-title" style={undefined}>
          <div style={{ fontSize: 9, minHeight: 22, lineHeight: "1.5" }}>{message}</div>
        </Panel>

        {battle.phase === "forced_swap" && !busy && (
          <Panel className="mt-1">
            <div className="mk-title" style={{ fontSize: 9, marginBottom: 6 }}>
              ESCOLHA O PROXIMO ROBO
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {battle.player.fighters.map((f, i) =>
                f.hp > 0 ? (
                  <PixelButton key={f.uid} onClick={() => forcedSwap(i)}>
                    {f.name}
                  </PixelButton>
                ) : null,
              )}
            </div>
          </Panel>
        )}

        {battle.phase === "menu" && !busy && (
          <div style={{ marginTop: 4 }}>
            {menu === "root" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                <PixelButton onClick={() => setMenu("skills")}>ATACAR</PixelButton>
                <PixelButton onClick={() => setMenu("items")}>ITENS</PixelButton>
                <PixelButton onClick={() => setMenu("swap")}>TROCAR</PixelButton>
                <PixelButton
                  onClick={() =>
                    act({ kind: "skill", skillId: pGuard.id })
                  }
                  disabled={pActive.mp < pGuard.mp}
                >
                  DEFENDER
                </PixelButton>
              </div>
            )}
            {menu === "skills" && (
              <Panel>
                <div style={{ display: "grid", gap: 4 }}>
                  {pSkills.map((s) => (
                    <PixelButton
                      key={s.id}
                      disabled={pActive.mp < s.mp}
                      onClick={() => act({ kind: "skill", skillId: s.id })}
                    >
                      {s.name} {s.mp > 0 ? `— ${s.mp} MP` : "— 0 MP"}
                    </PixelButton>
                  ))}
                  <PixelButton onClick={() => setMenu("root")}>VOLTAR</PixelButton>
                </div>
              </Panel>
            )}
            {menu === "items" && (
              <Panel>
                <div style={{ display: "grid", gap: 4 }}>
                  {ownedItems.length === 0 && (
                    <div className="mk-title" style={{ fontSize: 8 }}>
                      SEM ITENS
                    </div>
                  )}
                  {ownedItems.map(([id, qty]) => {
                    const item = ITEM_MAP[id];
                    if (!item?.battle) return null;
                    const targetIndex =
                      item.effect.kind === "revive"
                        ? battle.player.fighters.findIndex((f) => f.hp <= 0)
                        : battle.player.active;
                    return (
                      <PixelButton
                        key={id}
                        disabled={targetIndex < 0}
                        onClick={() => act({ kind: "item", itemId: id, targetIndex })}
                      >
                        {item.name} x{qty}
                      </PixelButton>
                    );
                  })}
                  <PixelButton onClick={() => setMenu("root")}>VOLTAR</PixelButton>
                </div>
              </Panel>
            )}
            {menu === "swap" && (
              <Panel>
                <div style={{ display: "grid", gap: 4 }}>
                  {battle.player.fighters.map((f, i) => (
                    <PixelButton
                      key={f.uid}
                      disabled={f.hp <= 0 || i === battle.player.active}
                      onClick={() => act({ kind: "swap", index: i })}
                    >
                      {f.name} — {f.hp}/{f.maxHp}
                    </PixelButton>
                  ))}
                  <PixelButton onClick={() => setMenu("root")}>VOLTAR</PixelButton>
                </div>
              </Panel>
            )}
          </div>
        )}
      </div>

      {over && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(3,6,12,0.82)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Panel style={undefined}>
            <div
              className="mk-title"
              style={{
                fontSize: 16,
                color: battle.result === "win" ? "var(--mk-accent2)" : "var(--mk-hp)",
                textAlign: "center",
                marginBottom: 10,
              }}
            >
              {battle.result === "win" ? "VITORIA!" : "DERROTA"}
            </div>
            <div style={{ display: "grid", placeItems: "center", marginBottom: 10 }}>
              <img src={`/ui/icon_${battle.result === "win" ? "trophy" : "skull"}.png`} alt="" width={48} height={48} />
            </div>
            <PixelButton
              onClick={() =>
                onFinish(
                  battle.result ?? "lose",
                  Object.fromEntries(
                    battle.player.fighters.map((f) => [
                      f.robotId,
                      { hp: f.hp / f.maxHp, mp: f.mp / f.maxMp },
                    ]),
                  ),
                )
              }
            >
              CONTINUAR
            </PixelButton>
          </Panel>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          top: 96,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(3,6,12,0.72)",
          padding: "2px 8px",
          border: "1px solid rgba(90,200,255,0.25)",
        }}
        className="mk-title"
      >
        <span style={{ fontSize: 7, color: "var(--mk-muted)" }}>
          <Icon name="trophy" size={10} /> {label} — TURNO {battle.turn}
        </span>
      </div>
    </div>
  );
}

function Stage({
  robotId,
  clip,
  flip,
  dim,
  shake,
  vfx,
  floats,
}: {
  side: Side;
  robotId: string;
  clip: Clip;
  flip: boolean;
  dim: boolean;
  shake: boolean;
  vfx: { url: string; key: number } | null;
  floats: Float[];
}) {
  return (
    <div style={{ position: "relative" }} className={shake ? "mk-shake" : undefined}>
      <RobotSprite
        robotId={robotId}
        clip={clip}
        size={132}
        flip={flip}
        fps={clip === "idle" ? 4 : 8}
        loop={clip === "idle"}
        dim={dim}
      />
      {vfx && (
        <div key={vfx.key} style={{ position: "absolute", left: -14, top: -20 }}>
          <VfxSprite url={vfx.url} size={160} />
        </div>
      )}
      {floats.map((f, idx) => (
        <div
          key={f.key}
          className="mk-float mk-title"
          style={{
            position: "absolute",
            left: 8,
            top: 10 + idx * 16,
            fontSize: 9,
            color: TONE_COLOR[f.tone] ?? "#fff",
            textShadow: "2px 2px 0 #000",
            whiteSpace: "nowrap",
          }}
        >
          {f.text}
        </div>
      ))}
    </div>
  );
}

function FighterHud({
  side,
  name,
  hp,
  maxHp,
  mp,
  maxMp,
  level,
  robotId,
  effects,
  team,
}: {
  side: Side;
  name: string;
  hp: number;
  maxHp: number;
  mp: number;
  maxMp: number;
  level: number;
  robotId: string;
  effects: string[];
  team: { id: string; alive: boolean }[];
}) {
  return (
    <div
      style={{
        flex: 1,
        background: "rgba(4,10,20,0.78)",
        border: "2px solid rgba(53,226,240,0.5)",
        padding: 4,
        display: "flex",
        flexDirection: side === "player" ? "row" : "row-reverse",
        gap: 4,
        alignItems: "flex-start",
      }}
    >
      <img src={faceUrl(robotId)} alt="" width={34} height={34} style={{ imageRendering: "pixelated" }} />
      <div style={{ flex: 1, textAlign: side === "player" ? "left" : "right" }}>
        <div className="mk-title" style={{ fontSize: 7, marginBottom: 2 }}>
          {name} <span style={{ color: "var(--mk-accent2)" }}>Lv{level}</span>
        </div>
        <StatBar kind="hp" value={hp} max={maxHp} width={104} showText={false} />
        <div style={{ height: 2 }} />
        <StatBar kind="mp" value={mp} max={maxMp} width={104} showText={false} />
        <div
          className="mk-title"
          style={{ fontSize: 6, color: "var(--mk-muted)", marginTop: 2 }}
        >
          {hp}/{maxHp} HP · {mp}/{maxMp} MP
        </div>
        {effects.length > 0 && (
          <div
            className="mk-title"
            style={{ fontSize: 6, color: "var(--mk-accent)", marginTop: 2 }}
          >
            {effects.join(" ")}
          </div>
        )}
        <div
          style={{
            display: "flex",
            gap: 2,
            marginTop: 3,
            justifyContent: side === "player" ? "flex-start" : "flex-end",
          }}
        >
          {team.map((t, i) => (
            <img
              key={`${t.id}-${i}`}
              src={faceUrl(t.id)}
              alt=""
              width={14}
              height={14}
              style={{
                imageRendering: "pixelated",
                filter: t.alive ? undefined : "grayscale(1) brightness(0.4)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
