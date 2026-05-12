<template>
  <div>
    <PokemonVitalityInput class="mb-3" :max="pokemon.constitutionTotal" :model-value="pokemon.vitality" @update:model-value="pokemon.setVitality">
      <template #append>
        <span class="input-group-text">/ {{ pokemon.constitutionTotal }}</span>
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
import type { Species } from "~/types/pokemon";

const pokemon = usePokemonStore();

const props = defineProps<{
  species: Species;
}>();

const difficulty = computed<number>(() => calculateCaptureDifficulty(props.species.catchRate, pokemon.level, pokemon.vitality, pokemon.constitutionTotal)); // TODO(fpion): refactor
</script>
