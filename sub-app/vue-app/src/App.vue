<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ThemeColor/>
    <ChangeRouteButton/>
  </div>
</template>

<script>
import ThemeColor from '@/components/ThemeColor'
import ChangeRouteButton from '@/components/ChangeRouteButton'

export default {
  name: 'App',
  components:{
    ThemeColor,
    ChangeRouteButton
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
