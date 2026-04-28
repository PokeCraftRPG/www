<template>
  <table class="table table-striped text-center">
    <thead>
      <tr>
        <th scope="col" class="w-fifth">[Attack]</th>
        <th scope="col" class="w-fifth">[Defense]</th>
        <th scope="col" class="w-fifth">[SpecialAttack]</th>
        <th scope="col" class="w-fifth">[SpecialDefense]</th>
        <th scope="col" class="w-fifth">[Speed]</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ $n(attack, "integer") }}</td>
        <td>{{ $n(defense, "integer") }}</td>
        <td>{{ $n(specialAttack, "integer") }}</td>
        <td>{{ $n(specialDefense, "integer") }}</td>
        <td>{{ $n(speed, "integer") }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Form } from "~/types/pokemon";

const props = defineProps<{
  form: Form;
}>();

const attack = computed<number>(() => calculateScore(props.form.baseStatistics.attack));
const defense = computed<number>(() => calculateScore(props.form.baseStatistics.defense));
const specialAttack = computed<number>(() => calculateScore(props.form.baseStatistics.specialAttack));
const specialDefense = computed<number>(() => calculateScore(props.form.baseStatistics.specialDefense));
const speed = computed<number>(() => calculateScore(props.form.baseStatistics.speed));

function calculateScore(baseStatistic: number): number {
  if (baseStatistic < 45) {
    return Math.floor(baseStatistic / 15) - 3;
  } else if (baseStatistic < 105) {
    return Math.floor((baseStatistic - 45) / 10);
  } else if (baseStatistic < 125) {
    return +6;
  } else if (baseStatistic < 145) {
    return +7;
  } else {
    return +8;
  }
}
</script>
