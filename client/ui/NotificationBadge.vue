<template>
  <div
    class="ui-notification-badge"
    :class="[
      `ui-notification-badge_size_${size}`,
      { 'ui-notification-badge_gt_0': count > 0 },
      { 'ui-notification-badge_gt_9': count > 9 },
      { 'ui-notification-badge_gt_99': count > 99 },
    ]"
    :data-count="count"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    size: {
      type: String,
      default: 's'
    },

    count: {
      type: Number,
      required: true
    }
  }
})
export default class UiNotificationBadge extends Vue {
  readonly size:
    | 's'

  readonly count: number
}
</script>

<style lang="scss">
  .ui-notification-badge {
    display: flex;
    align-items: center;

    &::after {
      display: none;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      color: $ui-white;
      background: $ui-blue-brand;
      border-radius: 100px;
      content: attr(data-count);
    }

    &_size_s {
      &::after {
        @include ui-typo-14;

        min-width: 24px;
        height: 24px;
        padding: 0 4px;
        font-weight: 500;
        text-transform: uppercase;
      }
    }

    &_gt_0 {
      &::after {
        display: flex;
      }
    }
  }
</style>
