import { useContext } from "react";
import "./Cards.css";
import { cardsContext } from "../../Game";

interface ICards {
  owner: "player" | "dealer";
}

export default function Cards({ owner }: ICards) {
  const context = useContext(cardsContext);

  const usedCards = owner === "player" ? context?.currentDeck.playerCards : context?.currentDeck.dealerCards;

  return (
    <div className={`used-cards ${owner}`}>
      {usedCards?.map((i, index) => {
        return (
          <div className="card">
            {owner === "dealer" && index == 1 && !context?.cardExposed ? (
              <p>?</p>
            ) : (
              <>
                <div className="value">
                  <p>{i.visualValue}</p>
                  <img id="icon" src={`/${i.cardSymbol}.svg`} />
                </div>
                <div className="symbol">
                  <img id="icon" src={`/${i.cardSymbol}.svg`} />
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
