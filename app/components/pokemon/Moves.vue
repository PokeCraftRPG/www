<template>
  <div>
    <div class="d-none d-lg-block">
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col" class="w-15">{{ $t("pokemon.level.label") }}</th>
            <th scope="col" class="w-25">{{ $t("pokemon.moves.label") }}</th>
            <th scope="col" class="w-15">{{ $t("pokemon.type.label") }}</th>
            <th scope="col" class="w-15">{{ $t("pokemon.moves.category.label") }}</th>
            <th scope="col" class="w-10">{{ $t("pokemon.moves.accuracy") }}</th>
            <th scope="col" class="w-10">{{ $t("pokemon.moves.power") }}</th>
            <th scope="col" class="w-10">{{ $t("pokemon.moves.powerPoints") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedMoves" :key="item.move.id">
            <td>{{ item.level ? $n(item.level, "integer") : item.learningMethod }}</td>
            <td>
              <a href="#">{{ item.move.name ?? item.move.key }}</a>
            </td>
            <td>
              <PokemonTypeBadge :type="item.move.type" />
            </td>
            <td>
              <MoveCategoryBadge :category="item.move.category" />
            </td>
            <td>
              <template v-if="item.move.accuracy">{{ $n(item.move.accuracy / 100, "accuracy") }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>
              <template v-if="item.move.power">{{ $n(item.move.power, "integer") }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
            <td>
              <template v-if="item.move.powerPoints">{{ $n(item.move.powerPoints, "integer") }}</template>
              <span v-else class="text-muted">{{ "—" }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-none d-md-block d-lg-none">
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col" class="w-15">{{ $t("pokemon.level.label") }}</th>
            <th scope="col" class="w-25">{{ $t("pokemon.moves.label") }}</th>
            <th scope="col" class="w-15">{{ $t("pokemon.type.label") }}</th>
            <th scope="col" class="w-15">{{ $t("pokemon.moves.category.label") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedMoves" :key="item.move.id">
            <td>{{ item.level ? $n(item.level, "integer") : item.learningMethod }}</td>
            <td>
              <a href="#">{{ item.move.name ?? item.move.key }}</a>
            </td>
            <td>
              <PokemonTypeBadge :type="item.move.type" />
            </td>
            <td>
              <MoveCategoryBadge :category="item.move.category" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-md-none">
      <table class="table table-striped text-center">
        <thead>
          <tr>
            <th scope="col" class="w-35">{{ $t("pokemon.level.label") }}</th>
            <th scope="col" class="w-55">{{ $t("pokemon.moves.label") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedMoves" :key="item.move.id">
            <td>{{ item.level ? $n(item.level, "integer") : item.learningMethod }}</td>
            <td>
              <a href="#">{{ item.move.name ?? item.move.key }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { arrayUtils } from "logitar-js";

import type { VarietyMove } from "~/types/pokemon";

const { orderBy } = arrayUtils;

const props = defineProps<{
  moves: VarietyMove[];
}>();

type SortedVarietyMove = VarietyMove & {
  learningMethod: string;
  sort: string;
};
const sortedMoves = computed<SortedVarietyMove[]>(() =>
  orderBy(
    props.moves.map((item) => {
      const learningMethod: string = $t(`pokemon.moves.learningMethod.options.${item.method}`);
      return {
        ...item,
        learningMethod,
        sort: [(item.level ?? 0).toString().padStart(3, "0"), learningMethod].join("_"),
      };
    }),
    "sort",
  ),
);
</script>
