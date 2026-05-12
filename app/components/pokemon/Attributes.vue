<template>
  <div class="row text-center">
    <div class="col-6 col-sm-4 col-xl-fifth mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.attribute.options.Aura')">{{ $n(aura, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-fifth mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.attribute.options.Swift')">{{ $n(swift, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-fifth mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.attribute.options.Brawn')">{{ $n(brawn, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-fifth mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.attribute.options.Tough')">{{ $n(tough, "integer") }}</TarCard>
    </div>
    <div class="col-6 col-sm-4 col-xl-fifth mb-3">
      <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.attribute.options.Will')">{{ $n(will, "integer") }}</TarCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const pokemon = usePokemonStore();

const aura = computed<number>(() => calculateAttribute(pokemon.form?.baseStatistics.specialAttack ?? 0));
const brawn = computed<number>(() => calculateAttribute(pokemon.form?.baseStatistics.attack ?? 0));
const swift = computed<number>(() => calculateAttribute(pokemon.form?.baseStatistics.speed ?? 0));
const tough = computed<number>(() => calculateAttribute(pokemon.form?.baseStatistics.defense ?? 0));
const will = computed<number>(() => calculateAttribute(pokemon.form?.baseStatistics.specialDefense ?? 0));
</script>
