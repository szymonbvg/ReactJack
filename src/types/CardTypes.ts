import { calculationType } from "./CalculationType";
import { usedDecksType } from "./DeckTypes";

export type cardsSumType = {
  sum: number;
  visualSum: string;
};

export type usedCardType = {
  cardSymbol: string;
  value: number;
  visualValue: string;
  HiLoValue: number;
};

export type deckCardType = {
  value: number;
  visualValue: string;
  HiLoValue: number;
};

export type cardsContextType = {
  currentDeck: usedDecksType;
  cardExposed: boolean;
  calculatedSum: calculationType;
} | null;
