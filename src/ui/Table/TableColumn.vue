<template>
  <td>
    <slot />
  </td>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class TableColumn extends Vue {

}
</script>

<style lang="scss">
  //
</style>
