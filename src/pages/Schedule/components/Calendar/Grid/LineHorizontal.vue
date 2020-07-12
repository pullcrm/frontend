<template>
  <div
    class="schedule-calendar-grid-horizontal-line"
    :class="{'_is-minute': isMinute}"
    :style="gridArea"
  />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { timeFromSlug } from '@/utils/time'

@Component({
  props: {
    name: {
      type: String,
      required: true
    }
  }
})
export default class CssGridItem extends Vue {
  name: string

  readonly time = timeFromSlug(this.name)

  get gridArea () {
    return {
      gridColumn: '1 / -1',
      gridRow: `${this.name}-start / ${this.name}-end`
    }
  }

  get isMinute () {
    return Number(this.time.split(':')[1]) % 2 === 0
  }
}
</script>

<style lang="scss">
.schedule-calendar-grid-horizontal-line {
  position: relative;
  border-bottom: 1px solid $ui-black-40;

  &._is-minute {
    border-color: #eaeaea;
  }
}
</style>
