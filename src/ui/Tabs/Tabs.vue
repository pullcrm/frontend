<template>
  <div class="ui-tabs">
    <UiTabLink
      v-for="(tab, index) in tabs"
      :key="index"
      :tab="tab"
      :is-active="value === tab.name"
      @click="$emit('input', tab)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiTabLink from './TabItem.vue'

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
  readonly tabs: string[]
}
</script>

<style lang="scss">
  .ui-tabs {
    @include hide-scrollbar;

    display: flex;
    padding-bottom: 16px;
    overflow-x: auto;
    border-bottom: 1px solid $border-color;
  }
</style>
