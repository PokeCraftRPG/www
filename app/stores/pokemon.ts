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
  const constitutionBonus = ref<number>(0);
  const form = ref<Form>();
  const isConstitutionHyperTrained = ref<boolean>(false);
  const level = ref<number>(1);
  const sizeCategory = ref<SizeCategory>("Medium");

  // getters
  const constitutionBase = computed<number>(() => (form.value ? calculateConstitutionBase(form.value.baseStatistics.hp) : 0));
  const constitutionTotal = computed<number>(() =>
    form.value
      ? calculateConstitutionTotal(constitutionBase.value, isConstitutionHyperTrained.value ? "ExtraLarge" : sizeCategory.value, level.value) +
        constitutionBonus.value
      : 0,
  );

  // actions
  function setConstitutionBonus(value: number | null | undefined): void {
    constitutionBonus.value = value ?? 0;
  }

  function setConstitutionHyperTrained(value: boolean | null | undefined): void {
    isConstitutionHyperTrained.value = value ?? false;
  }

  function setForm(value: Form | null | undefined): void {
    form.value = value ?? undefined;
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

  return {
    // state
    constitutionBonus,
    form,
    isConstitutionHyperTrained,
    level,
    sizeCategory,
    // getters
    constitutionBase,
    constitutionTotal,
    // actions
    setConstitutionBonus,
    setConstitutionHyperTrained,
    setForm,
    setLevel,
    setSizeCategory,
  };
});
