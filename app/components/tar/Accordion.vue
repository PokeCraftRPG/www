<template>
  <div :class="classes" :id="id">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import { parsingUtils } from "logitar-js";

import { bindItemKey, unbindItemKey, type AccordionOptions } from "~/types/tar/accordion";

const { parseBoolean } = parsingUtils;

const props = withDefaults(defineProps<AccordionOptions>(), {
  id: "accordion",
});

const items = ref<Map<string, (value?: string) => void>>(new Map<string, (value?: string) => void>());

const classes = computed<string[]>(() => {
  const classes = ["accordion"];
  if (parseBoolean(props.flush)) {
    classes.push("accordion-flush");
  }
  return classes;
});

function bindItem(id: string, setParentId: (value?: string) => void): void {
  items.value.set(id, setParentId);
  if (!props.alwaysOpen) {
    setParentId(props.id);
  }
}
function unbindItem(id: string): void {
  items.value.delete(id);
}
provide(bindItemKey, bindItem);
provide(unbindItemKey, unbindItem);

watch(
  () => props.alwaysOpen,
  (alwaysOpen) => {
    if (parseBoolean(alwaysOpen)) {
      for (const setParentId of items.value.values()) {
        setParentId(undefined);
      }
    } else {
      for (const setParentId of items.value.values()) {
        setParentId(props.id);
      }
    }
  },
);
watch(
  () => props.id,
  (id) => {
    if (!parseBoolean(props.alwaysOpen)) {
      for (const setParentId of items.value.values()) {
        setParentId(id);
      }
    }
  },
);
</script>
