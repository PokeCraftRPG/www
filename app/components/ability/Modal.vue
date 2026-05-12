<template>
  <TarModal centered :close="$t('actions.close')" fade ref="modalRef" :title="$t('pokemon.abilities.format', { ability: ability.name ?? ability.key })">
    <p v-if="ability.description">{{ ability.description }}</p>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <NuxtLink :to="`/abilities/${ability.key}`" @click="close()">{{ $t("pokemon.abilities.details") }}</NuxtLink>
        <TarButton icon="fas fa-xmark" :text="$t('actions.close')" variant="secondary" @click="close()" />
      </div>
    </template>
  </TarModal>
</template>

<script setup lang="ts">
import type { Ability } from "~/types/pokemon";

defineProps<{
  ability: Ability;
}>();

const modalRef = ref();

function close(): void {
  modalRef.value?.hide();
}

function open(): void {
  modalRef.value?.show();
}
defineExpose({ open });
</script>
