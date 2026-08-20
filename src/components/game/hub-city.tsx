import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Screen } from "@/screens/menu";

/* ---------------------------------------------------------------------------
 * Hub da cidade futurista.
 * O jogador controla um robô (sprites 64px, 20 quadros por animação) e entra
 * nos prédios para abrir os modais do jogo. Barra lateral esquerda minimizável
 * dá acesso rápido às mesmas opções.
 * ------------------------------------------------------------------------- */

const WORLD_W = 1920;
const WORLD_H = 1088;
const GROUND_Y = 900; // linha do chão onde o robô caminha
const SPEED = 150; // px/s
const FRAMES = 20;
const FRAME = 64;

type Clip = "idle" | "walk_down" | "walk_up" | "walk_side" | "run" | "jump" | "attack" | "interact";

type Building = {
  id: Exclude<Screen, "menu">;
  label: string;
  art: string;
  x: number; // centro no mundo
  w: number;
  h: number;
  y: number; // base
};

const BUILDINGS: Building[] = [
  { id: "roster", label: "HANGAR", art: "/city/b_hangar.png", x: 260, w: 320, h: 381, y: GROUND_Y + 26 },
  { id: "shop", label: "LOJA", art: "/city/b_shop.png", x: 640, w: 300, h: 357, y: GROUND_Y + 26 },
  { id: "modes", label: "ARENA", art: "/city/b_arena.png", x: 1000, w: 340, h: 405, y: GROUND_Y + 26 },
  { id: "ranked", label: "TORRE RANQUEADA", art: "/city/b_ranked.png", x: 1330, w: 260, h: 429, y: GROUND_Y + 26 },
  { id: "tournaments", label: "COLISEU", art: "/city/b_tourney.png", x: 1680, w: 360, h: 360, y: GROUND_Y + 26 },
];

export function HubCity({ onEnter }: { onEnter: (s: Exclude<Screen, "menu">) => void }) {
  const [x, setX] = useState(120);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [clip, setClip] = useState<Clip>("idle");
  const [frame, setFrame] = useState(0);
  const [sidebar, setSidebar] = useState(true);
  const [viewW, setViewW] = useState(480);

  const dir = useRef(0);
  const running = useRef(false);
  const action = useRef<{ clip: Clip; until: number } | null>(null);
  const xRef = useRef(x);
  xRef.current = x;

  useEffect(() => {
    const on = () => setViewW(Math.min(window.innerWidth, 480));
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const near = useMemo(
    () => BUILDINGS.find((b) => Math.abs(b.x - x) < b.w * 0.62),
    [x],
  );

  const doAction = useCallback((c: Clip, ms: number) => {
    action.current = { clip: c, until: performance.now() + ms };
  }, []);

  const enter = useCallback(() => {
    if (!near) return;
    doAction("interact", 500);
    const id = near.id;
    window.setTimeout(() => onEnter(id), 260);
  }, [near, onEnter, doAction]);

  // Teclado
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a") dir.current = -1;
      else if (e.key === "ArrowRight" || e.key === "d") dir.current = 1;
      else if (e.key === "Shift") running.current = true;
      else if (e.key === " ") doAction("jump", 700);
      else if (e.key === "f") doAction("attack", 600);
      else if (e.key === "Enter" || e.key === "ArrowUp" || e.key === "w") enter();
    };
    const up = (e: KeyboardEvent) => {
      if (["ArrowLeft", "a", "ArrowRight", "d"].includes(e.key)) dir.current = 0;
      if (e.key === "Shift") running.current = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [enter, doAction]);

  // Loop de animação/movimento
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const act = action.current && action.current.until > now ? action.current.clip : null;
      if (action.current && action.current.until <= now) action.current = null;

      const d = dir.current;
      if (d !== 0 && !act) {
        const sp = running.current ? SPEED * 1.8 : SPEED;
        const nx = Math.max(70, Math.min(WORLD_W - 70, xRef.current + d * sp * dt));
        xRef.current = nx;
        setX(nx);
        setFacing(d as 1 | -1);
      }

      const next: Clip = act ?? (d !== 0 ? (running.current ? "run" : "walk_side") : "idle");
      setClip((c) => (c === next ? c : next));

      const fps = next === "run" ? 20 : next === "idle" ? 10 : 16;
      acc += dt;
      if (acc >= 1 / fps) {
        acc = 0;
        setFrame((f) => (f + 1) % FRAMES);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const camX = Math.max(0, Math.min(WORLD_W - viewW, x - viewW / 2));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#050a16" }}>
      {/* Mundo */}
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: -60,
          width: WORLD_W,
          height: WORLD_H,
          transform: `translate3d(${-camX}px, 0, 0)`,
          transition: "transform 60ms linear",
        }}
      >
        <img
          src="/city/bg.png"
          alt=""
          width={WORLD_W}
          height={WORLD_H}
          style={{ position: "absolute", inset: 0, imageRendering: "pixelated" }}
        />

        {BUILDINGS.map((b) => {
          const active = near?.id === b.id;
          return (
            <div
              key={b.id}
              style={{
                position: "absolute",
                left: b.x - b.w / 2,
                top: b.y - b.h,
                width: b.w,
                height: b.h,
              }}
            >
              <img
                src={b.art}
                alt={b.label}
                width={b.w}
                height={b.h}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  imageRendering: "pixelated",
                  filter: active
                    ? "drop-shadow(0 0 10px rgba(53,226,240,0.9)) brightness(1.12)"
                    : "brightness(0.82)",
                  transition: "filter 140ms linear",
                }}
              />
              <div
                className="mk-title"
                style={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  bottom: -22,
                  whiteSpace: "nowrap",
                  fontSize: 8,
                  padding: "4px 6px",
                  color: active ? "var(--mk-accent)" : "#9fb3c8",
                  background: "rgba(3,7,14,0.75)",
                  border: `2px solid ${active ? "rgba(53,226,240,0.8)" : "rgba(53,226,240,0.25)"}`,
                }}
              >
                {b.label}
              </div>
            </div>
          );
        })}

        {/* Robô */}
        <div
          style={{
            position: "absolute",
            left: x - 64,
            top: GROUND_Y - 128,
            width: 128,
            height: 128,
            transform: `scaleX(${facing})`,
            imageRendering: "pixelated",
            backgroundImage: `url(/hero/${clip}.png)`,
            backgroundSize: `${FRAMES * 128}px 128px`,
            backgroundPosition: `${-frame * 128}px 0`,
            backgroundRepeat: "no-repeat",
            filter: "drop-shadow(0 6px 6px rgba(0,0,0,0.55))",
          }}
        />
      </div>

      {/* Dica de entrada */}
      {near && (
        <button
          className="mk-title"
          onClick={enter}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 132,
            fontSize: 9,
            padding: "8px 12px",
            color: "#03121a",
            background: "var(--mk-accent)",
            border: "2px solid #03121a",
            cursor: "pointer",
          }}
        >
          ENTRAR • {near.label}
        </button>
      )}

      {/* Barra lateral esquerda */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: sidebar ? 132 : 34,
          background: "rgba(3,8,16,0.86)",
          borderRight: "2px solid rgba(53,226,240,0.45)",
          transition: "width 160ms ease",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          padding: 6,
          zIndex: 5,
        }}
      >
        <button
          className="mk-title"
          onClick={() => setSidebar((s) => !s)}
          style={{
            fontSize: 8,
            padding: "6px 4px",
            color: "var(--mk-accent)",
            background: "rgba(53,226,240,0.12)",
            border: "2px solid rgba(53,226,240,0.5)",
            cursor: "pointer",
          }}
        >
          {sidebar ? "‹ MENU" : "›"}
        </button>
        {BUILDINGS.map((b) => (
          <button
            key={b.id}
            className="mk-title"
            title={b.label}
            onClick={() => onEnter(b.id)}
            style={{
              fontSize: 7,
              lineHeight: 1.4,
              padding: sidebar ? "8px 6px" : "8px 2px",
              textAlign: "left",
              color: "#dff6ff",
              background: "rgba(10,20,36,0.9)",
              border: "2px solid rgba(53,226,240,0.28)",
              cursor: "pointer",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {sidebar ? b.label : b.label.slice(0, 1)}
          </button>
        ))}
      </div>

      {/* Controles touch */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "10px 12px 10px 44px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          zIndex: 4,
        }}
      >
        <div style={{ display: "flex", gap: 8 }}>
          <PadBtn label="◀" onDown={() => (dir.current = -1)} onUp={() => (dir.current = 0)} />
          <PadBtn label="▶" onDown={() => (dir.current = 1)} onUp={() => (dir.current = 0)} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <PadBtn
            label="RUN"
            onDown={() => (running.current = true)}
            onUp={() => (running.current = false)}
          />
          <PadBtn label="PULO" onDown={() => doAction("jump", 700)} onUp={() => {}} />
          <PadBtn label="ATK" onDown={() => doAction("attack", 600)} onUp={() => {}} />
        </div>
      </div>
    </div>
  );
}

function PadBtn({
  label,
  onDown,
  onUp,
}: {
  label: string;
  onDown: () => void;
  onUp: () => void;
}) {
  return (
    <button
      className="mk-title"
      onPointerDown={(e) => {
        e.preventDefault();
        onDown();
      }}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onPointerCancel={onUp}
      style={{
        fontSize: 8,
        minWidth: 44,
        padding: "12px 8px",
        color: "var(--mk-accent)",
        background: "rgba(4,12,22,0.85)",
        border: "2px solid rgba(53,226,240,0.5)",
        touchAction: "none",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
