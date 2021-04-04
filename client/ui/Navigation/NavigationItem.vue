<template>
  <Component
    :is="item.to ? 'RouterLink' : 'a'"
    href="#"
    class="ui-navigation-item"
    :class="{
      'ui-navigation-item__active' : isActive
    }"
    v-bind="item"
    @click.prevent="$emit('input', item)"
  >
    {{ item.name }}
  </Component>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { RawLocation } from 'vue-router/types/router'

export interface IItem {
  name: string,
  to?: RawLocation
}

@Component({
  inheritAttrs: false,

  props: {
    item: {
      type: Object,
      required: true
    },

    isActive: {
      type: Boolean,
      default: false
    }
  }
})
export default class NavigationItem extends Vue {
  readonly item: IItem
  readonly isActive: boolean
}
</script>

<style lang="scss">
.ui-navigation-item {
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
