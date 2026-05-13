<template>
  <main class="container">
    <h1>{{ $t("pokemon.battle.title") }}</h1>
    <ClientOnly>
      <div class="mb-3">
        <TarButton icon="fas fa-plus" :text="$t('pokemon.battle.add')" variant="success" @click="openAddMatchup()" />
      </div>
      <TarAccordion id="matchups">
        <TarAccordionItem
          v-for="(matchup, index) in battle.matchups"
          :active="!index"
          :id="`matchup-${index}`"
          :key="index"
          :title="[matchup.attacker.name, $t('pokemon.battle.versus'), matchup.target.name].join(' ')"
        >
          <p>Hello World!</p>
        </TarAccordionItem>
      </TarAccordion>
      <BattleAddMatchup ref="addMatchup" @added="battle.addMatchup" />
    </ClientOnly>
  </main>
</template>

<script setup lang="ts">
const battle = useBattleStore();

const addMatchup = ref();

function openAddMatchup(): void {
  addMatchup.value?.open();
}
</script>
