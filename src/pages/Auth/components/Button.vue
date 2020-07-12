<template>
  <Component
    :is="$attrs.tag ? $attrs.tag : $attrs.to ? 'RouterLink' : 'div'"
    :class="['ui-button', `_${type}`]"
    v-bind="$attrs"
  >
    <slot />
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    outline: {
      type: Boolean,
      default: false
    },

    text: {
      type: Boolean,
      default: false
    }
  }
})
export default class Button extends Vue {
  readonly outline: boolean
  readonly text: boolean

  get type () {
    if (this.outline) {
      return 'outline'
    }

    if (this.text) {
      return 'text'
    }

    return 'default'
  }
}
</script>

<style lang="scss">
  .ui-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 48px;
    color: $ui-black-100;
    background: transparent;
    border-radius: 100px;
    cursor: pointer;

    &._default {
      background: #ffda34;
    }

    &._outline {
      border: 2px solid #ffda34;
    }

    // &._text {
    //   border: 2px solid #ffda34;
    // }
  }
</style>
