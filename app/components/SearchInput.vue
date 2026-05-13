<template>
  <TarInput
    floating
    :id="id"
    :label="$t(label)"
    :model-value="modelValue"
    :placeholder="$t(label)"
    type="search"
    @update:model-value="$emit('update:model-value', $event ?? '')"
  />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: string;
  }>(),
  {
    id: "search",
    label: "search",
  },
);

defineEmits<{
  (e: "update:model-value", value: string): void;
}>();
</script>
