import { config, library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAdjust,
  faAnglesUp,
  faArrowUp,
  faBaby,
  faCheck,
  faCircle,
  faDragon,
  faEyeSlash,
  faHandFist,
  faMars,
  faMask,
  faMeteor,
  faMoon,
  faQuestion,
  faSun,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;

library.add(
  faAdjust,
  faAnglesUp,
  faArrowUp,
  faBaby,
  faCheck,
  faCircle,
  faDragon,
  faEyeSlash,
  faHandFist,
  faMars,
  faMask,
  faMeteor,
  faMoon,
  faQuestion,
  faSun,
  faVenus,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("font-awesome-icon", FontAwesomeIcon);
});
