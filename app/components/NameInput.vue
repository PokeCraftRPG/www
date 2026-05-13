<template>
  <TarInput
    floating
    :id="id"
    :label="$t(label)"
    :min="min"
    :max="max"
    :model-value="modelValue"
    :placeholder="$t(label)"
    :required="required"
    :status="status"
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
    modelValue?: string;
    required?: boolean | string;
  }>(),
  {
    id: "name",
    label: "name",
  },
);

const emit = defineEmits<{
  (e: "update:model-value", value: string): void;
}>();

const touched = ref<boolean>(false);

const maximum = computed<number | undefined>(() => parseNumber(props.max));
const minimum = computed<number | undefined>(() => parseNumber(props.min));
const value = computed<string>(() => props.modelValue ?? "");

const errors = computed<string[]>(() => {
  const errors: string[] = [];
  if (typeof minimum.value === "number" && value.value.length < minimum.value) {
    errors.push("min");
  }
  if (typeof maximum.value === "number" && value.value.length > maximum.value) {
    errors.push("max");
  }
  return errors;
});
const isValid = computed<boolean>(() => !errors.value.length);
const status = computed<InputStatus | undefined>(() => (touched.value ? (isValid.value ? "valid" : "invalid") : undefined));

function onModelValueUpdate(value: string | undefined): void {
  touched.value = true;
  emit("update:model-value", value ?? "");
}
</script>
