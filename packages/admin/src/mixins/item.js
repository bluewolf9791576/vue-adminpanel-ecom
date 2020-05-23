import Resource from "./resource";

/**
 * For single current item aware components.
 * @displayName VaMixinItem
 */
export default {
  mixins: [Resource],
  props: {
    /**
     * Exising record to use, default behavior is to fetch it from resource API store.
     */
    item: null,
  },
  computed: {
    record() {
      return this.item || this.$store.state[this.resource].item;
    },
  },
};
