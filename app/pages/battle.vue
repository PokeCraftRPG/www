<template>
  <main class="container">
    <h1>{{ title }}</h1>
    <ClientOnly>
      <div class="mb-3">
        <TarButton icon="fas fa-plus" :text="$t('pokemon.battle.add')" variant="success" @click="openAddMatchup()" />
      </div>
      <TarAccordion id="matchups">
        <TarAccordionItem
          v-for="(matchup, index) in battle.matchups"
          :active="!index"
          :id="`matchup-${matchup.id}`"
          :key="index"
          :title="[matchup.attacker.name, $t('pokemon.battle.versus'), matchup.target.name].join(' ')"
        >
          <BattleMatchup :matchup="matchup" />
        </TarAccordionItem>
      </TarAccordion>
      <BattleAddMatchup ref="addMatchup" @added="battle.addMatchup" />
    </ClientOnly>
  </main>
</template>

<script setup lang="ts">
import type { Ability, Move } from "~/types/pokemon";
import type { SearchResults } from "~/types/search";

const battle = useBattleStore();
const config = useRuntimeConfig();

const addMatchup = ref();

const title = computed<string>(() => $t("pokemon.battle.title"));

function openAddMatchup(): void {
  addMatchup.value?.open();
}

onMounted(async () => {
  battle.setLoading(true);
  try {
    const abilities = await $fetch<SearchResults<Ability>>("/api/abilities", {
      baseURL: config.public.apiBaseUrl,
    });
    battle.setAbilities(abilities.items);

    const moves = await $fetch<SearchResults<Move>>("/api/moves", {
      baseURL: config.public.apiBaseUrl,
    });
    battle.setMoves(moves.items);
  } catch (e: unknown) {
    console.error(e); // TODO(fpion): handle error
  } finally {
    battle.setLoading(false);
  }
});

useSeo({ title });
</script>
