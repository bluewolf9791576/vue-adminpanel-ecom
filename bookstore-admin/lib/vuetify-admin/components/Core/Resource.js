import resource from "../../store/resource";

export default {
  name: "Resource",
  props: {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    actions: {
      type: Array,
      default: () => ["list", "show", "create", "edit", "delete"]
    }
  },
  async created() {
    /**
     * Register data api module for this resource
     */
    this.$store.registerModule(
      this.name,
      resource(
        this.$parent.$parent.$props.dataProvider,
        this.name,
        this.actions
      )
    );

    /**
     * Register crud routes for this resource
     */
    let name = this.name;
    let children = [];

    let getResourceBeforeEnter = async (to, from, next) => {
      let response = await this.$store.dispatch(`${name}/getOne`, {
        id: to.params.id
      });

      if (response.status !== 200) {
        return Promise.reject(response.statusText);
      }

      to.meta.resource = await response.json();

      next();
    };

    if (this.hasAction("list")) {
      children.push({
        path: "/",
        name: `${name}_list`,
        component: {
          render(c) {
            return c(`${name}-list`);
          }
        },
        meta: {
          resourceName: name,
          action: "list"
        }
      });
    }
    if (this.hasAction("create")) {
      children.push({
        path: "create",
        name: `${name}_create`,
        component: {
          render(c) {
            return c(`${name}-create`);
          }
        },
        meta: {
          resourceName: name,
          action: "create"
        }
      });
    }
    if (this.hasAction("edit")) {
      children.push({
        path: ":id/edit",
        name: `${name}_edit`,
        component: {
          render(c) {
            return c(`${name}-edit`);
          }
        },
        props: true,
        meta: {
          resourceName: name,
          action: "edit"
        },
        beforeEnter: getResourceBeforeEnter
      });
    }
    if (this.hasAction("show")) {
      children.push({
        path: ":id",
        name: `${name}_show`,
        component: {
          render(c) {
            return c(`${name}-show`);
          }
        },
        props: true,
        meta: {
          resourceName: name,
          action: "show"
        },
        beforeEnter: getResourceBeforeEnter
      });
    }
    this.$router.addRoutes([
      {
        path: `/${this.name}`,
        component: {
          render(c) {
            return c("router-view");
          }
        },
        meta: {
          label: this.title
        },
        children
      }
    ]);
  },
  methods: {
    hasAction(name) {
      return this.actions.includes(name);
    }
  },
  render() {
    return null;
  }
};
