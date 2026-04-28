import type { Variety } from "~/types/pokemon";

export default function (varieties: Variety[]): Variety[] {
  return varieties.sort((a, b) => Number(b.isDefault) - Number(a.isDefault) || a.key.localeCompare(b.key));
}
