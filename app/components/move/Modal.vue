<template>
  <TarModal centered :close="$t('actions.close')" fade ref="modalRef" :title="$t('pokemon.moves.format', { move: move.name ?? move.key })">
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
        <template v-if="powerRoll">{{ powerRoll }}</template>
        <span v-else class="text-muted">{{ "—" }}</span>
      </div>
      <div class="col">
        <strong>{{ $t("pokemon.moves.stamina") }}</strong>
        <br />
        <template v-if="stamina">{{ $n(stamina, "integer") }}</template>
        <span v-else class="text-muted">{{ "—" }}</span>
      </div>
    </div>
    <p v-if="move.description">{{ move.description }}</p>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <NuxtLink :to="`/moves/${move.key}`" @click="close()">{{ $t("pokemon.moves.details") }}</NuxtLink>
        <TarButton icon="fas fa-xmark" :text="$t('actions.close')" variant="secondary" @click="close()" />
      </div>
    </template>
  </TarModal>
</template>

<script setup lang="ts">
import type { Move } from "~/types/pokemon";

const props = defineProps<{
  move: Move;
}>();

const powerRoll = computed<string>(() => convertPowerToRoll(props.move.power ?? 0));
const stamina = computed<number>(() => convertPowerPointsToStamina(props.move.powerPoints));

const modalRef = ref();

function close(): void {
  modalRef.value?.hide();
}

function open(): void {
  modalRef.value?.show();
}
defineExpose({ open });
</script>
