<template>
  <TarBadge pill :variant="variant"><font-awesome-icon :icon="icon" />&nbsp;{{ $t(`pokemon.forms.kind.options.${kind}`) }}</TarBadge>
</template>

<script setup lang="ts">
import type { BadgeVariant } from "~/types/tar/badge";
import type { FormKind } from "~/types/pokemon";

const props = defineProps<{
  kind: FormKind;
}>();

const icon = computed<string>(() => {
  switch (props.kind) {
    case "Alternative":
      return "fas fa-circle";
    case "BattleOnly":
      return "fas fa-hand-fist";
    case "Mega":
      return "fas fa-angles-up";
  }
  return "fas fa-check";
});
const variant = computed<BadgeVariant>(() => {
  switch (props.kind) {
    case "Alternative":
      return "secondary";
    case "BattleOnly":
      return "danger";
    case "Mega":
      return "warning";
  }
  return "primary";
});
</script>
