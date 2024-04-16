import { createContext, useEffect, useState } from "react";
import Game from "./Game";
import { pointsContextType, pointsType } from "./types/PointsTypes";

export const pointsContext = createContext<pointsContextType>(null);

export default function App() {
  const lsPoints = JSON.parse(localStorage.getItem("points") as string) as pointsType;
  const [points, setPoints] = useState<pointsType>(lsPoints === null ? { money: 1000, wins: 0, games: 0 } : lsPoints);

  useEffect(() => {
    localStorage.setItem(
      "points",
      JSON.stringify({
        money: points.money,
        wins: points.wins,
        games: points.games,
      })
    );
  }, [points]);

  return (
    <>
      <p>money: {points.money}$</p>
      <p>money balance: {points.money - 1000}$</p>
      <p>wins: {points.wins}</p>
      <p>games: {points.games}</p>
      <hr />
      <pointsContext.Provider value={{ points: points, setPoints: setPoints }}>
        <Game />
      </pointsContext.Provider>
    </>
  );
}
