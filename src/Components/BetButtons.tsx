import { useContext } from "react";
import { pointsContext } from "../App";

interface IBetButtons {
  betState: {
    bet: number;
    setBet: React.Dispatch<React.SetStateAction<number>>;
  };
}

export default function BetButtons({ betState }: IBetButtons) {
  const context = useContext(pointsContext);

  const possibleBets = [
    { value: 1, visual: "+1" },
    { value: 5, visual: "+5" },
    { value: 25, visual: "+25" },
    { value: 50, visual: "+50" },
    { value: 100, visual: "+100" },
    { value: 500, visual: "+500" },
    { value: 1000, visual: "+1000" },
    { value: (context?.points.money as number) - betState.bet, visual: "all in" },
  ];

  const hasMoneyForBet = (betValue: number) => {
    if ((context?.points.money as number) - betState.bet - betValue >= 0) {
      return true;
    }
    return false;
  };

  const addBet = (value: number) => {
    if (hasMoneyForBet(value)) {
      betState.setBet((prev) => prev + value);
    }
  };

  return (
    <>
      <p>bet: {betState.bet}</p>
      {possibleBets.map((possibleBet) => {
        return (
          <button onClick={() => addBet(possibleBet.value)} disabled={!hasMoneyForBet(possibleBet.value)}>
            {possibleBet.visual}
          </button>
        );
      })}
      <button onClick={() => betState.setBet(0)}>reset bet</button>
    </>
  );
}
