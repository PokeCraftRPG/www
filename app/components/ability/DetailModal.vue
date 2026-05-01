<template>
  <Modal ref="modalRef">
    <ModalDialog centered>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{{ $t("pokemon.abilities.format", { ability: ability.name ?? ability.key }) }}</ModalTitle>
          <CloseButton dismiss="modal" />
        </ModalHeader>
        <ModalBody>
          <p v-if="ability.description">{{ ability.description }}</p>
        </ModalBody>
        <ModalFooter>
          <TarButton icon="fas fa-xmark" :text="$t('actions.close')" variant="secondary" @click="close()" />
        </ModalFooter>
      </ModalContent>
    </ModalDialog>
  </Modal>
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
