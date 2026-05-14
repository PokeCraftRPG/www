<template>
  <TarInput
    floating
    :id="id"
    :label="$t(label)"
    :min="min"
    :max="max"
    :model-value="modelValue?.toString()"
    :placeholder="$t(label)"
    :required="required"
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
    required?: boolean | string;
  }>(),
  {
    id: "attack",
    label: "pokemon.battle.statistic.attack",
    min: 1,
  },
);

const emit = defineEmits<{
  (e: "update:model-value", value: number): void;
}>();

const touched = ref<boolean>(false);

const maximum = computed<number | undefined>(() => parseNumber(props.max));
const minimum = computed<number | undefined>(() => parseNumber(props.min));
const value = computed<number>(() => parseNumber(props.modelValue) ?? 0);

const errors = computed<string[]>(() => {
  const errors: string[] = [];
  if (typeof minimum.value === "number" && value.value < minimum.value) {
    errors.push("min");
  }
  if (typeof maximum.value === "number" && value.value > maximum.value) {
    errors.push("max");
  }
  return errors;
});
const isValid = computed<boolean>(() => !errors.value.length);
const status = computed<InputStatus | undefined>(() => (touched.value ? (isValid.value ? "valid" : "invalid") : undefined));

function onModelValueUpdate(value: string | undefined): void {
  touched.value = true;
  emit("update:model-value", parseNumber(value) ?? 0);
}
</script>
