<template>
  <div
    class="schedule-hour-tile"
    :style="gridArea"
  >
    <div
      ref="icon"
      class="schedule-hour-tile__icon"
    >
      <UiIcon
        size="xs"
        name="outlined/plus"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { slugFromTime } from '~/utils/time'

@Component({
  props: {
    time: {
      type: String,
      required: true
    },

    specialist: {
      type: Object,
      required: true
    }
  }
})
export default class HourTile extends Vue {
  readonly time
  readonly specialist

  $refs: {
    icon: HTMLElement
  }

  get icon () {
    return this.$refs.icon
  }

  get gridArea () {
    const row = slugFromTime(this.time)

    return {
      gridRow: `${row}-start / ${row}-end`,
      gridColumn: 'start / end'
    }
  }
}
</script>

<style lang="scss" src="./HourTile.scss"></style>
