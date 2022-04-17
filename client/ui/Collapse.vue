<template>
  <div
    class="ui-collapse"
    :class="{ 'ui-collapse_opened': opened }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    opened: {
      type: Boolean,
      default: false
    },

    maxHeight: {
      type: String,
      default: null
    }
  },

  watch: {
    opened (opened: boolean) {
      if (opened) {
        this.open()
      } else {
        this.close()
      }
    }
  }
})
export default class Collapse extends Vue {
  readonly opened: boolean
  readonly maxHeight: string

  open () {
    const el = this.$el as HTMLElement
    const maxHeight = this.maxHeight || el.scrollHeight

    el.style.maxHeight = `${maxHeight}px`
  }

  close () {
    const el = this.$el as HTMLElement

    el.style.maxHeight = null
  }
}
</script>

<style lang="scss">
  .ui-collapse {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-in;
  }
</style>
