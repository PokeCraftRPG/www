import type { Form, Move, Species, Variety } from "./pokemon";

export type Belligerent = {
  species?: Species;
  variety?: Variety;
  form?: Form;
  name: string;
};

export type Belligerents = {
  attacker: Belligerent;
  target: Belligerent;
};

export type Matchup = Belligerents & {
  id: string;
  level: number;
  move?: Move;
  power: number;
  attack: number;
  defense: number;
};
