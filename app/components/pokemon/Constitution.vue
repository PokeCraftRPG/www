<template>
  <div>
    <div class="row">
      <PokemonBonusInput class="col-sm-6 mb-3" v-model="bonus" />
      <div class="col-sm-6 mb-3">
        <TarCheckbox :label="$t('pokemon.hyperTraining')" switch v-model="hyperTraining" />
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
import type { Form, SizeCategory } from "~/types/pokemon";

const props = defineProps<{
  form: Form;
  level: number;
  sizeCategory: SizeCategory;
}>();

const emit = defineEmits<{
  (e: "update:vitality", value: number): void;
}>();

const bonus = ref<number>(0);
const hyperTraining = ref<boolean>(false);

const base = computed<number>(() => calculateConstitutionBase(props.form.baseStatistics.hp));
const total = computed<number>(
  () => calculateConstitutionTotal(base.value, hyperTraining.value ? "ExtraLarge" : props.sizeCategory, props.level) + bonus.value,
);

watch(total, (total) => emit("update:vitality", total), { immediate: true });
</script>
