import { mapState } from "vuex";

export default {
  props: {
    source: String,
    item: {
      type: Object,
      default: () => {}
    },
    addLabel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      record: this.item || {}
    };
  },
  computed: {
    ...mapState({
      resource: state => state.api.resource
    })
  },
  watch: {
    resource: {
      handler(val) {
        if (this.item) {
          return;
        }
        if (val) {
          this.record = val;
          return;
        }
        this.record = {};
      },
      immediate: true
    }
  }
};