<template>
  <TarInput
    floating
    :id="id"
    :label="$t(label)"
    min="1"
    max="100"
    :model-value="modelValue?.toString()"
    :placeholder="$t(label)"
    required
    :status="status"
    step="1"
    type="number"
    @update:model-value="onModelValueUpdate"
  />
</template>

<script setup lang="ts">
import { parsingUtils } from "logitar-js";

import type { InputStatus } from "~/types/tar/input";

const { parseNumber } = parsingUtils;

withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    modelValue?: number | string;
  }>(),
  {
    id: "level",
    label: "pokemon.level.label",
  },
);

const emit = defineEmits<{
  (e: "update:model-value", value: number | undefined): void;
}>();

const status = ref<InputStatus>();

function onModelValueUpdate(value?: string): void {
  if (typeof value === "undefined" || value === "") {
    status.value = undefined;
    emit("update:model-value", 0);
  } else {
    const level: number = parseNumber(value) ?? 0;
    status.value = level > 0 && level <= 100 ? "valid" : "invalid";
    emit("update:model-value", level);
  }
}
</script>
