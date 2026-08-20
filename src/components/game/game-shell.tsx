import { useEffect, useState } from "react";
import { MenuScreen, type Screen } from "@/screens/menu";
import { ModesScreen } from "@/screens/modes";
import { RankedScreen } from "@/screens/ranked";
import { RosterScreen } from "@/screens/roster";
import { ShopScreen } from "@/screens/shop";
import { TournamentsScreen } from "@/screens/tournaments";

/** Casca do jogo: viewport mobile fixo + roteador de telas. */
export function GameShell() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [ready, setReady] = useState(false);

  // O save vive no localStorage: só montamos as telas depois da hidratação.
  useEffect(() => setReady(true), []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--mk-bg)",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(100vw, 480px)",
          height: "100dvh",
          maxHeight: "100dvh",
          overflow: "hidden",
          background: "var(--mk-bg2)",
          boxShadow: "0 0 0 2px rgba(53,226,240,0.35)",
        }}
      >
        {ready && (
          <>
            {screen === "menu" && <MenuScreen onGo={setScreen} />}
            {screen === "roster" && <RosterScreen onBack={() => setScreen("menu")} />}
            {screen === "shop" && <ShopScreen onBack={() => setScreen("menu")} />}
            {screen === "modes" && <ModesScreen onBack={() => setScreen("menu")} />}
            {screen === "ranked" && <RankedScreen onBack={() => setScreen("menu")} />}
            {screen === "tournaments" && (
              <TournamentsScreen onBack={() => setScreen("menu")} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
