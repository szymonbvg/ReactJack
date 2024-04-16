import { predefinedDeck } from "../predefinedDeck/deck";
import { deckDispatcherType, usedDecksType } from "../types/DeckTypes";

export function deckReducer(deck: usedDecksType, action: deckDispatcherType): usedDecksType {
  switch (action.action) {
    case "hit": {
      let newDeck = { ...deck };
      const randomCardType = newDeck.deck[Math.floor(Math.random() * newDeck.deck.length)];
      const randomCard = randomCardType.cards[Math.floor(Math.random() * randomCardType.cards.length)];

      newDeck.deck = newDeck.deck.map((type) => {
        if (type.cardSymbol === randomCardType.cardSymbol) {
          return { ...type, cards: type.cards.filter((card) => card !== randomCard) };
        }
        return type;
      });
      newDeck.deck = newDeck.deck.filter((i) => i.cards.length > 0);

      const drawnCard = {
        cardSymbol: randomCardType.cardSymbol,
        value: randomCard.value,
        visualValue: randomCard.visualValue,
        HiLoValue: randomCard.HiLoValue,
      };
      if (action.player === "player") {
        newDeck.playerCards = [...newDeck.playerCards, drawnCard];
      } else if (action.player === "dealer") {
        newDeck.dealerCards = [...newDeck.dealerCards, drawnCard];
      }

      return newDeck;
    }
    case "shuffle": {
      return { ...deck, deck: predefinedDeck };
    }
    case "reset": {
      return {
        ...deck,
        playerCards: [],
        dealerCards: [],
      };
    }
    default: {
      throw Error("wrong action: " + action);
    }
  }
}
