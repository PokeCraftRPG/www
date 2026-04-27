<template>
  <TarCard :class="classes">
    <div class="d-flex justify-content-between align-items-start gap-3">
      <div class="text-start">
        <h5 class="card-title">{{ title }}</h5>
        <h3 class="card-subtitle h6 mb-2 text-body-secondary">
          <FormKindBadge :kind="form.kind" />
        </h3>
      </div>
      <div class="text-end">
        <TarImage :alt="$t('pokemon.sprite.alt', { name: title })" :src="src" width="100" />
      </div>
    </div>
  </TarCard>
</template>

<script setup lang="ts">
import { parsingUtils } from "logitar-js";

import type { Form } from "~/types/pokemon";

const config = useRuntimeConfig();
const { parseBoolean } = parsingUtils;

const props = defineProps<{
  form: Form;
  selected?: boolean | string;
}>();

const classes = computed<string[]>(() => {
  const classes: string[] = [];
  if (parseBoolean(props.selected)) {
    classes.push("selected");
  } else {
    classes.push("clickable");
  }
  return classes;
});
const src = computed<string>(() => config.public.imgSrcFormat.replace("{key}", props.form.key));
const title = computed<string>(() => props.form.name ?? props.form.key);
</script>
