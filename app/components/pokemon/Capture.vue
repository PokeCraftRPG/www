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
import type { Form, SizeCategory, Species } from "~/types/pokemon";

const props = defineProps<{
  form: Form;
  level: number;
  sizeCategory: SizeCategory;
  species: Species;
  vitality: number;
}>();

const currentVitality = ref<number>(0);

const constitution = computed<number>(() => calculateConstitution(props.form.baseStatistics.hp, props.sizeCategory, props.level));
const difficulty = computed<number>(() => calculateCaptureDifficulty(props.species.catchRate, props.level, currentVitality.value, props.vitality));

watch(constitution, (constitution) => (currentVitality.value = constitution), { immediate: true });
</script>
