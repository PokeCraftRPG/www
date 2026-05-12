import { defineStore } from "pinia";

import type { Form, SizeCategory } from "~/types/pokemon";

function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}

export const usePokemonStore = defineStore("pokemon", () => {
  // state
  const constitutionBase = ref<number>(0);
  const constitutionBonus = ref<number>(0);
  const constitutionTotal = ref<number>(0);
  const form = ref<Form>();
  const isConstitutionHyperTrained = ref<boolean>(false);
  const level = ref<number>(1);
  const sizeCategory = ref<SizeCategory>("Medium");
  const vitality = ref<number>(0);

  // mutations
  function updateVitality(): void {
    constitutionTotal.value =
      calculateConstitutionTotal(constitutionBase.value, isConstitutionHyperTrained.value ? "ExtraLarge" : sizeCategory.value, level.value) +
      constitutionBonus.value;
    vitality.value = constitutionTotal.value;
  }

  // actions
  function setConstitutionBonus(value: number | null | undefined): void {
    constitutionBonus.value = value ?? 0;
    updateVitality();
  }

  function setConstitutionHyperTrained(value: boolean | null | undefined): void {
    isConstitutionHyperTrained.value = value ?? false;
    updateVitality();
  }

  function setForm(value: Form | null | undefined): void {
    form.value = value ?? undefined;
    constitutionBase.value = value ? calculateConstitutionBase(value.baseStatistics.hp) : 0;
    updateVitality();
  }

  function setLevel(value: number | null | undefined): void {
    level.value = clamp(value ?? 0, 1, 100);
    updateVitality();
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
    updateVitality();
  }

  function setVitality(value: number | null | undefined): void {
    vitality.value = clamp(value ?? 0, 0, constitutionTotal.value);
  }

  return {
    constitutionBase,
    constitutionBonus,
    constitutionTotal,
    form,
    isConstitutionHyperTrained,
    level,
    sizeCategory,
    vitality,
    setConstitutionBonus,
    setConstitutionHyperTrained,
    setForm,
    setLevel,
    setSizeCategory,
    setVitality,
  };
});
