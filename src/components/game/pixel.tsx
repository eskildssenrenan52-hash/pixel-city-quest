import { useEffect, useRef, useState } from "react";
import { ANIM, FRAME, FRAMES, spriteUrl } from "@/game/robots";

type Clip = keyof typeof ANIM;

export function RobotSprite({
  robotId,
  clip = "idle",
  size = 128,
  flip = false,
  fps = 4,
  loop = true,
  onDone,
  dim = false,
}: {
  robotId: string;
  clip?: Clip;
  size?: number;
  flip?: boolean;
  fps?: number;
  loop?: boolean;
  onDone?: () => void;
  dim?: boolean;
}) {
  const frames = ANIM[clip];
  const [i, setI] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    setI(0);
    const id = window.setInterval(() => {
      setI((prev) => {
        const next = prev + 1;
        if (next >= frames.length) {
          if (loop) return 0;
          window.clearInterval(id);
          doneRef.current?.();
          return prev;
        }
        return next;
      });
    }, 1000 / fps);
    return () => window.clearInterval(id);
  }, [robotId, clip, fps, loop, frames.length]);

  const frame = frames[Math.min(i, frames.length - 1)];
  const scale = size / FRAME;

  return (
    <div
      style={{
        width: size,
        height: size,
        overflow: "hidden",
        position: "relative",
        transform: flip ? "scaleX(-1)" : undefined,
        filter: dim ? "grayscale(1) brightness(0.5)" : undefined,
      }}
    >
      <img
        src={spriteUrl(robotId)}
        alt=""
        draggable={false}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: FRAME * FRAMES * scale,
          height: FRAME * scale,
          maxWidth: "none",
          transform: `translateX(${-frame * FRAME * scale}px)`,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

export function VfxSprite({
  url,
  size = 160,
  onDone,
}: {
  url: string;
  size?: number;
  onDone?: () => void;
}) {
  const [i, setI] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    setI(0);
    const id = window.setInterval(() => {
      setI((p) => {
        if (p + 1 >= 4) {
          window.clearInterval(id);
          doneRef.current?.();
          return p;
        }
        return p + 1;
      });
    }, 80);
    return () => window.clearInterval(id);
  }, [url]);

  const cell = 96;
  const scale = size / cell;
  return (
    <div style={{ width: size, height: size, overflow: "hidden", position: "relative" }}>
      <img
        src={url}
        alt=""
        style={{
          position: "absolute",
          width: cell * 4 * scale,
          height: cell * scale,
          maxWidth: "none",
          transform: `translateX(${-i * cell * scale}px)`,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

export function PixelButton({
  children,
  onClick,
  disabled,
  variant = "wide",
  className = "",
  title,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "wide" | "square";
  className?: string;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`mk-btn ${variant === "square" ? "mk-btn-sq" : ""} ${className}`}
      style={{ fontSize: 10, lineHeight: "1.4" }}
    >
      {children}
    </button>
  );
}

export function Panel({
  children,
  className = "",
  variant = "large",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "large" | "strip" | "card";
  style?: React.CSSProperties;
}) {
  const cls =
    variant === "large" ? "mk-panel" : variant === "strip" ? "mk-panel-sm" : "mk-card";
  return (
    <div className={`${cls} ${className}`} style={style}>
      {children}
    </div>
  );
}

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  return (
    <img
      src={`/ui/icon_${name}.png`}
      alt=""
      width={size}
      height={size}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

export function StatBar({
  kind,
  value,
  max,
  width = 140,
  showText = true,
}: {
  kind: "hp" | "mp" | "xp";
  value: number;
  max: number;
  width?: number;
  showText?: boolean;
}) {
  const pct = max <= 0 ? 0 : Math.max(0, Math.min(1, value / max));
  const height = Math.round((22 / 151) * width);
  return (
    <div style={{ position: "relative", width, height }}>
      <img
        src="/ui/bar_frame.png"
        alt=""
        style={{ position: "absolute", inset: 0, width, height, imageRendering: "pixelated" }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: width * pct,
          height,
          overflow: "hidden",
          transition: "width 220ms steps(6)",
        }}
      >
        <img
          src={`/ui/bar_${kind}.png`}
          alt=""
          style={{ width, height, imageRendering: "pixelated" }}
        />
      </div>
      {showText && (
        <span
          className="mk-title"
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            fontSize: Math.max(6, Math.round(height * 0.42)),
            textShadow: "1px 1px 0 #000",
          }}
        >
          {Math.ceil(value)}/{max}
        </span>
      )}
    </div>
  );
}

export function Frame({
  rarity,
  children,
  size = 72,
}: {
  rarity: "bronze" | "silver" | "gold";
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <div style={{ position: "absolute", inset: size * 0.12 }}>{children}</div>
      <img
        src={`/ui/frame_${rarity}.png`}
        alt=""
        style={{ position: "absolute", inset: 0, width: size, height: size }}
      />
    </div>
  );
}

export function ArenaBackdrop({
  arena,
  round,
  children,
}: {
  arena: string;
  round?: number;
  children?: React.ReactNode;
}) {
  const [f, setF] = useState(1);
  useEffect(() => {
    const id = window.setInterval(() => setF((p) => (p % 4) + 1), 250);
    return () => window.clearInterval(id);
  }, []);
  const videoSrc = round === undefined ? null : `/videos/round${(round % 5) + 1}.mp4`;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(/arenas/${arena}_f${f}.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
      }}
    >
      {videoSrc && (
        <video
          key={videoSrc}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            imageRendering: "pixelated",
          }}
        />
      )}
      {videoSrc && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(rgba(4,9,18,0.35), rgba(4,9,18,0.15) 45%, rgba(4,9,18,0.6))",
          }}
        />
      )}
      <div style={{ position: "relative", height: "100%" }}>{children}</div>
    </div>
  );
}
