<template>
  <TarImage :alt="$t('pokemon.type.alt', { type })" height="24" :src="src" />
</template>

<script setup lang="ts">
import { parsingUtils } from "logitar-js";

import type { PokemonType } from "~/types/pokemon";

const { parseBoolean } = parsingUtils;

const props = defineProps<{
  tera?: boolean | string;
  type: PokemonType;
}>();

const src = computed<string>(() =>
  parseBoolean(props.tera) ? `/img/types/tera/${props.type.toLowerCase()}.png` : `/img/types/${props.type.toLowerCase()}.png`,
);
</script>

<style></style>
