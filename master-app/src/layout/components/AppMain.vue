<template>
  <section class="app-main">
    <transition name="fade-transform">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name || this.$route.path
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  },
  watch: {
    '$route': {
      handler() {
        this.$store.dispatch('tagsView/addView', this.$route)
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
