<template>
  <div>
    <div class="row">
      <PokemonBonusInput class="col-sm-6 mb-3" :model-value="pokemon.constitutionBonus" @update:model-value="pokemon.setConstitutionBonus" />
      <div class="col-sm-6 mb-3">
        <TarCheckbox
          :label="$t('pokemon.hyperTraining')"
          :model-value="pokemon.isConstitutionHyperTrained"
          switch
          @update:model-value="pokemon.setConstitutionHyperTrained"
        />
      </div>
    </div>
    <div class="row text-center">
      <div class="col-sm-4 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.constitution.base')">{{ $n(pokemon.constitutionBase, "integer") }}</TarCard>
      </div>
      <div class="col-6 col-sm-4 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.vitality')">{{ $n(pokemon.constitutionTotal, "integer") }}</TarCard>
      </div>
      <div class="col-6 col-sm-4 mb-3">
        <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.stamina')">{{ $n(pokemon.constitutionTotal, "integer") }}</TarCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const pokemon = usePokemonStore();
</script>
