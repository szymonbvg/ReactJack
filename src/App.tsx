import { createContext, useState } from "react";
import Game from "./Game";
import { pointsContextType, pointsType } from "./types/PointsTypes";
import "./App.css";
import PointsBar from "./Components/PointsBar/PointsBar";
import { initPoints } from "./initValues/points";

export const pointsContext = createContext<pointsContextType>(null);

export default function App() {
  const lsPoints = JSON.parse(localStorage.getItem("points") as string) as pointsType;
  const [points, setPoints] = useState<pointsType>(lsPoints === null ? initPoints : lsPoints);

  return (
    <pointsContext.Provider value={{ points: points, setPoints: setPoints }}>
      <PointsBar />
      <Game />
    </pointsContext.Provider>
  );
}
