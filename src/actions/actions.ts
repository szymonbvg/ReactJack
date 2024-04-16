import { deckDispatcherType } from "../types/DeckTypes";

export async function drawCards(
  cardsToDraw: number,
  deckDispatcher: React.Dispatch<deckDispatcherType>,
  playerName: string
) {
  for (let i = 0; i < cardsToDraw; i++) {
    await new Promise<void>((resolve) => {
      setTimeout(
        () => {
          deckDispatcher({ action: "hit", player: playerName });
          setTimeout(() => {
            resolve();
          }, 200 * (i + 1));
        },
        cardsToDraw > 1 ? 200 * (i + 1) : 0
      );
    });
  }
}
