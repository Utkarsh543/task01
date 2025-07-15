// src/types.ts
export interface User {
  id: string;
  name: string;
  points: number;
}

export interface History {
  id: string;
  userId: string;
  points: number;
  timestamp: string;
}
