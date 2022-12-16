import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import "@/index.css";
import App from "./App.vue";
import router from "@/router";

library.add(faAngleDown);
library.add(faAngleUp);
library.add(faSearch);

const pinia = createPinia();

// FontAwesomeIcon will be available globally as font-awesome-icon
createApp(App)
  .use(pinia)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
