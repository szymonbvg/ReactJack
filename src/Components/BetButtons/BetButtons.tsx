import { useContext } from "react";
import { pointsContext } from "../../App";
import "./BetButtons.css";

interface IBetButtons {
  betState: {
    bet: number;
    setBet: React.Dispatch<React.SetStateAction<number>>;
  };
}

export default function BetButtons({ betState }: IBetButtons) {
  const context = useContext(pointsContext);

  const possibleBets = [1, 5, 25, 50, 100, 500, 1000];

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
    <div className="bet">
      <p id="bet-value">BET: {betState.bet}</p>
      <div className="bets">
        {possibleBets.map((possibleBet) => {
          return (
            <div className={`bet-${possibleBet}`}>
              <div className={`btn ${hasMoneyForBet(possibleBet)}`} onClick={() => addBet(possibleBet)}>
                <p>{possibleBet}</p>
                <img src="/chip.svg" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button onClick={() => betState.setBet(context?.points.money as number)}>all in</button>
        <button onClick={() => betState.setBet(0)}>reset bet</button>
      </div>
    </div>
  );
}
