<template>
  <div v-if="form && species">
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
              <template v-if="candies">{{ candies }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>
              <template v-if="grit">{{ grit }}</template>
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
          <div v-if="candies" class="col">{{ candies }}</div>
          <div v-if="grit" class="col">{{ grit }}</div>
        </div>
      </TarCard>
    </div>
    <ClientOnly>
      <AbilityModal v-if="ability" :ability="ability" ref="abilityModal" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type { Ability, Form, Species, Variety, Yield } from "~/types/pokemon";

const pokemon = usePokemonStore();

const ability = ref<Ability>();
const abilityModal = ref();

const form = computed<Form | undefined>(() => pokemon.form);
const species = computed<Species | undefined>(() => pokemon.species);
const variety = computed<Variety | undefined>(() => pokemon.variety);

const abilities = computed<number>(() => {
  let abilities: number = 0;
  if (form.value) {
    if (form.value.abilities.primary) {
      abilities++;
    }
    if (form.value.abilities.secondary) {
      abilities++;
    }
    if (form.value.abilities.hidden) {
      abilities++;
    }
  }
  return abilities;
});

const growthRate = computed<string>(() => {
  switch (species.value?.growthRate) {
    case "Fluctuating":
    case "Slow":
      return $t("pokemon.growthRate.options.Slow");
    case "Erratic":
    case "Fast":
      return $t("pokemon.growthRate.options.Fast");
  }
  return $t("pokemon.growthRate.options.Medium");
});
const candies = computed<string>(() => {
  const _yield: number = pokemon.form?.yield.experience ?? 0;
  if (_yield < 5) {
    return "";
  }

  const parts: string[] = [];
  if (_yield < 60) {
    parts.push(`${Math.floor(_yield / 5)}/12`);
  } else if (_yield <= 260) {
    parts.push("1");
  } else if (_yield <= 350) {
    parts.push("1");
    parts.push(`${Math.ceil((_yield - 260) / 10)}/10`);
  } else if (_yield <= 360) {
    parts.push("2");
  } else if (_yield <= 380) {
    parts.push("2");
    parts.push("1/8");
  } else if (_yield <= 390) {
    parts.push("2");
    parts.push("2/8");
  } else if (_yield <= 400) {
    parts.push("2");
    parts.push("3/8");
  } else if (_yield <= 500) {
    parts.push("2");
    parts.push("4/8");
  } else if (_yield <= 600) {
    parts.push("2");
    parts.push("5/8");
  } else {
    parts.push("2");
    parts.push("6/8");
  }

  let size: string = "XL";
  if (pokemon.level < 5) {
    size = "XS";
  } else if (pokemon.level < 20) {
    size = "S";
  } else if (pokemon.level < 50) {
    size = "M";
  } else if (pokemon.level < 75) {
    size = "L";
  }

  return $t("pokemon.experience.candiesFormat", { candies: parts.join(" + "), size });
});
const grit = computed<string>(() => {
  if (!pokemon.form) {
    return "";
  }

  const _yield: Yield = pokemon.form.yield;
  const chance: string = `${clamp(_yield.hp + _yield.attack + _yield.defense + _yield.specialAttack + _yield.specialDefense + _yield.speed, 1, 3)}/4`;

  let size: string = $t("pokemon.experience.grit.options.Dust");
  switch (pokemon.tier) {
    case 1:
      size = $t("pokemon.experience.grit.options.Gravel");
      break;
    case 2:
      size = $t("pokemon.experience.grit.options.Pebble");
      break;
    case 3:
      size = $t("pokemon.experience.grit.options.Rock");
      break;
  }

  return $t("pokemon.experience.grit.format", { chance, size });
});

const isGenderUnknown = computed<boolean>(() => (variety.value ? typeof variety.value.genderRatio !== "number" : false));
const female = computed<number | undefined>(() =>
  variety.value ? (typeof variety.value.genderRatio === "number" ? (8 - variety.value.genderRatio) / 8 : undefined) : undefined,
);
const male = computed<number | undefined>(() =>
  variety.value ? (typeof variety.value.genderRatio === "number" ? variety.value.genderRatio / 8 : undefined) : undefined,
);

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
const height = computed<number>(() => ((form.value?.height ?? 0) / 10) * sizeMultiplier.value);
const weight = computed<number>(() => ((form.value?.weight ?? 0) / 10) * sizeMultiplier.value);

function selectAbility(selectedAbility: Ability): void {
  ability.value = selectedAbility;
  setTimeout(() => abilityModal.value?.open(), 1);
}

// TODO(fpion): modal/tooltip/other information when growth rate clicked!
</script>
