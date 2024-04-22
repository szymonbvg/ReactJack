import { useContext, useEffect } from "react";
import { pointsContext } from "../../App";
import "./PointsBar.css";
import { initPoints } from "../../initValues/points";

export default function PointsBar() {
  const context = useContext(pointsContext);

  useEffect(() => {
    localStorage.setItem(
      "points",
      JSON.stringify({
        money: context?.points.money,
        wins: context?.points.wins,
        games: context?.points.games,
      })
    );
  }, [context?.points]);

  return (
    <div className="points">
      <p>money: {context?.points.money}$</p>
      <p>money balance: {(context?.points.money as number) - initPoints.money}$</p>
      <p>wins: {context?.points.wins}</p>
      <p>games: {context?.points.games}</p>
    </div>
  );
}
