import { useEffect, useState } from "react";
import { cardsSumType } from "../types/CardTypes";
import { calculationType } from "../types/CalculationType";
import { usedDecksType } from "../types/DeckTypes";

export function useCalculateCards(currentDeck: usedDecksType, cardExposed: boolean) {
  const [output, setOutput] = useState<calculationType>({
    remainingCards: 0,
    playerCards: { sum: 0, visualSum: "0" },
    dealerCards: { sum: 0, visualSum: "0" },
  });

  const calculateSum = () => {
    let remainingCards = 0;
    let playerCards: cardsSumType = { sum: 0, visualSum: "0" };
    let dealerCards: cardsSumType = { sum: 0, visualSum: "0" };

    currentDeck.deck.map((i) => {
      remainingCards += i.cards.length;
    });

    let aces = 0;
    currentDeck.playerCards.map((card) => {
      if (card.visualValue === "A") {
        aces += 1;
      }
      playerCards.sum += card.value;
    });
    for (let i = 0; i < aces; i++) {
      if (playerCards.sum > 21) {
        playerCards.sum -= 10;
      }
    }
    playerCards.visualSum = playerCards.sum.toString();
    aces = 0;

    let firstCardValue = 0;
    currentDeck.dealerCards.map((card, index) => {
      if (card.visualValue === "A") {
        aces += 1;
      }
      dealerCards.sum += card.value;
      if (index === 0) {
        firstCardValue = dealerCards.sum;
      }
    });
    for (let i = 0; i < aces; i++) {
      if (dealerCards.sum > 21) {
        dealerCards.sum -= 10;
      }
    }
    dealerCards.visualSum = !cardExposed ? firstCardValue.toString() + " + ..." : dealerCards.sum.toString();

    return { remainingCards: remainingCards, playerCards: playerCards, dealerCards: dealerCards };
  };

  useEffect(() => {
    const sum = calculateSum();
    setOutput(sum);
  }, [currentDeck, cardExposed]);

  return output;
}
