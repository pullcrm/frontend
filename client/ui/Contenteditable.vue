<template>
  <p
    ref="editable"
    v-click-outside="{
      handler: onOutsideClick,
      isActive: isFocused
    }"
    class="ui-contenteditable"
    contenteditable
    v-on="listeners"
    @click="isFocused = true"
  >
    {{ newValue }}
  </p>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },

  watch: {
    value (val) {
      if (this.isFocused) return

      this.newValue = String(val)
    }
  }
})
export default class Contenteditable extends Vue {
  readonly value: string | number

  isFocused = false

  newValue = ''

  constructor () {
    super()

    this.newValue = String(this.value)
  }

  get listeners () {
    return { ...this.$listeners, input: this.onInput }
  }

  onInput ({ target }) {
    this.$emit('input', target.textContent)
  }

  onOutsideClick () {
    this.isFocused = false

    this.newValue = String(this.value)
  }
}
</script>

<style lang="scss">
.ui-contenteditable {
  display: block;
}
</style>
