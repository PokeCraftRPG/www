<template>
  <div>
    <div class="d-none d-md-block">
      <table class="table table-striped text-center">
        <tbody>
          <tr>
            <th scope="row" class="w-25">{{ $t("pokemon.forms.types") }}</th>
            <td colspan="3" class="w-75">
              <div class="d-flex justify-content-center align-items-center gap-2 flex-wrap">
                <PokemonTypeBadge :type="form.types.primary" />
                <PokemonTypeBadge v-if="form.types.secondary" :type="form.types.secondary" />
              </div>
            </td>
          </tr>
          <tr v-if="abilities">
            <th scope="row">{{ $t("pokemon.abilities.title") }}</th>
            <td>
              <a v-if="form.abilities.primary" href="#" @click.prevent="selectAbility(form.abilities.primary)">
                {{ form.abilities.primary.name ?? form.abilities.primary.key }}
              </a>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>
              <a v-if="form.abilities.secondary" href="#" @click.prevent="selectAbility(form.abilities.secondary)">
                {{ form.abilities.secondary.name ?? form.abilities.secondary.key }}
              </a>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>
              <a v-if="form.abilities.hidden" href="#" @click.prevent="selectAbility(form.abilities.hidden)">
                <font-awesome-icon icon="fas fa-eye-slash" />&nbsp;{{ form.abilities.hidden.name ?? form.abilities.hidden.key }}
              </a>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
          </tr>
          <tr>
            <th scope="row">{{ $t("pokemon.gender.label") }}</th>
            <td v-if="isGenderUnknown" colspan="3"><font-awesome-icon icon="fas fa-question" />&nbsp;{{ $t("pokemon.gender.unknown") }}</td>
            <template v-else>
              <td>{{ $n(male ?? 0, "genderRatio") }}&nbsp;<font-awesome-icon icon="fa fa-mars" />&nbsp;{{ $t("pokemon.gender.male") }}</td>
              <td>
                <TarProgress :value="(male ?? 0) * 100" />
              </td>
              <td>{{ $n(female ?? 0, "genderRatio") }}&nbsp;<font-awesome-icon icon="fa fa-venus" />&nbsp;{{ $t("pokemon.gender.female") }}</td>
            </template>
          </tr>
          <tr>
            <th scope="row">{{ $t("pokemon.size.label") }}</th>
            <td>{{ $t(`pokemon.size.category.options.${pokemon.sizeCategory}`) }}</td>
            <td>{{ $n(height, "height") }}&nbsp;{{ $t("units.m", height) }}</td>
            <td>{{ $n(weight, "weight") }}&nbsp;{{ $t("units.kg", weight) }}</td>
          </tr>
          <tr>
            <th scope="row">{{ $t("pokemon.breeding.label") }}</th>
            <td>{{ $t(`pokemon.breeding.group.options.${species.eggGroups.primary}`) }}</td>
            <td>
              <template v-if="species.eggGroups.secondary">{{ $t(`pokemon.breeding.group.options.${species.eggGroups.secondary}`) }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>{{ $n(species.eggCycles, "integer") }}&nbsp;{{ $t("pokemon.breeding.cycles", species.eggCycles) }}</td>
          </tr>
          <tr>
            <th scope="row">{{ $t("pokemon.experience.label") }}</th>
            <td>
              <a href="#">{{ growthRate }}</a>
            </td>
            <td>
              <template v-if="candyCount">{{ $n(candyCount, "integer") }}&nbsp;{{ $t("pokemon.experience.candies", candyCount) }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>
              <template v-if="candySize">{{ candySize }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-md-none text-center">
      <TarCard class="mb-3" :title="$t('pokemon.forms.types')">
        <div class="row">
          <div class="col">
            <PokemonTypeBadge :type="form.types.primary" />
          </div>
          <div v-if="form.types.secondary" class="col">
            <PokemonTypeBadge :type="form.types.secondary" />
          </div>
        </div>
      </TarCard>
      <TarCard v-if="abilities" class="mb-3" :title="$t('pokemon.abilities.title')">
        <template v-if="abilities > 2">
          <div class="row">
            <div v-if="form.abilities.primary" class="col">
              <a href="#">{{ form.abilities.primary.name ?? form.abilities.primary.key }}</a>
            </div>
            <div v-if="form.abilities.secondary" class="col">
              <a href="#">{{ form.abilities.secondary.name ?? form.abilities.secondary.key }}</a>
            </div>
          </div>
          <div v-if="form.abilities.hidden">
            <a href="#"><font-awesome-icon icon="fas fa-eye-slash" />&nbsp;{{ form.abilities.hidden.name ?? form.abilities.hidden.key }}</a>
          </div>
        </template>
        <div v-else class="row">
          <div v-if="form.abilities.primary" class="col">
            <a href="#" @click.prevent="selectAbility(form.abilities.primary)">{{ form.abilities.primary.name ?? form.abilities.primary.key }}</a>
          </div>
          <div v-if="form.abilities.secondary" class="col">
            <a href="#" @click.prevent="selectAbility(form.abilities.secondary)">{{ form.abilities.secondary.name ?? form.abilities.secondary.key }}</a>
          </div>
          <div v-if="form.abilities.hidden" class="col">
            <a href="#" @click.prevent="selectAbility(form.abilities.hidden)">
              <font-awesome-icon icon="fas fa-eye-slash" />&nbsp;{{ form.abilities.hidden.name ?? form.abilities.hidden.key }}
            </a>
          </div>
        </div>
      </TarCard>
      <TarCard class="mb-3" :title="$t('pokemon.gender.label')">
        <div class="row">
          <div class="col">{{ $n(male ?? 0, "genderRatio") }}&nbsp;<font-awesome-icon icon="fa fa-mars" /></div>
          <div class="col">
            <TarProgress :value="(male ?? 0) * 100" />
          </div>
          <div class="col">{{ $n(female ?? 0, "genderRatio") }}&nbsp;<font-awesome-icon icon="fa fa-venus" /></div>
        </div>
      </TarCard>
      <TarCard class="mb-3" :title="$t('pokemon.size.label')">
        <div class="row">
          <div class="col">{{ $n(height, "height") }}&nbsp;{{ $t("units.m", height) }}</div>
          <div class="col">{{ $n(weight, "weight") }}&nbsp;{{ $t("units.kg", weight) }}</div>
        </div>
      </TarCard>
      <TarCard class="mb-3" :title="$t('pokemon.breeding.label')">
        <div class="row">
          <div class="col">{{ $t(`pokemon.breeding.group.options.${species.eggGroups.primary}`) }}</div>
          <div v-if="species.eggGroups.secondary" class="col">{{ $t(`pokemon.breeding.group.options.${species.eggGroups.secondary}`) }}</div>
          <div class="col">{{ $n(species.eggCycles, "integer") }}&nbsp;{{ $t("pokemon.breeding.cycles", species.eggCycles) }}</div>
        </div>
      </TarCard>
      <TarCard class="mb-3" :title="$t('pokemon.experience.label')">
        <div class="row">
          <div class="col">
            <a href="#">{{ growthRate }}</a>
          </div>
          <div v-if="candyCount" class="col">{{ $n(candyCount, "integer") }}&nbsp;{{ $t("pokemon.experience.candies", candyCount) }}</div>
          <div v-if="candySize" class="col">{{ candySize }}</div>
        </div>
      </TarCard>
    </div>
    <ClientOnly>
      <AbilityModal v-if="ability" :ability="ability" ref="abilityModal" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Ability, Form, Species, Variety } from "~/types/pokemon";
import { usePokemonStore } from "~/stores/pokemon";

const pokemon = usePokemonStore();

const props = defineProps<{
  form: Form;
  species: Species;
  variety: Variety;
}>();

const ability = ref<Ability>();
const abilityModal = ref();

const abilities = computed<number>(() => {
  let abilities: number = 0;
  if (props.form.abilities.primary) {
    abilities++;
  }
  if (props.form.abilities.secondary) {
    abilities++;
  }
  if (props.form.abilities.hidden) {
    abilities++;
  }
  return abilities;
});

const growthRate = computed<string>(() => {
  switch (props.species.growthRate) {
    case "Fluctuating":
    case "Slow":
      return $t("pokemon.growthRate.options.Slow");
    case "Erratic":
    case "Fast":
      return $t("pokemon.growthRate.options.Fast");
  }
  return $t("pokemon.growthRate.options.Medium");
});
const candyCount = computed<number>(() => 1);
const candySize = computed<string>(() => {
  if (pokemon.level < 5) {
    return "XS";
  } else if (pokemon.level < 20) {
    return "S";
  } else if (pokemon.level < 50) {
    return "M";
  } else if (pokemon.level < 75) {
    return "L";
  } else {
    return "XL";
  }
});

const isGenderUnknown = computed<boolean>(() => typeof props.variety.genderRatio !== "number");
const female = computed<number | undefined>(() => (typeof props.variety.genderRatio === "number" ? (8 - props.variety.genderRatio) / 8 : undefined));
const male = computed<number | undefined>(() => (typeof props.variety.genderRatio === "number" ? props.variety.genderRatio / 8 : undefined));

const sizeMultiplier = computed<number>(() => {
  switch (pokemon.sizeCategory) {
    case "ExtraSmall":
      return 0.8;
    case "Small":
      return 0.9;
    case "Large":
      return 1.1;
    case "ExtraLarge":
      return 1.2;
  }
  return 1;
});
const height = computed<number>(() => (props.form.height / 10) * sizeMultiplier.value);
const weight = computed<number>(() => (props.form.weight / 10) * sizeMultiplier.value);

function selectAbility(selectedAbility: Ability): void {
  ability.value = selectedAbility;
  setTimeout(() => abilityModal.value?.open(), 1);
}
</script>
