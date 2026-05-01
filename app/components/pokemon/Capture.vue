<template>
  <div>
    <div class="row">
      <PokemonVitalityInput class="col-sm-6 mb-3" id="current-vitality" label="pokemon.vitality.current" :max="maximumVitality" v-model="currentVitality" />
      <PokemonVitalityInput class="col-sm-6 mb-3" id="maximum-vitality" label="pokemon.vitality.maximum" v-model="maximumVitality" />
    </div>
    <div class="row text-center">
      <div class="col-sm-6 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.capture.difficulty')">{{ $n(difficulty, "integer") }}</TarCard>
      </div>
      <div class="col-sm-6 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.capture.baseFriendship')">{{ $n(species.baseFriendship * 0.4, "integer") }}</TarCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Form, SizeCategory, Species } from "~/types/pokemon";

const props = defineProps<{
  form: Form;
  level: number;
  sizeCategory: SizeCategory;
  species: Species;
}>();

const currentVitality = ref<number>(0);
const maximumVitality = ref<number>(0);

const constitution = computed<number>(() => calculateConstitution(props.form.baseStatistics.hp, props.sizeCategory, props.level));
const difficulty = computed<number>(() => calculateCaptureDifficulty(props.species.catchRate, props.level, currentVitality.value, maximumVitality.value));

watch(constitution, (constitution) => (currentVitality.value = maximumVitality.value = constitution), { immediate: true });
</script>
