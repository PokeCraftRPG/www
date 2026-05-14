<template>
  <TarSelect
    :disabled="disabled"
    floating
    :id="id"
    :label="$t(label)"
    :loading="loading"
    :model-value="modelValue"
    :options="options"
    :placeholder="$t(placeholder)"
    :required="required"
    @update:model-value="onModelValueUpdate"
  />
</template>

<script setup lang="ts">
import { arrayUtils } from "logitar-js";

import type { Move } from "~/types/pokemon";
import type { SelectOption } from "~/types/tar/select";

const { orderBy } = arrayUtils;

const props = withDefaults(
  defineProps<{
    disabled?: boolean | string;
    id?: string;
    label?: string;
    loading?: boolean | string;
    modelValue?: string;
    moves: Move[];
    placeholder?: string;
    required?: boolean | string;
  }>(),
  {
    id: "move",
    label: "pokemon.move.label",
    placeholder: "pokemon.move.placeholder",
  },
);

const emit = defineEmits<{
  (e: "selected", value: Move | undefined): void;
  (e: "update:model-value", value: string): void;
}>();

const options = computed<SelectOption[]>(() =>
  orderBy(
    props.moves.map(({ id, key, name }) => ({ text: name ?? key, value: id, sort: key })),
    "sort",
  ),
);

function onModelValueUpdate(id: string | undefined): void {
  emit("update:model-value", id ?? "");

  const selected: Move[] = props.moves.filter((move) => move.id === id);
  emit("selected", selected.length === 1 ? selected[0] : undefined);
}
</script>
