<template>
  <UiText
    tag="a"
    href="#"
    class="ui-tab-button"
    :class="[
      { 'ui-tab-button_active': isActive }
    ]"
    :size="size"
    v-bind="$attrs"
    @click.native.prevent="onSelect"
  >
    <slot />
  </UiText>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Tabs from '../Tabs/Tabs.vue'

@Component({
  inheritAttrs: true,

  inject: {
    tabs: {
      default: undefined
    }
  },

  props: {
    active: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      required: true
    }
  }
})
export default class TabButton extends Vue {
  readonly size:
    | 's'
    | 'm'
    | 'l'

  readonly active: boolean

  tabs: Tabs

  get isActive () {
    if (this.tabs) {
      return this.tabs.activeTab === this.$vnode.key
    }

    return this.active
  }

  onSelect () {
    if (this.tabs) {
      return this.tabs.selectTab(this.$vnode.key)
    }
  }
}
</script>

<style lang="scss" src="./TabButton.scss"></style>
