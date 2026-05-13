import { parsingUtils } from "logitar-js";

const { parseNumber } = parsingUtils;

export default function (roll: string): number {
  const parts: string[] = roll.split("+");
  if (parts.length !== 2) {
    return 0;
  }

  const random: string[] = parts[1]?.split("d") ?? [];
  if (random.length !== 2) {
    return 0;
  }

  const base: number = parseNumber(parts[0]) ?? 0;
  const count: number = parseNumber(random[0]) ?? 0;
  const sides: number = parseNumber(random[1]) ?? 0;

  let result: number = base;
  for (let i = 0; i < count; i++) {
    result += 1 + Math.floor(Math.random() * sides);
  }
  return result;
}
