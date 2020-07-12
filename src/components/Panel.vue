<template>
  <div
    class="ui-panel"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class Panel extends Vue {

}
</script>

<style lang="scss">
  .ui-panel {
    padding: 24px;
    background: #fff;
    border-radius: 10px;
  }
</style>
