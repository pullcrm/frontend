<template>
  <div
    class="schedule-hour-tile"
    :class="[
      {'_is-minute': isMinute}
    ]"
    :style="gridArea"
    @click="openPoppover"
  >
    <UiIcon
      class="schedule-hour-tile__icon"
      size="xs"
      name="plus/plus"
    />
    <!-- @dragenter="dropZoneEnterHandler"
      @dragover="dropZoneOverHandler"
      @dragleave="dropZoneLeaveHandler"
      @drop.prevent="dropZoneDropHandler" -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { slugFromTime } from '@/utils/time'

@Component({
  props: {
    hour: {
      type: String,
      required: true
    },

    specialistId: {
      type: Number,
      required: true
    }
  }
})
export default class HourTile extends Vue {
  readonly hour: string
  readonly specialistId: number

  get isMinute () {
    return Number(this.hour.split(':')[1]) % 2 === 0
  }

  get gridArea () {
    const row = slugFromTime(this.hour)

    return {
      gridRow: `${row}-start / ${row}-end`,
      gridColumn: 'start / end'
    }
  }

  openPoppover () {
    const element = this.$el.querySelector('.schedule-hour-tile__icon')

    this.$emit('popper', element, this.hour)
  }

  // get dropTimeObject () {
  //   return this.$store.getters['drugAndDrop/dropTimeObject']
  // }

  // dropZoneEnterHandler (e) {
  //   if (e.dataTransfer.types.includes('type/dragged-box')) {
  //     this.$store.commit('drugAndDrop/SET_DRAG_ZONE', this.tile)

  //     e.preventDefault()
  //   }
  // }

  // dropZoneOverHandler (e) {
  //   if (e.dataTransfer.types.includes('type/dragged-box')) {
  //     this.$store.commit('drugAndDrop/SET_DRAG_ZONE_OVER', true)

  //     e.preventDefault()
  //   }
  // }

  // dropZoneLeaveHandler (e) {
  //   if (
  //     e.dataTransfer.types.includes('type/dragged-box') &&
  //     e.relatedTarget !== null &&
  //     e.currentTarget !== e.relatedTarget.closest('.drop-zone')
  //   ) {
  //     // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget

  //     this.$store.commit('drugAndDrop/SET_DRAG_ZONE_OVER', false)
  //   }
  // }

  // dropZoneDropHandler () {
  //   // this.$store.commit('drugAndDrop/SET_DRAG_ZONE_OVER', false)
  // }
}
</script>

<style lang="scss">
  .schedule-hour-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid $ui-black-40;
    cursor: pointer;

    &__icon {
      color: $ui-black-100;
      opacity: 0;
      transition: $ui-transition;
    }

    &:hover {
      .schedule-hour-tile {
        &__icon {
          opacity: 1;
        }
      }
    }

    &._is-minute {
      border-color: #eaeaea;
    }

    &:last-child {
      border: none;
    }
  }
</style>
