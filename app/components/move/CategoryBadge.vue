<template>
  <TarImage :alt="$t('pokemon.moves.category.alt', { category })" :height="height" :src="src" />&nbsp;{{ $t(`pokemon.moves.category.options.${category}`) }}
</template>

<script setup lang="ts">
import type { MoveCategory } from "~/types/pokemon";

const props = withDefaults(
  defineProps<{
    category: MoveCategory;
    height?: number | string;
  }>(),
  {
    height: 24,
  },
);

const src = computed<string>(() => `/img/moves/${props.category.toLowerCase()}.png`);
</script>
