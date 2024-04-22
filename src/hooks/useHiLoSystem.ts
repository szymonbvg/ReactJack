import { useEffect, useState } from "react";
import { usedDecksType } from "../types/DeckTypes";
import { predefinedDeck } from "../initValues/deck";
import { deckCardType } from "../types/CardTypes";

export function useHiLoSystem(currentDeck: usedDecksType) {
  const [HiLo, setHiLo] = useState(0);

  useEffect(() => {
    let drawnCards: deckCardType[] = [];
    predefinedDeck.forEach((predefinedType) => {
      const sameSymbol = currentDeck.deck.find((currentType) => currentType.cardSymbol === predefinedType.cardSymbol);
      if (sameSymbol) {
        drawnCards.push(...predefinedType.cards.filter((num) => !sameSymbol.cards.includes(num)));
      }
    });

    let hiloValue = 0;
    for (const card of drawnCards) {
      hiloValue += card.HiLoValue;
    }

    setHiLo(hiloValue);
  }, [currentDeck]);

  return HiLo;
}
