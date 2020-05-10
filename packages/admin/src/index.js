/**
 * All UI Vue Components
 */
import * as core from "./components/core";
import * as layout from "./components/layout";
import * as ui from "./components/ui";

/**
 * Main JS App
 */
import VtecAdmin from "./admin";
import objectToFormData from "./utils/objectToFormData";
import {
  laravelDataProvider,
  sanctumAuthProvider,
  jwtAuthProvider,
  basicAuthProvider,
} from "./providers";
import { en, fr } from "./locales";

/**
 * Main admin entry
 */
export default VtecAdmin;

/**
 * Some utils
 */
export { objectToFormData };

/**
 * All providers
 */
export {
  laravelDataProvider,
  basicAuthProvider,
  jwtAuthProvider,
  sanctumAuthProvider,
};

/**
 * All locales
 */
export { en, fr };

/**
 * Vue install plugin
 */
VtecAdmin.install = (Vue) => {
  /**
   * Register Admin UI components
   */
  [core, layout, ui].forEach((c) => {
    Object.keys(c).forEach((name) => {
      Vue.component(`Va${name}`, c[name]);
    });
  });

  /**
   * Inject global admin conf
   */
  Vue.mixin({
    beforeCreate() {
      this.$admin = this.$root.$options.admin;
    },
  });
};
