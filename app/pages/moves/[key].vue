<template>
  <main class="container">
    <template v-if="move">
      <h1>{{ title }}</h1>
      <p v-if="move.description">{{ move.description }}</p>
      <div class="row text-center">
        <div class="col-sm-6 mb-3">
          <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.type.label')">
            <PokemonTypeBadge :type="move.type" />
          </TarCard>
        </div>
        <div class="col-sm-6 mb-3">
          <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.moves.category.label')">
            <MoveCategoryBadge :category="move.category" />
          </TarCard>
        </div>
      </div>
      <div class="row text-center">
        <div class="col-sm-4 mb-3">
          <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.moves.accuracy')">
            <template v-if="move.accuracy">{{ $n(move.accuracy / 100, "accuracy") }}</template>
            <span v-else class="text-muted">{{ "—" }}</span>
          </TarCard>
        </div>
        <div class="col-sm-4 mb-3">
          <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.moves.power')">
            <template v-if="powerRoll">{{ powerRoll }}</template>
            <span v-else class="text-muted">{{ "—" }}</span>
          </TarCard>
        </div>
        <div class="col-sm-4 mb-3">
          <TarCard class="d-flex flex-column h-100" :title="$t('pokemon.moves.stamina')">
            <template v-if="stamina">{{ $n(stamina, "integer") }}</template>
            <span v-else class="text-muted">{{ "—" }}</span>
          </TarCard>
        </div>
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { Move } from "~/types/pokemon";

const config = useRuntimeConfig();
const route = useRoute();

const key = computed<string>(() => (Array.isArray(route.params.key) ? route.params.key[0] : route.params.key) ?? "");
const { data } = await useAsyncData(
  `move:${key.value}`,
  async () =>
    $fetch(`/api/moves/key:${key.value}`, {
      baseURL: config.public.apiBaseUrl,
    }),
  {
    watch: [key],
  },
);
const move = computed<Move | undefined>(() => data.value as Move);
const title = computed<string>(() => (move.value ? (move.value.name ?? move.value.key) : ""));
const powerRoll = computed<string>(() => convertPowerToRoll(move.value?.power ?? 0));
const stamina = computed<number>(() => convertPowerPointsToStamina(move.value?.powerPoints ?? 0));

useSeo({ title });
</script>
