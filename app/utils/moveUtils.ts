export function convertPowerPointsToStamina(powerPoints: number): number {
  switch (powerPoints) {
    case 1:
      return 100;
    case 5:
      return 20;
    case 10:
      return 10;
    case 15:
      return 7;
    case 20:
      return 5;
    case 25:
    case 30:
      return 4;
    case 35:
    case 40:
      return 3;
  }
  return 0;
}

export function convertPowerToRoll(power: number): string {
  if (power < 1) {
    return "";
  } else if (power > 250) {
    power = 250;
  }

  const count: number = power < 180 ? 1 : 2;
  const sides: number = calculateSides(power);
  const base: number = (power * 100) / 250 - count * sides;
  return `${base}+${count}d${sides}`;
}
function calculateSides(power: number): number {
  if (power < 50) {
    return 4;
  } else if (power < 75) {
    return 6;
  } else if (power < 95) {
    return 8;
  } else if (power < 120) {
    return 10;
  }
  return 12;
}
