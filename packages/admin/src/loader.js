import Vue from "vue";
import "./resources";

/**
 * Load external libs
 */
import PortalVue from "portal-vue";
import draggable from "vuedraggable";

/**
 * Register portal and draggable
 */
Vue.use(PortalVue);
Vue.component("draggable", draggable);

/**
 * Include guess logger on dev only
 */
if (process.env.NODE_ENV === "development") {
  import("./utils/guess-logger").then(({ logger }) => {
    Vue.prototype.$guessLogger = logger;
  });
}
