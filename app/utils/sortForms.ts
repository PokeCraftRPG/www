import type { Form, FormKind } from "~/types/pokemon";

const weight: Record<FormKind, number> = {
  ["Default"]: 0,
  ["Alternative"]: 1,
  ["BattleOnly"]: 2,
  ["Mega"]: 3,
};

export default function (forms: Form[]): Form[] {
  return forms.sort((a, b) => weight[a.kind] - weight[b.kind] || a.key.localeCompare(b.key));
}
