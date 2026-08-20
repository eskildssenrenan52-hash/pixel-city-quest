import { createFileRoute } from "@tanstack/react-router";
import { GameShell } from "@/components/game/game-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campeões Mecha — RPG de batalha em pixel art" },
      {
        name: "description",
        content:
          "Monte sua equipe de robôs, treine atributos e vença torneios em um RPG tático por turnos 100% em pixel art.",
      },
      { property: "og:title", content: "Campeões Mecha — RPG de batalha em pixel art" },
      {
        property: "og:description",
        content:
          "Monte sua equipe de robôs, treine atributos e vença torneios em um RPG tático por turnos 100% em pixel art.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <GameShell />;
}
