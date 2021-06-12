<template>
  <UiText
    class="schedule-timeoff"
    size="l"
    responsive
    :style="gridArea"
    @dblclick.native="edit"
  >
    {{ description }}
  </UiText>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { slugFromTime } from '~/utils/time'

@Component({
  props: {
    timeOff: {
      type: Object,
      required: true
    }
  }
})
export default class TimeOff extends Vue {
  readonly timeOff

  get description () {
    return this.timeOff.description.slice(0, 15)
  }

  get from () {
    return slugFromTime(this.timeOff.startTime)
  }

  get to () {
    return slugFromTime(this.timeOff.endTime)
  }

  get gridArea () {
    return {
      gridRow: `${this.from} / ${this.to}`,
      gridColumn: 'start / end'
    }
  }

  edit () {
    this.$typedStore.dispatch('popup/show', {
      name: 'time-off-edit',
      props: {
        timeOff: this.timeOff
      }
    })
  }
}
</script>

<style lang="scss">
  .schedule-timeoff {
    @include ui-text-border($ui-black-10, 2px);

    z-index: 7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $ui-black-60;
    background-color: $ui-gray-brand;
    background-image: url('~assets/svg/disabled-time-pattern.svg');
    background-position: bottom right;
    border-bottom: 1px solid $ui-black-40;
  }
</style>
