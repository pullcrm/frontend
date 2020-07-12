<template>
  <div class="ui-tabs">
    <div
      v-for="tab in tabs"
      :key="tab"
      class="ui-tabs__item"
      :class="{'_active' : tab === value}"
      @click="$emit('input', tab)"
    >
      {{ tab }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
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
    display: flex;
    padding-bottom: 16px;
    border-bottom: 1px solid $border-color;

    &__item {
      @include ui-typo-14;

      position: relative;
      margin-right: 24px;
      cursor: pointer;

      &._active {
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
  }
</style>
