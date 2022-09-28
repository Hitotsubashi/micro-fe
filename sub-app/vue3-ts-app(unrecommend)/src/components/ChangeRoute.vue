<template>
  <div>
    <div class="change-route-buttons">
      <router-link class="button" :to="{ name: 'page-a' }">PageA</router-link>
      <router-link class="button" :to="{ name: 'page-b' }">PageB</router-link>
      <router-link class="button" :to="{ name: 'home' }">主页</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.change-route-buttons {
  text-align: center;

  .button {
    margin: 12px;
  }
}
</style>
