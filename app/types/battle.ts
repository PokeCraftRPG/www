import type { Form, Species, Variety } from "./pokemon";

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

export type Matchup = Belligerents;
