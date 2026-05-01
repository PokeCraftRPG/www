<template>
  <TarImage :alt="$t('pokemon.type.alt', { type })" :height="height" :src="src" />
</template>

<script setup lang="ts">
import { parsingUtils } from "logitar-js";

import type { PokemonType } from "~/types/pokemon";

const { parseBoolean } = parsingUtils;

const props = withDefaults(
  defineProps<{
    height?: number | string;
    tera?: boolean | string;
    type: PokemonType;
  }>(),
  {
    height: 24,
  },
);

const src = computed<string>(() =>
  parseBoolean(props.tera) ? `/img/types/tera/${props.type.toLowerCase()}.png` : `/img/types/${props.type.toLowerCase()}.png`,
);
</script>
