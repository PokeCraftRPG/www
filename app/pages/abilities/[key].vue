<template>
  <main class="container">
    <template v-if="ability">
      <h1>{{ title }}</h1>
      <p v-if="ability.description">{{ ability.description }}</p>
    </template>
  </main>
</template>

<script setup lang="ts">
import type { Ability } from "~/types/pokemon";

const config = useRuntimeConfig();
const route = useRoute();

const key = computed<string>(() => (Array.isArray(route.params.key) ? route.params.key[0] : route.params.key) ?? "");
const { data } = await useAsyncData(
  `ability:${key.value}`,
  async () =>
    $fetch(`/api/abilities/key:${key.value}`, {
      baseURL: config.public.apiBaseUrl,
    }),
  {
    watch: [key],
  },
);
const ability = computed<Ability | undefined>(() => data.value as Ability);
const title = computed<string>(() => (ability.value ? (ability.value.name ?? ability.value.key) : ""));

useSeo({ title });
</script>
