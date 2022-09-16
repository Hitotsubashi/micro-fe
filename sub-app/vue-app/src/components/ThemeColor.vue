<template>
  <div class="tips">
    当前主题色：
    <div class="color-well" :style="{ background: `${theme}` }" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      theme: (state) => state.app.theme,
    }),
  },
};
</script>

<style lang="scss" scoped>
.tips {
  text-align: center;

  .color-well {
    display: inline-block;
    width: 200px;
    height: 1.5em;
    vertical-align: bottom;
    border-radius: 4px;
  }
}
</style>
