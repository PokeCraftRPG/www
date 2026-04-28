<template>
  <TarInput
    floating
    :id="id"
    :label="$t(label)"
    :min="min"
    :max="max"
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

const props = withDefaults(
  defineProps<{
    id?: string;
    label?: string;
    max?: number | string;
    min?: number | string;
    modelValue?: number | string;
  }>(),
  {
    id: "vitality",
    label: "pokemon.vitality.label",
    min: 0,
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
    const parsed: number = parseNumber(value) ?? 0;
    const minimum: number = parseNumber(props.min) ?? 0;
    const maximum: number = parseNumber(props.max) ?? 0;
    status.value = (minimum < 0 || parsed >= minimum) && (maximum < minimum || parsed <= maximum) ? "valid" : "invalid";
    emit("update:model-value", parsed);
  }
}
</script>
