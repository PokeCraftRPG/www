<template>
  <TarInput
    floating
    :id="id"
    :label="$t(label)"
    :min="min"
    :max="max"
    :model-value="modelValue?.toString()"
    :placeholder="$t(label)"
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
    id: "bonus",
    label: "pokemon.bonus",
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
    const minimum: number | undefined = parseNumber(props.min);
    const maximum: number | undefined = parseNumber(props.max);
    status.value = (typeof minimum === "undefined" || parsed >= minimum) && (typeof maximum === "undefined" || parsed <= maximum) ? "valid" : "invalid";
    emit("update:model-value", parsed);
  }
}
</script>
