<template>
  <div class="ui-tabs">
    <UiTabLink
      v-for="(tab, index) in tabs"
      :key="index"
      :tab="tab"
      :is-active="value === tab.name"
      @click.native="$emit('input', tab)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiTabLink, { ITab } from './TabItem.vue'

@Component({
  components: {
    UiTabLink
  },

  props: {
    value: {
      type: String,
      default: ''
    },

    tabs: {
      type: Array,
      required: true
    }
  }
})
export default class Tabs extends Vue {
  readonly tabs: ITab[]
}
</script>

<style lang="scss">
  .ui-tabs {
    @include hide-scrollbar;

    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>
