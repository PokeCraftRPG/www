<template>
  <div class="row">
    <div class="col-6 col-sm-4 col-xl-2 mb-3 text-center">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.constitution')">{{ $n(constitution, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3 text-center">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.Attack')">{{ $n(attack, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3 text-center">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.Defense')">{{ $n(defense, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3 text-center">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.SpecialAttack')">{{ $n(specialAttack, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3 text-center">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.SpecialDefense')">{{ $n(specialDefense, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3 text-center">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.Speed')">{{ $n(speed, "integer") }}</TarCard>
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

const attack = computed<number>(() => calculateAttribute(props.form.baseStatistics.attack));
const constitution = computed<number>(() => calculateConstitution(props.form.baseStatistics.hp, props.sizeCategory, props.level));
const defense = computed<number>(() => calculateAttribute(props.form.baseStatistics.defense));
const specialAttack = computed<number>(() => calculateAttribute(props.form.baseStatistics.specialAttack));
const specialDefense = computed<number>(() => calculateAttribute(props.form.baseStatistics.specialDefense));
const speed = computed<number>(() => calculateAttribute(props.form.baseStatistics.speed));

// TODO(fpion): change the labels for the real attributes
</script>
