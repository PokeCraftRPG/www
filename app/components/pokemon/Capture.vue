<template>
  <div v-if="pokemon.species">
    <PokemonVitalityInput class="mb-3" :max="pokemon.constitutionTotal" :model-value="pokemon.vitality" @update:model-value="pokemon.setVitality">
      <template #append>
        <span class="input-group-text">/ {{ pokemon.constitutionTotal }}</span>
      </template>
    </PokemonVitalityInput>
    <div class="row text-center">
      <div class="col-sm-6 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.capture.difficulty')">{{ $n(pokemon.captureDifficulty, "integer") }}</TarCard>
      </div>
      <div class="col-sm-6 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.friendship.base')">{{ $n(pokemon.species.baseFriendship * 0.4, "integer") }}</TarCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const pokemon = usePokemonStore();
</script>
