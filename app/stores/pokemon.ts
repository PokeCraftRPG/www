import { defineStore } from "pinia";

import type { Form, SizeCategory, Species, Variety } from "~/types/pokemon";

export const usePokemonStore = defineStore("pokemon", () => {
  // state
  const constitutionBase = ref<number>(0);
  const constitutionBonus = ref<number>(0);
  const constitutionTotal = ref<number>(0);
  const form = ref<Form>();
  const isConstitutionHyperTrained = ref<boolean>(false);
  const level = ref<number>(1);
  const sizeCategory = ref<SizeCategory>("Medium");
  const species = ref<Species>();
  const variety = ref<Variety>();
  const vitality = ref<number>(0);

  // getters
  const captureDifficulty = computed<number>(() =>
    species.value ? calculateCaptureDifficulty(species.value.catchRate, level.value, vitality.value, constitutionTotal.value) : 0,
  );

  const tier = computed<number>(() => {
    if (level.value < 5) {
      return 0;
    } else if (level.value < 20) {
      return 1;
    } else if (level.value < 50) {
      return 2;
    }
    return 3;
  });

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

  function setSpecies(value: Species | null | undefined): void {
    species.value = value ?? undefined;
    if (value) {
      value.varieties = sortVarieties(value.varieties);
      setVariety(value.varieties[0]);
    } else {
      setVariety(undefined);
    }
  }

  function setVariety(value: Variety | null | undefined): void {
    variety.value = value ?? undefined;
    if (value) {
      value.forms = sortForms(value.forms);
      setForm(value.forms[0]);
    } else {
      setForm(undefined);
    }
  }

  function setVitality(value: number | null | undefined): void {
    vitality.value = clamp(value ?? 0, 0, constitutionTotal.value);
  }

  return {
    // state
    constitutionBase,
    constitutionBonus,
    constitutionTotal,
    form,
    isConstitutionHyperTrained,
    level,
    sizeCategory,
    species,
    variety,
    vitality,
    // getters
    captureDifficulty,
    tier,
    // actions
    setConstitutionBonus,
    setConstitutionHyperTrained,
    setForm,
    setLevel,
    setSizeCategory,
    setSpecies,
    setVariety,
    setVitality,
  };
});
