<template>
  <div class="layout-auth">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Layout extends Vue {

}
</script>

<style lang="scss">
  .layout-auth {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    min-height: 100vh;
    padding-top: 20vh;
    background: linear-gradient(240.76deg, #394a77 -2.01%, #231f20 100.92%);
  }
</style>
