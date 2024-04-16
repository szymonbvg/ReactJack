import { useContext, useEffect } from "react";
import { pointsContext } from "../App";
import { turnStatusType } from "../types/TurnStatusType";

export function usePointsAllocator(bet: number, turnStatus: turnStatusType, gameStarted: boolean) {
  const context = useContext(pointsContext);

  useEffect(() => {
    if (gameStarted) {
      if (turnStatus.status === null) {
        context?.setPoints((prev) => {
          return { ...prev, money: prev.money - bet, games: prev.games + 1 };
        });
      } else if (turnStatus.status === "player wins") {
        const multiplier = turnStatus.blackjack ? 3 / 2 : 1;
        context?.setPoints((prev) => {
          return { ...prev, money: prev.money + bet + bet * multiplier, wins: prev.wins + 1 };
        });
      } else if (turnStatus.status === "push") {
        context?.setPoints((prev) => {
          return { ...prev, money: prev.money + bet };
        });
      }
    }
  }, [turnStatus.status, gameStarted]);
}
