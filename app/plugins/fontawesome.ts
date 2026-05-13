import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAdjust,
  faAnglesUp,
  faArrowUp,
  faBaby,
  faBan,
  faCheck,
  faCircle,
  faDragon,
  faEyeSlash,
  faHandFist,
  faMars,
  faMask,
  faMeteor,
  faMoon,
  faPlus,
  faQuestion,
  faSun,
  faVenus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

library.add(
  faAdjust,
  faAnglesUp,
  faArrowUp,
  faBaby,
  faBan,
  faCheck,
  faCircle,
  faDragon,
  faEyeSlash,
  faHandFist,
  faMars,
  faMask,
  faMeteor,
  faMoon,
  faPlus,
  faQuestion,
  faSun,
  faVenus,
  faXmark,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
