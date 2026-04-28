<template>
  <div>
    <div class="mb-4 row">
      <PokemonVitalityInput class="col" id="current-vitality" label="pokemon.vitality.current" :max="maximumVitality" v-model="currentVitality" />
      <PokemonVitalityInput class="col" id="maximum-vitality" label="pokemon.vitality.maximum" v-model="maximumVitality" />
    </div>
    <table class="table table-striped text-center">
      <tbody>
        <tr>
          <th scope="row" class="w-50">{{ $t("pokemon.capture.difficulty") }}</th>
          <td class="w-50">{{ $n(difficulty, "integer") }}</td>
        </tr>
        <tr>
          <th scope="row">{{ $t("pokemon.capture.baseFriendship") }}</th>
          <td>{{ $n(species.baseFriendship, "integer") }}</td>
        </tr>
      </tbody>
    </table>
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

const level = computed<number>(() => (props.level < 1 ? 1 : props.level > 100 ? 100 : props.level));

const baseConstitution = computed<number>(() => {
  console.log(props.form.baseStatistics.hp);
  let value: number = 0;
  if (props.form.baseStatistics.hp >= 255) {
    value = 260;
  } else if (props.form.baseStatistics.hp > 10) {
    value = Math.round(((props.form.baseStatistics.hp - 10) / 245) * 260);
  }
  return value + 40;
});
const sizeBonus = computed<number>(() => {
  switch (props.sizeCategory) {
    case "ExtraSmall":
      return -20;
    case "Small":
      return -10;
    case "Large":
      return +10;
    case "ExtraLarge":
      return +20;
  }
  return 0;
});
const constitution = computed<number>(() => Math.floor(((baseConstitution.value + sizeBonus.value) * level.value) / 100) + Math.floor(level.value / 2) + 5);

const difficulty = computed<number>(() => {
  let difficulty: number = 5;

  // Catch Rate Part
  if (props.species.catchRate <= 5) {
    difficulty = 30;
  } else if (props.species.catchRate <= 255) {
    difficulty += Math.floor((255 - props.species.catchRate) / 10);
  }

  // Level Part
  if (level.value >= 50) {
    difficulty += 10;
  } else if (level.value >= 5) {
    difficulty += Math.floor(level.value / 5);
  }

  // HP Part
  if (currentVitality.value >= maximumVitality.value) {
    difficulty += 10;
  } else if (currentVitality.value >= 0) {
    difficulty += Math.floor((currentVitality.value / maximumVitality.value) * 10);
  }

  return difficulty;
});

watch(constitution, (constitution) => (currentVitality.value = maximumVitality.value = constitution), { immediate: true });
</script>
