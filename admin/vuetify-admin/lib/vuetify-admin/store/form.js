import set from "lodash/set";

export default {
  namespaced: true,
  state: {
    model: {},
    errors: {},
    saving: false
  },
  mutations: {
    update(state, { source, value }) {
      set(state.model, source, value === undefined ? "" : value);
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    setSaving(state, saving) {
      state.saving = saving;
    },
    reset(state) {
      state.model = {};
      state.errors = {};
      state.saving = false;
    }
  },
  actions: {
    async save({ state, commit, dispatch }, resource) {
      commit("setSaving", true);

      try {
        await dispatch(`${resource}/save`, state.model, {
          root: true
        });

        commit("setSaving", false);
      } catch (e) {
        commit("setSaving", false);

        if (e.response) {
          commit("setErrors", e.response.data.errors || {});
        }
        return Promise.reject(e);
      }
    }
  }
};
