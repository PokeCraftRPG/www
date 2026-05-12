import { defineStore } from "pinia";

function clamp(value: number, min: number, max: number): number {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }
  return value;
}

export const usePokemonStore = defineStore("pokemon", () => {
  const level = ref<number>(1);

  function setLevel(value: number | null | undefined): void {
    level.value = clamp(value ?? 0, 1, 100);
  }

  return { level, setLevel };
});
