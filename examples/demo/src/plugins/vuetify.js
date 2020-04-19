import Vue from "vue";
import Vuetify from "vuetify/lib";
import en from "vuetify/es5/locale/en";
import fr from "vuetify/es5/locale/fr";
import "@/sass/overrides.sass";

import {
  VApp,
  VContent,
  VSpacer,
  VContainer,
  VInput,
  VDataIterator,
  VToolbar,
  VToolbarTitle,
  VMenu,
  VBtn,
  VIcon,
  VList,
  VListGroup,
  VListItem,
  VListItemIcon,
  VListItemTitle,
  VListItemSubtitle,
  VListItemContent,
  VListItemAction,
  VDivider,
  VRow,
  VCol,
  VNavigationDrawer,
  VBreadcrumbs,
  VFooter,
  VAppBar,
  VAppBarNavIcon,
  VSnackbar,
  VSubheader,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VTooltip,
  VChip,
  VHover,
  VRating,
  VSwitch,
  VTextField,
  VTextarea,
  VDatePicker,
  VRadio,
  VRadioGroup,
  VFileInput,
  VSelect,
  VForm,
  VDataTable,
  VDataFooter,
  VAutocomplete,
  VCombobox,
  VImg,
} from "vuetify/lib";

/**
 * Register all used vuetify components by Vtec Admin
 */
Vue.use(Vuetify, {
  components: {
    VApp,
    VContent,
    VSpacer,
    VContainer,
    VInput,
    VDataIterator,
    VToolbar,
    VToolbarTitle,
    VMenu,
    VBtn,
    VIcon,
    VList,
    VListGroup,
    VListItem,
    VListItemIcon,
    VListItemTitle,
    VListItemSubtitle,
    VListItemContent,
    VListItemAction,
    VDivider,
    VRow,
    VCol,
    VNavigationDrawer,
    VBreadcrumbs,
    VFooter,
    VAppBar,
    VAppBarNavIcon,
    VSnackbar,
    VSubheader,
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VTooltip,
    VChip,
    VHover,
    VRating,
    VSwitch,
    VTextField,
    VTextarea,
    VDatePicker,
    VRadio,
    VRadioGroup,
    VFileInput,
    VSelect,
    VForm,
    VDataTable,
    VDataFooter,
    VAutocomplete,
    VCombobox,
    VImg,
  },
});

export default new Vuetify({
  lang: {
    locales: { en, fr },
    current: process.env.VUE_APP_I18N_LOCALE || navigator.language.substr(0, 2),
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#4CAF50",
        secondary: "#9C27b0",
        accent: "#9C27b0",
        info: "#00CAE3",
      },
    },
  },
});
