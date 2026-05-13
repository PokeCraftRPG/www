<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="`heading_${itemId}`">
      <button
        :class="{ 'accordion-button': true, collapsed: !parseBoolean(active) }"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapse_${itemId}`"
        aria-expanded="true"
        :aria-controls="`collapse_${itemId}`"
      >
        {{ title }}
      </button>
    </h2>
    <div
      :id="`collapse_${itemId}`"
      :class="{ 'accordion-collapse': true, collapse: true, show: parseBoolean(active) }"
      :aria-labelledby="`heading_${itemId}`"
      :data-bs-parent="parent"
    >
      <div class="accordion-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from "vue";
import { nanoid } from "nanoid";
import { parsingUtils } from "logitar-js";

const { parseBoolean } = parsingUtils;

import { bindItemKey, unbindItemKey, type AccordionItem } from "~/types/tar/accordion";

const bindItem: ((id: string, setParentId: (value?: string) => void) => void) | undefined = inject(bindItemKey);
const unbindItem: ((id: string) => void) | undefined = inject(unbindItemKey);

const props = defineProps<AccordionItem>();
const parent = ref<string>();

const itemId = computed<string>(() => props.id ?? nanoid());

function setParentId(value?: string): void {
  parent.value = value ? `#${value}` : undefined;
}
onMounted(() => {
  if (bindItem) {
    bindItem(itemId.value, setParentId);
  }
});
onUnmounted(() => {
  if (unbindItem) {
    unbindItem(itemId.value);
  }
});
</script>
