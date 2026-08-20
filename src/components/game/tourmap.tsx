import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, PixelButton } from "@/components/game/pixel";
import { faceUrl, ROBOT_MAP } from "@/game/robots";
import { MAP_HEIGHT, MAP_WIDTH, TOURNAMENTS, type TournamentDef } from "@/game/tournaments";

const NODE = 96;

function nodeX(t: TournamentDef, i: number) {
  return t.x ?? 300 + (i % 12) * 270;
}
function nodeY(t: TournamentDef, i: number) {
  return t.y ?? 200 + Math.floor(i / 12) * 250;
}

interface Props {
  playerLevel: number;
  won: string[];
  teamEmpty: boolean;
  onEnter: (t: TournamentDef) => void;
  onBack: () => void;
  gold: number;
}

/** Mapa de mundo espacial: cada torneio e uma estacao navegavel. */
export function TournamentMap({ playerLevel, won, teamEmpty, onEnter, onBack, gold }: Props) {
  const viewport = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(0.55);
  const [cam, setCam] = useState({ x: 0, y: 0 });
  const [filter, setFilter] = useState<string>("TODOS");
  const [selected, setSelected] = useState<string | null>(null);
  const drag = useRef<{ px: number; py: number; cx: number; cy: number; moved: number } | null>(null);

  const ordered = useMemo(
    () => TOURNAMENTS.map((t, i) => ({ t, i })).sort((a, b) => a.t.requiredLevel - b.t.requiredLevel),
    [],
  );

  const elements = useMemo(() => {
    const set = new Set<string>();
    for (const t of TOURNAMENTS) if (t.element) set.add(t.element);
    return ["TODOS", ...Array.from(set).sort()];
  }, []);

  const visible = useMemo(
    () => (filter === "TODOS" ? ordered : ordered.filter((n) => n.t.element === filter)),
    [filter, ordered],
  );

  const sel = selected ? TOURNAMENTS.find((t) => t.id === selected) ?? null : null;

  function clampCam(x: number, y: number, z: number) {
    const el = viewport.current;
    const vw = el?.clientWidth ?? 360;
    const vh = el?.clientHeight ?? 480;
    const maxX = Math.max(0, MAP_WIDTH * z - vw);
    const maxY = Math.max(0, MAP_HEIGHT * z - vh);
    return { x: Math.min(Math.max(x, 0), maxX), y: Math.min(Math.max(y, 0), maxY) };
  }

  function centerOn(t: TournamentDef, i: number, z = zoom) {
    const el = viewport.current;
    const vw = el?.clientWidth ?? 360;
    const vh = el?.clientHeight ?? 480;
    setCam(clampCam(nodeX(t, i) * z - vw / 2, nodeY(t, i) * z - vh / 2 + 40, z));
  }

  // abre centralizado no proximo torneio disponivel
  useEffect(() => {
    const next =
      ordered.find((n) => !won.includes(n.t.id) && playerLevel >= n.t.requiredLevel) ?? ordered[0];
    centerOn(next.t, next.i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeZoom(dir: 1 | -1) {
    const z = Math.min(1.1, Math.max(0.3, +(zoom + dir * 0.15).toFixed(2)));
    const el = viewport.current;
    const vw = el?.clientWidth ?? 360;
    const vh = el?.clientHeight ?? 480;
    const cxw = (cam.x + vw / 2) / zoom;
    const cyw = (cam.y + vh / 2) / zoom;
    setZoom(z);
    setCam(clampCam(cxw * z - vw / 2, cyw * z - vh / 2, z));
  }

  const total = TOURNAMENTS.length;
  const wonCount = TOURNAMENTS.filter((t) => won.includes(t.id)).length;

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column" }}>
      {/* topo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 8px",
          background: "rgba(4,9,18,0.94)",
          borderBottom: "2px solid var(--mk-accent)",
        }}
      >
        <button className="mk-plain" onClick={onBack} aria-label="voltar">
          <img src="/ui/btn_close.png" alt="" width={26} height={26} style={{ imageRendering: "pixelated" }} />
        </button>
        <span className="mk-title" style={{ fontSize: 9, flex: 1 }}>
          MAPA DE TORNEIOS
        </span>
        <span className="mk-title" style={{ fontSize: 7, color: "var(--mk-accent2)", display: "flex", gap: 4, alignItems: "center" }}>
          <Icon name="trophy" size={11} />
          {wonCount}/{total}
        </span>
        <span className="mk-title" style={{ fontSize: 7, display: "flex", gap: 4, alignItems: "center" }}>
          <Icon name="coins" size={11} />
          {gold}
        </span>
      </div>

      {/* filtros por elemento */}
      <div
        className="mk-scroll-x"
        style={{
          display: "flex",
          gap: 4,
          padding: "5px 6px",
          background: "rgba(4,9,18,0.9)",
          borderBottom: "2px solid rgba(53,226,240,0.35)",
          overflowX: "auto",
          flexShrink: 0,
        }}
      >
        {elements.map((e) => (
          <button
            key={e}
            className="mk-plain mk-title"
            onClick={() => {
              setFilter(e);
              const list = e === "TODOS" ? ordered : ordered.filter((n) => n.t.element === e);
              const target =
                list.find((n) => !won.includes(n.t.id) && playerLevel >= n.t.requiredLevel) ?? list[0];
              if (target) centerOn(target.t, target.i);
            }}
            style={{
              fontSize: 6,
              padding: "4px 6px",
              whiteSpace: "nowrap",
              border: `2px solid ${filter === e ? "var(--mk-accent2)" : "rgba(90,110,130,0.6)"}`,
              background: filter === e ? "rgba(53,226,240,0.22)" : "rgba(10,18,30,0.8)",
              color: filter === e ? "var(--mk-accent2)" : "var(--mk-muted)",
            }}
          >
            {e}
          </button>
        ))}
      </div>

      {/* viewport do mapa */}
      <div
        ref={viewport}
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          touchAction: "none",
          cursor: "grab",
          backgroundColor: "#050914",
          backgroundImage: "url(/map/space_bg.png)",
          backgroundRepeat: "repeat",
          backgroundSize: `${Math.round(480 * zoom * 1.6)}px auto`,
          backgroundPosition: `${-cam.x * 0.35}px ${-cam.y * 0.35}px`,
          imageRendering: "pixelated",
        }}
        onPointerDown={(ev) => {
          drag.current = { px: ev.clientX, py: ev.clientY, cx: cam.x, cy: cam.y, moved: 0 };
          (ev.target as HTMLElement).setPointerCapture?.(ev.pointerId);
        }}
        onPointerMove={(ev) => {
          const d = drag.current;
          if (!d) return;
          const dx = ev.clientX - d.px;
          const dy = ev.clientY - d.py;
          d.moved = Math.max(d.moved, Math.abs(dx) + Math.abs(dy));
          setCam(clampCam(d.cx - dx, d.cy - dy, zoom));
        }}
        onPointerUp={() => {
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        {/* camada do mundo */}
        <div
          style={{
            position: "absolute",
            left: -cam.x,
            top: -cam.y,
            width: MAP_WIDTH * zoom,
            height: MAP_HEIGHT * zoom,
          }}
        >
          {/* rota entre estacoes */}
          <svg
            width={MAP_WIDTH * zoom}
            height={MAP_HEIGHT * zoom}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          >
            <polyline
              points={visible
                .map((n) => `${nodeX(n.t, n.i) * zoom},${nodeY(n.t, n.i) * zoom}`)
                .join(" ")}
              fill="none"
              stroke="rgba(53,226,240,0.32)"
              strokeWidth={2}
              strokeDasharray="5 7"
            />
          </svg>

          {visible.map((n) => {
            const t = n.t;
            const locked = playerLevel < t.requiredLevel;
            const cleared = won.includes(t.id);
            const size = NODE * zoom;
            const isSel = selected === t.id;
            return (
              <button
                key={t.id}
                className="mk-plain"
                onClick={() => {
                  if ((drag.current?.moved ?? 0) > 6) return;
                  setSelected(t.id);
                }}
                style={{
                  position: "absolute",
                  left: nodeX(t, n.i) * zoom - size / 2,
                  top: nodeY(t, n.i) * zoom - size / 2,
                  width: size,
                  height: size + 18 * zoom,
                  display: "grid",
                  placeItems: "center",
                  filter: locked ? "grayscale(1) brightness(0.55)" : undefined,
                  zIndex: isSel ? 5 : 1,
                }}
              >
                <img
                  src={`/map/${t.station ?? "station_dojo_1"}.png`}
                  alt=""
                  width={size}
                  height={size}
                  style={{
                    imageRendering: "pixelated",
                    maxWidth: "none",
                    display: "block",
                    transform: isSel ? "scale(1.14)" : undefined,
                    filter: isSel
                      ? "drop-shadow(0 0 6px #35e2f0)"
                      : cleared
                        ? "drop-shadow(0 0 4px rgba(255,206,84,0.7))"
                        : undefined,
                  }}
                />
                {locked && (
                  <img
                    src="/ui/icon_lock.png"
                    alt=""
                    width={Math.round(22 * zoom + 8)}
                    height={Math.round(22 * zoom + 8)}
                    style={{ position: "absolute", imageRendering: "pixelated", maxWidth: "none" }}
                  />
                )}
                {cleared && (
                  <img
                    src="/ui/icon_trophy.png"
                    alt=""
                    width={Math.round(18 * zoom + 8)}
                    height={Math.round(18 * zoom + 8)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      imageRendering: "pixelated",
                      maxWidth: "none",
                    }}
                  />
                )}
                {zoom > 0.42 && (
                  <span
                    className="mk-title"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      fontSize: Math.max(5, Math.round(7 * zoom)),
                      color: cleared ? "var(--mk-accent2)" : locked ? "var(--mk-muted)" : "#fff",
                      background: "rgba(4,9,18,0.82)",
                      padding: "1px 3px",
                      whiteSpace: zoom > 0.62 ? "pre-line" : "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      maxWidth: size * 1.9,
                      textAlign: "center",
                      lineHeight: 1.5,
                    }}
                  >
                    {zoom > 0.62 ? `${t.name.replace("COPA ", "")}\n` : ""}
                    Lv{t.requiredLevel}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* zoom */}
        <div style={{ position: "absolute", right: 6, top: 6, display: "grid", gap: 4 }}>
          <button className="mk-plain mk-title" onClick={() => changeZoom(1)} style={zoomBtn}>
            +
          </button>
          <button className="mk-plain mk-title" onClick={() => changeZoom(-1)} style={zoomBtn}>
            −
          </button>
        </div>
      </div>

      {/* card do torneio selecionado */}
      {sel && (
        <TournamentCard
          t={sel}
          locked={playerLevel < sel.requiredLevel}
          cleared={won.includes(sel.id)}
          teamEmpty={teamEmpty}
          onClose={() => setSelected(null)}
          onEnter={() => onEnter(sel)}
        />
      )}
    </div>
  );
}

const zoomBtn: React.CSSProperties = {
  width: 28,
  height: 28,
  fontSize: 11,
  color: "var(--mk-accent2)",
  border: "2px solid var(--mk-accent)",
  background: "rgba(6,12,22,0.9)",
};

function TournamentCard({
  t,
  locked,
  cleared,
  teamEmpty,
  onClose,
  onEnter,
}: {
  t: TournamentDef;
  locked: boolean;
  cleared: boolean;
  teamEmpty: boolean;
  onClose: () => void;
  onEnter: () => void;
}) {
  const boss = t.fights[t.fights.length - 1]?.enemies.slice(-1)[0];
  return (
    <div
      style={{
        borderTop: "2px solid var(--mk-accent2)",
        boxShadow: "0 -8px 0 rgba(53,226,240,0.18), 0 -22px 40px rgba(0,0,0,0.7)",
        backgroundImage:
          "linear-gradient(rgba(4,9,18,0.72), rgba(4,9,18,0.93)), url(/ui/bg_tour_modal.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
        padding: 0,
        flexShrink: 0,
      }}
    >
      <div style={{ position: "relative", height: 84, overflow: "hidden" }}>
        <img
          src={`/arenas/${t.arena}_f1.png`}
          alt=""
          style={{
            width: "100%",
            height: 84,
            objectFit: "cover",
            imageRendering: "pixelated",
            display: "block",
            filter: locked ? "grayscale(1) brightness(0.5)" : undefined,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(rgba(4,9,18,0.1), rgba(4,9,18,0.92))",
          }}
        />
        <button
          className="mk-plain"
          onClick={onClose}
          style={{ position: "absolute", top: 4, right: 4 }}
          aria-label="fechar"
        >
          <img src="/ui/btn_close.png" alt="" width={22} height={22} style={{ imageRendering: "pixelated" }} />
        </button>
        <div
          className="mk-title"
          style={{ position: "absolute", left: 6, bottom: 4, fontSize: 9, textShadow: "2px 2px 0 #000" }}
        >
          {t.name}
        </div>
        {t.element && (
          <div
            className="mk-title"
            style={{
              position: "absolute",
              left: 6,
              top: 5,
              fontSize: 6,
              padding: "2px 4px",
              border: "2px solid var(--mk-accent2)",
              background: "rgba(6,20,32,0.85)",
              color: "var(--mk-accent2)",
            }}
          >
            {t.element}
          </div>
        )}
      </div>

      <div style={{ padding: "6px 8px 38px" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
          {boss && (
            <img
              src={faceUrl(boss.id)}
              alt=""
              width={44}
              height={44}
              style={{
                imageRendering: "pixelated",
                border: "2px solid rgba(226,69,58,0.7)",
                background: "rgba(28,10,14,0.7)",
              }}
            />
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="mk-title" style={{ fontSize: 7, color: "var(--mk-hp)" }}>
              CHEFE: {boss ? ROBOT_MAP[boss.id].name : "—"} Lv{boss?.level ?? "?"}
            </div>
            <div style={{ fontSize: 10, color: "var(--mk-muted)", marginTop: 2 }}>
              {t.fights.length} lutas · requer Lv{t.requiredLevel}
            </div>
          </div>
          {t.reward.robot && (
            <div style={{ display: "grid", placeItems: "center" }}>
              <img
                src={faceUrl(t.reward.robot)}
                alt=""
                width={36}
                height={36}
                style={{
                  imageRendering: "pixelated",
                  border: `2px solid ${cleared ? "rgba(90,110,130,0.6)" : "var(--mk-accent2)"}`,
                }}
              />
              <span className="mk-title" style={{ fontSize: 5, color: "var(--mk-accent2)" }}>
                {cleared ? "OBTIDO" : "PREMIO"}
              </span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
          <span className="mk-title" style={{ fontSize: 6, display: "flex", gap: 3, alignItems: "center" }}>
            <Icon name="coins" size={10} />
            {cleared ? t.replayGold : t.reward.gold}
          </span>
          <span className="mk-title" style={{ fontSize: 6, display: "flex", gap: 3, alignItems: "center" }}>
            <Icon name="star" size={10} />
            {cleared ? Math.round(t.reward.xp / 1.6) : t.reward.xp}
          </span>
          {cleared && (
            <span className="mk-title" style={{ fontSize: 6, color: "var(--mk-accent2)", display: "flex", gap: 3, alignItems: "center" }}>
              <Icon name="trophy" size={10} />
              CONQUISTADO
            </span>
          )}
        </div>
        <PixelButton disabled={locked || teamEmpty} onClick={onEnter}>
          {locked ? `PRECISA Lv${t.requiredLevel}` : cleared ? "DISPUTAR DE NOVO" : "ENTRAR"}
        </PixelButton>
      </div>
    </div>
  );
}
