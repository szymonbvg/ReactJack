import { deckCardType } from "../types/CardTypes";
import { deckType } from "../types/DeckTypes";

const predefinedCards: deckCardType[] = [
  { visualValue: "2", value: 2, HiLoValue: 1 },
  { visualValue: "3", value: 3, HiLoValue: 1 },
  { visualValue: "4", value: 4, HiLoValue: 1 },
  { visualValue: "5", value: 5, HiLoValue: 1 },
  { visualValue: "6", value: 6, HiLoValue: 1 },
  { visualValue: "7", value: 7, HiLoValue: 0 },
  { visualValue: "8", value: 8, HiLoValue: 0 },
  { visualValue: "9", value: 9, HiLoValue: 0 },
  { visualValue: "10", value: 10, HiLoValue: -1 },
  { visualValue: "A", value: 11, HiLoValue: -1 },
  { visualValue: "K", value: 10, HiLoValue: -1 },
  { visualValue: "Q", value: 10, HiLoValue: -1 },
  { visualValue: "J", value: 10, HiLoValue: -1 },
];

const predefinedDeck: deckType[] = [
  {
    cardSymbol: "kier",
    cards: [...predefinedCards],
  },
  {
    cardSymbol: "karo",
    cards: [...predefinedCards],
  },
  {
    cardSymbol: "trefl",
    cards: [...predefinedCards],
  },
  {
    cardSymbol: "pik",
    cards: [...predefinedCards],
  },
];

export { predefinedDeck };
