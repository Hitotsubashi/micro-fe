const devtoolEnhanceMixin = {
    data() {
      return {
        subDiv: undefined,
      };
    },
    mounted() {
      if (process.env.NODE_ENV === "development") {
        this.subDiv = document.createElement("div");
        this.subDiv.__vue__ = this;
        document.body.appendChild(this.subDiv);
      }
    },
    beforeDestroy() {
      this.subDiv.__vue__ = null;
      document.body.removeChild(this.subDiv);
      this.subDiv = null;
    },
};

export default devtoolEnhanceMixin;