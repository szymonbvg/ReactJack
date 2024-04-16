import { deckCardType, usedCardType } from "./CardTypes";

export type deckType = {
  cardSymbol: string;
  cards: deckCardType[];
};

export type usedDecksType = {
  deck: deckType[];
  playerCards: usedCardType[];
  dealerCards: usedCardType[];
};

export type deckDispatcherType = { action: string; player?: string | undefined };
