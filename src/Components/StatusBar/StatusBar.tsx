import { useContext } from "react";
import { turnStatusType } from "../../types/TurnStatusType";
import { cardsContext } from "../../Game";
import "./StatusBar.css";

interface IStatusBar {
  status: turnStatusType;
  handlePlayAgain: () => void;
}

export default function StatusBar({ status, handlePlayAgain }: IStatusBar) {
  const context = useContext(cardsContext);

  return (
    <div className="status-bar">
      {status.roundEnd && (
        <>
          {status.blackjack && <p>blackjack</p>}
          <p>{status.status}!</p>
          <p id="again" onClick={handlePlayAgain}>
            play again
          </p>
        </>
      )}
      <p>cards in deck: {context?.calculatedSum.remainingCards}</p>
    </div>
  );
}
