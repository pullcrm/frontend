<template>
  <div
    class="ui-indicator"
    :class="[
      `ui-indicator_${type}`
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    type: {
      type: String,
      required: true
    }
  }
})
export default class Indicator extends Vue {
  readonly type:
  | 'blue'
  | 'gray'
  | 'green'
}
</script>

<style lang="scss">
  .ui-indicator {
    position: relative;
    display: inline-flex;

    &::after {
      position: absolute;
      right: -3px;
      bottom: -3px;
      box-sizing: content-box;
      width: 12px;
      height: 12px;
      border: 3px solid $ui-white;
      border-radius: 50%;
      content: '';
    }

    &_green {
      &::after {
        background: $ui-green-brand;
      }
    }

    &_blue {
      &::after {
        background: $ui-blue-brand;
      }
    }

    &_orange {
      &::after {
        background-color: $ui-orange-brand;
      }
    }

    &_gray {
      &::after {
        background: $ui-black-40;
      }
    }
  }
</style>
