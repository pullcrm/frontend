<template>
  <div class="ui-tabs">
    <UiTabButtonList
      v-if="nav && tabs.length > 1"
    >
      <UiTabButton
        v-for="tab in tabs"
        :key="tab.key"
        :size="size"
        strong
        :data-key="tab.key"
        :left-icon="tab.icon"
        :responsive="responsive"
      >
        {{ tab.title }}
      </UiTabButton>
    </UiTabButtonList>

    <slot
      :active-tab="activeTab"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiTabButton from '../TabButton/TabButton.vue'
import UiTabButtonList from '../TabButtonList/TabButtonList.vue'

@Component({
  components: {
    UiTabButton,
    UiTabButtonList
  },

  props: {
    initialTab: {
      type: String,
      required: true
    },

    theme: {
      type: String,
      default: 'primary'
    },

    nav: {
      type: Boolean,
      default: true
    },

    size: {
      type: String,
      required: true
    },

    responsive: {
      type: Boolean,
      default: false
    }
  },

  provide () {
    return {
      tabs: this
    }
  }
})
export default class Tabs extends Vue {
  readonly nav: boolean
  readonly size:
    | 's'
    | 'm'

  readonly theme: string
  readonly initialTab: string
  readonly responsive: boolean

  activeTab: string

  constructor () {
    super()

    this.activeTab = this.initialTab
  }

  get tabs () {
    if (!this.$slots.default) return []

    return this.$slots.default
      .filter((vnode) => vnode.componentOptions)
      .map((vnode) => {
        const key = vnode.key
        const { title, icon } = vnode.componentOptions.propsData as Record<string, string>

        return { title, key, icon }
      })
  }

  selectTab (tabName) {
    this.activeTab = tabName

    this.$emit('select', tabName)
  }
}
</script>

<style lang="scss">
  .ui-tabs {
    display: block;
  }
</style>
