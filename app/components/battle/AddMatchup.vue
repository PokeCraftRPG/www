<template>
  <TarModal :close="$t('actions.close')" fade ref="modalRef" size="x-large" :title="$t('pokemon.battle.add')">
    <form class="row" @submit.prevent="submit">
      <div class="col-lg-6">
        <h5 class="h6">{{ $t("pokemon.battle.attacker") }}</h5>
        <SpeciesSelect class="mb-3" id="attacker-species" :model-value="attacker.species?.id" required @selected="attacker.species = $event" />
        <VarietySelect
          v-if="attacker.species"
          class="mb-3"
          id="attacker-variety"
          :model-value="attacker.variety?.id"
          required
          :species="attacker.species.id"
          @selected="attacker.variety = $event"
        />
        <FormSelect
          v-if="attacker.variety"
          class="mb-3"
          id="attacker-form"
          :model-value="attacker.form?.id"
          required
          :variety="attacker.variety.id"
          @selected="attacker.form = $event"
        />
        <NameInput v-show="attacker.form" class="mb-3" id="attacker-name" min="1" max="20" required v-model="attacker.name" />
      </div>
      <div class="col-lg-6">
        <h5 class="h6">{{ $t("pokemon.battle.target") }}</h5>
        <SpeciesSelect class="mb-3" id="target-species" :model-value="target.species?.id" required @selected="target.species = $event" />
        <VarietySelect
          v-if="target.species"
          class="mb-3"
          id="target-variety"
          :model-value="target.variety?.id"
          required
          :species="target.species.id"
          @selected="target.variety = $event"
        />
        <FormSelect
          v-if="target.variety"
          class="mb-3"
          id="target-form"
          :model-value="target.form?.id"
          required
          :variety="target.variety.id"
          @selected="target.form = $event"
        />
        <NameInput v-show="target.form" class="mb-3" id="target-name" min="1" max="20" required v-model="target.name" />
      </div>
    </form>
    <template #footer>
      <TarButton icon="fas fa-ban" :text="$t('actions.cancel')" variant="secondary" @click="close()" />
      <TarButton :disabled="!isValid" icon="fas fa-plus" :text="$t('actions.add')" variant="success" @click="submit" />
    </template>
  </TarModal>
</template>

<script setup lang="ts">
import type { Belligerent, Belligerents } from "~/types/battle";

const emit = defineEmits<{
  (e: "added", value: Belligerents): void;
}>();

const modalRef = ref();
const attacker = ref<Belligerent>({ name: "" });
const target = ref<Belligerent>({ name: "" });

function validate(belligerent: Belligerent): boolean {
  return Boolean(belligerent.species && belligerent.variety && belligerent.form && belligerent.name.length >= 1 && belligerent.name.length <= 20);
}
const isValid = computed<boolean>(() => validate(attacker.value) && validate(target.value));

function submit(): void {
  if (isValid.value) {
    emit("added", { attacker: attacker.value, target: target.value });
    close();
  }
}

function reset(): void {
  attacker.value = { name: "" };
  target.value = { name: "" };
}

function close(): void {
  reset();
  modalRef.value?.hide();
}
function open(): void {
  modalRef.value?.show();
}
defineExpose({ close, open });

watch(
  () => attacker.value.species,
  (species) => {
    attacker.value.variety = undefined;
    attacker.value.name = species ? (species.name ?? species.key) : "";
  },
);
watch(
  () => attacker.value.variety,
  () => (attacker.value.form = undefined),
);

watch(
  () => target.value.species,
  (species) => {
    target.value.variety = undefined;
    target.value.name = species ? (species.name ?? species.key) : "";
  },
);
watch(
  () => target.value.variety,
  () => (target.value.form = undefined),
);
</script>
