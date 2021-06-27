<template>
  <div
    v-if="isVisible"
    :class="[
      'full-widget-pick-date-page-time-picker-group',
      `full-widget-pick-date-page-time-picker-group_theme_${theme}`
    ]"
  >
    <UiIcon
      size="l"
      :name="icon"
      class="full-widget-pick-date-page-time-picker-group__icon"
    />

    <div class="full-widget-pick-date-page-time-picker-group__badges">
      <TimePickerBadge
        v-for="(hour, index) in hours"
        :key="index"
        :hour="hour"
        class="full-widget-pick-date-page-time-picker-group__badge"
        @click.native="$emit('pick', hour)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import TimePickerBadge from './TimePickerBadge.vue'

@Component({
  props: {
    icon: {
      type: String,
      required: true
    },

    hours: {
      type: Array,
      required: true
    },

    theme: {
      type: String,
      default: 'primary'
    }
  },

  components: {
    TimePickerBadge
  }
})
export default class TimePickerGroup extends Vue {
  readonly hours
  readonly theme: 'primary' | 'secondary'

  get isVisible () {
    return this.hours.length > 0
  }
}
</script>

<style lang="scss" src="./TimePickerGroup.scss"></style>
