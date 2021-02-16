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

import { RawLocation } from 'vue-router/types/router'

export interface ITab {
  name: string
  to?: RawLocation
}

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
  readonly tab: ITab
  readonly isActive: boolean
}
</script>

<style lang="scss">
.ui-tabs-item {
  @include ui-typo-16;

  padding: 4px 16px;
  color: $ui-black-80;
  white-space: nowrap;
  border-radius: 50px;
  cursor: pointer;

  &__active,
  &.router-link-active {
    color: $ui-black-100;
    background: $ui-black-20;
  }
}
</style>
