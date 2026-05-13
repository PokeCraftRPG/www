import { defineStore } from "pinia";

import type { Belligerents, Matchup } from "~/types/battle";

export const useBattleStore = defineStore(
  "battle",
  () => {
    const matchups = ref<Matchup[]>([]);

    function addMatchup(belligerents: Belligerents): void {
      matchups.value.push({
        ...belligerents,
      });
    }

    return { matchups, addMatchup };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
);
