import { useEffect, useState } from "react";
import { drawCards } from "../actions/actions";
import { deckDispatcherType, usedDecksType } from "../types/DeckTypes";
import { calculationType } from "../types/CalculationType";
import { turnStatusType } from "../types/TurnStatusType";

export function useTurnHandler(
  cardExposed: boolean,
  canPlay: boolean,
  currentDeck: usedDecksType,
  deckDispatcher: React.Dispatch<deckDispatcherType>,
  calculatedSum: calculationType,
  HiLo: number
): turnStatusType {
  const [status, setStatus] = useState<string | null>(null);
  const [roundEnd, setRoundEnd] = useState(false);
  const [blackjack, setBlackjack] = useState(false);

  const dealersMoveDone = () => {
    if (
      calculatedSum.dealerCards.sum < calculatedSum.playerCards.sum &&
      calculatedSum.playerCards.sum <= 21 &&
      !blackjack
    ) {
      const valueTo21 = 21 - calculatedSum.dealerCards.sum;
      let requiredCards = 0;
      for (const type of currentDeck.deck) {
        for (const card of type.cards) {
          if (card.value <= valueTo21) {
            requiredCards++;
          }
        }
      }
      const chances = calculatedSum.remainingCards !== 0 ? (requiredCards / calculatedSum.remainingCards) * 100 : 0;

      // HiLo < 0 because then there would be more chances to draw low value card
      // so there would be less chances to make score greater than 21
      if (valueTo21 > 1 && (chances >= 50 || HiLo < 0 || calculatedSum.dealerCards.sum <= 16)) {
        setTimeout(() => {
          if (calculatedSum.remainingCards >= 1) {
            drawCards(1, deckDispatcher, "dealer");
          }
        }, 1000);
        return false;
      }
    }
    return true;
  };

  // checks for blackjack after cards have been dealt
  useEffect(() => {
    if ((calculatedSum.playerCards.sum === 21 || calculatedSum.dealerCards.sum === 21) && canPlay) {
      setBlackjack(true);
    } else {
      setBlackjack(false);
    }
  }, [canPlay]);

  // checks whether the dealer has made his move
  // and shuffles the deck
  useEffect(() => {
    if (calculatedSum.remainingCards <= 0) {
      deckDispatcher({ action: "shuffle" });
    }

    if (cardExposed) {
      setRoundEnd(dealersMoveDone());
    } else {
      setRoundEnd(false);
      setStatus(null);
    }
  }, [calculatedSum]);

  // manages the output status of round
  useEffect(() => {
    if (roundEnd) {
      if (
        calculatedSum.playerCards.sum > 21 ||
        (calculatedSum.dealerCards.sum > calculatedSum.playerCards.sum && calculatedSum.dealerCards.sum <= 21)
      ) {
        setStatus("dealer wins");
      } else if (
        calculatedSum.dealerCards.sum > 21 ||
        (calculatedSum.playerCards.sum > calculatedSum.dealerCards.sum && calculatedSum.playerCards.sum <= 21)
      ) {
        setStatus("player wins");
      } else if (calculatedSum.dealerCards.sum === calculatedSum.playerCards.sum) {
        setStatus("push");
      }
    }
  }, [roundEnd]);

  return { roundEnd: roundEnd, status: status, blackjack: blackjack };
}
