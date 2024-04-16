import { calculationType } from "../types/CalculationType";
import { usedDecksType } from "../types/DeckTypes";

interface IUsedCards {
	currentDeck: usedDecksType;
	calculatedSum: calculationType;
	cardExposed: boolean
}

export default function UsedCards({currentDeck, calculatedSum, cardExposed}: IUsedCards) {
	return (
		<>
			<p>player: (sum: {calculatedSum.playerCards.sum})</p>
			{currentDeck.playerCards.map((i) => {
				return (
					<p>
						{i.cardSymbol},{i.visualValue}
					</p>
				);
			})}
			<hr />
			<p>dealer: (sum: {calculatedSum.dealerCards.visualSum})</p>
			{currentDeck.dealerCards.map((i, index) => {
				if (index == 1 && !cardExposed) {
					return <p>...</p>;
				}
				return (
					<p>
						{i.cardSymbol},{i.visualValue}
					</p>
				);
			})}
		</>
	)
}