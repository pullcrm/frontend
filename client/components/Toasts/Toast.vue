<template>
  <div
    v-if="isVisible"
    class="toast"
    data-test="toast"
  >
    <slot :close="close" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    id: {
      type: Number,
      default: undefined
    }
  }
})
export default class Toast extends Vue {
  readonly id?: number

  isVisible () {
    return this.$typedStore.dispatch('toasts/has', this.id)
  }

  close () {
    this.$typedStore.dispatch('toasts/close', this.id)
  }
}
</script>
