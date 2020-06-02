import Vue from "vue";
import VtecAdmin from "vtec-admin";

import "vtec-admin/src/loader";

import {
<%_ if (data) { _%>
  <%- data %>DataProvider,
<%_ } _%>
<%_ if (auth && auth !== "custom") { _%>
  <%- auth %>AuthProvider,
<%_ } _%>
} from "vtec-admin/src/providers";
import {
<%_ for (locale of locales) { _%>
  <%- locale %>,
<%_ } _%>
} from "vtec-admin/src/locales";

import router from "@/router";
import routes from "@/router/admin";
import store from "@/store";
import i18n from "@/i18n";
import resources from "@/resources";
import axios from "axios";
import trimEnd from "lodash/trimEnd";

/**
 * Load Admin UI components
 */
Vue.use(VtecAdmin);

/**
 * Axios instance
 */
const baseURL = process.env.VUE_APP_API_URL || "<%- apiURL %>";

const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

/**
 * Init admin
 */
export default new VtecAdmin({
  router,
  store,
  i18n,
  title: "Vtec Admin",
  routes,
  locales: {
    <%_ for (locale of locales) { _%>
      <%- locale %>,
    <%_ } _%>
  },
  translations: [
    <%_ for (locale of locales) { _%>
      "<%- locale %>",
    <%_ } _%>
  ],
<%_ if (data) { _%>
  dataProvider: <%- data %>DataProvider(http),
<%_ } _%>
<%_ if (auth && auth !== "custom") { _%>
  authProvider: <%- auth %>AuthProvider(http),
<%_ } _%>
  resources,
  axios: http,
  options: {
    dateFormat: "long",
    imageUploadUrl: "/api/upload",
    fileBrowserUrl: `${trimEnd(baseURL, "/")}/elfinder/tinymce5`,
  },
});
