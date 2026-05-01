<template>
  <TarCard :class="classes">
    <div class="d-flex justify-content-between align-items-start gap-3">
      <div class="text-start">
        <h5 class="card-title">{{ form.name ?? form.key }}</h5>
        <h3 class="card-subtitle h6 mb-2 text-body-secondary">
          <FormKindBadge :kind="form.kind" />
        </h3>
      </div>
      <div class="text-end">
        <PokemonSprite :form="form" width="100" />
      </div>
    </div>
  </TarCard>
</template>

<script setup lang="ts">
import { parsingUtils } from "logitar-js";

import type { Form } from "~/types/pokemon";

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
</script>
