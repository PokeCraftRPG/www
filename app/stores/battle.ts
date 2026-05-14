import { defineStore } from "pinia";
import { nanoid } from "nanoid";

import type { Belligerents, Matchup, MoveTargets } from "~/types/battle";
import type { Ability, Move } from "~/types/pokemon";

export const useBattleStore = defineStore(
  "battle",
  () => {
    // state
    const abilities = ref<Ability[]>([]);
    const isLoading = ref<boolean>(false);
    const matchups = ref<Matchup[]>([]);
    const moves = ref<Move[]>([]);

    // actions
    function findMatchupIndex(id: string): number {
      const indices: number[] = [];
      for (let index = 0; index < matchups.value.length; index++) {
        const matchup: Matchup | undefined = matchups.value.at(index);
        if (matchup?.id === id) {
          indices.push(index);
        }
      }
      return (indices.length === 1 ? indices[0] : undefined) ?? -1;
    }

    function addMatchup(belligerents: Belligerents): void {
      matchups.value.push({
        ...belligerents,
        id: nanoid(),
        level: 1,
        moveTargets: "single",
        power: 1,
        attack: 1,
        defense: 1,
      });
    }

    function removeMatchup(id: string): void {
      const index: number = findMatchupIndex(id);
      if (index >= 0) matchups.value.splice(index, 1);
    }

    function setAbilities(value: Ability[]): void {
      abilities.value = [...value];
    }

    function setLoading(value: boolean): void {
      isLoading.value = value;
    }

    function setMatchupAttack(id: string, attack: number): void {
      const index: number = findMatchupIndex(id);
      const matchup: Matchup | undefined = matchups.value.at(index);
      if (matchup) {
        matchups.value.splice(index, 1, { ...matchup, attack: Math.max(attack, 1) });
      }
    }

    function setMatchupDefense(id: string, defense: number): void {
      const index: number = findMatchupIndex(id);
      const matchup: Matchup | undefined = matchups.value.at(index);
      if (matchup) {
        matchups.value.splice(index, 1, { ...matchup, attack: Math.max(defense, 1) });
      }
    }

    function setMatchupLevel(id: string, level: number): void {
      const index: number = findMatchupIndex(id);
      const matchup: Matchup | undefined = matchups.value.at(index);
      if (matchup) {
        matchups.value.splice(index, 1, { ...matchup, level: clamp(level, 1, 100) });
      }
    }

    function setMatchupMove(id: string, move: Move | undefined): void {
      const index: number = findMatchupIndex(id);
      const matchup: Matchup | undefined = matchups.value.at(index);
      if (matchup) {
        matchups.value.splice(index, 1, { ...matchup, move });
      }
    }

    function setMatchupMoveTargets(id: string, moveTargets: MoveTargets): void {
      const index: number = findMatchupIndex(id);
      const matchup: Matchup | undefined = matchups.value.at(index);
      if (matchup) {
        matchups.value.splice(index, 1, { ...matchup, moveTargets });
      }
    }

    function setMatchupPower(id: string, power: number): void {
      const index: number = findMatchupIndex(id);
      const matchup: Matchup | undefined = matchups.value.at(index);
      if (matchup) {
        matchups.value.splice(index, 1, { ...matchup, power: Math.max(power, 1) });
      }
    }

    function setMoves(value: Move[]): void {
      moves.value = [...value];
    }

    return {
      // state
      abilities,
      isLoading,
      matchups,
      moves,
      // actions
      addMatchup,
      removeMatchup,
      setAbilities,
      setLoading,
      setMatchupAttack,
      setMatchupDefense,
      setMatchupLevel,
      setMatchupMove,
      setMatchupMoveTargets,
      setMatchupPower,
      setMoves,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
);
