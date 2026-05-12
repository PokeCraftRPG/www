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
  const constitutionBonus = ref<number>(0)
  const isConstitutionHyperTrained = ref<boolean>(false)
  const level = ref<number>(1);
  const sizeCategory = ref<SizeCategory>("Medium");

  function setConstitutionBonus(value: number | null | undefined): void {
    constitutionBonus.value = value ?? 0
  }

  function setConstitutionHyperTrained(value: boolean | null | undefined): void {
    isConstitutionHyperTrained.value = value ?? false
  }

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
        break;
      default:
        sizeCategory.value = "Medium";
    }
  }

  return { constitutionBonus, isConstitutionHyperTrained, level, sizeCategory, setConstitutionBonus, setConstitutionHyperTrained, setLevel, setSizeCategory };
});
