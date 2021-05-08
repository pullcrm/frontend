<template>
  <div :class="['ui-tag', `ui-tag__${type}`]">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    type: {
      type: String,
      default: 'blue'
    }
  }
})
export default class Tag extends Vue {
  readonly type: 'yellow' | 'blue' | 'green' | 'red'
}
</script>

<style lang="scss">
  $yellow: #ec9834;
  $blue: #4480f8;
  $green: #0abd7c;
  $red: #cf5c5c;

  .ui-tag {
    @include ui-typo-14;

    display: inline-block;
    padding: 2px 8px;
    color: #444;
    border-radius: 4px;

    &__yellow {
      // color: $yellow;
      background: rgba($yellow, 0.2);
      border: 1px solid rgba($yellow, 0.5);
    }

    &__blue {
      // color: $blue;
      background: rgba($blue, 0.2);
      border: 1px solid rgba($blue, 0.6);
    }

    &__green {
      // color: $green;
      background: rgba($green, 0.2);
      border: 1px solid rgba($green, 0.6);
    }

    &__red {
      // color: $red;
      background: rgba($red, 0.2);
      border: 1px solid rgba($red, 0.6);
    }
  }
</style>
