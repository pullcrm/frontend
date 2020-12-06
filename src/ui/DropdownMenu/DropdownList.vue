<template>
  <div
    class="ui-dropdown-list"
  >
    <div
      v-if="name"
      class="ui-dropdown-list__name"
    >
      {{ name }}
    </div>

    <div class="ui-dropdown-list__inner">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    name: {
      type: String,
      default: null
    }
  }
})
export default class DropdownList extends Vue {

}
</script>

<style lang="scss">
  .ui-dropdown-list {
    padding: 0 12px;
    color: $ui-black-100;

    &__name {
      @include ui-typo-12;

      margin-bottom: 8px;
      color: $ui-black-80;
    }

    &__inner {
      .ui-dropdown-item {
        margin-bottom: 8px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
</style>
