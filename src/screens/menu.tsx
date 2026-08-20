import { Icon, PixelButton, RobotSprite } from "@/components/game/pixel";
import { playerMaxXP } from "@/game/engine";
import { useGame } from "@/game/save";
import { isPlacing, rankAt } from "@/game/ranked";
import { StatBar } from "@/components/game/pixel";

export type Screen = "menu" | "roster" | "shop" | "tournaments" | "modes" | "ranked";

export function MenuScreen({ onGo }: { onGo: (s: Screen) => void }) {
  const g = useGame();
  const champion = g.team[0] ?? g.robots[0]?.id ?? "aurorion";
  const rank = rankAt(g.ranked.rankIndex);
  const placing = isPlacing(g.ranked);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(/ui/bg_menu.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        imageRendering: "pixelated",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 12px 58px",
      }}
    >
      <div style={{ background: "rgba(3,7,14,0.45)", position: "absolute", inset: 0 }} />

      <img
        src="/ui/logo.png"
        alt="Campeoes Mecha"
        style={{ width: "min(84vw, 300px)", zIndex: 1, marginTop: 4 }}
      />

      <div style={{ zIndex: 1, position: "relative", display: "grid", placeItems: "center" }}>
        <RobotSprite robotId={champion} clip="idle" size={148} fps={4} />
        <img src="/ui/deco_dots.png" alt="" width={120} style={{ opacity: 0.7, marginTop: -8 }} />
      </div>

      <div style={{ zIndex: 1, width: "min(92vw, 344px)", display: "grid", gap: 6 }}>
        <div
          className="mk-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 8,
            background: "rgba(4,10,20,0.8)",
            border: "2px solid rgba(53,226,240,0.5)",
            padding: "5px 7px",
          }}
        >
          <span>
            <Icon name="star" size={12} /> PILOTO Lv{g.playerLevel}
          </span>
          <span style={{ color: "var(--mk-accent2)" }}>
            <Icon name="coins" size={12} /> {g.gold}
          </span>
        </div>
        <StatBar kind="xp" value={g.playerXP} max={playerMaxXP(g.playerLevel)} width={340} />
        <button
          type="button"
          className="mk-btn"
          onClick={() => onGo("ranked")}
          style={{
            fontSize: 10,
            display: "flex",
            alignItems: "center",
            gap: 8,
            borderColor: rank.tier.color,
            textAlign: "left",
          }}
        >
          <img
            src={rank.tier.emblem}
            alt=""
            width={26}
            height={26}
            style={{ imageRendering: "pixelated" }}
          />
          <span style={{ flex: 1 }}>RANQUEADO</span>
          <span style={{ fontSize: 7, color: rank.tier.color }}>
            {placing ? "CLASSIFICATORIAS" : `${rank.name} · ${g.ranked.pr} PR`}
          </span>
        </button>
        <PixelButton onClick={() => onGo("tournaments")}>TORNEIOS</PixelButton>
        <PixelButton onClick={() => onGo("modes")}>MODOS DE JOGO</PixelButton>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <PixelButton onClick={() => onGo("roster")}>ROBOS</PixelButton>
          <PixelButton onClick={() => onGo("shop")}>LOJA</PixelButton>
        </div>
        <div
          className="mk-title mk-blink"
          style={{
            fontSize: 7,
            textAlign: "center",
            color: "var(--mk-muted)",
            paddingBottom: 34,
          }}
        >
          {g.robots.length} ROBOS · {g.wonTournaments.length} COPAS · {g.battlesWon} VITORIAS ·
          BABEL {g.modes.babelBest}
        </div>
      </div>
    </div>
  );
}
