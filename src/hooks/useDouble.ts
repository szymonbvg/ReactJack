import { useContext, useEffect, useState } from "react";
import { usedDecksType } from "../types/DeckTypes";
import { pointsContext } from "../App";

export function useDouble(currentDeck: usedDecksType, bet: number) {
  const context = useContext(pointsContext);
  const [canDouble, setCanDouble] = useState(false);

  useEffect(() => {
    if ((context?.points.money as number) - bet >= 0) {
      setCanDouble(true);
    } else {
      setCanDouble(false);
    }
    if (currentDeck.playerCards.length > 2) {
      setCanDouble(false);
    }
  }, [context?.points.money, currentDeck.playerCards]);

  return canDouble;
}
