const uploadRoutesMixin = {
    watch: {
      $route: {
        handler() {
          const matched = this.$route.matched
            // .filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
            .map((item) => ({
              ...item,
              path: this.$router.options.base + item.path,
            }));
          window.dispatchEvent(
            new CustomEvent("micro-app-dispatch", {
              detail: { type: "UPDATE_ROUTES", payload: matched },
            })
          );
        },
        immediate: true,
      },
    },
    beforeDestroy() {
      window.dispatchEvent(
        new CustomEvent("micro-app-dispatch", {
          detail: { type: "UPDATE_ROUTES", payload: [] },
        })
      );
    },
};
  
export default uploadRoutesMixin