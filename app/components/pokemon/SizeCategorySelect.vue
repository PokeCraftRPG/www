<template>
  <TarSelect
    floating
    :id="id"
    :label="$t(label)"
    :model-value="modelValue"
    :options="options"
    :placeholder="$t(placeholder)"
    @update:model-value="onModelValueUpdate"
  />
</template>

<script setup lang="ts">
import type { SelectOption } from "~/types/tar/select";
import type { SizeCategory } from "~/types/pokemon";

withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: SizeCategory;
    placeholder?: string;
  }>(),
  {
    id: "size-category",
    label: "pokemon.size.category.label",
    placeholder: "pokemon.size.category.placeholder",
  },
);

const emit = defineEmits<{
  (e: "update:model-value", value?: SizeCategory): void;
}>();

const options = computed<SelectOption[]>(() => [
  {
    text: $t("pokemon.size.category.options.ExtraSmall"),
    value: "ExtraSmall",
  },
  {
    text: $t("pokemon.size.category.options.Small"),
    value: "Small",
  },
  {
    text: $t("pokemon.size.category.options.Medium"),
    value: "Medium",
  },
  {
    text: $t("pokemon.size.category.options.Large"),
    value: "Large",
  },
  {
    text: $t("pokemon.size.category.options.ExtraLarge"),
    value: "ExtraLarge",
  },
]);

function onModelValueUpdate(value?: string): void {
  emit("update:model-value", value ? (value as SizeCategory) : undefined);
}
</script>
