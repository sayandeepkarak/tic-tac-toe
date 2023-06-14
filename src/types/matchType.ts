export type roomData = {
  users: {
    names: string[];
    userId: string[];
    images: string[];
  };
};

export type matchInfo = {
  simulations: valueType[];
  round: number;
  points: number[];
  turn: 0 | 1;
  step: number;
};

export type valueType = "X" | "O" | "";
