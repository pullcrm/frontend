<template>
  <td
    :data-name="name"
    :align="align"
  >
    <slot />
  </td>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    name: {
      type: String,
      required: true
    },

    align: {
      type: String,
      default: 'left'
    }
  }
})
export default class TableColumn extends Vue {
  readonly name!: string
  readonly align!: string
}
</script>

<style lang="scss">
  //
</style>
