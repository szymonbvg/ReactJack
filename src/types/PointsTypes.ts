export type pointsType = {
  money: number;
  wins: number;
  games: number;
};

export type pointsContextType = {
  points: pointsType;
  setPoints: React.Dispatch<React.SetStateAction<pointsType>>;
} | null;
