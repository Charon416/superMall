<template>
  <div id="app">
    <router-view></router-view>
    <!-- <nav-bar></nav-bar> -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "components/content/maintabbar/MainTabBar"


  export default {
    name: 'App',
    components: {
      MainTabBar,
      // NavBar
    }
  }
</script>

<style>
@import "./assets/css/base.css"

</style>
