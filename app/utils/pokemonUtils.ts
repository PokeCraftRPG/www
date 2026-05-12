import type { SizeCategory } from "~/types/pokemon";

export function calculateAttribute(baseStatistic: number): number {
  baseStatistic = clamp(baseStatistic, 0, 255);
  if (baseStatistic < 45) {
    return Math.floor(baseStatistic / 15) - 3;
  } else if (baseStatistic < 105) {
    return Math.floor((baseStatistic - 45) / 10);
  } else if (baseStatistic < 125) {
    return +6;
  } else if (baseStatistic < 145) {
    return +7;
  } else {
    return +8;
  }
}

export function calculateCaptureDifficulty(catchRate: number, level: number, currentVitality: number, maximumVitality: number): number {
  let difficulty: number = 5;

  // Catch Rate Part
  catchRate = clamp(catchRate, 0, 255);
  difficulty += Math.floor((255 - catchRate) / 10);

  // Level Part
  if (level >= 50) {
    difficulty += 10;
  } else if (level >= 5) {
    difficulty += Math.floor(level / 5);
  }

  // HP Part
  maximumVitality = clamp(maximumVitality, 1, 999);
  currentVitality = clamp(currentVitality, 0, maximumVitality);
  difficulty += Math.floor((currentVitality / maximumVitality) * 10);

  return difficulty;
}

export function calculateConstitutionBase(baseHP: number): number {
  baseHP = clamp(baseHP, 0, 255);
  if (baseHP < 10) {
    return 0;
  }
  return 40 + Math.round(((baseHP - 10) / 245) * 260);
}
export function calculateConstitutionTotal(base: number, sizeCategory: SizeCategory, level: number): number {
  let constitution: number = clamp(base, 0, 300);
  if (constitution < 1) {
    return 1;
  }

  switch (sizeCategory) {
    case "ExtraSmall":
      constitution -= 20;
      break;
    case "Small":
      constitution -= 10;
      break;
    case "Large":
      constitution += 10;
      break;
    case "ExtraLarge":
      constitution += 20;
      break;
  }

  level = clamp(level, 1, 100);
  return Math.floor((constitution * level) / 100) + Math.floor(level / 2) + 5;
}
export function calculateConstitution(baseHP: number, sizeCategory: SizeCategory, level: number): number {
  baseHP = clamp(baseHP, 0, 255);
  if (baseHP < 10) {
    return 1;
  }
  let constitution = 40 + Math.round(((baseHP - 10) / 245) * 260);

  switch (sizeCategory) {
    case "ExtraSmall":
      constitution -= 20;
      break;
    case "Small":
      constitution -= 10;
      break;
    case "Large":
      constitution += 10;
      break;
    case "ExtraLarge":
      constitution += 20;
      break;
  }

  level = clamp(level, 1, 100);
  return Math.floor((constitution * level) / 100) + Math.floor(level / 2) + 5;
}

function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}
