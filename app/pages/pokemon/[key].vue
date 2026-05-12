<template>
  <main class="container">
    <template v-if="species">
      <div class="d-flex align-items-center gap-3">
        <h1>#{{ species.number }} {{ "–" }} {{ title }}</h1>
        <div class="h3">
          <SpeciesCategoryBadge v-if="species.category !== 'Standard'" :category="species.category" />
        </div>
      </div>
      <template v-if="varieties.length > 1">
        <h2 class="h3">{{ $t("pokemon.varieties.title") }}</h2>
        <div class="row">
          <div v-for="item in varieties" :key="item.id" :class="varietyClasses">
            <VarietyCard class="d-flex flex-column h-100" :selected="variety?.id === item.id" :variety="item" @click="pokemon.setVariety(item)" />
          </div>
        </div>
      </template>
      <template v-if="forms.length > 1">
        <h2 class="h3">{{ $t("pokemon.forms.title") }}</h2>
        <div class="row">
          <div v-for="item in forms" :key="item.id" :class="formClasses">
            <FormCard class="d-flex flex-column h-100" :selected="form?.id === item.id" :form="item" @click="pokemon.setForm(item)" />
          </div>
        </div>
      </template>
      <template v-if="variety && form">
        <h2 class="h3">{{ variety.genus ? $t("pokemon.varieties.genus.format", { genus: variety.genus }) : $t("pokemon.details") }}</h2>
        <p v-if="variety.description">{{ variety.description }}</p>
        <div class="row">
          <PokemonSizeCategorySelect class="col-sm-6 mb-3" :model-value="pokemon.sizeCategory" @update:model-value="pokemon.setSizeCategory" />
          <PokemonLevelInput class="col-sm-6 mb-3" :model-value="pokemon.level" @update:model-value="pokemon.setLevel" />
        </div>
        <PokemonDetail />
        <h3 class="h5">{{ $t("pokemon.attribute.title") }}</h3>
        <PokemonAttributes />
        <h3 class="h5">{{ $t("pokemon.constitution.label") }}</h3>
        <PokemonConstitution />
        <h3 class="h5">{{ $t("pokemon.capture.title") }}</h3>
        <PokemonCapture />
        <template v-if="variety.moves.length">
          <h3 class="h5">{{ $t("pokemon.moves.title") }}</h3>
          <PokemonMoves />
        </template>
        <h3 class="h5">{{ $t("pokemon.sprite.title") }}</h3>
        <PokemonSprites />
      </template>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { Form, Species, Variety } from "~/types/pokemon";

const config = useRuntimeConfig();
const pokemon = usePokemonStore();
const route = useRoute();

const key = computed<string>(() => (Array.isArray(route.params.key) ? route.params.key[0] : route.params.key) ?? "");
const { data } = await useAsyncData(
  `pokemon:${key.value}`,
  () =>
    $fetch(`/api/species/key:${key.value}?expand=true`, {
      baseURL: config.public.apiBaseUrl,
    }),
  {
    watch: [key],
  },
);
const species = computed<Species | undefined>(() => pokemon.species);
const title = computed<string>(() => (species.value ? (species.value.name ?? species.value.key) : ""));
const varieties = computed<Variety[]>(() => species.value?.varieties ?? []);
const variety = computed<Variety | undefined>(() => pokemon.variety);
const form = computed<Form | undefined>(() => pokemon.form);
const forms = computed<Form[]>(() => variety.value?.forms ?? []);

const formClasses = computed<string[]>(() => {
  const classes: string[] = ["mb-3", "col-sm-12", "col-md-6"];
  if (forms.value.length > 3) {
    classes.push("col-lg-4");
  }
  if (forms.value.length > 4) {
    classes.push("col-xl-3");
  }
  return classes;
});
const varietyClasses = computed<string[]>(() => {
  const classes: string[] = ["mb-3", "col-sm-12", "col-md-6"];
  if (varieties.value.length > 3) {
    classes.push("col-lg-4");
  }
  if (varieties.value.length > 4) {
    classes.push("col-xl-3");
  }
  return classes;
});

watch(data, (data) => pokemon.setSpecies(data as Species), { immediate: true });

useSeo({ title });
</script>
