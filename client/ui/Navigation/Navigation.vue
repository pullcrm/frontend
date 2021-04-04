<template>
  <div class="ui-navigation">
    <UiNavigationLink
      v-for="(item, index) in navigation"
      :key="index"
      :item="item"
      :is-active="value === item.name"
      @click.native="$emit('input', item)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import UiNavigationLink, { IItem } from './NavigationItem.vue'

@Component({
  components: {
    UiNavigationLink
  },

  props: {
    value: {
      type: String,
      default: ''
    },

    navigation: {
      type: Array,
      required: true
    }
  }
})
export default class Navigation extends Vue {
  readonly navigation: IItem[]
}
</script>

<style lang="scss">
  .ui-navigation {
    @include hide-scrollbar;

    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>
