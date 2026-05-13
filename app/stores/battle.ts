import { nanoid } from "nanoid";
import { defineStore } from "pinia";

import type { Belligerents, Matchup } from "~/types/battle";

export const useBattleStore = defineStore(
  "battle",
  () => {
    const matchups = ref<Matchup[]>([]);

    function addMatchup(belligerents: Belligerents): void {
      matchups.value.push({
        id: nanoid(),
        title: [belligerents.attacker.name, "vs.", belligerents.target.name].join(" "),
        ...belligerents,
      });
    }

    return { matchups, addMatchup };
  },
  {
    persist: true,
  },
);

// TODO(fpion): localStorage
