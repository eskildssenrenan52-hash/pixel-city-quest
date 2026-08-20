import { useState } from "react";
import { Frame, Panel, PixelButton, RobotSprite, StatBar } from "@/components/game/pixel";
import { Icon } from "@/components/game/pixel";
import { LoadoutEditor } from "@/components/game/loadout";
import { TRAIN_COST_PER_POINT } from "@/game/config";
import { baseStats, maxTrained, robotMaxXP, type RobotSave } from "@/game/engine";
import { addGold, setTeam, updateRobots, useGame } from "@/game/save";
import { faceUrl, ROBOT_MAP, ROBOTS } from "@/game/robots";

const RARITY_GLOW: Record<string, string> = {
  bronze: "rgba(205,127,50,0.9)",
  silver: "rgba(198,214,232,0.9)",
  gold: "rgba(255,196,58,0.95)",
};

export function RosterScreen({ onBack }: { onBack: () => void }) {
  const g = useGame();
  const [focus, setFocus] = useState<string>(g.robots[0]?.id ?? ROBOTS[0].id);
  const [detail, setDetail] = useState<string | null>(null);

  const owned = g.robots;
  const focused = owned.find((r) => r.id === focus) ?? owned[0] ?? null;
  const focusDef = ROBOT_MAP[focused ? focused.id : focus];
  const inTeam = focused ? g.team.includes(focused.id) : false;
  const locked = !focused || focused.id !== focus;

  function toggleTeam() {
    if (!focused) return;
    if (inTeam) {
      if (g.team.length <= 1) return;
      setTeam(g.team.filter((id) => id !== focused.id));
    } else {
      if (g.team.length >= 4) return;
      setTeam([...g.team, focused.id]);
    }
  }

  const lockedDef = locked ? ROBOT_MAP[focus] : null;
  const showDef = lockedDef ?? focusDef;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      <TopBar title="HEROIS MECHA" gold={g.gold} onBack={onBack} />

      {/* PALCO — estilo seleção de brawlers */}
      <div
        style={{
          position: "relative",
          height: 232,
          flexShrink: 0,
          backgroundImage:
            "linear-gradient(rgba(4,9,18,0.35), rgba(4,9,18,0.9)), url(/ui/bg_heroes.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 30%",
          imageRendering: "pixelated",
          borderBottom: "2px solid var(--mk-accent)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 46,
            transform: "translateX(-50%)",
            width: 168,
            height: 34,
            borderRadius: "50%",
            background: `radial-gradient(closest-side, ${RARITY_GLOW[showDef.rarity]}, transparent)`,
            opacity: 0.55,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: 42,
            transform: "translateX(-50%)",
            filter: locked ? "brightness(0) opacity(0.75)" : undefined,
          }}
        >
          {locked ? (
            <img
              src={faceUrl(focus)}
              alt=""
              width={132}
              height={132}
              style={{ imageRendering: "pixelated" }}
            />
          ) : (
            <RobotSprite robotId={focus} clip="idle" size={132} fps={4} />
          )}
        </div>

        <div style={{ position: "absolute", left: 8, top: 8 }}>
          <div
            className="mk-title"
            style={{
              fontSize: 6,
              padding: "3px 5px",
              border: `2px solid ${RARITY_GLOW[showDef.rarity]}`,
              background: "rgba(6,14,26,0.85)",
              color: RARITY_GLOW[showDef.rarity],
            }}
          >
            {showDef.rarity.toUpperCase()}
          </div>
          <div
            className="mk-title"
            style={{
              fontSize: 6,
              marginTop: 4,
              padding: "3px 5px",
              border: "2px solid var(--mk-accent)",
              background: "rgba(6,14,26,0.85)",
              color: "var(--mk-accent)",
            }}
          >
            {showDef.element}
          </div>
        </div>

        <div style={{ position: "absolute", left: 0, right: 0, bottom: 4, textAlign: "center" }}>
          <div className="mk-title" style={{ fontSize: 13, textShadow: "3px 3px 0 #000" }}>
            {locked ? "? ? ? ?" : showDef.name}
          </div>
          <div
            className="mk-title"
            style={{ fontSize: 7, color: locked ? "var(--mk-muted)" : "var(--mk-accent2)" }}
          >
            {locked
              ? "BLOQUEADO — USE CAPSULA MECHA"
              : `Lv${focused!.level} · ${inTeam ? "NA EQUIPE" : "NA RESERVA"}`}
          </div>
        </div>
      </div>

      {/* AÇÕES */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 6,
          padding: "6px 8px",
          background: "rgba(6,12,22,0.95)",
          borderBottom: "2px solid rgba(53,226,240,0.3)",
          flexShrink: 0,
        }}
      >
        <PixelButton disabled={locked} onClick={toggleTeam}>
          {inTeam ? "TIRAR DA EQUIPE" : "ESCALAR"}
        </PixelButton>
        <PixelButton disabled={locked} onClick={() => setDetail(focus)}>
          TREINAR / INFO
        </PixelButton>
      </div>

      {/* GRADE DE HEROIS */}
      <div className="mk-scroll" style={{ flex: 1, padding: 8 }}>
        <div className="mk-title" style={{ fontSize: 7, color: "var(--mk-muted)", marginBottom: 6 }}>
          EQUIPE {g.team.length}/4 · HEROIS {owned.length}/{ROBOTS.length}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(84px, 1fr))",
            gap: 8,
          }}
        >
          {ROBOTS.map((def) => {
            const save = owned.find((r) => r.id === def.id) ?? null;
            const isLocked = !save;
            const active = focus === def.id;
            const teamed = g.team.includes(def.id);
            return (
              <button
                key={def.id}
                type="button"
                onClick={() => setFocus(def.id)}
                style={{
                  position: "relative",
                  background: isLocked
                    ? "rgba(8,14,24,0.85)"
                    : `linear-gradient(rgba(10,22,38,0.9), ${RARITY_GLOW[def.rarity].replace("0.9", "0.22").replace("0.95", "0.22")})`,
                  border: `2px solid ${active ? "var(--mk-accent2)" : isLocked ? "rgba(60,80,104,0.45)" : RARITY_GLOW[def.rarity]}`,
                  boxShadow: active ? "0 0 0 2px rgba(53,226,240,0.5)" : undefined,
                  padding: 4,
                  display: "grid",
                  placeItems: "center",
                  gap: 2,
                  cursor: "pointer",
                  transform: active ? "translateY(-2px)" : undefined,
                }}
              >
                <Frame rarity={def.rarity} size={68}>
                  <img
                    src={faceUrl(def.id)}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      imageRendering: "pixelated",
                      filter: isLocked ? "grayscale(1) brightness(0.3) contrast(1.2)" : undefined,
                    }}
                  />
                </Frame>
                <span
                  className="mk-title"
                  style={{ fontSize: 6, color: isLocked ? "var(--mk-muted)" : undefined }}
                >
                  {isLocked ? "? ? ? ?" : def.name}
                </span>
                <span
                  className="mk-title"
                  style={{ fontSize: 6, color: isLocked ? "var(--mk-muted)" : "var(--mk-accent2)" }}
                >
                  {isLocked ? def.rarity.toUpperCase() : `Lv${save!.level}`}
                </span>
                {teamed && (
                  <span
                    className="mk-title"
                    style={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      fontSize: 5,
                      padding: "1px 3px",
                      background: "var(--mk-accent)",
                      color: "#04121c",
                    }}
                  >
                    EQUIPE
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div style={{ height: 52 }} />
      </div>

      {detail && owned.some((r) => r.id === detail) && (
        <RobotDetail save={owned.find((r) => r.id === detail)!} onClose={() => setDetail(null)} />
      )}
    </div>
  );
}

function RobotDetail({ save, onClose }: { save: RobotSave; onClose: () => void }) {
  const g = useGame();
  const def = ROBOT_MAP[save.id];
  const base = baseStats(def.ratios, save.level);
  const cap = maxTrained(def.ratios, save.level);
  const cost = TRAIN_COST_PER_POINT * save.level;
  const inTeam = g.team.includes(save.id);

  function train(stat: "str" | "def" | "agl") {
    if (g.gold < cost || save.trained[stat] >= cap[stat]) return;
    addGold(-cost);
    updateRobots(
      g.robots.map((r) =>
        r.id === save.id ? { ...r, trained: { ...r.trained, [stat]: r.trained[stat] + 1 } } : r,
      ),
    );
  }

  function toggleTeam() {
    if (inTeam) {
      if (g.team.length <= 1) return;
      setTeam(g.team.filter((id) => id !== save.id));
    } else {
      if (g.team.length >= 4) return;
      setTeam([...g.team, save.id]);
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(3,6,12,0.86)",
        display: "grid",
        placeItems: "center",
        padding: 8,
        zIndex: 5,
      }}
    >
      <Panel style={{ width: "min(94vw, 420px)", maxHeight: "88vh", overflow: "hidden" }}>
        <div className="mk-scroll" style={{ maxHeight: "76vh", paddingRight: 4 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <RobotSprite robotId={save.id} clip="idle" size={104} fps={4} />
            <div style={{ flex: 1 }}>
              <div className="mk-title" style={{ fontSize: 11 }}>
                {def.name}
              </div>
              <div className="mk-title" style={{ fontSize: 7, color: "var(--mk-accent)" }}>
                {def.element} · {def.rarity.toUpperCase()} · Lv{save.level}
              </div>
              <div style={{ marginTop: 4 }}>
                <StatBar kind="xp" value={save.xp} max={robotMaxXP(save.level)} width={150} />
              </div>
            </div>
          </div>

          <div style={{ fontSize: 10, color: "var(--mk-muted)", margin: "8px 0" }}>{def.bio}</div>

          <div className="mk-title" style={{ fontSize: 8, marginBottom: 4 }}>
            ATRIBUTOS
          </div>
          <StatRow label="HP" value={base.hp} />
          <StatRow label="MP" value={base.mp} />
          <TrainRow
            label="FORCA"
            base={base.str}
            trained={save.trained.str}
            cap={cap.str}
            cost={cost}
            gold={g.gold}
            onTrain={() => train("str")}
          />
          <TrainRow
            label="DEFESA"
            base={base.def}
            trained={save.trained.def}
            cap={cap.def}
            cost={cost}
            gold={g.gold}
            onTrain={() => train("def")}
          />
          <TrainRow
            label="AGILIDADE"
            base={base.agl}
            trained={save.trained.agl}
            cap={cap.agl}
            cost={cost}
            gold={g.gold}
            onTrain={() => train("agl")}
          />

          <LoadoutEditor robotId={save.id} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
            <PixelButton onClick={toggleTeam}>{inTeam ? "TIRAR DA EQUIPE" : "ESCALAR"}</PixelButton>
            <PixelButton onClick={onClose}>FECHAR</PixelButton>
          </div>
        </div>
      </Panel>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div
      className="mk-title"
      style={{ fontSize: 7, display: "flex", justifyContent: "space-between", padding: "2px 0" }}
    >
      <span>{label}</span>
      <span style={{ color: "var(--mk-text)" }}>{value}</span>
    </div>
  );
}

function TrainRow({
  label,
  base,
  trained,
  cap,
  cost,
  gold,
  onTrain,
}: {
  label: string;
  base: number;
  trained: number;
  cap: number;
  cost: number;
  gold: number;
  onTrain: () => void;
}) {
  const full = trained >= cap;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
        padding: "3px 0",
      }}
    >
      <span className="mk-title" style={{ fontSize: 7 }}>
        {label}
      </span>
      <span className="mk-title" style={{ fontSize: 7, flex: 1, textAlign: "right" }}>
        {base + trained}{" "}
        <span style={{ color: "var(--mk-accent)" }}>
          ({trained}/{cap})
        </span>
      </span>
      <button
        type="button"
        className="mk-btn mk-btn-sq"
        disabled={full || gold < cost}
        onClick={onTrain}
        title={`Treinar por ${cost} de ouro`}
        style={{ fontSize: 7, padding: 0 }}
      >
        {full ? "MAX" : `+1 · ${cost}`}
      </button>
    </div>
  );
}

export function TopBar({
  title,
  gold,
  onBack,
}: {
  title: string;
  gold: number;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 8px",
        background: "rgba(6,12,22,0.95)",
        borderBottom: "2px solid rgba(53,226,240,0.4)",
      }}
    >
      <button
        type="button"
        className="mk-btn mk-btn-sq"
        onClick={onBack}
        style={{ fontSize: 8, padding: 0 }}
      >
        VOLTAR
      </button>
      <span className="mk-title" style={{ fontSize: 9, flex: 1 }}>
        {title}
      </span>
      <span className="mk-title" style={{ fontSize: 8, color: "var(--mk-accent2)" }}>
        <Icon name="coins" size={12} /> {gold}
      </span>
    </div>
  );
}
