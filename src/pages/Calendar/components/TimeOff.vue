<template>
  <div
    class="css-grid-time-off"
    :class="{'_has-gragged': hasDragElement}"
    :style="gridArea"
  >
    <div class="css-grid-time-off__inner"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { slugFromTime } from '@/utils/time.js'

@Component({
  props: {
    timeOff: {
      type: Object,
      required: true
    }
  }
})
export default class CssGridItem extends Vue {
  timeOff

  get hasDragElement () {
    return this.$store.getters['calendar/isDragged']
  }

  get staff () {
    return this.timeOff.staff
  }

  get gridArea () {
    const timeStart = slugFromTime(this.timeOff.time_start)
    const timeEnd = slugFromTime(this.timeOff.time_end)

    return {
      gridColumn: `${timeStart}-start / ${timeEnd}-start`,
      gridRow: `${this.staff.slug}-start / ${this.staff.slug}-end`
    }
  }
}
</script>

<style lang="scss">
  .css-grid-time-off {
    z-index: 7;
    box-sizing: border-box;

    &__inner {
      width: 100%;
      height: 100%;
      background-image: url('~@/assets/pattern-time-off.svg');
      background-repeat: repeat;
    }

    &._has-gragged {
      z-index: 5;
    }
  }
</style>
