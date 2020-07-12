<template>
  <div
    class="ui-dropdown-group"
  >
    <div
      v-if="name"
      class="ui-dropdown-group__name"
    >
      {{ name }}
    </div>

    <slot />
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
export default class DropdownGroup extends Vue {

}
</script>

<style lang="scss">
  .ui-dropdown-group {
    &__name {
      @include ui-typo-12;

      margin-bottom: 8px;
      color: $ui-black-80;
    }

    .ui-text {
      cursor: pointer;
    }
  }
</style>
