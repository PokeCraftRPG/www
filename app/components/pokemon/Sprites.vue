<template>
  <div v-if="pokemon.form" class="sprites mx-auto">
    <div class="row align-items-center mb-3">
      <div class="col text-start">
        <TarCheckbox id="shiny" :label="$t('pokemon.shiny')" switch v-model="shiny" />
      </div>
      <div v-if="pokemon.form.hasGenderDifferences" class="col text-end">
        <div class="btn-group" role="group">
          <input class="btn-check" type="radio" name="gender" id="male" autocomplete="off" value="Male" v-model="gender" />
          <label class="btn btn-primary btn-sm" for="male"><font-awesome-icon icon="fas fa-mars" />&nbsp;{{ $t("pokemon.gender.male") }}</label>
          <input class="btn-check" type="radio" name="gender" id="female" autocomplete="off" value="Female" v-model="gender" />
          <label class="btn btn-primary btn-sm" for="female"><font-awesome-icon icon="fas fa-venus" />&nbsp;{{ $t("pokemon.gender.female") }}</label>
        </div>
      </div>
    </div>
    <PokemonSprite :female="female" :form="pokemon.form" :shiny="shiny" />
  </div>
</template>

<script setup lang="ts">
import type { PokemonGender } from "~/types/pokemon";

const pokemon = usePokemonStore();

const gender = ref<PokemonGender>("Male");
const shiny = ref<boolean>(false);

const female = computed<boolean>(() => (pokemon.form?.hasGenderDifferences ?? false) && gender.value === "Female");
</script>

<style scoped>
.sprites {
  max-width: min(512px, 100%);
}
.sprites :deep(img) {
  width: 100%;
  height: auto;
}
</style>
