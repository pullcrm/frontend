<template>
  <Component
    :is="tab.to ? 'RouterLink' : 'a'"
    href="#"
    class="ui-tabs-item"
    :class="{
      'ui-tabs-item__active' : isActive
    }"
    v-bind="tab"
    @click.prevent="$emit('input', tab)"
  >
    {{ tab.name }}
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  inheritAttrs: false,

  props: {
    tab: {
      type: Object,
      required: true
    },

    isActive: {
      type: Boolean,
      default: false
    }
  }
})
export default class TabItem extends Vue {
  readonly tab
  readonly isActive: boolean
}
</script>

<style lang="scss">
.ui-tabs-item {
  @include ui-typo-14;

  position: relative;
  margin-right: 24px;
  white-space: nowrap;
  cursor: pointer;

  &__active,
  &.router-link-active {
    color: #1676ee;

    &::after {
      position: absolute;
      right: 0;
      bottom: -17px;
      left: 0;
      height: 2px;
      background: #1676ee;
      content: '';
    }
  }
}
</style>
