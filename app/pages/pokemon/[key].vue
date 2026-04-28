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
            <VarietyCard class="d-flex flex-column h-100" :selected="variety?.id === item.id" :variety="item" @click="selectVariety(item)" />
          </div>
        </div>
      </template>
      <template v-if="forms.length > 1">
        <h2 class="h3">{{ $t("pokemon.forms.title") }}</h2>
        <div class="row">
          <div v-for="item in forms" :key="item.id" :class="formClasses">
            <FormCard class="d-flex flex-column h-100" :selected="form?.id === item.id" :form="item" @click="selectForm(item)" />
          </div>
        </div>
      </template>
      <template v-if="variety && form">
        <h2 class="h3">{{ variety.genus ? $t("pokemon.varieties.genus.format", { genus: variety.genus }) : $t("pokemon.details") }}</h2>
        <p v-if="variety.description">{{ variety.description }}</p>
        <div class="mb-4 row">
          <PokemonSizeCategorySelect class="col" v-model="sizeCategory" />
          <PokemonLevelInput class="col" v-model="level" />
        </div>
        <PokemonDetail :form="form" :level="level" :size-category="sizeCategory" :species="species" :variety="variety" />
        <h3 class="h5">{{ $t("pokemon.attributes.title") }}</h3>
        <PokemonAttributes :form="form" />
        <h3 class="h5">{{ $t("pokemon.capture.title") }}</h3>
        <PokemonCapture :form="form" :level="level" :size-category="sizeCategory" :species="species" />
      </template>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { Form, SizeCategory, Species, Variety } from "~/types/pokemon";

const config = useRuntimeConfig();
const route = useRoute();

const form = ref<Form | undefined>();
const forms = ref<Form[]>([]);
const level = ref<number>(1);
const sizeCategory = ref<SizeCategory>("Medium");
const variety = ref<Variety | undefined>();

const key = computed<string>(() => (Array.isArray(route.params.key) ? route.params.key[0] : route.params.key) ?? "");
const { data } = await useAsyncData(
  `pokemon:${key.value}`,
  async () => {
    const species = (await $fetch(`/api/species/key:${key.value}?expand=true`, {
      baseURL: config.public.apiBaseUrl,
    })) as Species;
    const varieties: Variety[] = sortVarieties(species.varieties);
    return { species, varieties };
  },
  {
    watch: [key],
  },
);
const species = computed<Species | undefined>(() => data.value?.species);
const title = computed<string>(() => (species.value ? (species.value.name ?? species.value.key) : ""));
const varieties = computed<Variety[]>(() => data.value?.varieties ?? []);

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

function selectForm(selected: Form): void {
  if (form.value?.id !== selected.id) {
    form.value = selected;
  }
}
function selectVariety(selected: Variety): void {
  if (variety.value?.id !== selected.id) {
    variety.value = selected;
    forms.value = sortForms(selected.forms);
    form.value = forms.value[0];
  }
}

watch(
  data,
  (data) => {
    const defaultVariety: Variety | undefined = data?.varieties[0];
    if (defaultVariety) {
      selectVariety(defaultVariety);
    } else {
      form.value = undefined;
      forms.value = [];
      variety.value = undefined;
    }
  },
  { deep: true, immediate: true },
);

/* TODO(fpion):
 * moves
 * hasGenderDifferences & sprites
 */

useSeo({ title });
</script>
