import { useContext, useEffect, useReducer, useState } from "react";
import { predefinedDeck } from "./predefinedDeck/deck";
import { useCalculateCards } from "./hooks/useCalculateCards";
import { useHiLoSystem } from "./hooks/useHiLoSystem";
import { deckReducer } from "./deckReducer/deckReducer";
import { drawCards } from "./actions/actions";
import { useTurnHandler } from "./hooks/useTurnHandler";
import UsedCards from "./Components/UsedCards";
import { usePointsAllocator } from "./hooks/usePointsAllocator";
import BetButtons from "./Components/BetButtons";
import { pointsContext } from "./App";

export default function Game() {
  const context = useContext(pointsContext);

  const [currentDeck, dispatchCurrentDeck] = useReducer(deckReducer, {
    deck: predefinedDeck,
    playerCards: [],
    dealerCards: [],
  });

  const [start, setStart] = useState(false);
  const [stand, setStand] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [bet, setBet] = useState(0);
  const [houseWins, setHouseWins] = useState(false);

  const HiLo = useHiLoSystem(currentDeck);
  const calculatedSum = useCalculateCards(currentDeck, stand);

  const startGame = async () => {
    setStart(true);
    await drawCards(2, dispatchCurrentDeck, "player");
    await drawCards(2, dispatchCurrentDeck, "dealer");
    setCanPlay(true);
  };

  const playAgain = () => {
    dispatchCurrentDeck({ action: "reset" });
    setBet(0);
    setStand(false);
    setCanPlay(false);
    setStart(false);
  };

  const restartGame = () => {
    context?.setPoints({ money: 1000, wins: 0, games: 0 });
    playAgain();
  };

  const turnStatus = useTurnHandler(stand, canPlay, currentDeck, dispatchCurrentDeck, calculatedSum, HiLo);

  // ends round after blackjack
  // or when player hits too many cards
  useEffect(() => {
    if (turnStatus.blackjack || calculatedSum.playerCards.sum > 21) {
      setStand(true);
    }
  }, [turnStatus.blackjack, calculatedSum]);

  // checks if the player has lost game
  useEffect(() => {
    if ((context?.points.money as number) <= 0 && !start) {
      setHouseWins(true);
    } else {
      setHouseWins(false);
    }
  }, [context?.points, start]);

  usePointsAllocator(bet, turnStatus, start);

  return (
    <>
      {!houseWins ? (
        <>
          {!start ? (
            <>
              <BetButtons betState={{ bet, setBet }} />
              <button disabled={bet === 0} onClick={startGame}>
                start
              </button>
            </>
          ) : (
            <>
              <p>cards in deck: {calculatedSum.remainingCards}</p>
              <button disabled={stand || !canPlay} onClick={() => drawCards(1, dispatchCurrentDeck, "player")}>
                hit
              </button>
              <button disabled={stand || !canPlay} onClick={() => setStand(true)}>
                stand
              </button>
              <UsedCards currentDeck={currentDeck} calculatedSum={calculatedSum} cardExposed={stand} />
              <hr />
              <h1>{turnStatus.status}</h1>
              {turnStatus.roundEnd && <button onClick={playAgain}>play again</button>}
            </>
          )}
        </>
      ) : (
        <>
          <h1>House Wins</h1>
          <button onClick={restartGame}>restart</button>
        </>
      )}
    </>
  );
}
