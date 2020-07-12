<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  async beforeMount () {
    // await Promise.all([
    //   this.$store.dispatch('fetch')
    // ])
  }
}
</script>

<style lang="scss">
  @import '@/scss/_reset.scss';
  @import '@/scss/_grid.scss';
  @import '@/scss/styles.scss';

  body {
    min-height: 100vh;
    font-family: Roboto, sans-serif !important;
    background: #f8f8f8;
  }

  #app {
    min-height: 80vh;
    color: #2c3e50;
    font-family: Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    * {
      box-sizing: border-box;
    }
  }
</style>
