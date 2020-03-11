import EventBus from "vuetify-admin/utils/eventBus";
import * as methods from "../utils/dataActions";

let storeActions = {};
let { GET_LIST, GET_ONE, CREATE, UPDATE } = methods;

export default ({ provider, resource }) => {
  let { name, actions } = resource;

  Object.values(methods).forEach(
    action =>
      (storeActions[action] = async ({ commit, dispatch }, params) => {
        try {
          /**
           * Only set global loading when read actions
           */
          if ([GET_LIST, GET_ONE].includes(action)) {
            commit("api/setLoading", true, {
              root: true
            });
          }

          let response = await provider[action](name, params);

          commit("api/setLoading", false, {
            root: true
          });

          /**
           * Apply success message on writes operations
           */
          dispatch(
            "layout/showSuccess",
            {
              action,
              resource: name,
              params
            },
            {
              root: true
            }
          );
          return Promise.resolve(response);
        } catch (e) {
          commit("api/setLoading", false, {
            root: true
          });
          if (e.response) {
            commit("layout/showError", e.response.data.message, {
              root: true
            });
          }
          dispatch("auth/checkError", e, {
            root: true
          });
          return Promise.reject(e);
        }
      })
  );

  return {
    namespaced: true,
    state: {
      item: null
    },
    mutations: {
      setItem(state, item) {
        state.item = item;
      },
      removeItem(state) {
        state.item = null;
      }
    },
    actions: {
      ...storeActions,
      async refresh({ state, commit, dispatch }) {
        if (state.item) {
          /**
           * Refresh current resource and update item state
           */
          let { data } = await dispatch(GET_ONE, {
            id: state.item.id
          });

          commit("setItem", data);
        }
        EventBus.$emit("refresh");
      },
      save({ state, dispatch }, data) {
        if (state.item) {
          /**
           * Update current resource
           */
          return dispatch(UPDATE, {
            id: state.item.id,
            data
          });
        }

        /**
         * Create new resource
         */
        return dispatch(CREATE, {
          data
        });
      }
    }
  };
};
