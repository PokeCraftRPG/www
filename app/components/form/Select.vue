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
import type { Form } from "~/types/pokemon";
import type { SearchResults } from "~/types/search";
import type { SelectOption } from "~/types/tar/select";

const config = useRuntimeConfig();

const props = withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: string;
    placeholder?: string;
    required?: boolean | string;
    variety?: string;
  }>(),
  {
    id: "form",
    label: "pokemon.form.label",
    placeholder: "pokemon.form.placeholder",
  },
);

const emit = defineEmits<{
  (e: "selected", value: Form | undefined): void;
  (e: "update:model-value", value: string): void;
}>();

const forms = ref<Form[]>([]);
const isLoading = ref<boolean>(false);
const total = ref<number>(0);

const options = computed<SelectOption[]>(() => sortForms(forms.value).map(({ id, key, name }) => ({ text: name ?? key, value: id, sort: key })));

function onModelValueUpdate(id: string | undefined): void {
  emit("update:model-value", id ?? "");

  const selected: Form[] = forms.value.filter((form) => form.id === id);
  emit("selected", selected.length === 1 ? selected[0] : undefined);
}

watch(
  () => props.variety,
  async (variety) => {
    if (variety) {
      const results = await $fetch<SearchResults<Form>>("/api/forms", {
        query: { variety },
        baseURL: config.public.apiBaseUrl,
      });
      forms.value = [...results.items];
      total.value = results.total;

      const selected: Form | undefined = sortForms(results.items)[0];
      emit("update:model-value", selected ? selected.id : "");
      emit("selected", selected);
    } else {
      forms.value = [];
      total.value = 0;
    }
  },
  { immediate: true },
);
</script>
