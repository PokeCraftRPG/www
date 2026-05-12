<template>
  <div class="row text-center">
    <div class="col-6 col-sm-4 col-xl-2 mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.constitution')">{{ $n(constitution, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.Aura')">{{ $n(aura, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.Swift')">{{ $n(swift, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.Brawn')">{{ $n(brawn, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.Tough')">{{ $n(tough, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-2 mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.statistic.options.Will')">{{ $n(will, "integer") }}</TarCard>
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

const aura = computed<number>(() => calculateAttribute(props.form.baseStatistics.specialAttack));
const brawn = computed<number>(() => calculateAttribute(props.form.baseStatistics.attack));
const constitution = computed<number>(() => calculateConstitution(props.form.baseStatistics.hp, props.sizeCategory, props.level));
const swift = computed<number>(() => calculateAttribute(props.form.baseStatistics.speed));
const tough = computed<number>(() => calculateAttribute(props.form.baseStatistics.defense));
const will = computed<number>(() => calculateAttribute(props.form.baseStatistics.specialDefense));
</script>
