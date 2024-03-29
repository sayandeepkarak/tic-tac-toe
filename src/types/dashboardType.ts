export type userData = {
  id: string;
  name: string;
  photoURL: string;
  points: number;
};

export type leadData = {
  name: string;
  photoURL: string;
  points: number;
};

export type recoverable = {
  isRecoverable: boolean;
  matchId: string;
  players: string[];
};
