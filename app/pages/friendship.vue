<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col" class="w-35">{{ $t("pokemon.friendship.event") }}</th>
          <th scope="col" class="w-35">{{ $t("pokemon.friendship.condition") }}</th>
          <th scope="col" class="w-10">0-39</th>
          <th scope="col" class="w-10">40-79</th>
          <th scope="col" class="w-10">80-100</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(event, index) in events" :key="index">
          <tr v-for="(change, index) in event.changes" :key="index">
            <td v-if="index < 1" :rowspan="event.changes.length">{{ event.text }}</td>
            <td>
              <template v-if="change.condition">{{ change.condition }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>
              <template v-if="typeof change.low === 'number'">{{ $n(change.low, "integer") }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>
              <template v-if="typeof change.medium === 'number'">{{ $n(change.medium, "integer") }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>
              <template v-if="typeof change.high === 'number'">{{ $n(change.high, "integer") }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </main>
</template>

<script setup lang="ts">
import data from "~/assets/data/friendship.json";

type FriendshipEvent = {
  text: string;
  changes: FriendshipChange[];
};
type FriendshipChange = {
  condition?: string;
  low?: number;
  medium?: number;
  high?: number;
};
const events: FriendshipEvent[] = data as FriendshipEvent[];

const title = computed<string>(() => $t("pokemon.friendship.title"));

useSeo({ title });
</script>
