<template>
  <TarSelect
    :disabled="isLoading"
    floating
    :id="id"
    :label="$t(label)"
    :model-value="modelValue"
    :options="options"
    :placeholder="$t(placeholder)"
    :required="required"
    @update:model-value="onModelValueUpdate"
  />
</template>

<script setup lang="ts">
import { arrayUtils } from "logitar-js";

import type { SearchResults } from "~/types/search";
import type { SelectOption } from "~/types/tar/select";
import type { Species } from "~/types/pokemon";

const config = useRuntimeConfig();
const { orderBy } = arrayUtils;

withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: string;
    placeholder?: string;
    required?: boolean | string;
  }>(),
  {
    id: "species",
    label: "pokemon.species.label",
    placeholder: "pokemon.species.placeholder",
  },
);

const emit = defineEmits<{
  (e: "selected", value: Species | undefined): void;
  (e: "update:model-value", value: string): void;
}>();

const isLoading = ref<boolean>(false);
const species = ref<Species[]>([]);
const total = ref<number>(0);

const options = computed<SelectOption[]>(() =>
  orderBy(
    species.value.map(({ id, key, name }) => ({ text: name ?? key, value: id, sort: key })),
    "sort",
  ),
);

function onModelValueUpdate(id: string | undefined): void {
  emit("update:model-value", id ?? "");

  const selected: Species[] = species.value.filter((species) => species.id === id);
  emit("selected", selected.length === 1 ? selected[0] : undefined);
}

onMounted(async () => {
  try {
    const results = await $fetch<SearchResults<Species>>("/api/species", {
      baseURL: config.public.apiBaseUrl,
    });
    species.value = [...results.items];
    total.value = results.total;
  } catch (e: unknown) {
    console.error(e); // TODO(fpion): handle error
  }
});
</script>
