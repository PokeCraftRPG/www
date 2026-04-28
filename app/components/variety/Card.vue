<template>
  <TarCard :class="classes">
    <div class="d-flex justify-content-between align-items-start gap-3">
      <div class="text-start">
        <h5 class="card-title">{{ title }}</h5>
        <h3 v-if="variety.isDefault" class="card-subtitle h6 mb-2 text-body-secondary">
          <TarBadge pill variant="primary"><font-awesome-icon icon="fas fa-check" />&nbsp;{{ $t("pokemon.varieties.isDefault") }}</TarBadge>
        </h3>
        <TarBadge v-if="variety.canChangeForm" pill variant="secondary">
          <font-awesome-icon icon="fas fa-mask" />&nbsp;{{ $t("pokemon.varieties.canChangeForm") }}
        </TarBadge>
      </div>
      <div class="text-end">
        <TarImage :alt="alt" :src="src" width="100" />
      </div>
    </div>
  </TarCard>
</template>

<script setup lang="ts">
import { parsingUtils } from "logitar-js";

import type { Form, Variety } from "~/types/pokemon";

const config = useRuntimeConfig();
const { parseBoolean } = parsingUtils;

const props = defineProps<{
  selected?: boolean | string;
  variety: Variety;
}>();

const alt = computed<string>(() => (defaultForm.value ? $t("pokemon.sprite.alt", { name: defaultForm.value.name ?? defaultForm.value.key }) : ""));
const classes = computed<string[]>(() => {
  const classes: string[] = [];
  if (parseBoolean(props.selected)) {
    classes.push("selected");
  } else {
    classes.push("clickable");
  }
  return classes;
});
const defaultForm = computed<Form | undefined>(() => sortForms(props.variety.forms)[0]);
const src = computed<string>(() => (defaultForm.value ? config.public.imgSrcFormat.replace("{key}", defaultForm.value.key) : ""));
const title = computed<string>(() => props.variety.name ?? props.variety.key);
</script>
