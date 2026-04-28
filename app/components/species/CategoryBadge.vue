<template>
  <TarBadge pill variant="secondary">
    <template v-if="icon"><font-awesome-icon :icon="icon" />&nbsp;</template>{{ $t(`pokemon.category.options.${category}`) }}
  </TarBadge>
</template>

<script setup lang="ts">
import type { SpeciesCategory } from "~/types/pokemon";

const props = defineProps<{
  category: SpeciesCategory;
}>();

const icon = computed<string>(() => {
  switch (props.category) {
    case "Baby":
      return "fas fa-baby";
    case "Legendary":
      return "fas fa-dragon";
    case "Mythical":
      return "fas fa-meteor";
  }
  return "";
});
</script>
