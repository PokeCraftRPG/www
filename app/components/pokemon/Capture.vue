<template>
  <div>
    <PokemonVitalityInput class="mb-3" id="current-vitality" :max="vitality" v-model="currentVitality">
      <template #append>
        <span class="input-group-text">/ {{ vitality }}</span>
      </template>
    </PokemonVitalityInput>
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
import type { Form, Species } from "~/types/pokemon";
import { usePokemonStore } from "~/stores/pokemon";

const pokemon = usePokemonStore();

const props = defineProps<{
  form: Form;
  species: Species;
  vitality: number;
}>();

const currentVitality = ref<number>(0);

const difficulty = computed<number>(() => calculateCaptureDifficulty(props.species.catchRate, pokemon.level, currentVitality.value, props.vitality));

watch(
  () => props.vitality,
  (maximumVitality) => (currentVitality.value = maximumVitality),
  { immediate: true },
);
</script>
