<template>
  <Modal ref="modalRef">
    <ModalDialog centered>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{{ $t("pokemon.moves.format", { move: move.name ?? move.key }) }}</ModalTitle>
          <CloseButton dismiss="modal" />
        </ModalHeader>
        <ModalBody>
          <div class="row mb-3 text-center">
            <div class="col">
              <strong>{{ $t("pokemon.type.label") }}</strong>
              <br />
              <PokemonTypeBadge :type="move.type" />
            </div>
            <div class="col">
              <strong>{{ $t("pokemon.moves.category.label") }}</strong>
              <br />
              <MoveCategoryBadge :category="move.category" />
            </div>
          </div>
          <div class="row mb-3 text-center">
            <div class="col">
              <strong>{{ $t("pokemon.moves.accuracy") }}</strong>
              <br />
              <template v-if="move.accuracy">{{ $n(move.accuracy / 100, "accuracy") }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </div>
            <div class="col">
              <strong>{{ $t("pokemon.moves.power") }}</strong>
              <br />
              <template v-if="move.power">{{ $n(move.power, "integer") }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </div>
            <div class="col">
              <strong>{{ $t("pokemon.moves.powerPoints") }}</strong>
              <br />
              <template v-if="move.powerPoints">{{ $n(move.powerPoints, "integer") }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </div>
          </div>
          <p v-if="move.description">{{ move.description }}</p>
        </ModalBody>
        <ModalFooter>
          <TarButton icon="fas fa-xmark" :text="$t('actions.close')" variant="secondary" @click="close()" />
        </ModalFooter>
      </ModalContent>
    </ModalDialog>
  </Modal>
</template>

<script setup lang="ts">
import type { Move } from "~/types/pokemon";

defineProps<{
  move: Move;
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
