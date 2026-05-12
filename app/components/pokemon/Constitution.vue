<template>
  <div>
    <div class="row">
      <PokemonBonusInput class="col-sm-6 mb-3" :model-value="pokemon.constitutionBonus" @update:model-value="pokemon.setConstitutionBonus" />
      <div class="col-sm-6 mb-3">
        <TarCheckbox
          :label="$t('pokemon.hyperTraining')"
          :model-value="pokemon.isConstitutionHyperTrained"
          switch
          @update:model-value="pokemon.setConstitutionHyperTrained"
        />
      </div>
    </div>
    <div class="row text-center">
      <div class="col-sm-4 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.constitution.base')">{{ $n(base, "integer") }}</TarCard>
      </div>
      <div class="col-6 col-sm-4 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.vitality')">{{ $n(total, "integer") }}</TarCard>
      </div>
      <div class="col-6 col-sm-4 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.stamina')">{{ $n(total, "integer") }}</TarCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Form } from "~/types/pokemon";
import { usePokemonStore } from "~/stores/pokemon";

const pokemon = usePokemonStore();

const props = defineProps<{
  form: Form;
}>();

const emit = defineEmits<{
  (e: "update:vitality", value: number): void;
}>();

const base = computed<number>(() => calculateConstitutionBase(props.form.baseStatistics.hp));
const total = computed<number>(
  () =>
    calculateConstitutionTotal(base.value, pokemon.isConstitutionHyperTrained ? "ExtraLarge" : pokemon.sizeCategory, pokemon.level) + pokemon.constitutionBonus,
);

watch(total, (total) => emit("update:vitality", total), { immediate: true });
</script>
