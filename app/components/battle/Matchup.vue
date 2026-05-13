<template>
  <div>
    <h3 class="h5">{{ move ? $t("pokemon.move.format", { name: move.name ?? move.key }) : $t("pokemon.move.label") }}</h3>
    <div class="row">
      <div class="col-md-3 mb-3">
        <MoveSelect
          :disabled="battle.isLoading"
          :id="`${id}-move`"
          :loading="battle.isLoading"
          :model-value="move?.id"
          :moves="battle.moves"
          @selected="battle.setMatchupMove(matchup.id, $event)"
        />
      </div>
      <div class="col-md-3 mb-3 text-center">
        <template v-if="move">
          <strong>{{ $t("pokemon.type.label") }}</strong>
          <br />
          <PokemonTypeBadge :type="move.type" />
        </template>
      </div>
      <div class="col-md-3 mb-3 text-center">
        <template v-if="move">
          <strong>{{ $t("pokemon.moves.category.label") }}</strong>
          <br />
          <MoveCategoryBadge :category="move.category" />
        </template>
      </div>
      <div class="col-md-3 mb-3 text-center">
        <template v-if="move">
          <strong>{{ $t("pokemon.stamina") }}</strong>
          <br />
          {{ convertPowerPointsToStamina(move.powerPoints) }}
        </template>
      </div>
    </div>
    <p v-if="move?.description">{{ move.description }}</p>
    <h3 class="h5">{{ $t("pokemon.battle.attacker.format", { name: matchup.attacker.name }) }}</h3>
    <div class="row">
      <div class="col-md-4 mb-3">
        <PokemonLevelInput :id="`${id}-level`" :model-value="matchup.level" required @update:model-value="battle.setMatchupLevel(matchup.id, $event)">
          <template #append>
            <span class="input-group-text">{{ $t("pokemon.tier.format", { tier }) }}</span>
          </template>
        </PokemonLevelInput>
      </div>
      <div class="col-md-4 mb-3">
        <MovePowerInput :id="`${id}-power`" :model-value="matchup.power" required @update:model-value="battle.setMatchupPower(matchup.id, $event)">
          <template #append>
            <TarButton :disabled="!powerRoll" icon="fas fa-dice" :text="powerRoll" @click="rollPower()" />
          </template>
        </MovePowerInput>
      </div>
      <div class="col-md-4 mb-3">
        <BattleAttackInput :id="`${id}-attack`" :model-value="matchup.attack" required @update:model-value="battle.setMatchupAttack(matchup.id, $event)" />
      </div>
    </div>
    <h3 class="h5">{{ $t("pokemon.battle.target.format", { name: matchup.target.name }) }}</h3>
    <div class="row">
      <div class="col mb-3">
        <BattleDefenseInput :id="`${id}-defense`" :model-value="matchup.defense" required @update:model-value="battle.setMatchupDefense(matchup.id, $event)" />
      </div>
    </div>
    <div class="row text-center">
      <div class="col mb-3">
        <TarCard :title="$t('pokemon.battle.damage')">{{ damage }}</TarCard>
      </div>
    </div>
    <div class="text-end">
      <TarButton icon="fas fa-xmark" :text="$t('actions.remove')" variant="danger" @click="battle.removeMatchup(matchup.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Matchup } from "~/types/battle";
import type { Move } from "~/types/pokemon";

const battle = useBattleStore();

const props = defineProps<{
  matchup: Matchup;
}>();

const id = computed<string>(() => ["matchup", props.matchup.id].join("-"));

const move = computed<Move | undefined>(() => props.matchup.move);
const powerRoll = computed<string>(() => convertPowerToRoll(move.value?.power ?? 0));

const damage = computed<number>(() => {
  // Base
  const { level, power, attack, defense } = props.matchup;
  let damage: number = Math.ceil(power * (level / 100) * (attack / defense)) + 1 + tier.value;

  // Modifiers
  damage = Math.floor(damage * 1.0);

  return damage;
});
const tier = computed<number>(() => calculateTier(props.matchup.level));

function rollPower(): void {
  const power: number = roll(powerRoll.value);
  if (power) {
    battle.setMatchupPower(props.matchup.id, power);
  }
}

/* TODO(fpion):
 * Attack Stage
 * Defense Stage
 * Targets: 1+
 * Parental Bond
 * Glaive Rush
 * Weather
 * Critical
 * STAB
 * Type Effectiveness
 * Burn
 * Other
 */

// TODO(fpion): calculer l’Accuracy et l’Evasion.
// TODO(fpion): refactor label/placeholder translations
</script>
