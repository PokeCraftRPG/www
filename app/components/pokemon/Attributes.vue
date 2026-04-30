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
import type { Form } from "~/types/pokemon";

const props = defineProps<{
  form: Form;
}>();

const constitution = computed<number>(() => 0); // TODO(fpion): calculate max. HP / Constitution

const attack = computed<number>(() => calculateScore(props.form.baseStatistics.attack));
const defense = computed<number>(() => calculateScore(props.form.baseStatistics.defense));
const specialAttack = computed<number>(() => calculateScore(props.form.baseStatistics.specialAttack));
const specialDefense = computed<number>(() => calculateScore(props.form.baseStatistics.specialDefense));
const speed = computed<number>(() => calculateScore(props.form.baseStatistics.speed));

function calculateScore(baseStatistic: number): number {
  if (baseStatistic < 45) {
    return Math.floor(baseStatistic / 15) - 3;
  } else if (baseStatistic < 105) {
    return Math.floor((baseStatistic - 45) / 10);
  } else if (baseStatistic < 125) {
    return +6;
  } else if (baseStatistic < 145) {
    return +7;
  } else {
    return +8;
  }
}

// TODO(fpion): change the labels for the real attributes
</script>
