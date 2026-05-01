import type { Aggregate } from "./game";

export type Ability = Aggregate & {
  key: string;
  name?: string | null;
  description?: string | null;
};

export type EggGroup =
  | "NoEggsDiscovered"
  | "Amorphous"
  | "Bug"
  | "Ditto"
  | "Dragon"
  | "Fairy"
  | "Field"
  | "Flying"
  | "Grass"
  | "HumanLike"
  | "Mineral"
  | "Monster"
  | "Water1"
  | "Water2"
  | "Water3";

export type EggGroups = {
  primary: EggGroup;
  secondary?: EggGroup | null;
};

export type Form = Aggregate & {
  variety: Variety;
  kind: FormKind;
  key: string;
  name?: string | null;
  description?: string | null;
  hasGenderDifferences: boolean;
  height: number;
  weight: number;
  types: FormTypes;
  abilities: FormAbilities;
  baseStatistics: BaseStatistics;
  yield: Yield;
};

export type FormKind = "Default" | "Alternative" | "BattleOnly" | "Mega";

export type FormAbilities = {
  primary?: Ability | null;
  secondary?: Ability | null;
  hidden?: Ability | null;
};

export type BaseStatistics = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};

export type FormTypes = {
  primary: PokemonType;
  secondary?: PokemonType | null;
};

export type GrowthRate = "Fluctuating" | "Slow" | "MediumSlow" | "MediumFast" | "Fast" | "Erratic";

export type LearningMethod = "Level" | "Evolution" | "Reminder";

export type Move = Aggregate & {
  type: PokemonType;
  category: MoveCategory;
  key: string;
  name?: string | null;
  description?: string | null;
  accuracy?: number | null;
  power?: number | null;
  powerPoints: number;
};

export type MoveCategory = "Physical" | "Special" | "Status";

export type PokemonGender = "Female" | "Male";

export type PokemonType =
  | "Bug"
  | "Dark"
  | "Dragon"
  | "Electric"
  | "Fairy"
  | "Fighting"
  | "Fire"
  | "Flying"
  | "Ghost"
  | "Grass"
  | "Ground"
  | "Ice"
  | "Normal"
  | "Poison"
  | "Psychic"
  | "Rock"
  | "Steel"
  | "Water";

export type SizeCategory = "ExtraSmall" | "Small" | "Medium" | "Large" | "ExtraLarge";

export type Species = Aggregate & {
  number: number;
  category: SpeciesCategory;
  key: string;
  name?: string | null;
  description?: string | null;
  baseFriendship: number;
  catchRate: number;
  growthRate: GrowthRate;
  eggCycles: number;
  eggGroups: EggGroups;
  varieties: Variety[];
};

export type SpeciesCategory = "Standard" | "Baby" | "Legendary" | "Mythical";

export type Variety = Aggregate & {
  species: Species;
  isDefault: boolean;
  key: string;
  name?: string | null;
  genus?: string | null;
  description?: string | null;
  genderRatio?: number | null;
  canChangeForm: boolean;
  forms: Form[];
  moves: VarietyMove[];
};

export type VarietyMove = {
  move: Move;
  method: LearningMethod;
  level?: number | null;
};

export type Yield = {
  experience: number;
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};
