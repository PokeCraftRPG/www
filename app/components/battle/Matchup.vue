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
    <div v-if="move" class="mb-3">
      <TarCheckbox
        :id="`${id}-move-targets`"
        :label="$t('pokemon.moves.multipleTargets')"
        :model-value="isMultipleTargets"
        switch
        @update:model-value="setMultipleTargets"
      />
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

const isMultipleTargets = computed<boolean>(() => props.matchup.moveTargets === "multiple");
const move = computed<Move | undefined>(() => props.matchup.move);
const powerRoll = computed<string>(() => convertPowerToRoll(move.value?.power ?? 0));

const damage = computed<number>(() => {
  // Base
  const { level, power, attack, defense } = props.matchup;
  let damage: number = Math.ceil(power * (level / 100) * (attack / defense)) + 1 + tier.value;

  // Modifiers
  if (isMultipleTargets.value) {
    damage = Math.floor(damage * 0.75);
  }

  return Math.max(damage, 1);
});
const tier = computed<number>(() => calculateTier(props.matchup.level));

function rollPower(): void {
  const power: number = roll(powerRoll.value);
  if (power) {
    battle.setMatchupPower(props.matchup.id, power);
  }
}

function setMultipleTargets(value: boolean): void {
  battle.setMatchupMoveTargets(props.matchup.id, value ? "multiple" : "single");
}

/* TODO(fpion):
 * Attack Stage
 * Defense Stage
 * Weather is
 * - 1.5 if a Water-type move is being used during rain or a Fire-type move or Hydro Steam during harsh sunlight,
 * - and 0.5 if a Water-type move (besides Hydro Steam) is used during harsh sunlight or a Fire-type move during rain,
 * - and 1 otherwise or if any Pokémon on the field have the Ability Cloud Nine or Air Lock.
 * Critical is 1.5 for a critical hit, and 1 otherwise. Decimals are rounded down to the nearest integer. It is always 1 if the target's Ability is Battle Armor or Shell Armor or if the target is under the effect of Lucky Chant.
 * STAB is the same-type attack bonus.
 * - This is equal to 1.5 if the move's type matches any of the user's type,
 * - 2 if the user of the move additionally has Adaptability,
 * - and 1 otherwise.
 * - When Terastallized, STAB is (if not 1):
 *   - 1.5 if the move's type matches either the Pokemon's original type(s) or a different Tera Type from its original types, and the attacker's Ability is not Adaptability.
 *   - 2 if the move's type matches the same Tera Type as one of the Pokemon's original types and the attacker's Ability is not Adaptability, or the situation above, if the attacker's Ability is Adaptability.
 *   - However, if STAB only applies from the attacker's original type(s), not its Tera Type, STAB will always be 1.5, even if the attacker's Ability is Adaptability.
 * Type Effectiveness: 0, 1/8, 1/4, 1/2, 1, 2, 4 or 8
 * Burn is 0.5 if the attacker is burned, its Ability is not Guts, and the used move is a physical move (other than Facade from Generation VI onward), and 1 otherwise.
 * Other (including Parental Bond and Glaive Rush)
 */

// TODO(fpion): calculer l’Accuracy et l’Evasion.
// TODO(fpion): refactor label/placeholder translations
</script>
