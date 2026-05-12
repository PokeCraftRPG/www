import { defineStore } from "pinia";

import type { SizeCategory } from "~/types/pokemon";

function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}

export const usePokemonStore = defineStore("pokemon", () => {
  const level = ref<number>(1);
  const sizeCategory = ref<SizeCategory>("Medium");

  function setLevel(value: number | null | undefined): void {
    level.value = clamp(value ?? 0, 1, 100);
  }

  function setSizeCategory(value: string | null | undefined): void {
    switch (value) {
      case "ExtraSmall":
      case "Small":
      case "Large":
      case "ExtraLarge":
        sizeCategory.value = value;
      default:
        sizeCategory.value = "Medium";
    }
  }

  return { level, sizeCategory, setLevel, setSizeCategory };
});
