export default defineI18nConfig(() => ({
  numberFormats: {
    en: {
      genderRatio: {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      },
      height: {
        style: "decimal",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      },
      integer: {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      weight: {
        style: "decimal",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      },
    },
  },
}));
