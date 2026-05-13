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
import type { SearchResults } from "~/types/search";
import type { SelectOption } from "~/types/tar/select";
import type { Variety } from "~/types/pokemon";

const config = useRuntimeConfig();

const props = withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: string;
    placeholder?: string;
    required?: boolean | string;
    species?: string;
  }>(),
  {
    id: "variety",
    label: "pokemon.variety.label",
    placeholder: "pokemon.variety.placeholder",
  },
);

const emit = defineEmits<{
  (e: "selected", value: Variety | undefined): void;
  (e: "update:model-value", value: string): void;
}>();

const isLoading = ref<boolean>(false);
const total = ref<number>(0);
const varieties = ref<Variety[]>([]);

const options = computed<SelectOption[]>(() => sortVarieties(varieties.value).map(({ id, key, name }) => ({ text: name ?? key, value: id })));

function onModelValueUpdate(id: string | undefined): void {
  emit("update:model-value", id ?? "");

  const selected: Variety[] = varieties.value.filter((variety) => variety.id === id);
  emit("selected", selected.length === 1 ? selected[0] : undefined);
}

watch(
  () => props.species,
  async (species) => {
    if (species) {
      const results = await $fetch<SearchResults<Variety>>("/api/varieties", {
        query: { species },
        baseURL: config.public.apiBaseUrl,
      });
      varieties.value = [...results.items];
      total.value = results.total;

      const selected: Variety | undefined = sortVarieties(results.items)[0];
      emit("update:model-value", selected ? selected.id : "");
      emit("selected", selected);
    } else {
      varieties.value = [];
      total.value = 0;
    }
  },
  { immediate: true },
);
</script>
