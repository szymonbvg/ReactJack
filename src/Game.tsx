import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { predefinedDeck } from "./initValues/deck";
import { useCalculateCards } from "./hooks/useCalculateCards";
import { useHiLoSystem } from "./hooks/useHiLoSystem";
import { deckReducer } from "./deckReducer/deckReducer";
import { drawCards } from "./actions/actions";
import { useTurnHandler } from "./hooks/useTurnHandler";
import { usePointsAllocator } from "./hooks/usePointsAllocator";
import BetButtons from "./Components/BetButtons/BetButtons";
import { pointsContext } from "./App";
import "./Game.css";
import Cards from "./Components/Cards/Cards";
import { cardsContextType } from "./types/CardTypes";
import StatusBar from "./Components/StatusBar/StatusBar";
import { initPoints } from "./initValues/points";
import { useDouble } from "./hooks/useDouble";

export const cardsContext = createContext<cardsContextType>(null);

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
  const canDouble = useDouble(currentDeck, bet);

  const doubleBet = async () => {
    context?.setPoints((prev) => {
      return { ...prev, money: prev.money - bet };
    });
    setBet((prev) => prev * 2);
    setCanPlay(false);
    await drawCards(1, dispatchCurrentDeck, "player");
    setStand(true);
  };

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
    context?.setPoints(initPoints);
    dispatchCurrentDeck({ action: "shuffle" });
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
    <div className="game">
      {!houseWins ? (
        <>
          {!start ? (
            <>
              <BetButtons betState={{ bet, setBet }} />
              <button id="start" disabled={bet === 0} onClick={startGame}>
                start
              </button>
            </>
          ) : (
            <cardsContext.Provider
              value={{ calculatedSum: calculatedSum, currentDeck: currentDeck, cardExposed: stand }}>
              <StatusBar status={turnStatus} handlePlayAgain={playAgain} />
              <div className="game-buttons">
                {canDouble && (
                  <button disabled={stand || !canPlay} onClick={doubleBet}>
                    double
                  </button>
                )}
                <button disabled={stand || !canPlay} onClick={() => drawCards(1, dispatchCurrentDeck, "player")}>
                  hit
                </button>
                <button disabled={stand || !canPlay} onClick={() => setStand(true)}>
                  stand
                </button>
              </div>
              <div className="cards">
                <p>player's sum: {calculatedSum.playerCards.visualSum}</p>
                <Cards owner="player" />
                <p>dealer's sum: {calculatedSum.dealerCards.visualSum}</p>
                <Cards owner="dealer" />
              </div>
            </cardsContext.Provider>
          )}
        </>
      ) : (
        <>
          <h1>House Wins</h1>
          <button onClick={restartGame}>restart</button>
        </>
      )}
    </div>
  );
}
