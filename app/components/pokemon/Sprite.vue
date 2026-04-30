<template>
  <TarImage :alt="alt" :src="src" :width="width" />
</template>

<script setup lang="ts">
import { parsingUtils } from "logitar-js";

import type { Form } from "~/types/pokemon";

const config = useRuntimeConfig();
const { parseBoolean } = parsingUtils;

const props = defineProps<{
  female?: boolean | string;
  form: Form;
  shiny?: boolean | string;
  width?: number | string;
}>();

const alt = computed<string>(() => $t("pokemon.sprite.alt", { name: props.form.name ?? props.form.key }));
const src = computed<string>(() => {
  const key: string[] = [props.form.key];
  if (parseBoolean(props.female)) {
    key.push("female");
  }
  if (parseBoolean(props.shiny)) {
    key.push("shiny");
  }
  return config.public.imgSrcFormat.replace("{key}", key.join("-"));
});
</script>
